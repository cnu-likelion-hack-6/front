import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/SignUp1.css";

import logo from "../images/logo.png"
import Input from "../components/Input";

function SignUp1() {
  const navigate = useNavigate();
  
  const [ phone, setPhone ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  const [ isPasswordMatch, setIsPasswordMatch ] = useState(true);
  const [ nextPage, setNextPage ] = useState('회원 가입하기');

  const signUp = () => {
    fetch('http://54.80.162.117:8080/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone,
        password: password
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log("결과 : ", result);
        if (result.message === "이미 존재하는 전화번호입니다.") {
          alert('이미 존재하는 전화번호입니다.');
        } else {
          alert('회원가입 성공');
          localStorage.setItem('accessToken', result.accessToken);
          navigate('/KakaoId');
        }
      })
  };

  const handleNextStep = () => {
    if (phone === "" || password === "" || confirmPassword === "") {
      setNextPage('모든 정보를 입력해주세요');
      setIsPasswordMatch(false);
      return;
    }
    if (password !== confirmPassword) {
      setNextPage('정보를 올바르게 입력해주세요')
      setIsPasswordMatch(false)
    } 
    setIsPasswordMatch(true);
    signUp();
    setNextPage('다음 단계');
  };

  return(
    <div className="signUp1">

      <div className="signUp_container">
        <div className="signUp_title">
          <p className="signUp_title_1">반갑습니다!</p>
          <div className="signUp_logo">
            <img className="signUp_title_logo" src={logo} />  
            <p className="signUp_title_2">의 회원이 되어주세요</p>
          </div>
        </div>

        <div className="signUp_input_wrapper">
          
          <Input 
            title={"전화번호"} 
            value={ phone }
            onChange={ setPhone }
          />
          <Input 
            title={"비밀번호"} 
            value={ password }
            type="password"
            onChange={ setPassword }
          />
          <Input 
            title={"비밀번호 확인"}
            value={ confirmPassword }
            type="password"
            onChange={ setConfirmPassword } 
          />
        </div>
      </div>

      <div className="signUp1_login">
        <p className="signUp1_login_text">이미 회원이신가요?</p>
        <Link 
          to={`/signUp2`}
          className="signUp1_login_page"
        >로그인하기</Link>
      </div>

      <button 
        onClick={ handleNextStep }
        className={`next_page ${!isPasswordMatch ? 'error' : ''}`}
      >{ nextPage }</button>

    </div>
  );
}

export default SignUp1;