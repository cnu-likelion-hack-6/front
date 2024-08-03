import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/Filter.css';

import Button from '../components/Button';

function Filter() {
  const navigate = useNavigate();
  
  const [ageRange, setAgeRange] = useState([18, 39]);
  const [genderPreference, setGenderPreference] = useState("");
  const [yearRange, setYearRange] = useState({ start: "", end: "" });
  const [differentDepartment, setDifferentDepartment] = useState("");

  const handleNextClick = () => {
    const filterData = {
      minAge: ageRange[0],
      maxAge: ageRange[1],
      genderCondition: genderPreference === "same" ? "ONLY_SAME" : "BOTH",
      minGrade: +yearRange.start,
      maxGrade: +yearRange.end,
      departmentCondition: differentDepartment === "yes" ? "BOTH" : "ONLY_SAME"
    };

    fetch('http://54.80.162.117:8080/filters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(filterData),
    })
    .then(result => {
      console.log("Filter settings saved:", result);
      console.log('filterData: ', filterData);
      navigate("/Main");  
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
    });
  };

  return (
    <div className="Profile">
      <div className='Profile_title_wrapper'>
        <p className='Profile_title'>검색필터 설정</p>
        <p className='Profile_title_1'>원하는 조건을 설정해 주세요</p>
        <p className='Profile_title_1'>필터를 바탕으로 랜덤 매칭 됩니다</p>
      </div>

      <div className='filter-age'>
        <p className='filter-text'>나이범위</p>
        <Slider
          range
          min={18}
          max={39}
          defaultValue={ageRange}
          onAfterChange={(value) => setAgeRange(value)}
          marks={{ 18: "18살", 39: "39살" }}
          tooltip={{
            visible: true,
            placement: "top",
            formatter: value => `${value}살`
          }}
        />
        <div className="age-range-display">
          <span>{ageRange[0]}살</span>
          <span> ~ </span>
          <span>{ageRange[1]}살</span>
        </div>
      </div>

      <div className='filter-gender'>
        <p className='filter-text'>성별</p>
        <div className="button-group">
          <Button
            onClick={() => setGenderPreference("same")}
            isActive={genderPreference === "same"}
          >
            동성만 하고 싶어요
          </Button>
          <Button
            onClick={() => setGenderPreference("any")}
            isActive={genderPreference === "any"}
          >
            상관없어요
          </Button>
        </div>
      </div>
      
      <div className='filter-classOf'>
        <p className='filter-text'>학년 범위</p>
        <div className="year-range">
          <input
            type="text"
            placeholder="예) 1"
            value={yearRange.start}
            onChange={(e) => setYearRange({ ...yearRange, start: e.target.value })}
            className="underline-input"
          />
          <span> ~ </span>
          <input
            type="text"
            placeholder="예) 4"
            value={yearRange.end}
            onChange={(e) => setYearRange({ ...yearRange, end: e.target.value })}
            className="underline-input"
          />
        </div>`
      </div>
      
      <div className='filter-group'>
        <p className='filter-text'>다른 학과 사람과 만나도 괜찮아요</p>
        <div className="button-group-dif">
          <Button
            onClick={() => setDifferentDepartment("yes")}
            isActive={differentDepartment === "yes"}
          >
            예
          </Button>
          <Button
            onClick={() => setDifferentDepartment("no")}
            isActive={differentDepartment === "no"}
          >
            아니오
          </Button>
        </div>
      </div>

      <div className="next-button-container">
        <Button
          onClick={handleNextClick}
          isActive={genderPreference && differentDepartment}
          isNextButton={true}
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}

export default Filter;
