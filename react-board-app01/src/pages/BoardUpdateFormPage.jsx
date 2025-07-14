// 게시 글 수정 폼 페이지
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

export default function BoardUpdateFormPage() {

  // 쿼리 스트링 읽어오기 useSearchParams Hook
  const [searchParams, setSearchParams] = useSearchParams();
  const no = searchParams.get("no");  

  // 폼의 여러 입력 값을 하나의 State(상태)로 다루기 위해 객체로 만들어 useState()에 지정함
  // 사용자가 입력한 값을 제어하기 위해서 State(상태)를 사용하는데 이렇게 React에 의해
  // 값이 제어되는 입력 폼 엘리먼트를 "제어 컴포넌트(controlled component)"라고 한다.
  // https://ko.react.dev/reference/react-dom/components/form
  // https://ko.legacy.reactjs.org/docs/forms.html
  const [ board, setBoard ] = useState({
    no: "",
    writer: "",
    pass: "",
    title: "",
    content: ""
  });
 
  const getBoard = async () => {
    // 백엔드 서버에서 경로 변수 방식으로 데이터를 처리하므로 데이터를 경로에 포함 시킴
    // 앞에서 비밀번호를 체크하고 넘어왔기 때문에 게시 글 정보만 읽어 왔음
    const res = await axios.get(`http://localhost:3010/boards/${no}`);
      
      // 비밀번호는 제외하고 화면에 표시
      res.data.pass = "";      
      // 백엔드 서버에서 가져온 데이터를 board state에 설정
      setBoard(res.data);      
  }

  // 처음 화면이 표시될 때 백엔드 서버에서 no에 해당하는 게시 글 정보를 읽어 옴  
  useEffect(() => {
      getBoard();      
  }, []);
  console.log(board);

  // useNavigate Hook은 Link 컴포넌트를 사용하지 안고 다른 페이지로 이동할 때 사용
  const navigate = useNavigate();
    
  // 폼의 입력 값이 변경되면 새로운 값으로 표시하는 함수
  const handleChange = (e) => {
    setBoard({ 
      ...board, 
      [e.target.name]: e.target.value 
    });
  };

  // 폼의 유효성 검사 오류를 하나의 State(상태)로 다루기 위해 useState() Hook 사용
  const [ errors, setErrors ] = useState({
    writer: "",
    pass: "",
    title: "",
    content: ""
  });  

  // 사용자가 폼 컨트롤에서 입력을 완료 했는지 여부를 State로 설정
  const [inputed, setInputed] = useState({
    writer: false,
    pass: false,
    title: false,
    content: false
  });

  // 사용자가 폼 컨트롤에서 입력을 완료하고 떠나면 - blur 이벤트 처리
  const handleBlur = e => {
    // 해당 컨트롤은 입력 완료로 설정
    setInputed({ ...inputed, [e.target.name]: true });      
  }

  // 폼 컨트롤의 값이 입력되었는지 유효성 검사를 하고 에러 메시지를 설정하는 함수
  // useCallback() Hook을 사용해 필드 값이 변경될 때 마다 유효성 검사를 수행하는
  // 함수를 다시 할당 한다. useCallback()은 함수를 메모이제이션(memoization)하기
  // 위해서 사용되는 Hook으로 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온
  // 배열 요소의 값이 변경될 때까지 메모리에 저장해 놓고 재사용할 수 있게 해주는
  // Hook 이다. 예를 들어 React 컴포넌트 함수 안에 a 함수가 선언이 되어 있다면
  // 이 a 함수는 해당 컴포넌트가 랜더링될 때 마다 새롭게 함수가 생성된다. 하지만
  // useCallback()을 사용하면, 해당 컴포넌트가 랜더링되더라도 그 함수가 의존하는
  // 값들이 바뀌지 않는 한 기존 함수를 계속해서 반환해 준다.
  const validate = useCallback(() => {
    const errors = {
      writer: "",
      pass: "",
      title: "",
      content: ""
    };
    
    if(!board.writer) {
      errors.writer = '작성자를 입력하세요'
    }
    if(!board.pass) {
      errors.pass = '비밀번호를 입력하세요'
    }
    if(!board.title) {
      errors.title = '제목을 입력하세요'
    }    
    if(!board.content) {
      errors.content = '게시 글 내용을 입력하세요'
    }
    return errors;
  }, [board]);

  // 유효성 검사 함수가 변경될 때 마다 호출
  useEffect(() => {
    const errors = validate();
    setErrors(errors);
  }, [validate]);

  // 폼이 Submit될 때 이벤트 처리 함수
  const handleSubmit = async (e) => {
    // 폼이 전송되는 기본 동작 취소
    e.preventDefault();    

    // 모든 폼 컨트롤의 값을 입력했다고 설정    
    setInputed({
      writer: true,
      pass: true,
      title: true,
      content: true
    });

    // 폼 컨트롤의 값이 입력되었는지 유효성 검사를 진행해 에러 메시지를 설정
    const errors = validate();
    setErrors(errors);
    
    // some() 함수는 배열의 요소 중에 하나라도 true면 true를 반환
    // 값이 있으면 true, 값이 비어있거나 undefined면 false를 반환
    console.log(["", null, undefined].some(v => v));

    // values() 함수는 객체의 값만 추출해 배열로 반환하고 some() 함수를 이용해
    // errors에 메시지가 설정되었는지 체크해서 유효성 검사를 통과했는지 판단하고
    // 유효성 검사를 통과하지 못하면 함수를 종료 한다.
    if(Object.values(errors).some(v => v)) {
      console.log(errors);
      return;
    }

    // 유효성 검사를 통과하면 폼에 입력된 데이터를 읽어와 요청 본문에 포함시켜서
    // 백엔드 서버로 요청을 보내고 게시 글 수정이 완료되면 게시 글 리스트로 이동
    await axios.put("http://localhost:3010/boards", board )
      .then((res) => {
        console.log(res.data);
        if(!res.data.result) {
          alert('비밀번호가 틀립니다.');
          return;
        }

        // 게시 글 수정 작업이 성공하면
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
            <h2 className="fs-3 fw-bold">게시 글 수정하기</h2>
          </div>          
        </div>
        <form name="writeForm" action="writeBoard" id="writeForm" 
						className="row g-3 border-primary" method="post"
            onSubmit={ handleSubmit }>
          <div className="col-4 offset-md-2">
            <label htmlFor="writer" className="form-label">글쓴이</label>
            <input type="text" className="form-control" name="writer" id="writer" 
              placeholder="작성자를 입력해 주세요" value={ board.writer } 
              onChange={ handleChange } onBlur={ handleBlur } readOnly />
            { inputed.writer && errors.writer 
              && <p className="text-danger p-1 m-0">{ errors.writer }</p> }            
          </div>
          <div className="col-4 ">
            <label htmlFor="pass" className="form-label">비밀번호</label>
            <input type="password" className="form-control" name="pass" id="pass" 
              value={ board.pass } onChange={ handleChange } onBlur={ handleBlur } />
            { inputed.pass && errors.pass 
              && <p className="text-danger p-1 m-0">{ errors.pass }</p> }  
          </div>
          <div className="col-8 offset-md-2">
            <label htmlFor="title" className="form-label">제 목</label>
            <input type="text" className="form-control" name="title"  id="title" 
              value={ board.title } onChange={ handleChange } onBlur={ handleBlur } />
            { inputed.title && errors.title 
              && <p className="text-danger p-1 m-0">{ errors.title }</p> }
          </div>
          <div className="col-8 offset-md-2">
            <label htmlFor="content" className="form-label">내 용</label>
            <textarea className="form-control" name="content" id="content" rows="10"
              value={ board.content } onChange={ handleChange } onBlur={ handleBlur } />
            { inputed.content && errors.content 
              && <p className="text-danger p-1 m-0">{ errors.content }</p> }              
          </div>	
          <div className="col-8 offset-md-2 text-center mt-5">
            <input type="submit" value="수정하기" className="btn btn-primary"/>            
            &nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>
          </div>	
				</form>        
      </div>
    </div>
  )
}