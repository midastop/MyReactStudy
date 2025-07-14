// Link를 사용하지 않고 다른 페이지로 이동시키는 샘플 예제02
import { Navigate } from 'react-router-dom';

const NavigateTest02 = () => {
  const isLoggedIn = false;
  
  // Navigate 컴포넌트는 컴포넌트를 화면에 보여주는 순간 다른 페이지로 이동하고
  // 싶을 때 사용하는 컴포넌트로 페이지를 리다이렉트 하고 싶을 때 사용한다.
  // replace props은 현재 페이지를 history 기록에 남기지 않을 때 true를 지정
  if(!isLoggedIn) {
    return <Navigate to="/boardList" replace={ true } />
  }
  return <h3>마이 페이지</h3>
};

export default NavigateTest02;