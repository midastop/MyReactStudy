import mysql from 'mysql2';

// MySQL Database 접속 Connection Pool 생성
const pool = mysql.createPool({  
  host: 'localhost',  // Local DB
  port: '3306',
  user: 'root',
  password: '12345678',
  database: 'node',  
  connectionLimit: 10
});

export default pool;