let WS = new WebSocket('ws://192.168.1.210:10000/im');
console.log(WS);

WS.onopen = function(e) {
  console.log('open');
  WS &&
    WS.send(
      JSON.stringify({ token: '546yt454654', appkey: 'mayi', uid: 'hu4354shuai', serviceid: '' })
    );
};

WS.onmessage = function(event) {
  console.log('接收中');
  console.log(JSON.parse(event.data));
  let webSocket_status = JSON.parse(event.data);
  if (webSocket_status.cmd === 'enterroomreply') {
    console.log(webSocket_status.body);
  }
};

WS.onclose = function() {
  console.log('离开房间');
};

export default WS;
