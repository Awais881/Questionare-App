
// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import Swal from "sweetalert2";
// import "./question.css";

// const AddQuestion = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [csvFile, setCsvFile] = useState(null);

//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-right",
//     iconColor: "white",
//     customClass: {
//       popup: "colored-toast",
//     },
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//   });

//   // const addQuestions = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     // Add manual question
//   //     if (question.trim() !== "" && answer.trim() !== "") {
//   //       await addQuestion(question, answer);
//   //     }

//   //     // Process CSV file data
//   //     if (csvFile) {
//   //       const fileData = await parseCsvFile(csvFile);
//   //       if (fileData.length > 0) {
//   //         await addQuestionsFromCsv(fileData);
//   //       }
//   //     }

//   //     Toast.fire({
//   //       icon: "success",
//   //       title: "Questions added successfully",
//   //     });

//   //     // Clear form fields
//   //     setQuestion("");
//   //     setAnswer("");
//   //     setCsvFile(null);
//   //   } catch (err) {
//   //     Toast.fire({
//   //       icon: "error",
//   //       title: "Failed to add questions",
//   //     });
//   //     console.log("Error adding questions:", err);
//   //   }
//   // };
//   const addQuestions = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Add manual question
//       if (question.trim() !== "" && answer.trim() !== "") {
//         await addQuestion(question, answer);
//       }
  
//       // Process CSV file data
//       if (csvFile) {
//         const fileData = await parseCsvFile(csvFile);
//         if (fileData.length > 0) {
//           await addQuestionsFromCsv(fileData);
//         }
//       }
  
//       Toast.fire({
//         icon: "success",
//         title: "Questions added successfully",
//       });
  
//       // Clear form fields
//       setQuestion("");
//       setAnswer("");
//       setCsvFile(null);
//     } catch (err) {
//       Toast.fire({
//         icon: "error",
//         title: "Failed to add questions",
//       });
//       console.log("Error adding questions:", err);
//     }
//   };
  
//   const parseCsvFile = (file) => {
//     return new Promise((resolve, reject) => {
//       Papa.parse(file, {
//         complete: (results) => {
//           resolve(results.data);
//         },
//         error: (error) => {
//           reject(error);
//         },
//       });
//     });
//   };

//   const addQuestionsFromCsv = async (fileData) => {
//     for (const data of fileData) {
//       const [question, answer] = data;
//       if (question.trim() !== "" && answer.trim() !== "") {
//         await addQuestion(question, answer);
//       }
//     }
//   };

//   const addQuestion = async (question, answer) => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/question", {
//         question,
//         answer,
//       });

//       console.log("Saved successful:", response.data);
//     } catch (err) {
//       console.log("Error adding question:", err);
//       throw err;
//     }
//   };

//   const handleCsvFileChange = (e) => {
//     const file = e.target.files[0];
//     setCsvFile(file);
//   };

//   return (
//     <div className="form-container">
//       <h2>Add Question</h2>
//       <form className="form" onSubmit={addQuestions}>
//         <div className="form-group">
//           <label htmlFor="question">Question:</label>
//           <textarea
//             id="question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             // required
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="answer">Answer:</label>
//           <input
//             type="number"
//             id="answer"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             // required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="csvFile">Upload CSV file:</label>
//           <input
//             type="file"
//             id="csvFile"
//             accept=".csv"
//             onChange={handleCsvFileChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestion;



// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import Swal from "sweetalert2";
// import "./question.css";

// const AddQuestion = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [csvFile, setCsvFile] = useState(null);

//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-right",
//     iconColor: "white",
//     customClass: {
//       popup: "colored-toast",
//     },
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//   });

//   const addQuestions = async (e) => {
//     e.preventDefault();

//     try {
//       if (question.trim() !== "" && answer.trim() !== "") {
//         await addQuestion(question, answer);
//       }

//       if (csvFile) {
//         const fileData = await parseCsvFile(csvFile);
//         if (fileData.length > 0) {
//           await addQuestionsFromCsv(fileData);
//         }
//       }

//       Toast.fire({
//         icon: "success",
//         title: "Questions added successfully",
//       });

//       setQuestion("");
//       setAnswer("");
//       setCsvFile(null);
//     } catch (err) {
//       Toast.fire({
//         icon: "error",
//         title: "Failed to add questions",
//       });
//       console.log("Error adding questions:", err);
//     }
//   };

//   const parseCsvFile = (file) => {
//     return new Promise((resolve, reject) => {
//       Papa.parse(file, {
//         complete: (results) => {
//           resolve(results.data);
//         },
//         error: (error) => {
//           reject(error);
//         },
//       });
//     });
//   };

//   const addQuestionsFromCsv = async (fileData) => {
//     for (const data of fileData) {
//       const [question, answer] = data;
//       if (question.trim() !== "" && answer.trim() !== "") {
//         await addQuestion(question, answer);
//       }
//     }
//   };

//   const addQuestion = async (question, answer) => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/question", {
//         question,
//         answer,
//       });

//       console.log("Saved successful:", response.data);
//     } catch (err) {
//       console.log("Error adding question:", err);
//       throw err;
//     }
//   };

//   const handleCsvFileChange = (e) => {
//     const file = e.target.files[0];
//     setCsvFile(file);
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2>Add Question</h2>
//         <form className="form" onSubmit={addQuestions}>
//           <div className="form-group">
//             <label className="label" htmlFor="question">
//               Question:
//             </label>
//             <textarea
//               className="input"
//               id="question"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//             ></textarea>
//           </div>
//           <div className="form-group">
//             <label className="label" htmlFor="answer">
//               Answer:
//             </label>
//             <input
//               className="input"
//               type="number"
//               id="answer"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label className="label" htmlFor="csvFile">
//               Upload CSV file:
//             </label>
//             <label className="file-label" htmlFor="csvFile">
//               Select File
//             </label>
//             <input
//               className="file-input"
//               type="file"
//               id="csvFile"
//               accept=".csv"
//               onChange={handleCsvFileChange}
//             />
//           </div>
//           <button className="submit-button" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddQuestion;










import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import Swal from "sweetalert2";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const addQuestions = async (e) => {
    e.preventDefault();

    try {
      if (question.trim() !== "" && answer.trim() !== "") {
        await addQuestion(question, answer);
      }

      if (csvFile) {
        const fileData = await parseCsvFile(csvFile);
        if (fileData.length > 0) {
          await addQuestionsFromCsv(fileData);
        }
      }

      Toast.fire({
        icon: "success",
        title: "Questions added successfully",
      });

      setQuestion("");
      setAnswer("");
      setCsvFile(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to add questions";
      Toast.fire({
        icon: "error",
        title: errorMessage
      });
      console.log("Error adding questions:", err);
    }
  };

  const parseCsvFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const addQuestionsFromCsv = async (fileData) => {
    for (const data of fileData) {
      const [question, answer] = data;
      if (question.trim() !== "" && answer.trim() !== "") {
        await addQuestion(question, answer);
      }
    }
  };

  const addQuestion = async (question, answer) => {
    try {
      const response = await axios.post("https://questionare-server-production.up.railway.app/api/question", {
        question,
        answer,
      });

      console.log("Saved successful:", response.data);
    } catch (err) {
      console.log("Error adding question:", err);
      throw err;
    }
  };

  const handleCsvFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Add Question</h2>
          <form onSubmit={addQuestions}>
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question:
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="form-control"
                rows="3"
                
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Answer:
              </label>
              <input
                type="number"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
               
              />
            </div>
            <div className="mb-3">
              <label htmlFor="csvFile" className="form-label">
                Upload CSV file:
              </label>
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                onChange={handleCsvFileChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
