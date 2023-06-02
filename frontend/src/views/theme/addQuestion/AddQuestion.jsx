import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './question.css';
import Swal from 'sweetalert2'
const AddQuestion = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState('');

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
  const addQuestions = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:5001/api/question" , {
        question: question,
        answer: answer
       
      },);
      Toast.fire({
        icon: 'success',
        title: response.data.message
      })
      console.log("Saved successful");
    } catch (err) {
        Toast.fire({
            icon: 'error',
            title: "response.data.message"
          })
    }
  };
 
  return (
    <div className="form-container">
      <h2>Add Question </h2>
      <form className="form" onSubmit={addQuestions} >
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <input
            type="number"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuestion;
