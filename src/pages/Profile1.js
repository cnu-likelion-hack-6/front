import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Profile1.css';

import Input from '../components/Input';
import Input2 from '../components/Input2';

function Profile1({ setProfileData }) {
  const navigate = useNavigate();
  
  const [ name, setName ] = useState('');               // 이름
  const [ gender, setGender ] = useState('');           // 성별
  const [ department, setDepartment ] = useState('');   // 소속 학과
  const [ classOf, setClassOf ] = useState('');         // 학번
  const [ studentStatus, setStudentStatus ] = useState(''); // 상태
  const [ grade, setGrade ] = useState('');             // 학년  
  const [ age, setAge ] = useState('');                 // 나이

  const [ nextPage, setNextPage ] = useState('다음 단계');
  const [ isError, setIsError ] = useState(false);

  const handleNext = () => {
    if (name === "" || gender === "" || department === "" || classOf === "" || studentStatus === "" || grade === "" || age === ""){
      setNextPage('모든 정보를 입력해주세요');
      setIsError(true);
      return;
    }
    setIsError(false);
    setNextPage('다음 단계');
    handleData();

    navigate('/Profile2');
  }
  
  const handleData = () => {
    localStorage.setItem('profileName', name);

    setProfileData(prevData => ({
      ...prevData,
      name, 
      gender,
      department,
      classOf,
      studentStatus,
      grade,
      age,
    }));
  }

  return(
    <div className="Profile">

      <div className="Profile_title_wrapper">
        <p className="Profile_title">프로필을 설정해 주세요</p>
        <p className="Profile_title_1">랜덤 매칭되는 상대방에게 뜨는 기본 정보예요</p>
      </div>

      <div className="Profile1_input_wrapper">
        <Input 
          title={"이름"} 
          value={name}
          onChange={setName}
        />

        <div className="input">
          <div className="input_wrapper">
            <p className="input_title">성별</p>
            <div className="input_button_container">
            <button 
                className={`input_button ${gender === 'GIRL' ? 'active' : ''}`} 
                onClick={() => setGender('GIRL')}
              >
                여성
              </button>
              <button 
                className={`input_button ${gender === 'MAN' ? 'active' : ''}`} 
                onClick={() => setGender('MAN')}
              >
                남성
              </button>
            </div>
          </div>
        </div>

        <div className="input">
          <div className="input_wrapper">
            <div className="input_title_wrapper">
              <p className="input_title">소속 학과</p>
              <p className="input_explain">학과 명칭을 정확하게 입력해 주세요</p>
            </div>
            <input 
              className="input_container" 
              placeholder="예) 컴퓨터융합학부" 
              value={department}
              onChange={((e) => setDepartment(e.target.value))}
            />
          </div>
        </div>

        <div className="input2">
          <Input2 
            title={"학번"} 
            value={classOf}
            onChange={setClassOf}
          />

          <div className="input_wrapper">
            <p className="input_title">상태</p>
            <form>
              <select 
                className="input2_container"
                value={studentStatus}
                onChange={e => setStudentStatus(e.target.value)}
              > 
                <option value=""></option>
                <option value="CURRENT">재학생</option>
                <option value="LEAVE_OF_ABSENCE">휴학생</option>
                <option value="GRADUATION">졸업생</option>
              </select>
            </form>
          </div>

          <Input2 
            title={"학년"} 
            value={grade}
            onChange={setGrade}
          />
          <Input2 
            title={"나이"} 
            value={age}
            onChange={setAge}
          />
        </div>

      </div>

      <button 
        className={`next_page ${isError ? 'error' : ''}`}
        onClick={handleNext}
      >{nextPage}</button>
    </div>
  );
}

export default Profile1;