





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const Typographys = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [timer, setTimer] = useState(0);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const timeLimit = 30; // Time limit in seconds (3 minutes)

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (timerStarted && !isTimeUp) {
//         setTimer((prevTimer) => prevTimer + 1);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [timerStarted, isTimeUp]);

//   useEffect(() => {
//     if (timer >= timeLimit) {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   }, [timer]);

//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-right',
//     iconColor: 'white',
//     customClass: {
//       popup: 'colored-toast'
//     },
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true
//   });

//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get('http://localhost:5001/api/random-question?num=5');
//       setQuestions(response.data.questions);
//       console.log(response);
//       setAnswers({});
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAnswerChange = (questionId, inputIndex, event) => {
//     const { value } = event.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: {
//         ...(prevAnswers[questionId] || {}),
//         [inputIndex]: value
//       }
//     }));
//   };

//   const submitAnswers = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/submit-answers', { answers });

//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });
//     } catch (error) {
//       Toast.fire({
//         icon: 'error',
//         title: 'Failed to submit answers'
//       });
//     }
//   };

//   const startTimer = () => {
//     setTimer(0);
//     setTimerStarted(true);
//   };

//   const stopTimer = () => {
//     setTimerStarted(false);
//     setIsTimeUp(false);
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <>
//       <div>
//         <h2>Question Bank</h2>
//         {!timerStarted && !isTimeUp && <button onClick={startTimer}>Start</button>}
//         {timerStarted && !isTimeUp && (
//           <>
//             <div className="timer">{formatTime(timer)}</div>
//             <div className="question-list">
//               {questions.map((question) => (
//                 <div key={question.id} className="question-item">
//                   <p className="question-text">{question.question}</p>
//                   <div className="answer-inputs">
//                     <input
//                       type="text"
//                       placeholder="Min"
//                       value={answers[question.id]?.min || ''}
//                       onChange={(event) => handleAnswerChange(question.id, 'min', event)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Max"
//                       value={answers[question.id]?.max || ''}
//                       onChange={(event) => handleAnswerChange(question.id, 'max', event)}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//               Submit
//             </button>
//           </>
//         )}
//         {isTimeUp && (
//           <div>
//             <p>Time's up! Submitting answers...</p>
//             <button onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//               Submit
//             </button>
//           </div>
//         )}
//         {!timerStarted && isTimeUp && (
//           <div>
//             <p>Time's up! You can no longer submit answers.</p>
//           </div>
//         )}
//         {timerStarted && isTimeUp && <button onClick={stopTimer}>Back</button>}
//         {!timerStarted && isTimeUp && <button onClick={stopTimer}>Back</button>}
//       </div>
//     </>
//   );
// };

// export default Typographys;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const Typographys = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [timer, setTimer] = useState(0);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [score, setScore] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const timeLimit = 10; // Time limit in seconds (3 minutes)

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (timerStarted && !isTimeUp) {
//         setTimer((prevTimer) => prevTimer + 1);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [timerStarted, isTimeUp]);

//   useEffect(() => {
//     if (timer >= timeLimit) {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   }, [timer]);

//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-right',
//     iconColor: 'white',
//     customClass: {
//       popup: 'colored-toast'
//     },
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true
//   });

//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get('https://questionare-server-production.up.railway.app/api/random-question?num=2');
//       setQuestions(response.data.questions);
//       console.log(response);
//       setAnswers({});
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAnswerChange = (questionId, inputIndex, event) => {
//     const { value } = event.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: {
//         ...(prevAnswers[questionId] || {}),
//         [inputIndex]: value
//       }
//     }));
//   };

 
//   const startTimer = () => {
//     setTimer(0);
//     setTimerStarted(true);
//   };

//   const stopTimer = () => {
//     setTimerStarted(false);
//     setIsTimeUp(false);
//   };


//   const submitAnswers = async () => {
//     try {
//       // Stop the timer
//       stopTimer();
  
//       const response = await axios.post('https://questionare-server-production.up.railway.app/api/submit-answers', { answers });
  
//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });
  
//       // Update the score
//       setScore(response.data.score);
//     } catch (error) {
//       Toast.fire({
//         icon: 'error',
//         title: 'Failed to submit answers'
//       });
//     }
//   };
//   const formatTime = (time) => {
//     const totalSeconds = timeLimit - time;
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };
//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   };
//   const currentQuestion = questions[currentQuestionIndex];
//   return (
//     <>
//       <div>
//         <h2>Question Bank</h2>
//         {!timerStarted && !isTimeUp && <button onClick={startTimer}>Start</button>}
//         {timerStarted && !isTimeUp && (
//           <>
//             <div className="timer">{formatTime(timer)}</div>
//             <div className="question-list">
//               {questions.map((question) => (
//                 <div key={question.id} className="question-item">
//                   <p className="question-text">{question.question}</p>
//                   <div className="answer-inputs">
//                     <input
//                       type="text"
//                       placeholder="Min"
//                       value={answers[question.id]?.min || ''}
//                       onChange={(event) => handleAnswerChange(question.id, 'min', event)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Max"
//                       value={answers[question.id]?.max || ''}
//                       onChange={(event) => handleAnswerChange(question.id, 'max', event)}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//               Submit
//             </button>
//           </>
//         )}
//         {isTimeUp && (
//           <div>
//             <p>Time's up! Submitting answers...</p>
//             <button onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//               Submit
//             </button>
//           </div>
//         )}
//         {!timerStarted && isTimeUp && (
//           <div>
//             <p>Time's up! You can no longer submit answers.</p>
//           </div>
//         )}
//         {timerStarted && isTimeUp && <button onClick={stopTimer}>Back</button>}
//         {!timerStarted && isTimeUp && <button onClick={stopTimer}>Back</button>}
//         {score !== null && (
//           <div>
//             <p>Your score is: {score}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Typographys;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const Typographys = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [timer, setTimer] = useState(0);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [score, setScore] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const timeLimit = 10; // Time limit in seconds (3 minutes)

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (timerStarted && !isTimeUp) {
//         setTimer((prevTimer) => prevTimer + 1);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [timerStarted, isTimeUp]);

//   useEffect(() => {
//     if (timer >= timeLimit) {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   }, [timer]);

//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-right',
//     iconColor: 'white',
//     customClass: {
//       popup: 'colored-toast'
//     },
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true
//   });

//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get('https://questionare-server-production.up.railway.app/api/random-question?num=2');
//       setQuestions(response.data.questions);
//       console.log(response);
//       setAnswers({});
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAnswerChange = (questionId, inputIndex, event) => {
//     const { value } = event.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: {
//         ...(prevAnswers[questionId] || {}),
//         [inputIndex]: value
//       }
//     }));
//   };

//   const startTimer = () => {
//     setTimer(0);
//     setTimerStarted(true);
//   };

//   const stopTimer = () => {
//     setTimerStarted(false);
//     setIsTimeUp(false);
//   };

//   const submitAnswers = async () => {
//     try {
//       // Stop the timer
//       stopTimer();

//       const response = await axios.post('https://questionare-server-production.up.railway.app/api/submit-answers', { answers });

//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });

//       // Update the score
//       setScore(response.data.score);
//     } catch (error) {
//       Toast.fire({
//         icon: 'error',
//         title: 'Failed to submit answers'
//       });
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers({});
//     setTimer(0);
//     setScore(null);
//     setCurrentQuestionIndex(0);
//     setIsTimeUp(false);
//     setTimerStarted(false);
//   };

//   const formatTime = (time) => {
//     const totalSeconds = timeLimit - time;
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <>
//       <div>
//         <h2>Question Bank</h2>
//         {!timerStarted && !isTimeUp && currentQuestionIndex === 0 && (
//           <button onClick={startTimer}>Start</button>
//         )}
//         {timerStarted && !isTimeUp && (
//           <>
//             <div className="timer">{formatTime(timer)}</div>
//             <div className="question-item">
//               <p className="question-text">{currentQuestion.question}</p>
//               <div className="answer-inputs">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   value={answers[currentQuestion.id]?.min || ''}
//                   onChange={(event) => handleAnswerChange(currentQuestion.id, 'min', event)}
//                 />
//                 <input
//                   type="number"
//                   required
//                   placeholder="Max"
//                   value={answers[currentQuestion.id]?.max || ''}
//                   onChange={(event) => handleAnswerChange(currentQuestion.id, 'max', event)}
//                 />
//               </div>
//             </div>
//             {currentQuestionIndex === questions.length - 1 ? (
//               <button onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//                 Submit
//               </button>
//             ) : (
//               <button onClick={nextQuestion}>Next</button>
//             )}
//           </>
//         )}
//         {isTimeUp && (
//           <div>
//             <p>Time's up! Submitting answers...</p>
//             <button onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//               Submit
//             </button>
//           </div>
//         )}
//         {!timerStarted && isTimeUp && (
//           <div>
//             <p>Time's up! You can no longer submit answers.</p>
//           </div>
//         )}
//         {timerStarted && isTimeUp && <button onClick={stopTimer}>Back</button>}
//         {!timerStarted && isTimeUp && <button onClick={stopTimer}>Back</button>}
//         {score !== null && (
//           <div>
//             <p>Your score is: {score}</p>
//             <button onClick={resetQuiz}>Attemp again</button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Typographys;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './color.css'; // Import the CSS file for styling

const Typographys = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const timeLimit = 10; // Time limit in seconds (3 minutes)

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStarted && !isTimeUp) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timerStarted, isTimeUp]);

  useEffect(() => {
    if (timer >= timeLimit) {
      setIsTimeUp(true);
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
      // const response = await axios.get('http://localhost:5001/api/random-question?num=2');
      const response = await axios.get('https://questionare-server-production.up.railway.app/api/random-question?num=4');
      setQuestions(response.data.questions);
      console.log(response);
      setAnswers({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerChange = (questionId, inputIndex, event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        ...(prevAnswers[questionId] || {}),
        [inputIndex]: value
      }
    }));
  };

  const startTimer = () => {
    setTimer(0);
    setTimerStarted(true);
  };

  const stopTimer = () => {
    setTimerStarted(false);
    setIsTimeUp(false);
  };

  const submitAnswers = async () => {
    try {
      // Stop the timer
      stopTimer();
      if (Object.keys(answers).length === 0) {
        Toast.fire({
          icon: 'error',
          title: 'Please provide at least one answer'
        });
        return;
      }
      const response = await axios.post('https://questionare-server-production.up.railway.app/api/submit-answers', { answers });

      Toast.fire({
        icon: 'success',
        title: response.data.message
      });

      // Update the score
      setScore(response.data.message);
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Failed to submit answers'
      });
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setTimer(0);
    setScore(null);
    setCurrentQuestionIndex(0);
    setIsTimeUp(false);
    setTimerStarted(false);
  };

  const formatTime = (time) => {
    const totalSeconds = timeLimit - time;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsTimeUp(true);
      submitAnswers();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-container">
        <h2 className="quiz-heading">Question Bank</h2>
        {!timerStarted && !isTimeUp && score == null && currentQuestionIndex === 0 && (
          <button className="quiz-button" onClick={startTimer}>Start</button>
        )}
        {timerStarted && !isTimeUp && (
          <>
            <div className="timer">{formatTime(timer)}</div>
            <div className="question-item">
              <p className="question-text">{currentQuestion.question}</p>
              <div className="answer-inputs">
                <input
                  type="number"
                  className="answer-input"
                  placeholder="Min"
                  value={answers[currentQuestion.id]?.min || ''}
                  onChange={(event) => handleAnswerChange(currentQuestion.id, 'min', event)}
                />
                <input
                  type="number"
                  className="answer-input"
                  required
                  placeholder="Max"
                  value={answers[currentQuestion.id]?.max || ''}
                  onChange={(event) => handleAnswerChange(currentQuestion.id, 'max', event)}
                />
              </div>
            </div>
            {currentQuestionIndex === questions.length - 1 ? (
              <button className="quiz-button" onClick={submitAnswers} disabled={!Object.keys(answers).length}>
                Submit
              </button>
            ) : (
              <button className="quiz-button" onClick={nextQuestion} disabled={!Object.keys(answers).length}>Next</button>
            )}
          </>
        )}
        {isTimeUp && (
          <div>
            <p>Time's up! Submitting answers...</p>
            <button className="quiz-button" onClick={submitAnswers} disabled={!Object.keys(answers).length}>
              Submit
            </button>
          </div>
        )}
        {!timerStarted && isTimeUp && (
          <div>
            <p>Time's up! You can no longer submit answers.</p>
          </div>
        )}
        {timerStarted && isTimeUp && <button className="quiz-button" onClick={stopTimer}>Back</button>}
        {!timerStarted && isTimeUp && <button className="quiz-button" onClick={stopTimer}>Back</button>}
        {score !== null && (
          <div>
            <p>{score}</p>
            <button className="quiz-button" onClick={resetQuiz}>Attempt again</button>
          </div>
        )}


      
      </div>
    </>
  );
};

export default Typographys;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import './color.css'; // Import the CSS file for styling

// const Typographys = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [timer, setTimer] = useState(0);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [score, setScore] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const timeLimit = 10; // Time limit in seconds (3 minutes)

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (timerStarted && !isTimeUp) {
//         setTimer((prevTimer) => prevTimer + 1);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [timerStarted, isTimeUp]);

//   useEffect(() => {
//     if (timer >= timeLimit) {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   }, [timer]);

//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-right',
//     iconColor: 'white',
//     customClass: {
//       popup: 'colored-toast'
//     },
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true
//   });

//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get('https://questionare-server-production.up.railway.app/api/random-question?num=4');
//       setQuestions(response.data.questions);
//       setAnswers({});
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAnswerChange = (questionId, inputIndex, event) => {
//     const { value } = event.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: {
//         ...(prevAnswers[questionId] || {}),
//         [inputIndex]: value
//       }
//     }));
//   };

//   const startTimer = () => {
//     setTimer(0);
//     setTimerStarted(true);
//   };

//   const stopTimer = () => {
//     setTimerStarted(false);
//     setIsTimeUp(false);
//   };

//   const submitAnswers = async () => {
//     try {
//       stopTimer();

//       // Check if any answers are provided
//       if (Object.keys(answers).length === 0) {
//         Toast.fire({
//           icon: 'error',
//           title: 'Please provide at least one answer'
//         });
//         return;
//       }

//       const response = await axios.post('https://questionare-server-production.up.railway.app/api/submit-answers', { answers });

//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });

//       setScore(response.data.message);
//     } catch (error) {
//       Toast.fire({
//         icon: 'error',
//         title: 'Failed to submit answers'
//       });
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers({});
//     setTimer(0);
//     setScore(null);
//     setCurrentQuestionIndex(0);
//     setIsTimeUp(false);
//     setTimerStarted(false);
//   };

//   const formatTime = (time) => {
//     const totalSeconds = timeLimit - time;
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setIsTimeUp(true);
//       submitAnswers();
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <>
//       <div className="quiz-container">
//         <h2 className="quiz-heading">Question Bank</h2>
//         {!timerStarted && !isTimeUp && currentQuestionIndex === 0 && (
//           <button className="quiz-button" onClick={startTimer}>Start</button>
//         )}
//         {timerStarted && !isTimeUp && (
//           <>
//             <div className="timer">{formatTime(timer)}</div>
//             <div className="question-item">
//               <p className="question-text">{currentQuestion?.question}</p>
//               <div className="answer-inputs">
//                 <input
//                   type="number"
//                   className="answer-input"
//                   placeholder="Min"
//                   value={answers[currentQuestion?.id]?.min || ''}
//                   onChange={(event) => handleAnswerChange(currentQuestion?.id, 'min', event)}
//                 />
//                 <input
//                   type="number"
//                   className="answer-input"
//                   required
//                   placeholder="Max"
//                   value={answers[currentQuestion?.id]?.max || ''}
//                   onChange={(event) => handleAnswerChange(currentQuestion?.id, 'max', event)}
//                 />
//               </div>
//             </div>
//             {currentQuestionIndex === questions.length - 1 ? (
//               <button className="quiz-button" onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//                 Submit
//               </button>
//             ) : (
//               <button className="quiz-button" onClick={nextQuestion} disabled={!Object.keys(answers).length}>
//                 Next
//               </button>
//             )}
//           </>
//         )}
//         {isTimeUp && (
//           <div>
//             <p>Time's up! Submitting answers...</p>
//             <button className="quiz-button" onClick={submitAnswers} disabled={!Object.keys(answers).length}>
//               Submit
//             </button>
//           </div>
//         )}
//         {!timerStarted && isTimeUp && (
//           <div>
//             <p>Time's up! You can no longer submit answers.</p>
//           </div>
//         )}
//         {(timerStarted || isTimeUp) && (
//           <button className="quiz-button" onClick={stopTimer}>Back</button>
//         )}
//         {score !== null && (
//           <div>
//             <p>{score}</p>
//             <button className="quiz-button" onClick={resetQuiz}>Attempt again</button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Typographys;
