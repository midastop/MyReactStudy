import { Link } from 'react-router-dom'

export default function Header() {
  return (
    // header
    <div className="row border-bottom border-primary">
      <div className="col-4">
        <p>
          <Link to="/"><img src="https://placehold.co/200x100" /></Link>
        </p>
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" to="#">로그인</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/boardList">게시 글 리스트</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">회원가입</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">주문/배송조회</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">고객센터</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-end">로그인시 인사말 출력</div>
        </div>
      </div>
    </div>
  );
}