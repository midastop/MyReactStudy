// 폼 샘플 예제03 - 폼이 전송될 때 유효성 검사01
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from "react";

export default function FormTest03() {

  // 폼의 여러 입력 값을 하나의 useState()로 다루는 경우
  const [values, setValues] = useState({
    name: "",
    birth: "",
    grade: "",
    aboutMe: ""
  });

  // 유효성 검사 오류 메시지를 하나의 useState()로 다루는 경우
  const [errors, setErrors] = useState({
    name: "",
    birth: "",
    grade: "",
    aboutMe: ""
  });

  // 값이 변경되면 변경된 값으로 화면에 표시하는 이벤트 핸들러
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({...values, [e.target.name] : e.target.value });
  }

  // 폼의 값이 입력되었는지 유효성 검사를 하고 에러 메시지를 설정하는 함수
  const validate = () => {

    const errors = {
      name: "",
      birth: "",
      grade: "",
      aboutMe: ""
    }

    if(!values.name) {
      errors.name = "이름을 입력하세요";
    }
    if(!values.birth) {
      errors.birth = "생일을 입력하세요";
    }
    if(!values.grade) {
      errors.grade = "학년 입력하세요";
    }
    if(!values.aboutMe) {
      errors.aboutMe = "자기소개를 입력하세요";
    }
    return errors; 
  }

  // 폼이 Submit 될 때 처리하는 이벤트 핸들러
  const handleSubmit = (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();

    const errors = validate();
    setErrors(errors);

    // some() 함수는 배열의 요소 중에 하나라도 true면 true를 반환
    // 값이 있으면 true, 값이 비어있거나 undefined면 false를 반환
    console.log(["", "1", undefined].some(v => v));

    // values() 함수는 객체의 값만 추출해 배열로 반환한다.
    // 유효성 검사를 통과하지 못하면 즉 에러가 있으면 함수를 종료    
    if(Object.values(errors).some(v => v)) {
      console.log(errors);
      return false;
    }
    
    // Axios를 이용해 폼 데이터를 백엔드 서버에 전송
    console.log("submit: ", "폼 전송");
  }

  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input type="text" name="name" className="form-control"
              values={values.name} onChange={handleChange}/>
            { errors.name && <span className="text-danger">{errors.name}</span> }
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"
              value={values.birth} onChange={handleChange}/>
            { errors.birth && <span className="text-danger">{errors.birth}</span> }
          </div>
          <div className="my-3">
            <select name="grade" className="form-select" 
              values={values.grade} onChange={handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            { errors.grade && <span className="text-danger">{errors.grade}</span> }
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control" 
              values={values.aboutMe} onChange={handleChange}/>
            { errors.aboutMe && <span className="text-danger">{errors.aboutMe}</span> }
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}