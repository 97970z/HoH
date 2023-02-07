import React from "react";

const HomeStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
};

const Home = () => {
  return (
    <div className="home" style={HomeStyle}>
      <h1>과제 업로드 및 솔루션 사이트에 오신 것을 환영합니다!</h1>
      <p>
        이 웹사이트에서는 과제를 업로드하고 다른 사용자로부터 솔루션을 얻을 수
        있습니다. 다른 사용자가 게시한 질문에 답변할 수도 있습니다.
      </p>
    </div>
  );
};

export default Home;
