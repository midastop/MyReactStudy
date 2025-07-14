// 유효성 검사 결과 메시지를 placeholder를 이용해 출력하는 샘플 예제
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './writeForm.css';

export default function BoardWriteFormPage() { 

  // 폼의 여러 입력 값을 하나의 State(상태)로 다루기 위해 useState() Hook 사용
  // React에서는 동적으로 변하는 값들을 State(상태)로 제어하므로 사용자
  // 입력을 받는 input 태그의 value값을 State로 추적할 수 있도록 해야한다.
  // 이렇게 state로 설정해 놓으면 폼을 렌더링하는 React 컴포넌트는 폼에서
  // 사용자가 입력한 값을 제어하게 되며 이런 방식으로 React에 의해 값이 제어되는
  // 입력 폼 엘리먼트를 "제어 컴포넌트 (controlled component)"라고 한다.
  // https://ko.legacy.reactjs.org/docs/forms.html
  const [ values, setValues ] = useState({
    writer: "",
    pass: "",
    title: "",
    content: ""
  });

  // 폼의 입력값이 변경되면 새로운 값으로 표시하는 함수
  const handleChange = (e) => {
    const elemId = e.target.id;
    const elem = document.querySelector("#" + elemId);
    elem.classList.remove("errors");
    elem.placeholder = "";
    elem.focus();

    setValues({ 
      ...values, 
      [e.target.name]: e.target.value 
    });
    console.log({...values, [e.target.name]: e.target.value });
  };

  // 폼의 유효성 검사 오류를 하나의 State(상태)로 다루기 위해 useState() Hook 사용
  const [ errors, setErrors ] = useState({
    writer: "",
    pass: "",
    title: "",
    content: ""
  });  

  // 폼 컨트롤의 값이 입력되었는지 유효성 검사를 하고 에러 메시지를 설정하는 함수
  const validate = (e) => {
    const errors = {
      writer: "",
      pass: "",
      title: "",
      content: ""
    };
    
    if(!values.writer) {
      errors.writer = '작성자를 입력하세요'
      const elem = document.querySelector("#writer");
      elem.placeholder = "작성자를 입력하세요";
      elem.classList.add("errors");      
    }
    if(!values.title) {
      errors.title = '제목을 입력하세요'
    }
    if(!values.pass) {
      errors.pass = '비밀번호를 입력하세요'
    }
    if(!values.content) {
      errors.content = '내용을 입력하세요'
    }
    return errors;
  }

  // 폼이 Submit될 때 이벤트 처리 함후
  const handleSubmit = (e) => {

    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();    

    // 폼 컨트롤의 값이 입력되었는지 유효성 검사하고
    const errors = validate(e);

    // 에러 메시지를 설정
    setErrors(errors);

    // some() 함수는 배열의 요소 중에 하나라도 true면 true를 반환
    // 값이 있으면 true, 값이 비어있거나 undefined면 false를 반환
    console.log(["", "1", undefined].some(v => v));
    
    // values() 함수는 객체의 값만 추출해 배열로 반환하고 some() 함수를 이용해
    // errors에 메시지가 설정되었는지 체크해서 유효성 검사를 통과했는지 판단하고
    // 유효성 검사를 통과하지 못하면 함수를 종료 한다.
    if(Object.values(errors).some(v => v)) {
      console.log(errors);
      return;
    }
  }

  return (
		<div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <div className="row text-center">
          <div className="col">
            <h2 className="fs-3 fw-bold">게시 글 쓰기</h2>
          </div>          
        </div>
        <form name="writeForm" action="writeBoard" id="writeForm" 
						className="row g-3 border-primary" method="post"
            onSubmit={ handleSubmit }>
          <div className="col-4 offset-md-2">
            <label htmlFor="writer" className="form-label">글쓴이</label>
            <input type="text" className="form-control" name="writer" id="writer" 
              placeholder="작성자를 입력해 주세요" value={ values.writer } 
              onChange={ handleChange } />
            { errors.content && <p className="text-danger p-1 m-0">{ errors.writer }</p> }
          </div>
          <div className="col-4 ">
            <label htmlFor="pass" className="form-label">비밀번호</label>
            <input type="password" className="form-control" name="pass" id="pass" 
              value={ values.pass } onChange={ handleChange } />
            { errors.pass && <p className="text-danger p-1 m-0">{ errors.pass }</p> }  
          </div>
          <div className="col-8 offset-md-2">
            <label htmlFor="title" className="form-label">제 목</label>
            <input type="text" className="form-control" name="title"  id="title" 
              value={ values.title } onChange={ handleChange } />
            { errors.title && <p className="text-danger p-1 m-0">{ errors.title }</p> }
          </div>
          <div className="col-8 offset-md-2">
            <label htmlFor="content" className="form-label">내 용</label>
            <textarea className="form-control" name="content" id="content" rows="10"
              value={ values.content } onChange={ handleChange } />
            { errors.content && <p className="text-danger p-1 m-0">{ errors.content }</p> }              
          </div>	
          <div className="col-8 offset-md-2 text-center mt-5">
            <input type="submit" value="등록하기" className="btn btn-primary"/>            
            &nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>
          </div>	
				</form>        
      </div>
    </div>
  )
}