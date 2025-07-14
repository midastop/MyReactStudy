import { Link } from 'react-router-dom';

function BoardListTable({ bList }) {

  return (
    <table className="table">
      <thead>
        <tr className="table-dark">
          <th>NO</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody className="text-secondary">
        {
          bList.length > 0 ? bList.map((board) => (              
              <tr key={ board.no }>
              <td>{ board.no }</td>
              <td><Link to={ `/boardDetail?no=${board.no}` }>{ board.title }</Link></td>
              <td>{ board.writer }</td>
              <td>{ board.reg_date }</td>
              <td>{ board.read_count }</td>
            </tr>
          )) : 
          (<tr>
            <td colSpan="5" className="text-center">게시 글이 존재하지 않습니다.</td>
          </tr>)
        }
      </tbody>  
    </table>
  )
}

export default BoardListTable;