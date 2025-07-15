// 폼 샘플 예제04 - 사용자가 폼 컨트롤의 입력을 완료했을 때와 폼이 전송될 때 유효성 검사02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState, useCallback, useEffect } from "react";

export default function FormTest04() {

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

  // 사용자가 폼 컨트롤에서 입력을 완료 했는지 여부
  const [inputed, setInputed] = useState({
    name: false,
    birth: false,
    grade: false,
    aboutMe: false
  });

  // 사용자가 폼 컨트롤에서 떠나면 - blur 이벤트 처리
  const handleBlur = e => {
    // 해당 컨트롤은 입력 완료로 설정
    setInputed({ ...inputed, [e.target.name]: true });      
  }

  // 값이 변경되면 변경된 값으로 화면에 표시하는 이벤트 핸들러
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({...values, [e.target.name] : e.target.value });
  }

  // 폼의 값이 입력되었는지 유효성 검사를 하고 에러 메시지를 설정하는 함수
  // 이 함수를 useCallback() Hook을 사용해 필드 값이 변경될 때 마다 유효성 검사 함수를 다시 할당
  const validate = useCallback(() => {

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
  }, [values]);

  // 유효성 검사 함수가 변경될 때 마다 호출
  useEffect(() => {
    const errors = validate();
    setErrors(errors);
  }, [validate]);

  // 폼이 Submit 될 때 처리하는 이벤트 핸들러
  const handleSubmit = (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();
    console.log(values.name, values.birth, values.grade, values.aboutMe);

    // 모든 폼 컨트롤의 값을 입력했다고 설정
    setInputed({
      name: true,
      birth: true,
      grade: true,
      aboutMe: true
    });

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
              values={values.name} onChange={handleChange} onBlur={handleBlur}/>
            { inputed.name && errors.name 
              && <span className="text-danger">{errors.name}</span> }
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"
              value={values.birth} onChange={handleChange} onBlur={handleBlur}/>
            { inputed.birth && errors.birth 
              && <span className="text-danger">{errors.birth}</span> }
          </div>
          <div className="my-3">
            <select name="grade" className="form-select" 
              values={values.grade} onChange={handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            { inputed.grade && errors.grade 
              && <span className="text-danger">{errors.grade}</span> }
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control" 
              values={values.aboutMe} onChange={handleChange}/>
            { inputed.aboutMe && errors.aboutMe 
              && <span className="text-danger">{errors.aboutMe}</span> }
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}