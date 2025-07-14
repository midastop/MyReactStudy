import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import BoardListTable from './components/BoardListTable';

function App() {
  //state 배열이므로 초기 값을 빈 배열을 지정
  const [boardList, setBoardList] = useState([]);

  // 게시 글 리스트를 백엔드 서버에서 읽어오는 함수
  const getBoardList = async () => {
    const res = await axios.get("http://localhost:3010/");
    setBoardList(res.data);
  }
  
  useEffect(() => {
    getBoardList();
  }, []);
  
  return (
    <div className="App">
      <BoardListTable bList={boardList} />
    </div>
  );
}

export default App;