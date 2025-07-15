import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardWriteFormPage from './pages/BoardWriteFormPage';
import BoardUpdateFormPage from './pages/BoardUpdateFormPage';
import NavigateTest01 from './pages/testNavigate/NavigateTest01';
import NavigateTest02 from './pages/testNavigate/NavigateTest02';
import TestForm01 from './pages/form01/TestForm01';
import FormTest01 from './pages/form02/FormTest04';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="container"> 
      {/* BrowserRouter는 HTML5의 History API를 사용해 페이지를 새로 불러오지
          않고도 주소를 변경하고 현재 주소의 경로에 대한 정보를 React 컴포넌트로
          전달해 사용할 수 있도록 지원한다. */}
      <BrowserRouter>
        <Header />
        {/* React Router v6에서 이전 버전에서 사용한 Switch 대신 Routes 사용 
          Routes 컴포넌트 안에는 Route 컴포넌트만 포함할 수 있음 */}
        <Routes>           
          <Route path="/" element={ <BoardListPage /> } />
          <Route path="/boardList" element={ <BoardListPage /> } />          
          <Route path="/boardDetail" element={ <BoardDetailPage /> } />            
          <Route path="/boardWrite" element={ <BoardWriteFormPage /> } />
          <Route path="/boardUpdate" element={ <BoardUpdateFormPage /> } />
          <Route path="/form01" element={ <TestForm01 /> } />
          <Route path="/form02" element={ <FormTest01 /> } />          
          <Route path="/navigate01" element={ <NavigateTest01 /> } />
          <Route path="/navigate02" element={ <NavigateTest02 /> } />          
          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
