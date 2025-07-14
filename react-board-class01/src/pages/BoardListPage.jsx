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
		<div class="row my-5" id="global-content">
			<div class="col-10 offset-1">
				<div class="row text-center">
					<div class="col">
						<h2 class="fs-3 fw-bold">게시 글 리스트</h2>
					</div>
				</div>  		
				<form name="searchForm" id="searchForm" action="#" 
					class="row justify-content-center my-3">
					<div class="col-auto">
						<select name="type" class="form-select">
							<option value="title">제목</option>
							<option value="writer">작성자</option>
							<option value="content">내용</option>
						</select>
					</div>
					<div class="col-4">
						<input type="text" name="keyword" class="form-control"/>
					</div>
					<div class="col-auto">
						<input type="submit" value="검 색" class="btn btn-primary"/>
					</div>
				</form>  		
				<div class="row">
					<div class="col text-end">
						<a  class="btn btn-outline-success">글쓰기</a>
					</div>
				</div>
				<div class="row my-3">  			
					<div class="col">
						<table class="table">
							<thead>
								<tr class="table-dark">
									<th>NO</th>
									<th>제목</th>
									<th>작성자</th>
									<th>작성일</th>
									<th>조회수</th>
								</tr>
							</thead>
							
						</table>
					</div>  			
				</div>
			</div>
		</div>
	);
}			