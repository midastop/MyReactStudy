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

  const handleChnage = (e) => {
    console.log({['홍길동']: 1});
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values.name, values.birth, values.grade, values.aboutMe);
  }
  
  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input type="text" name="name" className="form-control" 
              value={values.name} onChange={handleChnage} />
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"
              value={values.birth} onChange={handleChnage}/> 
          </div>
          <div className="my-3">
            <select name="grade" className="form-select"
              value={values.grade} onChange={handleChnage}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>            
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control"
              value={values.aboutMe} onChange={handleChnage}/>            
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}