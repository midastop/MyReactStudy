// 폼 샘플 예제02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from 'react'

export default function TestForm02() {

  // 폼의 여러 입력 값을 하나의 useState()로 다루는 경우
  const [values, setValues] = useState({
    writer: "",
    pass : "",
    content: ""
  });

  // 값이 변경되면 변경된 값으로 화면에 표시하는 함수
  const handleChange = (e) => {    
    setValues({ ...values, [e.target.name]: e.target.value });    
    console.log({...values, [e.target.name] : e.target.value });
  }

  // 폼이 Submit 될 때 처리하는 함수
  const handleSubmit = (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();
    console.log(values.writer, values.pass, values.content);
  }

  return (
		<div className="row my-5" id="global-content">
			<div className="col-10 offset-1">
        <h3>폼 샘플 예제02</h3>
        <form onSubmit={ handleSubmit }>        
          <label htmlFor="writer" className="form-label">작성자 : </label>    
          <input type="text" name="writer" id="writer" className="form-control" 
            value={ values.writer }/><br/>          
          <label htmlFor="pass" className="form-label">비밀번호 : </label>
          <input type="password" name="pass" id="pass" className="form-control" 
            value={ values.pass } onChange={ handleChange } /><br/>
          <label htmlFor="content" className="form-label" >내용 : </label>
          <textarea type="text" name="content" id="content"className="form-control"  
            value={ values.content } onChange={ handleChange } rows="5" /><br/>
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  )    
}  
