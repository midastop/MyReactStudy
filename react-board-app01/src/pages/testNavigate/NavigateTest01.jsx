// Link를 사용하지 않고 다른 페이지로 이동시키는 샘플 예제01
import { useNavigate } from 'react-router-dom';

const NavigateTest01 = () => {

  // useNavigate Hook은 Link 컴포넌트를 사용하지 안고 다른 페이지로 이동할 때 사용
  const navigate = useNavigate();

  const goBack = () => {
    // history 이동 기록의 바로 이전으로 이동
    navigate(-1);
  };

  const getBoardWrite = () => {
    // /boardWrite로 이동
    navigate("/boardWrite");
  }

  const getBoardList = () => {
    // /boardList로 이동하면서 현재 페이지를 history 기록에 남기지 않음
    navigate("/boardList", { replace: true });
  }

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={getBoardWrite}>게시 글 쓰기</button>
      <button onClick={getBoardList}>게시 글 목록</button>
    </div>
  );
};

export default NavigateTest01;