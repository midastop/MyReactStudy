// 게시 글 쓰기 폼 페이지
// 폼이 Submit될 때 유효성 검사를 통해 에러 메시지를 출력하는 예제
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BoardWriteFormPage() {
  // 폼의 여러 입력 값을 하나의 State(상태)로 다루기 위해 useState() Hook 사용
  // React에서는 동적으로 변하는 값들을 State(상태)로 제어하므로 사용자
  // 입력을 받는 input 태그의 value 값을 State로 추적할 수 있도록 해야 한다.
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

  // useNavigate Hook은 Link 컴포넌트를 사용하지 안고 다른 페이지로 이동할 때 사용
  // Link 컴포넌트는 a 태그와 마찬가지로 단순 링크에 사용하지만 useNavigate Hook은
  // 코드로 주소를 이동시길 수 있는 기능을 제공한다. useNavigate Hook을 사용하면
  // 이벤트 핸들러 안에서 주소를 이동하도록 코드로 작성할 수 있으며 이때 실제 주소가
  // 이동되는 것이 아니라 React 내에서 라우터로 이동한다.
  const navigate = useNavigate();
    
  // 폼의 입력값이 변경되면 새로운 값으로 표시하는 함수
  const handleChange = (e) => {
    setValues({ 
      ...values, 
      [e.target.name]: e.target.value 
    });
    console.log({...values, [e.target.name]: e.target.value });
  };

  // 폼 컨트롤의 값이 입력되었는지 유효성 검사를 하고 [boolean, 결과 메시지]로 반환 하는 함수
  const validate = () => {
    let msg = '';
    if(!values.writer) {
      msg = '작성자를 입력하세요'
      return [false, msg];
    }
    if(!values.pass) {
      msg = '비밀번호를 입력하세요'
      return [false, msg];
    }
    if(!values.title) {
      msg = '제목을 입력하세요'
      return [false, msg];
    }    
    if(!values.content) {
      msg = '게시 글 내용을 입력하세요'
      return [false, msg];
    }
    return [true, msg];       
  }

  // 폼이 Submit될 때 이벤트 처리 함수
  const handleSubmit = async (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();    

    // 폼 컨트롤의 값이 입력되었는지 유효성 검사하고
    const [isValid, msg ]= validate();

    // 유효성 검사를 통과하지 못하면 경고 창을 띄우고 함수를 종료 한다.
    if(!isValid) {
      alert(msg);
      return;
    }

    // 유효성 검사를 통과하면 폼에 입력된 데이터를 읽어와 요청 본문에 포함시켜서
    // 백엔드 서버로 요청을 보내고 게시 글 쓰기가 완료되면 게시 글 리스트로 이동
    await axios.post("http://localhost:3010/writeBoard", values )
      .then((res) => {
        // 게시 글 쓰기 작업이 성공하면
        // /boardList로 이동하면서 현재 페이지를 history 기록에 남기지 않음
        navigate("/boardList", { replace: true });
      })
      .catch((error) => {
        console.log("error : ", error)
      });
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
          </div>
          <div className="col-4 ">
            <label htmlFor="pass" className="form-label">비밀번호</label>
            <input type="password" className="form-control" name="pass" id="pass" 
              value={ values.pass } onChange={ handleChange } />            
          </div>
          <div className="col-8 offset-md-2">
            <label htmlFor="title" className="form-label">제 목</label>
            <input type="text" className="form-control" name="title"  id="title" 
              value={ values.title } onChange={ handleChange } />            
          </div>
          <div className="col-8 offset-md-2">
            <label htmlFor="content" className="form-label">내 용</label>
            <textarea className="form-control" name="content" id="content" rows="10"
              value={ values.content } onChange={ handleChange } />            
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