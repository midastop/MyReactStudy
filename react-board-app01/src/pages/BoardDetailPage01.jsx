import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { dateFormat } from '../utils/utils';

export default function BoardListPage() { 

  // 쿼리 스트링 읽어오기 useSearchParams Hook
  const [searchParams, setSearchParams] = useSearchParams();
  const no = searchParams.get("no");  

  // board는 객체이므로 초기 값을 빈 객체(Empty Object)로 지정
  const [board, setBoard] = useState({});
  const getBoard = async () => {
    const res = await axios.get(`http://localhost:3010/boardDetail?no=${no}`);
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
                  <td colSpan="3">{ board. title}</td>		
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
                      <input className="form-control" type="password" name="pass" 
                        id="pass"/>                     
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
            <input className="btn btn-warning" type="button" id="detailUpdate" 
              value="수정하기" />
            &nbsp;&nbsp;<input className="btn btn-danger"  type="button" id="detailDelete"
              value="삭제하기" />			
            &nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>						
          </div>
        </div>
      </div>
    </div>
  )
}