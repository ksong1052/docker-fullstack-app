// 필요한 모듈들을 가져오기 

const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

// Express 서버를 실행
const app = express();
const PORT = 5000;

// json 형태로 오는 요청의 본문을 해석해 줄 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
// db.pool.query(`CREATE TABLE lists (
//   id INTEGER AUTO_INCREMENT,
//   value TEXT,
//   PRIMARY KEY (id)
// )`, (err, results, fields) => {
//   console.log('results', results)
// })


// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values' , (req, res) => {
  // 데이터베이스에서 모든 정보 가져오기
  db.pool.query('SELECT * FROM lists', (err, results, fields) => {
    if(err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// 클라이언트에서 입력한 값을 DB에 저장
app.post('/api/value' , (req, res, next) => {
  // 데이터베이스에서 모든 정보 가져오기
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, 
    (err, results, fields) => {
      if(err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});




app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}`);
})
