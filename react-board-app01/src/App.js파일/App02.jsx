import './App.css';
import { useState } from 'react';
import axios from 'axios';
function App() {
  // state가 배열 데이터이므로 초기 값을 빈 배열(Empty Array)로 지정
  const [boardList, setBoardList] = useState([]);
  const getBoardList = async () => {
    const res = await axios.get("http://localhost:3010/");
    // 백엔드 서버에서 가져온 데이터를 boardList state에 설정
    setBoardList(res.data); 
    console.log(res.data);
  } 
  
  getBoardList();
  
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
