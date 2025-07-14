import express from 'express';
import mysql from 'mysql2';

// MySQL Database 접속 Connection Pool 생성
const pool = mysql.createPool({
  //host: 'mydb01.cduqdrg6nsoz.ap-northeast-2.rds.amazonaws.com',  // AWS DB
  host: 'localhost',  // Local DB
  port: '3306',
  user: 'root',
  password: '12345678',
  database: 'node',  
  connectionLimit: 10
});

// Express 서버 인스턴스 생성
const app = express();

// 게시 글 목록 요청을 처리 라우터
app.get("/", async (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) throw err;
    conn.query(
      "SELECT * FROM nodebbs ORDER BY no DESC",
      (err, rows, fields) => {
        if(err) throw err;
        console.log(rows);
        conn.release(); // 컨넥션 풀에 커넥션 반환
        res.json(rows); // DB에서 읽어온 데이터는 JSON으로 응답
    });
  });
});

app.listen(3030, () => {  
  console.log(`MySQL Connection 서버 시작 - http://localhost:3030/`);
});