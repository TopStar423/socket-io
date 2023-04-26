const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('init', () => {
    let num1 = 11;
    let num2 = 5;

    let num1IncrementTimes = 10;
    let num2IncrementTimes = 6;

    const interval = setInterval(() => {
      io.emit('increment', [num1, num2]);
      if (num1IncrementTimes > 0) {
        num1++;
        num1IncrementTimes--;
      }

      if (num2IncrementTimes > 0) {
        num2++;
        num2IncrementTimes--;
      }

      if (num1IncrementTimes === 0 && num2IncrementTimes === 0) {
        clearInterval(interval);
      }
    }, 1000);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
