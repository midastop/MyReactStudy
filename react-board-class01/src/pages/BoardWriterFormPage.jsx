import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BoardWriteFormPage() {
  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <div className="row text-center">
          <div className="col">
            <h2 className="fs-3 fw-bold">게시 글 쓰기</h2>
          </div>
        </div>
        <form name="writeForm" action="writeBoard" id="writeForm" 
          className="row g-3 border-primary" method="post">
            <div className="col-4 offset-md-2">
              <label htmlFor="writer" className="form-label">글쓴이</label>
              <input type="text" className="form-control" name="writer" id="writer" 
                placeholder="작성자를 입력해 주세요" />
            </div>
            <div className="col-4 ">
              <label htmlFor="pass" className="form-label">비밀번호</label>
              <input type="password" className="form-control" name="pass" id="pass" />
            </div>
            <div className="col-8 offset-md-2">
              <label htmlFor="title" className="form-label">제 목</label>
              <input type="text" className="form-control" name="title"  id="title" />
            </div>
            <div className="col-8 offset-md-2">
              <label htmlFor="content" className="form-label">내 용</label>
              <textarea className="form-control" name="content" id="content" rows="10"></textarea>
            </div>	
            <div className="col-8 offset-md-2 text-center mt-5">
              <input type="submit" value="등록하기" className="btn btn-primary"/>
              &nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>
            </div>	
        </form>
      </div>
    </div>
  );
}