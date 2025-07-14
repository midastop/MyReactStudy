// 폼 샘플 예제04 - 사용자가 폼 컨트롤의 입력을 완료했을 때와 폼이 전송될 때 유효성 검사02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState, useCallback, useEffect } from 'react'

export default function TestForm() {

  // 폼의 여러 입력 값을 하나의 useState()로 다루는 경우
  const [values, setValues] = useState({
    writer: "",
    pass : "",
    content: ""
  });

  // 유효성 검사 오류를 하나의 useState()로 다루는 경우
  const [errors, setErrors] = useState({
    writer: "",
    pass: "",
    content: ""
  });

  // 사용자가 폼 컨트롤에서 입력을 완료 했는지 여부
  const [inputed, setInputed] = useState({
    writer: false,
    pass: false,
    content: false
  });

  // 사용자가 폼 컨트롤에서 떠나면 - blur 이벤트 처리
  const handleBlur = e => {
    // 해당 컨트롤은 입력 완료로 설정
    setInputed({ ...inputed, [e.target.name]: true });      
  }

  // 값이 변경되면 변경된 값으로 화면에 표시하는 함수
  const handleChange = e => {    
    setValues({ ...values, [e.target.name]: e.target.value });    
    console.log({...values, [e.target.name] : e.target.value });
  }

  // 폼의 값이 입력되었는지 유효성 검사를 하고 에러 메시지를 설정하는 함수
  // 이 함수를 useCallback() Hook을 사용해 필드 값이 변경될 때 마다 유효성 검사 함수를 다시 할당
  const validate = useCallback(() => {
    const errors = {
      writer: "",
      pass: "",
      content: ""
    };

    if(!values.writer) {
      errors.writer = '작성자를 입력하세요'
    }
    if(!values.pass) {
      errors.pass = '비밀번호를 입력하세요'
    }
    if(!values.content) {
      errors.content = '내용을 입력하세요'
    }
    return errors;

  }, [values]);

  // 유효성 검사 함수가 변경될 때 마다 호출 
  useEffect(() => {
    const errors = validate();
    setErrors(errors);    
  }, [validate]);

  // 폼이 Submit 될 때 처리하는 함수
  const handleSubmit = (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();
    //console.log(values.writer, values.pass, values.content);

    // 모든 폼 컨트롤의 값을 입력했다고 설정
    setInputed({
      writer: true,
      pass: true,
      content: true
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
      return;
    }    
  }

  return (
		<div className="row my-5" id="global-content">
			<div className="col-10 offset-1">
        <h3>폼 샘플 예제04</h3>
        <form onSubmit={ handleSubmit }>        
          <label htmlFor="writer" className="form-label">작성자 : </label>    
          <input type="text" name="writer" id="writer" className="form-control" 
            value={ values.writer } onChange={ handleChange } onBlur={ handleBlur } />
          { inputed.writer && errors.writer 
              && <span style={{color: 'red'}}>{ errors.writer }<br/></span> }<br/>
          <label htmlFor="pass" className="form-label">비밀번호 : </label>
          <input type="password" name="pass" id="pass" className="form-control" 
            value={ values.pass } onChange={ handleChange } onBlur={ handleBlur }/>
          { inputed.pass &&  errors.pass 
              && <span  className="text-danger">{ errors.pass }<br/></span> }<br/>  
          <label htmlFor="content" className="form-label" >내용 : </label>
          <textarea type="text" name="content" id="content" className="form-control"  
            value={ values.content } onChange={ handleChange } rows="5" onBlur={ handleBlur }/>
          { inputed.content && errors.content 
              && <span className="text-danger">{ errors.content }<br/></span> }<br/>
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  )
    
}  
