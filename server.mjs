import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express()
import cookieParser from 'cookie-parser';
import { userModel , questionModel } from './dbRepo/model.mjs';
// import AuthApis from './apis/auth.mjs'
const port = process.env.PORT || 5001
import cookie from 'cookie'
mongoose.set('strictQuery', true);


const SECRET = process.env.SECRET || "topsecret";



app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000', "*"],
    credentials: true
}));


// app.use('/api/v1', AuthApis)



app.post("/api/login", async (req, res) => {
  try {
    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.email || !body.password) {
      res.status(400).send(`Required fields missing`);
      return;
    }

    // Check if user exists
    const user = await userModel.findOne({ email: body.email }, "email role password ");

    if (user) {
      const isMatched = await body.password == user.password;

      if (isMatched) {
        res.status(200).send({
          message: "Login Successful",
          profile: {
            email: user.email,
            role: user.role,
            // age: user.age,
            _id: user._id
          }
        });
      } else {
        res.status(401).send({ message: "Incorrect email or password" });
      }
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (err) {
    console.log("DB error: ", err);
    res.status(500).send({ message: "Login failed, please try later" });
  }
});
   

app.get("/api/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/question", async (req, res) => {
  try {
    // Validate the input
    if (!req.body.question || !req.body.answer) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }

    const answer = req.body.answer; // Single answer

    // Create a new question using the questionModel
    const save = await questionModel.create({
      question: req.body.question,
      answer: answer
    });

    console.log("save: ", save);

    res.status(200).json({ message: "Question saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the question" });
  }
});



app.delete("/api/question/:id", async (req, res) => {
  try {
    const deletedQuestion = await questionModel.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the question" });
  }
});


app.put("/api/question/:id", async (req, res) => {
  try {
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      req.params.id,
      {
        question: req.body.question,
        answer: req.body.answer
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question updated successfully", question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the question" });
  }
});


app.get("/api/questions", async (req, res) => {
  try {
    const questions = await questionModel.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving questions");
  }
});



app.get('/api/questions/random', (req, res) => {
  // Get a random question from the database
  Question.aggregate([{ $sample: { size: 1 } }])
    .then((question) => {
      res.json(question);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve question' });
    });
});



const __dirname = path.resolve();
// app.use('/', express.static(path.join(__dirname, './twitter/build')))
// app.use('*', express.static(path.join(__dirname, './twitter/build')))

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// THIS IS THE ACTUAL SERVER WHICH IS RUNNING



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})