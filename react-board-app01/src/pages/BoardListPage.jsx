import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BoardListTable from '../components/BoardListTable';

function BoardListPage() {

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
  // 첫 번째 인수로 지정한 콜백함수를 한 번만 실행한다.
  useEffect(() => {
      getBoardList();
  }, []);
  
  console.log(boardList);

  return (		
		<div className="row my-5" id="global-content">
			<div className="col-10 offset-1">
				<div className="row text-center">
					<div className="col">
						<h2 className="fs-3 fw-bold">게시 글 리스트</h2>
					</div>
				</div>  		
				<form name="searchForm" id="searchForm" action="#" 
					className="row justify-content-center my-3">
					<div className="col-auto">
						<select name="type" className="form-select">
							<option value="title">제목</option>
							<option value="writer">작성자</option>
							<option value="content">내용</option>
						</select>
					</div>
					<div className="col-4">
						<input type="text" name="keyword" className="form-control"/>
					</div>
					<div className="col-auto">
						<input type="submit" value="검 색" className="btn btn-primary"/>
					</div>
				</form>  		
				<div className="row">
					<div className="col text-end">
						{/* Link 컴포넌트는 React 앱에서 페이지를 이동하려고 할 때 사용한다.
						 		HTML에서 페이지 링크에 사용하는 a 태그는 클릭되면 페이지를 새로 불러오게
								되는데 Link는 페이지를 새로 불러오는 것을 막고 History API를 사용해서
								브라우저 주소의 경로만 바꾼다. */}
						<Link to="/boardWrite" className="btn btn-outline-success">글쓰기</Link>
					</div>
				</div>
				<div className="row my-3">  			
					<div className="col">
						{/* BoardListTabel 컴포넌트를 사용하고 props로 boardList 데이터를 넘김 */}
						<BoardListTable bList={ boardList }/>
					</div>  			
				</div>
			</div>
		</div>		
  )
}

export default BoardListPage;