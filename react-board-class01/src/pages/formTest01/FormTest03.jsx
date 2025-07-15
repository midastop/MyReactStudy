// 제어 컴포넌트(Controlled Component) 폼 시리즈02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from 'react';
export default function FormTest02() {
  
  // 여러 입력 값을 하나의 useState를 사용
  const [values, setValues] = useState({
    name: "",
    birth: "",
    grade: "",
    aboutMe: ""
  });

  // 유효성 검사 오류 메시지를 하나의 state로 
  const [errors, setErrors] = useState({
    name: "",
    birth: "",
    grade: "",
    aboutMe: ""
  });

  const handleChnage = (e) => {
    console.log({['홍길동']: 1});
    setValues({...values, [e.target.name]: e.target.value});
  }

  // 폼의 값이 입력되었는지 유효성 검사하고 에러메시지 출력
  const validate = () => {
    const errors = {
      name: "",
      birth: "",
      grade: "",
      aboutMe: ""
    };
    if(!values.name) {
      errors.name = '이름을 입력하세요';
    }
    if(!values.birth) {
      errors.birth = '생일을 입력하세요';
    }
    if(!values.grade) {
      errors.grade = '학년을 입력하세요';
    }
    if(!values.aboutMe) {
      errors.aboutMe = '자기소개를 입력하세요';
    }
    return errors;    
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if(Object.values(errors).some(v => v)) {
      // 유효성 검사에서 오류가 하나라도 있으면 함수 종료
      return false;
    }
    //axios를 이용해 폼 데이터를 백엔드 서버로 전송
  }
  
  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input type="text" name="name" className="form-control" 
              value={values.name} onChange={handleChnage} />
            { errors.name && <span className="text-danger">{errors.name}</span>}  
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"
              value={values.birth} onChange={handleChnage}/> 
            { errors.birth && <span className="text-danger">{errors.birth}</span>}    
          </div>
          <div className="my-3">
            <select name="grade" className="form-select"
              value={values.grade} onChange={handleChnage}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            { errors.grade && <span className="text-danger">{errors.grade}</span>}              
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control"
              value={values.aboutMe} onChange={handleChnage}/>            
            { errors.aboutMe && <span className="text-danger">{errors.aboutMe}</span>}       
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}