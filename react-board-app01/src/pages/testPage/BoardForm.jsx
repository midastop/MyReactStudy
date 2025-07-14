// 게시 글 쓰기 폼 컴포넌트 샘플 예제
import { Link } from 'react-router-dom';

const BoardForm = ({values, errors, handleChange, handleSubmit}) => {
  return (
    <form name="writeForm" action="writeBoard" id="writeForm" 
        className="row g-3 border-primary" method="post"
        onSubmit={ handleSubmit }>
      <div className="col-4 offset-md-2">
        <label htmlFor="writer" className="form-label">글쓴이</label>
        <input type="text" className="form-control" name="writer" id="writer" 
          placeholder="작성자를 입력해 주세요" value={ values.writer } 
          onChange={ handleChange } />
        { errors.content && <p className="text-danger p-1 m-0">{ errors.writer }</p> }
      </div>
      <div className="col-4 ">
        <label htmlFor="pass" className="form-label">비밀번호</label>
        <input type="password" className="form-control" name="pass" id="pass" 
          value={ values.pass } onChange={ handleChange } />
        { errors.pass && <p className="text-danger p-1 m-0">{ errors.pass }</p> }  
      </div>
      <div className="col-8 offset-md-2">
        <label htmlFor="title" className="form-label">제 목</label>
        <input type="text" className="form-control" name="title"  id="title" 
          value={ values.title } onChange={ handleChange } />
        { errors.title && <p className="text-danger p-1 m-0">{ errors.title }</p> }
      </div>
      <div className="col-8 offset-md-2">
        <label htmlFor="content" className="form-label">내 용</label>
        <textarea className="form-control" name="content" id="content" rows="10"
          value={ values.content } onChange={ handleChange } />
        { errors.content && <p className="text-danger p-1 m-0">{ errors.content }</p> }              
      </div>	
      <div className="col-8 offset-md-2 text-center mt-5">
        <input type="submit" value="등록하기" className="btn btn-primary"/>            
        &nbsp;&nbsp;<Link to="/boardList" className="btn btn-primary">목록보기</Link>
      </div>	
    </form>    
  );
}

 export default BoardForm;