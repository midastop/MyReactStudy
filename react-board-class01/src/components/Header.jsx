
export default function Header() {
  return (    
    // header
    <div className="row border-bottom border-primary">
      <div className="col-4">
        <p>
          <a><img src="https://placehold.co/200x100" alt="logo"/></a>
        </p>
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a className="nav-a" >로그인</a>
              </li>
              <li className="nav-item">
                <a className="nav-a" >게시 글 리스트</a>
              </li>
              <li className="nav-item">
                <a className="nav-a" >회원가입</a>
              </li>
              <li className="nav-item">
                <a className="nav-a" >주문/배송조회</a>
              </li>
              <li className="nav-item">
                <a className="nav-a" >고객센터</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-end">로그인시 인사말 출력</div>
        </div>
      </div>
    </div>  
  )
}