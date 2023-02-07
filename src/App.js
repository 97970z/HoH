import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import AskQuestion from "./components/AskQuestion";
import AnswerQuestion from "./components/AnswerQuestion";
import "./components/css/index.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleQuestionSelection = (question) => {
    setSelectedQuestion(question);
    setCurrentPage("question-detail");
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigation} />
      {currentPage === "home" && <Home />}
      {currentPage === "ask-question" && (
        <AskQuestion onNavigate={handleNavigation} />
      )}
      {currentPage === "answer-question" && (
        <AnswerQuestion onQuestionSelect={handleQuestionSelection} />
      )}
    </div>
  );
}

export default App;
