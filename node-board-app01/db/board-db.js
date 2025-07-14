// 게시판에 대한 DB 작업을 전담하는 모듈
import mysql1 from './mysql2-conn.js'; // mysql2 ConnectionPool
import { dateFormat } from '../utils/utils.js' // 날짜 포맷 함수 
import mysql2 from './mysql2-promise-conn.js'; // mysql2/promise ConnectionPool

// mysql2 Pool을 이용해 DB에서 게시 글 목록을 읽어오는 함수
export const boardList = async () => { 
  // Pool.promise() 함수를 이용해 Pool 객체를 구함
  const connPool = await mysql1.promise();   
  const [rows] = await connPool.query("SELECT * FROM nodebbs ORDER BY no DESC");
  connPool.releaseConnection(); // 컨넥션 풀에 커넥션 반환
  const bList = [];
  // rows를 그대로 반환해도 되지만 reg_date 출력 포맷을 맞추기 위한 추가 작업
  rows.forEach((row) => {
    bList.push(
        { no: row.no, 
          title: row.title, 
          writer: row.writer, 
          content: row.content,
          reg_date: dateFormat(row.reg_date, "-", "dt"),
          read_count: row.read_count,
          file1: row.file1
        });              
  }); // end forEach() 
  return bList;
  //return {bList: bList, title: 'boardList01'}
}

// mysql2/promise PoolConnection을 이용해 DB에서 게시 글 목록을 읽어오는 함수
export const boardList02 = async () => {
  // PoolConnection 객체를 구함  
  const conn = await mysql2.getConnection(async conn => conn);   
  const [bList] = await conn.query("SELECT * FROM nodebbs ORDER BY no DESC"); 
  conn.release(); // 컨넥션 풀에 커넥션 반환 
  return bList;
  //return {bList: bList, title: 'boardList02'}
}

// mysql2 Pool을 이용해 DB에서 no에 해당하는 게시 글 정보를 읽어오는 함수
export const getBoard = async (no) => { 
  // Pool.promise() 함수를 이용해 Pool 객체를 구함
  const connPool = await mysql1.promise();   
  const [board] = await connPool.query("SELECT * FROM nodebbs WHERE no=?", [no]);
  connPool.releaseConnection(); // 컨넥션 풀에 커넥션 반환
  return board;
}

// mysql2 Pool을 이용해 DB에 게시 글 정보를 추가하는 함수
export const insertBoard = async (board) => { 
  // Pool.promise() 함수를 이용해 Pool 객체를 구함
  const connPool = await mysql1.promise();   
  const [result] = await connPool.query(
                      "INSERT INTO nodebbs(title, writer, pass, content, read_count, reg_date) "
                      + "VALUES(?, ?, ?, ?, 0, SYSDATE())", 
                        [board.title, board.writer, board.pass, board.content]);
  connPool.releaseConnection(); // 컨넥션 풀에 커넥션 반환
  console.log(result);
  return result;
}

// mysql2 Pool을 이용해 DB에서 게시 글 정보를 수정하는 함수
export const updateBoard = async (board) => { 
  // Pool.promise() 함수를 이용해 Pool 객체를 구함
  const connPool = await mysql1.promise();   
  const [result] = await connPool.query(
                      "UPDATE nodebbs SET title=?, content=?, reg_date=SYSDATE() "
                      + "WHERE no=?", 
                        [board.title, board.content, board.no]);
  connPool.releaseConnection(); // 컨넥션 풀에 커넥션 반환
  console.log(result);
  return result;
}

// mysql2 Pool을 이용해 DB에서 게시 글을 삭제하는 함수
export const deleteBoard = async (no) => { 
  // Pool.promise() 함수를 이용해 Pool 객체를 구함
  const connPool = await mysql1.promise();   
  const [result] = await connPool.query(
                      "DELETE FROM nodebbs WHERE no=?", [no]);
  connPool.releaseConnection(); // 컨넥션 풀에 커넥션 반환
  console.log(result);
  return result;
}