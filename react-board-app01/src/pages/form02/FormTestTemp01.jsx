// 제어 컴포넌트(Controlled Component) 폼 시리즈02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함

function FormTest01() {

  
  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form >
          <div className="my-3">
            <input type="text" name="name" className="form-control"/>
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"/>              
          </div>
          <div className="my-3">
            <select name="grade" className="form-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>            
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control"/>            
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}