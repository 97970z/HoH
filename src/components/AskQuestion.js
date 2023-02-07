import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const QuestionStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
};

const textareaStyle = {
  width: "300px",
  height: "100px",
  resize: "none",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  padding: "0.375rem 0.75rem",
  marginTop: "10px",
};

const Style = {
  width: "300px",
  height: "30px",
  resize: "none",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  padding: "0.375rem 0.75rem",
  marginTop: "10px",
  marginBottom: "10px",
};

const ButtonStyle = {
  width: "100px",
  height: "30px",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  padding: "0.375rem 0.75rem",
};

const ButtonFormStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
};

const AskQuestion = ({ onNavigate }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [genre, setGenre] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  let date = new Date();
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(date.getTime() - offset);
  let dateOffsetString = dateOffset.toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    const newQuestion = {
      title,
      question,
      genre,
      time,
      dueDate,
      nickname,
      password,
    };
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    localStorage.setItem(
      "questions",
      JSON.stringify([...questions, newQuestion])
    );
    setTitle("");
    setQuestion("");
    setGenre("");
    setDueDate("");
    setNickname("");
    setPassword("");
  };

  const handleGoingBack = () => {
    window.location.href = "/";
  };

  return (
    <Container className="py-5" style={QuestionStyle}>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                제목
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요."
                  minLength="5"
                  maxLength="50"
                  style={Style}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="question" as={Row}>
              <Form.Label column sm={2}>
                질문
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="질문을 입력하세요."
                  style={textareaStyle}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                종류
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  name="genre"
                  onChange={(e) => setGenre(e.target.value)}
                  style={Style}
                  required
                >
                  <option value="">질문 종류를 선택하세요.</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                만료일
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  name="dueDate"
                  onChange={(e) => setDueDate(e.target.value)}
                  min={dateOffsetString}
                  style={Style}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                작성자
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="작성자 이름을 입력하세요."
                  minLength="3"
                  maxLength="10"
                  style={Style}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                비밀번호
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요."
                  style={Style}
                  required
                />
              </Col>
            </Form.Group>
            <Row style={ButtonFormStyle}>
              <Button
                className="backBtn"
                variant="primary"
                onClick={handleGoingBack}
                style={ButtonStyle}
              >
                ← 홈으로
              </Button>
              <Button
                className="submitBtn"
                variant="primary"
                type="submit"
                onClick={handleGoingBack}
                style={ButtonStyle}
              >
                작성 →
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AskQuestion;
