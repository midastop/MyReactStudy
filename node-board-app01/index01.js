import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import mysql from './db/mysql2-conn.js'; // MySQL ConnectionPool

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

// 게시 글 목록 요청을 처리하는 라우터
app.get("/", async (req, res) => {
  mysql.getConnection((err, conn) => {
    if(err) throw err;
    conn.query(
      "SELECT * FROM nodebbs ORDER BY no DESC",
      (err, rows, fields) => {
        if(err) {
          console.log(err);        
          res.status(500).send('Internal Server Error');
        }  
        conn.release(); // 컨넥션 풀에 커넥션 반환
        
        // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달하면
        // 위에서 템플릿 엔진 파일 형식을 html로 설정하고 Nunjucks 환경 설정에서
        // 'views' 폴더를 지정했기 때문에 /views/main.html 찾아서 렌더링 해 준다.        
        res.render("main", {bList: rows});
    });
  });
});

app.listen(3000, () => {
  console.log(`Board App 서버 시작 - http://localhost:3000/`);
});