var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/keyboard', (req, res) => {
  const data = {
    'type': 'buttons',
    'buttons': ["사진", "나이", "성별"]
  };
  
  res.set({
    'content-type': 'application/json'
  }).json(data);
});

router.post('/message', (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };
  
  let send = {
    "message": {},
    "keyboard": {
      "type": "buttons",
      "buttons": [
        "사진",
        "나이",
        "성별",
      ]
    }
  };
  
  switch(_obj.content) {
    case '사진':
      send['message']['text'] = '멍이 사진 투척';
      send['message']['photo'] = {
        'url': `/images/mung/mung-1.jpeg`,
        "width": 640,
        "height": 480
      };
      break;
    case '나이':
      send['message']['text'] = '8살!';
      break;
    case '성별':
      send['message']['text'] = '수컷 (중성화)';
      break;
    default:
      send['message']['text'] = '잘못된 선택입니다.';
  }
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(send));
});

router.post('/friend', (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success:true}));
});

router.delete('/friend', (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success:true}));
});

router.delete('/chat_room/:user_key', (req, res) => {
  const user_key = req.params.user_key;
  console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success:true}));
});

module.exports = router;
