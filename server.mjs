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
            age: user.age,
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
   



app.post("/api/question", async (req, res) => {

  if (
      !req.body.question ||
      !req.body.answer
  ) {
      res.status(400).send("invalid input")
      return;
  }

  const save = await questionModel.create({
     question: req.body.question,
     answer: req.body.answer
  })

  console.log("save: ", save)

  res.send("question save successfully");
})
  
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