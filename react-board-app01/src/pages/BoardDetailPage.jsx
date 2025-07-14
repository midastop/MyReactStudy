import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dateFormat } from '../utils/utils';

export default function BoardDetailPage() { 

  // 쿼리 스트링 읽어오기 useSearchParams Hook
  const [searchParams, setSearchParams] = useSearchParams();
  const no = searchParams.get("no");  

  // board는 객체이므로 초기 값을 빈 객체(Empty Object)로 지정
  const [board, setBoard] = useState({});
  const getBoard = async () => {
    // 백엔드 서버에서 경로 변수 방식으로 데이터를 처리하므로 데이터를 경로에 포함 시킴
    const res = await axios.get(`http://localhost:3010/boards/${no}`);
      // 백엔드 서버에서 가져온 데이터를 board state에 설정
      setBoard(res.data);
  }

  // useEffect Hook을 사용해 처음 화면이 표시될 때 백엔드 서버에서
  // 게시 글 하나를 읽어와 출력되도록 했다. useEffect() 함수의 
  // 두 번째 인수로 빈 배열([])을 지정하면 처음 화면이 렌더링될 때
  // 첫 번째 인수로 지정한 콜백함수를 한 번만 실행한다.
  useEffect(() => {
      getBoard();
  }, []);
  console.log(board);

  // useNavigate Hook은 Link 컴포넌트를 사용하지 안고 다른 페이지로 이동할 때 사용
  const navigate = useNavigate();

  // 비밀번호를 useState() Hook을 사용해 상태(state)로 등록
  // React에서는 동적으로 변하는 값들을 state에서 제어해야하기 때문에
  // 사용자 입력을 받는 input태그의 value값을 state에서 추적할 수 있도록
  // 해야한다. 이러면 폼을 렌더링하는 React 컴포넌트는 폼에서 발생하는
  // 사용자 입력값을 제어하게 되며 이런 방식으로 React에 의해 값이 제어되는
  // 입력 폼 엘리먼트를 "제어 컴포넌트 (controlled component)"라고 한다.
  // https://ko.react.dev/reference/react-dom/components/form
  // https://ko.legacy.reactjs.org/docs/forms.html  
  const [pass, setPass] = useState("");
  const handlePassChange = e => {
    setPass(e.target.value);
  }

  // 수정하기 버튼과 삭제하기 버튼이 클릭되었을 때 이벤트 처리 함수
  const handleBtnClick = async e => {
    // 현재 클릭 이벤트가 발생한 요소의 id 값을 읽어온다.
    const isUpdate = e.target.id == 'detailUpdate';

    // 비밀번호 입력란에 비밀번호가 입력되지 않았으면
    if(pass.length == 0) {      
      alert(`게시 글을 ${ isUpdate ? "수정" : '삭제' }하려면 비밀번호를 입력하세요`);
      return;
    }

    if(isUpdate) { // 수정 폼 요청하기
      // 백엔드 서버에서 경로 변수 방식으로 데이터를 처리하므로 데이터를 경로에 포함 시킴
      await axios.get(`http://localhost:3010/boards/${no}/${pass}`)
        .then((res) => {
          console.log(res.data);
          if(!res.data.result) {
            alert('비밀번호가 틀립니다.');
            return;
          }        
          // 수정 폼 요청하기가 성공하면
          // /boardUpdate로 이동하면서 현재 페이지를 history 기록에 남긴다.
          navigate(`/boardUpdate?no=${no}`);        
        })
        .catch((error) => {
          console.log("error : ", error);
        });

    } else { // 삭제하기
      // 백엔드 서버에서 쿼리스트링 방식으로 데이터를 처리하므로 params 속성을 사용함
      // DELETE 방식 요청에서 본문에 데이터를 추가하려면 params 대신 data 속성을 사용하면 됨     
      await axios.delete(`http://localhost:3010/boards`, { params: { no: no, pass: pass }})
        .then((res) => {
          console.log(res.data);
          if(!res.data.result) {
            alert('비밀번호가 틀립니다.');
            return
          }
          // 삭제하기가 성공하면
          // /boardList로 이동하면서 현재 페이지를 history 기록에 남기지 않음
          navigate("/boardList", { replace: true });
        })
        .catch((error) => {
          console.log("error : ", error);
        });
    }    
  };

  return (
		<div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form name="checkForm" id="checkForm">
          <input type="hidden" name="no" id="no" />
          <input type="hidden" name="pass" id="rPass" />
        </form>
        <div className="row text-center">
          <div className="col">
            <h2 className="fs-3 fw-bold">게시 글 상세보기</h2>
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <table className="table table-bordered" >
              <tbody>					
                <tr>
                  <th className="table-secondary">제 목</th>
                  <td colSpan="3">{ board.title}</td>		
                </tr>
                <tr>
                  <th>글쓴이</th>
                  <td>{ board.writer }</td>
                  <th>작성일</th>
                  <td>{ dateFormat(new Date(board.reg_date), "-", "dt")}</td>		
                </tr>
                <tr>		
                  <th>비밀번호</th>
                  <td>
                    <div className="col-sm-8">
                      <input className="form-control" type="password" name="pass" id="pass" 
                        onChange={ handlePassChange } value={ pass }/>                     
                    </div>
                  </td>
                  <th>조회수</th>
                  <td>{ board.read_count }</td>
                </tr>	
                <tr>
                  <th>파&nbsp;&nbsp;&nbsp;&nbsp;일</th>
                  <td colSpan="3">
                    { board.file1 == null || board.file1 == "" ? "첨부파일 없음" 
                        : <Link to={ `/upload/${ board.file1 }` }>파일 다운로드</Link> }										
                  </td>		
                </tr>
                <tr>		
                  <td colSpan="4" style={{whiteSpace: 'pre'}}>
                    { board.content }
                  </td>
                </tr>	
              </tbody>
            </table>
          </div>
        </div>
        <div className="row my-3">
          <div className="col text-center">
            <input className="btn btn-warning" type="button" id="detailUpdate" value="수정하기" 
              onClick={ handleBtnClick }/>
            &nbsp;&nbsp;<input className="btn btn-danger"  type="button" id="detailDelete" 
              value="삭제하기" onClick={ handleBtnClick }/>			
            &nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>						
          </div>
        </div>
      </div>
    </div>
  )
}