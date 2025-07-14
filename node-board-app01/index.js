import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import cors from 'cors';
import * as boardDB from './db/board-db.js'; // 게시 글에 대한 DB 작업을 전담하는 모듈

// path 모듈의 resolve() 함수를 이용해 현재 실행되는 파일의 절대 경로를 구함
const __dirname = path.resolve();
console.log("__dirname : ", __dirname);

// Express 서버 인스턴스 생성 - app은 express의 기능을 담고 있는 객체
const app = express();

// req.body를 사용해서 요청 본문의 데이터를 받기 위한 미들웨어
// Express v4.16.0에서 body-paraser가 빌트인 되어 별도의 모듈이 필요없음
// JSON 미들웨어를 사용하지 않으면 req.body는 undefined가 반환됨
app.use(express.json());

// POST 요청 시 Content-type이 application/x-www-form-urlencoded인 
// 경우 파싱해 주는 설정으로 JSON 미들웨어와 같이 사용해야 함
app.use(express.urlencoded({ extended: true }));

// CSS, JavaScript, html 파일과 같은 정적 파일을 제공하려면 Express에서
// 기본 제공하는 미들웨어인 static() 함수의 인수로 정적 파일을 제공할
// 디렉터리를 지정하면 된다. 아래와 같이 public 디렉터리가 지정되면
// public/index.css 파일은 http://localhost:3000/index.css로 지정하면 됨
app.use(express.static(path.join(__dirname, 'public')))

// 템플릿 엔진을 사용하는 설정으로 템플릿 엔진의 파일 확장자를 html로 설정
// 파일 확장자는 꼭 html이 아니어도 되며 임의로 설정할 수 있음
app.set('view engine', 'html');  // main.html => main

// 뷰 페이지의 경로를 지정해 Nunjucks 환경 설정
nunjucks.configure('views', {
  watch: true,  // html 파일이 수정되면 수정된 내용을 반영하여 다시 렌더링
  express: app
});

// CORS 미들웨어 설정
// 브라우저에서는 보안적인 이유로 cross-origin HTTP 요청들을 제한한다.
// cross-origin 요청은 서버의 동의가 필요하며 만약 서버가 동의하지
// 않는다면 브라우저는 요청을 거절하고 서버가 동의하면 요청을 허락한다.
// 이렇게 동의를 구하여 거절과 허락으로 동작하는 매커니즘은 HTTP Header를
// 이용해 처리되는데 이를 CORS(Cross-Origin Resource Sharing)라고 부른다.
// http://www.naver.com:8080과 같이 URL에서 프로토콜, Host, 포트 번호까지를
// Origin이라고 부르며 이 부분이 하나라도 다르면 Cross-Origin이 된다.

// 모든 출처(Origin)에서 접근이 가능하도록 설정하려면 origin에 "*"를 지정
// 아래는 http://localhost:5173, http://127.0.0.1:35173 에서만 접근 허용한 설정

// Credentials란 쿠키나 Authorization 인증 헤더 또는 TLS Client Certificates
// (증명서)와 같은 자격 인증 정보를 의미하며 요청과 응답에서 쿠키를 허용하려면
// 아래와 같이 credentials 값을 true로 설정하면 된다.
/*
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
  credentials: true,
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));
*/

//#######################################################################################
// JSON 응답 라우터 시작
//#######################################################################################
// 게시 글 목록 요청을 처리하는 라우터
app.get("/", async (req, res) => {    
  const bList = await boardDB.boardList();
  console.log("boardList");

  res.setHeader('Access-Control-Allow-origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 게시 글 리스트를 JSON으로 응답
  res.json(bList);
});

// 게시 글 상세보기 요청을 처리하는 라우터
app.get("/boardDetail", async (req, res) => {
  /* Query String 방식은 request 객체의 query 속성으로 값을 받을 수 있음
   * req 객체의 query 속성으로 keyword 읽기 : const no = req.query.keywrod; 
   **/
  const no = req.query.no
  const [board] = await boardDB.getBoard(no);
  console.log("boardDetail");

  // 게시 글 하나의 정보를 JSON으로 응답
  res.json(board);
});

// 게시 글 쓰기 폼에서 들어오는 게시 글 등록 요청을 처리하는 라우터
app.post("/writeBoard", async (req, res) => {
  // 요청 본문으로 들어오는 데이터를 req.body로 받으면 객체로 받음
  console.log(req.body)
  await boardDB.insertBoard(req.body);
  console.log("writeBoard");

  // 게시 글 쓰기가 완료되면 true를 JSON으로 응답
  res.json({ result: true });
});

// 게시 글 수정 폼 요청을 처리하는 라우터
app.get("/update/:no/:pass", async(req, res) => {
  /* Path Variable : 경로 구분자(/)로 데이터를 구분해서 받는 방식
   * 요청 url : update/10/wj1234
   * 라우팅 설정 : "/detail/:no/:pass"
   * Path Variable 방식은 request 객체의 params 속성으로 값을 받음
   **/
   let no = req.params.no;
   let pass = req.params.pass;
   console.log("no : ", no, " - pass : ", pass);
   
   const [board] = await boardDB.getBoard(no);  
 
   // 비밀번호를 체크해서
   if(board.pass != pass) { // 틀리면 result를 false, board는 undefined를 JSON으로 응답
    res.json({ result: false, board: undefined });    
 
   } else { // 맞으면 result를 true, no에 해당하는 게시 글 정보를 JSON으로 응답
     res.json({ result: true, board: board });
   }
 });

// 게시 글 수정 폼에서 들어오는 게시 글 수정 요청을 처리하는 라우터
app.post("/update", async(req, res) => {
  // 요청 본문으로 들어오는 데이터를 req.body로 받으면 객체로 받음
  const [board] = await boardDB.getBoard(req.body.no);  

  // 비밀번호를 체크해서
  if(board.pass != req.body.pass) { // 틀리면 result는 false를 JSON으로 응답      
    res.json({ result: false });

  } else { // 맞으면 게시 글 정보를 수정하고
    await boardDB.updateBoard(req.body);

    // 게시 글 수정이 완료되면 result는 true를 JSON으로 응답
    res.json({ result: true });
  }
});

// 게시 글 삭제 요청을 처리하는 라우터
app.post("/delete", async (req, res) => {
  // 요청 본문으로 들어오는 데이터를 req.body로 받으면 객체로 받음
  const [board] = await boardDB.getBoard(req.body.no);  

  // 비밀번호를 체크해서
  if(board.pass != req.body.pass) { // 틀리면 result는 false를 JSON으로 응답      
    res.json({ result: false });

  } else { // 맞으면 게시 글을 삭제하고  
    await boardDB.deleteBoard(req.body.no);
    
    // 게시 글 삭제가 완료되면 result는 true를 JSON으로 응답
    res.json({ result: true });
  }
});
//#######################################################################################
// JSON 응답 라우터 종료
//#######################################################################################



//#######################################################################################
// 뷰에 렌더링 되는 라우터 시작
//#######################################################################################
// boardList 요청을 처리하는 라우터
app.get("/boardList", async (req, res) => {
    
  const bList = await boardDB.boardList();
  res.render("main", { bList: bList });
});

// 게시 글 상세보기 요청을 처리하는 라우터
app.get("/boardDetailView", async (req, res) => {
  /* Query String 방식은 request 객체의 query 속성으로 값을 받을 수 있음
   * req 객체의 query 속성으로 keyword 읽기 : const no = req.query.keywrod; 
   **/
  const no = req.query.no
  const [board] = await boardDB.getBoard(no);

  // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달
  res.render("boardDetail", { board: board });
});

// 게시 글 쓰기 폼 요청을 처리하는 라우터
app.get("/writeBoardView", async (req, res) => {
  // 응답 객체의 render() 함수로 뷰의 이름을 전달
  res.render("writeForm");
});

// 게시 글 쓰기 폼에서 들어오는 게시 글 등록 요청을 처리하는 라우터
app.post("/writeBoardView", async (req, res) => {
  // 요청 본문으로 들어오는 데이터를 req.body로 받으면 객체로 받음
  console.log(req.body)
  await boardDB.insertBoard(req.body);

  // 게시 글 쓰기가 완료되면 리다이렉트 시킴
  res.redirect("/boardList");
});

// 게시 글 수정 폼 요청을 처리하는 라우터
app.get("/updateView/:no/:pass", async(req, res) => {
 /* Path Variable : 경로 구분자(/)로 데이터를 구분해서 받는 방식
  * 요청 url : update/10/wj1234
  * 라우팅 설정 : "/detail/:no/:pass"
  * Path Variable 방식은 request 객체의 params 속성으로 값을 받음
  **/
  let no = req.params.no;
  let pass = req.params.pass;
  console.log("no : ", no, " - pass : ", pass);
  
  const [board] = await boardDB.getBoard(no);  

  // 비밀번호를 체크해서
  if(board.pass != pass) { // 틀리면 틀리다고 알림으로 응답      
    res.send(`<script>
              alert('비밀번호가 틀립니다.');
              history.back();
            </script>`);

  } else { // 맞으면 게시 글 정보를 읽어와 게시 글 수정 폼에 출력    
    res.render("updateForm", { board: board });
  }
});

// 게시 글 수정 폼에서 들어오는 게시 글 수정 요청을 처리하는 라우터
app.post("/updateView", async(req, res) => {
  // 요청 본문으로 들어오는 데이터를 req.body로 받으면 객체로 받음
  const [board] = await boardDB.getBoard(req.body.no);  

  // 비밀번호를 체크해서
  if(board.pass != req.body.pass) { // 틀리면 틀리다고 알림으로 응답      
    res.send(`<script>
              alert('비밀번호가 틀립니다.');
              history.back();
            </script>`);

  } else { // 맞으면 게시 글 정보를 수정하고 리다이렉트    
    await boardDB.updateBoard(req.body);

    // 게시 글 수정이 완료되면 리다이렉트 시킴
    res.redirect("/boardList");
  }
});

// 게시 글 삭제 요청을 처리하는 라우터
app.post("/deleteView", async (req, res) => {
  // 요청 본문으로 들어오는 데이터를 req.body로 받으면 객체로 받음
  const [board] = await boardDB.getBoard(req.body.no);  

  // 비밀번호를 체크해서
  if(board.pass != req.body.pass) { // 틀리면 틀리다고 알림으로 응답      
    res.send(`<script>
              alert('비밀번호가 틀립니다.');
              history.back();
            </script>`);

  } else { // 맞으면 게시 글을 삭제하고 리다이렉트    
    await boardDB.deleteBoard(req.body.no);
    
    // 게시 글 삭제가 완료되면 리다이렉트 시킴
    res.redirect("/boardList");
  }
});
//#######################################################################################
// 뷰에 렌더링 되는 라우터 종료
//#######################################################################################

app.listen(3010, () => {
  console.log(`React Board App 서버 시작 - http://localhost:3010/`);
});