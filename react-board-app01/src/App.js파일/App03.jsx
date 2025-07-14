import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  // state가 배열 데이터이므로 초기 값을 빈 배열(Empty Array)로 지정
  const [boardList, setBoardList] = useState([]);
  const getBoardList = async () => {
    const res = await axios.get("http://localhost:3010/");
    // 백엔드 서버에서 가져온 데이터를 boardList state에 설정
    setBoardList(res.data);
  }

  // useEffect Hook을 사용해 처음 화면이 표시될 때 백엔드 서버에서
  // 게시 글 리스트를 읽어와 출력되도록 했다. useEffect() 함수의 
  // 두 번째 인수로 빈 배열([])을 지정하면 처음 화면이 렌더링될 때
  // 첫 번째 인수로 지정한 콜백 함수를 한 번만 실행한다.
  useEffect(() => {
    getBoardList();
  }, []);
  
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.map((board) => (              
                <tr key={ board.no }>
                <td>{ board.no }</td>
                <td>{ board.title }</td>                
                <td>{ board.writer }</td>
                <td>{ board.reg_date }</td>
                <td>{ board.read_count }</td>
              </tr>
            ))
          }          
        </tbody>  
      </table>         
    </div>
  );
}

export default App;
