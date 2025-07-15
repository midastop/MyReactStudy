// 제어 컴포넌트(Controlled Component) 폼 시리즈02
// React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트(Controled Component)라고 함
import { useState } from 'react';
export default function FormTest02() {
  
  // 여러 입력 값을 하나의 useState를 사용
  const [values, setValues] = useState({
    name: "",
    birth: "",
    grade: "",
    aboutMe: ""
  });

  // 유효성 검사 오류 메시지를 하나의 state로 
  const [errors, setErrors] = useState({
    name: "",
    birth: "",
    grade: "",
    aboutMe: ""
  });

  // 사용자가 폼 컨트롤에 입력을 완료했는지 여부
  const [inputed, setInputed] = useState({
    name: false,
    birth: false,
    grade: false,
    aboutMe: false
  });

  // 사용자가 폼 컨트롤을 떠나면
  const handleBlur = e => {
    setInputed({...inputed, [e.target.name]: true});
  };

  // 값이 변경되면 변경된 값으로 
  const handleChnage = (e) => {    
    setValues({...values, [e.target.name]: e.target.value});
  }

  // 폼의 값이 입력되었는지 유효성 검사하고 에러메시지 출력
  const validate = useCallback(() => {
    const errors = {
      name: "",
      birth: "",
      grade: "",
      aboutMe: ""
    };
    if(!values.name) {
      errors.name = '이름을 입력하세요';
    }
    if(!values.birth) {
      errors.birth = '생일을 입력하세요';
    }
    if(!values.grade) {
      errors.grade = '학년을 입력하세요';
    }
    if(!values.aboutMe) {
      errors.aboutMe = '자기소개를 입력하세요';
    }
    return errors;    
  }, [values]);

  // 유효성 검사 함수가 변경될 때 마다 호출
  useEffect(() => {
    const errors = validate();
    setErrors(errors);
  }, [validate]);

  const handleSubmit = e => {
    e.preventDefault();

    // 모든 폼 컨트롤 값을 입력했다고 설정
    setInputed({
      name: true,
      birth: true,
      grade :true,
      aboutMe: true
    });
    const errors = validate();
    setErrors(errors);

    if(Object.values(errors).some(v => v)) {
      // 유효성 검사에서 오류가 하나라도 있으면 함수 종료
      return false;
    }
    //axios를 이용해 폼 데이터를 백엔드 서버로 전송
  }
  
  return (
    <div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input type="text" name="name" className="form-control" 
              value={values.name} onChange={handleChnage} onBlur={handleBlur}/>
            { inputed.name && errors.name 
              && <span className="text-danger">{errors.name}</span>}  
          </div>
          <div className="my-3">
            <input type="date" name="birth" className="form-control"
              value={values.birth} onChange={handleChnage} onBlur={handleBlur}/> 
            {  inputed.name && errors.birth 
              && <span className="text-danger">{errors.birth}</span>}    
          </div>
          <div className="my-3">
            <select name="grade" className="form-select"
              value={values.grade} onChange={handleChnage} onBlur={handleBlur}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            { inputed.name && errors.grade 
              && <span className="text-danger">{errors.grade}</span>}              
          </div>
          <div className="my-3">
            <textarea name="aboutMe" className="form-control"
              value={values.aboutMe} onChange={handleChnage} onBlur={handleBlur}/>            
            { inputed.name && errors.aboutMe 
              && <span className="text-danger">{errors.aboutMe}</span>}       
          </div>
          <input type="submit" value="등록하기" />
        </form>  
      </div>
    </div>
  );
}