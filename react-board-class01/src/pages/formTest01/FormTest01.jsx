// 제어 컴포넌트(Controlled Component) 폼 시리즈02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from 'react';
export default function FormTest01() {
  
  // 개별적으로 useState를 사용
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [grade, setGrade] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const changeName = e => {
    setName(e.target.value);
  }
  const changeBirth = e => {
    setBirth(e.target.value);
  }
  const changeGrade = e => {
    setGrade(e.target.value);
  }
  const changeAboutMe = e => {
    setAboutMe(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, birth, grade, aboutMe);
  }
  
  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input type="text" name="name" className="form-control" 
              value={name} onChange={changeName} />
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"
              value={birth} onChange={changeBirth}/> 
          </div>
          <div className="my-3">
            <select name="grade" className="form-select"
              value={grade} onChange={changeGrade}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>            
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control"
              value={aboutMe} onChange={changeAboutMe}/>            
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}