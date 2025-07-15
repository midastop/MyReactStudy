import { Navigate } from 'react-router-dom';
const NavigateTest02 = () => {
  const isLogin = false;
  if(!isLogin) {
    return <Navigate to="/boardList" replace={true} />
  } else {
    return <h3>마이 페이지</h3>
  }
};

export default NavigateTest02;