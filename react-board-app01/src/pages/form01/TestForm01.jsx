// 폼 샘플 예제01
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from 'react'

export default function TestForm() {

  // 개별적으로 useState()를 사용
  const [writer, setWriter] = useState("");
  const [pass, setPass] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();
    console.log(writer, pass, content);
  }

  return (
		<div className="row my-5" id="global-content">
			<div className="col-10 offset-1">
        <h3>폼 샘플 예제01</h3>
        <form onSubmit={ handleSubmit }>        
          <label htmlFor="writer" className="form-label">작성자 : </label>    
          <input type="text" name="writer" id="writer" className="form-control" 
            value={ writer } onChange={ e => setWriter(e.target.value) } /><br/>
          <label htmlFor="pass" className="form-label">비밀번호 : </label>
          <input type="password" name="pass" id="pass" className="form-control" 
            value={ pass } onChange={ e => setPass(e.target.value) } /><br/>
          <label htmlFor="content" className="form-label" >내용 : </label>
          <textarea type="text" name="content" id="content"className="form-control"  
            value={ content } onChange={ e => setContent(e.target.value) } rows="5" /><br/>
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  )    
}  
