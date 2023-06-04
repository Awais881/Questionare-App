import React, { useState, useEffect, useContext } from "react";
import "./dashboard.css";
import axios from "axios";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";

import avatar1 from "src/assets/images/avatars/1.jpg";
import avatar2 from "src/assets/images/avatars/2.jpg";
import avatar3 from "src/assets/images/avatars/3.jpg";
import avatar4 from "src/assets/images/avatars/4.jpg";
import avatar5 from "src/assets/images/avatars/5.jpg";
import avatar6 from "src/assets/images/avatars/6.jpg";
import { GlobalContext } from "../../context/context";
import WidgetsBrand from "../widgets/WidgetsBrand";
import WidgetsDropdown from "../widgets/WidgetsDropdown";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [updateQuestionId, setUpdateQuestionId] = useState('');
  const [updatedQuestion, setUpdatedQuestion] = useState('');
  const [updatedAnswer, setUpdatedAnswer] = useState('');
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    // fetchQuestions();
    getUser();
  }, []);



  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      console.log("response", response.data);
      dispatch({
        type: 'USER_LOGIN',
        payload: response.data[0]
       
    
    })
    console.log("State" ,state);
    } catch (error) {
   
      // Handle error
    }
  };


  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };


  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/question/${id}`);
      fetchQuestions(); // Refresh the question list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const showUpdateForm = (id, question, answer) => {
    setUpdateQuestionId(id);
    setUpdatedQuestion(question);
    setUpdatedAnswer(answer);
  };

  const updateQuestion = async () => {
    try {
      await axios.put(`http://localhost:5001/api/question/${updateQuestionId}`, {
        question: updatedQuestion,
        answer: updatedAnswer
      });
      fetchQuestions(); // Refresh the question list after update
      setUpdateQuestionId('');
      setUpdatedQuestion('');
      setUpdatedAnswer('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5001/api/question/${questionId}`);
      // Remove the deleted question from the questions state
      setQuestions(questions.filter((question) => question._id !== questionId));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

 
  return (
    <>
{/* <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            {updateQuestionId === question._id ? (
              <div>
                <input
                  type="text"
                  value={updatedQuestion}
                  onChange={(e) => setUpdatedQuestion(e.target.value)}
                />
                <input
                  type="text"
                  value={updatedAnswer}
                  onChange={(e) => setUpdatedAnswer(e.target.value)}
                />
                <button onClick={updateQuestion}>Save</button>
              </div>
            ) : (
              <div>
                <div>{question.question}</div>
                <div>{question.answer}</div>
                <button onClick={() => deleteQuestion(question._id)}>Delete</button>
                <button onClick={() => showUpdateForm(question._id, question.question, question.answer)}>
                  Update
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div> */}

      {/* <table className="question-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>
                {editQuestion === question._id ? (
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => {
                      const updatedQuestion = {
                        ...question,
                        question: e.target.value,
                      };
                      handleSave(question._id, updatedQuestion);
                    }}
                  />
                ) : (
                  question.question
                )}
              </td>
              <td>
                {editQuestion === question._id ? (
                  <>
                    <input
                      type="number"
                      value={startRange}
                      placeholder="From"
                      onChange={(e) => setStartRange(e.target.value)}
                    />
                    <span> - </span>
                    <input
                      type="number"
                      value={endRange}
                      placeholder="To"
                      onChange={(e) => setEndRange(e.target.value)}
                    />
                  </>
                ) : (
                 
                  ` ${question.answer}`
                )}
              </td>
              <td>
                {editQuestion === question._id ? (
                  <button
                    onClick={() => {
                      const updatedQuestion = {
                        ...question,
                        answer: {
                          start: startRange,
                          end: endRange,
                        },
                      };
                      handleSave(question._id, updatedQuestion);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleUpdate(
                          question._id,
                          question.answer?.start,
                          question.answer?.end
                        )
                      }
                      className="update-button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(question._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* 
<table className="question-table">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question._id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
            <button onClick={() => handleUpdate(question._id, { question: 'Updated Question', answer: 'Updated Answer' })}>
            Update
              </button>
              <button className="delete-button" onClick={() => handleDelete(question._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table> */}

      {/* <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  );
};

export default Dashboard;


{/* <Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2">
    Text in a modal
  </Typography>
  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  </Typography>
</Box>
</Modal> */}