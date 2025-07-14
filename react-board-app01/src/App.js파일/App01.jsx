import './App.css';
import axios from 'axios';
function App() {
  // 게시 글 리스트를 백엔드 서버에서 읽어오는 함수
  const getBoardList = async () => {
    const res = await axios.get("http://localhost:3010/");        
    console.log(res.data);
  }
  getBoardList();
  
  return (
    <div className="App">       
    </div>
  );
}

export default App;
