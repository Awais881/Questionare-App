// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { GlobalContext } from '../../../context/context';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import './addquestion.css'
// const Typographys = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [updateQuestionId, setUpdateQuestionId] = useState('');
//   const [updatedQuestion, setUpdatedQuestion] = useState('');
//   const [updatedAnswer, setUpdatedAnswer] = useState('');
//   const [open, setOpen] = useState(false);

//   const { state, dispatch } = useContext(GlobalContext);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

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
//       const response = await axios.get('http://localhost:5001/api/questions');
//       setQuestions(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addQuestion = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5001/api/question', {
//         question: question,
//         answer: answer
//       });

//       setQuestion('');
//       setAnswer('');
//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });
//       fetchQuestions();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteQuestion = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5001/api/question/${id}`);
//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });
//       fetchQuestions();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const showUpdateForm = (id, question, answer) => {
//     setUpdateQuestionId(id);
//     setUpdatedQuestion(question);
//     setUpdatedAnswer(answer);
//     setOpen(true);
//   };

//   const updateQuestion = async () => {
//     try {
//       const response = await axios.put(`http://localhost:5001/api/question/${updateQuestionId}`, {
//         question: updatedQuestion,
//         answer: updatedAnswer
//       });

//       setOpen(false);
//       setUpdateQuestionId('');
//       setUpdatedQuestion('');
//       setUpdatedAnswer('');
//       Toast.fire({
//         icon: 'success',
//         title: response.data.message
//       });
//       fetchQuestions();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
  
//   return (
//     <>
//       <div>
//         <h2>Questions</h2>
//         <Link to="/theme/addQuestion">
//           <button className='add-question'>Add New Question</button> 
//         </Link>
        
      
//         <table className="question-table">
//           <thead>
//             <tr>
//               <th>Question</th>
//               <th>Answer</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {questions.map((question) => (
//               <tr key={question._id}>
//                 <td>{question.question}</td>
//                 <td>{question.answer}</td>
//                 <td>
//                   <button onClick={() => showUpdateForm(question._id, question.question, question.answer)} className='update-button'>
//                     Update
//                   </button>
//                   <button onClick={() => deleteQuestion(question._id)} className='delete-button'>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//   <Box sx={{ ...style, width: '50%' }}>
//     <Typography id="modal-modal-title" variant="h6" component="h2">
//       Update Question
//     </Typography>
//     <div className="form-group">
//       <label htmlFor="updatedQuestion">Question:</label>
//       <input
//         type="text"
//         id="updatedQuestion"
//         value={updatedQuestion}
//         onChange={(e) => setUpdatedQuestion(e.target.value)}
//         className="form-input"
//       /> <br />
//     </div>
//     <div className="form-group">
//       <label htmlFor="updatedAnswer">Answer:</label>
//       <input
//         type="text"
//         id="updatedAnswer"
//         value={updatedAnswer}
//         onChange={(e) => setUpdatedAnswer(e.target.value)}
//         className="form-input"
//       />
//     </div>
//     <Button onClick={updateQuestion} className="save-button">
//       Save
//     </Button>
//   </Box>
// </Modal>

//     </>
//   );
// };

// export default Typographys;






import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../../context/context';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './addquestion.css';
import ReactPaginate from 'react-paginate';

const Typographys = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [updateQuestionId, setUpdateQuestionId] = useState('');
  const [updatedQuestion, setUpdatedQuestion] = useState('');
  const [updatedAnswer, setUpdatedAnswer] = useState('');
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); // Number of questions per page

  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchQuestions();
  }, []);

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
      const response = await axios.get('https://localhost:5001/api/questions');
      // const response = await axios.get('https://questionare-server-production.up.railway.app/api/questions');
      setQuestions(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/question', {
        question: question,
        answer: answer
      });

      setQuestion('');
      setAnswer('');
      Toast.fire({
        icon: 'success',
        title: response.data.message
      });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/question/${id}`);
      Toast.fire({
        icon: 'success',
        title: response.data.message
      });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const showUpdateForm = (id, question, answer) => {
    setUpdateQuestionId(id);
    setUpdatedQuestion(question);
    setUpdatedAnswer(answer);
    setOpen(true);
  };

  const updateQuestion = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/question/${updateQuestionId}`, {
        question: updatedQuestion,
        answer: updatedAnswer
      });

      setOpen(false);
      setUpdateQuestionId('');
      setUpdatedQuestion('');
      setUpdatedAnswer('');
      Toast.fire({
        icon: 'success',
        title: response.data.message
      });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(questions.length / perPage);
  const paginatedQuestions = questions.slice(offset, offset + perPage);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <>
      <div>
        <h2>Questions</h2>
        <Link to="/theme/addQuestion">
          <button className="add-question">Add New Question</button>
        </Link>

        <table className="question-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQuestions.map((question) => (
              <tr key={question._id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                  <button onClick={() => showUpdateForm(question._id, question.question, question.answer)} className="update-button">
                    Update
                  </button>
                  <button onClick={() => deleteQuestion(question._id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          previousClassName={'pagination-button'}
          nextClassName={'pagination-button'}
          disabledClassName={'pagination-disabled'}
        />
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ ...modalStyle, width: '50%' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Question
          </Typography>
          <div className="form-group">
            <label htmlFor="updatedQuestion">Question:</label>
            <input
              type="text"
              id="updatedQuestion"
              value={updatedQuestion}
              onChange={(e) => setUpdatedQuestion(e.target.value)}
              className="form-input"
            />{' '}
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="updatedAnswer">Answer:</label>
            <input
              type="text"
              id="updatedAnswer"
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
              className="form-input"
            />
          </div>
          <Button onClick={updateQuestion} className="save-button">
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Typographys;
