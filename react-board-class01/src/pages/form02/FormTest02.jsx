// 폼 샘플 예제02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from "react";

export default function FormTest02() {

  // 폼의 여러 입력 값을 하나의 useState()로 다루는 경우
  const [values, setValues] = useState({
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

  // 폼이 Submit 될 때 처리하는 이벤트 핸들러
  const handleSubmit = (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();
    console.log(values.name, values.birth, values.grade, values.aboutMe);
  }; 

  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input type="text" name="name" className="form-control" 
              value={values.name} onChange={handleChange}/>
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control" 
              value={values.birth} onChange={handleChange}/>              
          </div>
          <div className="my-3">
            <select name="grade" className="form-select" 
              onChange={handleChange} value={values.grade}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>            
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control" 
              value={values.aboutMe} onChange={handleChange}/>            
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}