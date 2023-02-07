import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";

const listGroupStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingRight: "20px",
  paddingLeft: "20px",
};

const titleStyle = {
  minWidth: "170px",
  textAlign: "center",
};

const dateStyle = {
  minWidth: "100px",
  textAlign: "center",
};

const authorStyle = {
  alignItems: "start",
  textAlign: "start",
};

const answerFormStyle = {
  display: "flex",
  width: "360px",
  flexDirection: "column",
  marginTop: "30px",
};

const answerTextStyle = {
  width: "100%",
  height: "100px",
  resize: "none",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  padding: "0.375rem 0.75rem",
  marginTop: "10px",
};

const buttonStyle = {
  width: "100px",
  height: "30px",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  padding: "0.375rem 0.75rem",
  marginTop: "10px",
  marginBottom: "10px",
  marginRight: "10px",
};

const pwInput = {
  width: "70px",
  height: "15px",
  marginRight: "5px",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  padding: "0.375rem 0.75rem",
};

const AnswerQuestion = () => {
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [displayCount, setDisplayCount] = useState(7);

  const handleMoreClick = () => {
    setDisplayCount(displayCount + 7);
  };

  const handleCheck = (question) => {
    if (selectedQuestion.title === question.title) {
      setSelectedQuestion({});
      setShowAnswerForm(false);
    } else {
      setSelectedQuestion(question);
      setShowAnswerForm(true);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const newQuestions = [...questions];
    const index = newQuestions.findIndex(
      (q) => q.title === selectedQuestion.title
    );

    if (newQuestions[index].answer) {
      newQuestions[index].answer = [
        ...newQuestions[index].answer,
        e.target.answer.value,
      ];
    } else {
      newQuestions[index].answer = [e.target.answer.value];
    }

    setQuestions(newQuestions);
    localStorage.setItem("questions", JSON.stringify(newQuestions));
    setAnswers([...answers, selectedQuestion.answer]);
    setShowAnswerForm(false);
  };

  const handleDeleteClick = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDeleteQuestion = (question) => {
    if (password === question.password) {
      const newQuestions = questions.filter((q) => q.title !== question.title);
      setQuestions(newQuestions);
      localStorage.setItem("questions", JSON.stringify(newQuestions));
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <ListGroup>
            {questions.slice(0, displayCount).map((question) => (
              <ListGroup.Item
                key={question.title}
                className="d-flex justify-content-between align-items-center"
              >
                <div style={listGroupStyle}>
                  <Form.Check
                    type="checkbox"
                    id={`default-checkbox`}
                    onClick={() => handleCheck(question)}
                  />
                  <h3 style={titleStyle}>
                    {question.title.length > 10
                      ? question.title.substring(0, 10) + ".."
                      : question.title}{" "}
                    ({question.answer ? question.answer.length : 0})
                  </h3>
                  <p>{question.genre}</p>
                  <p style={dateStyle}>{question.dueDate}</p>
                  <p style={authorStyle}>
                    {question.nickname.length > 3
                      ? question.nickname.substring(0, 3) + ".."
                      : question.nickname}{" "}
                  </p>
                </div>
              </ListGroup.Item>
            ))}
            {questions.length > displayCount && (
              <Button onClick={handleMoreClick}>More</Button>
            )}
          </ListGroup>
        </Col>
      </Row>
      <hr></hr>
      {selectedQuestion && (
        <Row className="py-5">
          <Col>
            <h2>답변하고 싶은 질문을 선택하세요. 아래에 표시됩니다!</h2>
            <hr></hr>
            <h3>제목 : {selectedQuestion.title}</h3>
            <p>내용 : {selectedQuestion.question}</p>
            {selectedQuestion.answer &&
              selectedQuestion.answer.map((answer) => (
                <p key={answer}>답변 : {answer}</p>
              ))}
            {showAnswerForm && (
              <>
                <hr></hr>
                <h3>답변을 입력하세요.</h3>
                <p>
                  Delete 버튼을 누르고 비밀번호를 입력하면 질문을 삭제할 수
                  있습니다.
                </p>
              </>
            )}
            <Form onSubmit={handleAnswerSubmit} style={answerFormStyle}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="answer"
                  style={answerTextStyle}
                  required
                />
              </Form.Group>
              <Col>
                <Button type="submit" style={buttonStyle}>
                  Submit
                </Button>
                {showPasswordInput ? (
                  <>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Password"
                      style={pwInput}
                    />
                    <Button
                      onClick={() => handleDeleteQuestion(selectedQuestion)}
                      style={buttonStyle}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleDeleteClick} style={buttonStyle}>
                    Delete
                  </Button>
                )}
              </Col>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AnswerQuestion;
