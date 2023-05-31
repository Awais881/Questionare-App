import React from 'react'
import './addquestion.css'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { DocsLink } from 'src/components'
import { useState, useContext } from "react";
import axios from 'axios';
import { GlobalContext } from '../../../context/context';
const Typography = () => {


  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { state, dispatch } = useContext(GlobalContext);

  const addQuestions = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:5001/api/question" , {
        question: question,
        answer: answer
      },);

      console.log("Login successful");
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <>
      <h2>Add Question</h2>
  <div className="container">
    
    <form method="post" onSubmit={addQuestions}>
      <div className="form-group">
      <label className="label" for="question-input'">Question :</label>
       <textarea  placeholder='Add Questions ...'  className='question-input'
             onChange={(e) => setQuestion(e.target.value)}
       />
      </div>
      <div className="form-group">
        <label className="label" for="answer-input">Correct Answer:</label>
       <input type="text"  placeholder='Correct answer' className='answer-input'
          onChange={(e) => setAnswer(e.target.value)}/>
      </div>
     
     
      
      
      <div className="button">
       <button type='submit'>Add</button>
      </div>
    </form>
  </div>



    </>
  )
}

export default Typography
