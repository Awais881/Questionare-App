// import PropTypes from 'prop-types'
// import React, { useEffect, useState, createRef } from 'react'
// import classNames from 'classnames'
// import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
// import { rgbToHex } from '@coreui/utils'
// import { DocsLink } from 'src/components'




// const Colors = () => {
//   return (
//     <>
//   <h1>
//   {/* const getUserData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/users");
//       console.log("respone", response.data);
//      oad: response.data,
//       // });
//       console.log("state", state);
//     } catch (error) {
    
     
//     }
//   };
//   useEffect(() => {
//     getUserData();
//   }, []); */}


  
//   </h1>
//     </>
//   )
// }

// export default Colors
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import './addquestion.css';

const Typographys = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timeLimit = 10; // Time limit in seconds (3 minutes)

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStarted) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timerStarted]);

  useEffect(() => {
    if (timer >= timeLimit) {
      submitAnswers();
    }
  }, [timer]);

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
  });

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/questions');
      setQuestions(response.data);
      setAnswers({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerChange = (questionId, event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const submitAnswers = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/submit-answers', { answers });

      Toast.fire({
        icon: 'success',
        title: response.data.message
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Failed to submit answers'
      });
    }
  };

  const startTimer = () => {
    setTimer(0);
    setTimerStarted(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div>
        <h2>Question Bank</h2>
        {!timerStarted && <button onClick={startTimer}>Start</button>}
        {timerStarted && <div className="timer">{formatTime(timer)}</div>}
        {timerStarted && timer < timeLimit && (
          <div className="question-list">
            {questions.map((question) => (
              <div key={question._id} className="question-item">
                <p className="question-text">{question.question}</p>
                <div className="answer-container">
                  <input
                    type="text"
                    placeholder="From"
                    value={answers[`${question._id}-from`] || ''}
                    onChange={(e) => handleAnswerChange(`${question._id}-from`, e)}
                  />
                  <input
                    type="text"
                    placeholder="To"
                    value={answers[`${question._id}-to`] || ''}
                    onChange={(e) => handleAnswerChange(`${question._id}-to`, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {timerStarted && timer >= timeLimit && <button onClick={submitAnswers}>Submit</button>}
      </div>
    </>
  );
};

export default Typographys;
