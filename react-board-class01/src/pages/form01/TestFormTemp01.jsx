// 제어 컴포넌트(Controlled Component) 폼 시리즈01
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
function TestForm() {
  

  return (
    <div className="row my-5" id="global-content">
			<div className="col-10 offset-1">
        <h3>폼 샘플 예제01</h3>
        <form>        
          <label htmlFor="writer" className="form-label">작성자 : </label>    
          <input type="text" name="writer" id="writer" className="form-control"/><br/>
          <label htmlFor="pass" className="form-label">비밀번호 : </label>
          <input type="password" name="pass" id="pass" className="form-control"/><br/>
          <label htmlFor="content" className="form-label" >내용 : </label>
          <textarea type="text" name="content" id="content"className="form-control"/><br/>
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  );
}