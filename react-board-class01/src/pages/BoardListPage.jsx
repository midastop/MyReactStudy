import { useState, useEffect} from 'react';
import axios from 'axios';
import BoardListTable from '../components/BoardListTable';

function BoardListPage() {
	const [boardList, setBoardList] = useState([]);
	const getBoardList = async() => {
		const res = await axios.get("http://localhost:3010/");
		setBoardList(res.data);
	}

	useEffect(() => {
		getBoardList();
	}, []);

	return (
		<> 
  		{/* content */}
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
							<a  className="btn btn-outline-success">글쓰기</a>
						</div>
					</div>
					<div className="row my-3">  			
						<div className="col">
							<BoardListTable bList={ boardList } />
						</div>  			
					</div>
				</div>
			</div>
		</>		
	);
}			

export default BoardListPage;