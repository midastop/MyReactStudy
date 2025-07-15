import { useNavigate } from 'react-router-dom'

const NavigateTest01 = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const getBoardWrite = () => {
    navigate("/boardWrite");
  }
  const getBoardList = () => {
    // replace :true는 history 기록에 남기지 않고 이동
    navigate("/boardList", {replace: true});
  }
  return (
    <div>
      <button onClick={goBack}>뒤로 가기</button>
      <button onClick={getBoardWrite}>게시 글 쓰기</button>
      <button onClick={getBoardList}>게시 글 목록</button>
    </div>
  );
}

export default NavigateTest01;