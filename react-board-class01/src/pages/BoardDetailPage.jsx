import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { dateFormat } from '../utils/utils'

export default function BoardDetailPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const no = searchParams.get("no");
  
  const [board, setBoard] = useState({}); 
  // no에 해당하는 게시 글 정보를 백엔드 서버에서 읽어와서 페이지에 출력
  const getBoard = async () => {
    const res = await axios.get(`http://localhost:3010/boards/${no}`);
    setBoard(res.data);
    console.log(res.data)
  }

  useEffect(() => {
    getBoard();
  }, []);  

  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
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
										<td colSpan="3">{board.title}</td>		
									</tr>
									<tr>
										<th>글쓴이</th>
										<td>{board.writer}</td>
										<th>작성일</th>
										<td>{ dateFormat(new Date(board.reg_date), "-", "dt")}</td>		
									</tr>
									<tr>		
										<th>비밀번호</th>
										<td>
											<div className="col-sm-8">
												<input className="form-control" type="password" name="pass" id="pass" />
											</div>
										</td>
										<th>조회수</th>
										<td>{board.read_count}</td>
									</tr>	
									<tr>
										<th>파&nbsp;&nbsp;&nbsp;&nbsp;일</th>
										<td colSpan="3">
                      { board.file1 == null || board.file1 == "" ? "첨부파일 없음"
                        :<Link to={`/upload/${board.file1}`}>파일 다운로드</Link>
                      }
										</td>		
									</tr>
									<tr>		
										<td colSpan="4">
											<pre>{board.content}</pre>
										</td>
									</tr>	
								</tbody>
							</table>
						</div>
					</div>
					<div className="row my-3">
						<div className="col text-center">
							<input className="btn btn-warning" type="button" id="detailUpdate" value="수정하기"/>
							&nbsp;&nbsp;<input className="btn btn-danger"  type="button" id="detailDelete" value="삭제하기" />			
							&nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>
						</div>
					</div>
      </div>
    </div>
  );
}