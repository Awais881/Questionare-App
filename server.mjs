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
    const user = await userModel.findOne({ email: body.email }, "email role password");

    if (user) {
      const isMatched = await body.password === user.password;

      if (isMatched) {
        res.send({
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
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/api/question", async (req, res) => {
  // Validate the input
  if (!req.body.question || !req.body.answer) {
    res.status(400).send("Invalid input");
    return;
  }

  // Extract the answer range from the request body
  const { answer } = req.body;
  const answerRange = `${answer.min}-${answer.max}`;

  // Create a new question using the questionModel
  const save = await questionModel.create({
    question: req.body.question,
    answer: answerRange
  });

  console.log("save: ", save);

  res.send("Question saved successfully");
});


app.get("/api/questions", async (req, res) => {
  try {
    const questions = await questionModel.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve questions" });
  }
});


// app.put("/api/question/:id", async (req, res) => {
//   try {
//     const questionId = req.params.id;
//     const updatedQuestion = {
//       question: req.body.question,
//       answer: {
//         start: req.body.start,
//         end: req.body.end
//       }
//     };

//     const question = await questionModel.findByIdAndUpdate(questionId, updatedQuestion, { new: true });

//     if (!question) {
//       return res.status(404).json({ error: "Question not found" });
//     }

//     res.json(question);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while updating the question" });
//   }
// });

app.put("/api/question/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    // Validate the input
    if (!req.body.question || !req.body.answer || !req.body.answer.start || !req.body.answer.end) {
      res.status(400).send("Invalid input");
      return;
    }

    // Extract the answer range from the request body
    const { start, end } = req.body.answer;
    const answerRange = `${start}-${end}`;

    // Find the question by its ID and update it
    const question = await questionModel.findByIdAndUpdate(
      questionId,
      { question: req.body.question, answer: answerRange },
      { new: true }
    );

    if (!question) {
      res.status(404).send("Question not found");
      return;
    }

    res.send("Question updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


app.delete("/api/question/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    const deletedQuestion = await questionModel.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete question" });
  }
});


// app.post("/api/question", async (req, res) => {

//   if (
//       !req.body.question ||
//       !req.body.answer
//   ) {
//       res.status(400).send("invalid input")
//       return;
//   }

//   const save = await questionModel.create({
//      question: req.body.question,
//      answer: req.body.answer
//   })

//   console.log("save: ", save)

//   res.send("question save successfully");
// })
  
// app.post("/api/question", (req, res) => {
//   const { question, answer } = req.body;

//   // Create a new question document
//   const newQuestion = new questionModel({
//     question,
//     answer
//   });

//   // Save the question to the database
  
//   newQuestion
//     .save()
//     .then((question) => {
//       console.log('Question saved successfully:', question);
//       // Handle the successful save
//     })
//     .catch((error) => {
//       console.error('Error saving question:', error);
//       // Handle the error
//     });
  

//   // newQuestion.save()
//   //   .then(() => {
//   //     res.status(201).json({ message: 'Question added successfully' });
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).json({ error: 'Failed to add question' });
//   //   });
// });

// API endpoint to get a random question (user)

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