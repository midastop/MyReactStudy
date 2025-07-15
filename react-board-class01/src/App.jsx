import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardWriteFormPage from './pages/BoardWriterFormPage';
import BoardUpdateFormPage from './pages/BoardUpdateFormPage';
import NavigatorTest01 from './navigator/NavigatorTest01'
import NavigatorTest02 from './navigator/NavigatorTest02';
import FormTest03 from './pages/formTest01/FormTest03';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <BoardListPage /> } />
          <Route path="/boardList" element={ <BoardListPage /> } />
          <Route path="/boardDetail" element={ <BoardDetailPage /> } />
          <Route path="/boardWrite" element={ <BoardWriteFormPage /> } />
          <Route path="/boardUpdate" element={ <BoardUpdateFormPage /> } />          
          <Route path="/navigate01" element={ <NavigatorTest01 /> } />
          <Route path="/navigate02" element={ <NavigatorTest02 /> } />
          <Route path="/formTest03" element={ <FormTest03 /> } />
          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
