function BoardListTable({ bList }) {

  return (
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
          bList.map((board) => (              
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
  )
}

export default BoardListTable;