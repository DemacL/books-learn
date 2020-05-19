let socketio = require("socket.io");
let io;

let guestNumber = 1; // 访客序号 访客名由序号追加一个随机字符串

const nickNames = new Map();// sockid与名字的映射 用对象改成Map结构

const currentRoom = {};// 用户sock_id和其对应的room映射

//启动 socketio 服务器
exports.listen = function (server) {

  io = socketio.listen(server); // 启动socketio服务器,允许它搭载到已有的 http 服务器
  io.set('log level', 1);
  io.sockets.on('connection', function (socket) {      //定义每个用户连接的处理逻辑
    assignGuestName(socket, nickNames);   //在用户连接上来时赋予其一个访客名
    joinRoom(socket, 'Lobby');  //用户连接上时把他放入聊天室Lobby

    //处理用户的消息, 更名以及聊天室的创建与变更
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames);
    handleRoomJoining(socket);

    //用户发出请求时, 向其提供可用的聊天室列表
    socket.on('rooms', function () {
      // socket.emit('rooms', io.sockets.manager.rooms);   //1.0之前的api 确定有哪些用户在房间里
      const rooms = io.sockets.adapter.rooms;
      socket.emit('rooms', Object.keys(rooms).filter(room=>!nickNames.has(room)));
    });

    //定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket, nickNames);
  });

};

//分配用户昵称
function assignGuestName(socket, nickNames) {
  const name = `Guest${guestNumber++}[${Math.random().toString(32).substring(2).slice(0,6)}]`;// 生成新昵称
  nickNames.set(socket.id, name); //把客户昵称与客户端连接ID关联
  socket.emit('nameResult', { //让当前用户知道自己的昵称
    success: true,
    name: name
  });
  return name;
}

//与进入聊天室相关的逻辑
function joinRoom(socket, room) {
  socket.join(room);      //让用户进入房间
  currentRoom[socket.id] = room;      //记录用户的当前房间
  socket.emit('joinResult', { room: room });    //让用户知道他们进入了新房间
  socket.broadcast.to(room).emit('message', {      //让房间里的其他用户知道有新用户进入
    text: nickNames.get(socket.id) + ' 进入了房间： ' + room + '.'
  });

  // var usersInRoom = io.sockets.clients(room);     //1.0之前的api 确定有哪些用户在房间里
  const usersInRoom = io.sockets.adapter.rooms[room];   // 确定有哪些用户在房间里

  if (usersInRoom.length > 1) {     //如果不止一个用户在这个房间内,汇总一下其它都有谁
    let usersInRoomSummary = room + '房间用户:';
    usersInRoomSummary += Object.keys(usersInRoom.sockets).filter(item => item !== socket.id).map(id => nickNames.get(id)).join(', ') + '.';
    socket.emit('message', { text: usersInRoomSummary }); //将房间里其他用户的汇总发送给这个用户
  }
}

//更名请求的逻辑
function handleNameChangeAttempts(socket, nickNames) {
  socket.on('nameAttempt', function (name) {      //添加 nameAttempt 事件监听器
    if (name.indexOf('Guest') == 0) {     //昵称不能以Guest 开头
      socket.emit('nameResult', {
        success: false,
        message: '名字不能以“Guest”开头'
      });
    } else {
      if (![...nickNames.values()].includes(name)) { //如果昵称还没注册则可以执行更名操作
        const previousName = nickNames.get(socket.id);
        nickNames.set(socket.id, name); // 更新成新昵称
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' 修改昵称为 ' + name + '.'
        })
      } else {      //如果昵称已被占用则提示用户
        socket.emit('nameResult', {
          success: false,
          message: '名字已被使用'
        })
      }
    }
  })
}

//发送聊天消息
function handleMessageBroadcasting(socket, nickNames) {
  socket.on('message', function (message) {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames.get(socket.id) + ": " + message.text
    });
  });
}

//创建房间
function handleRoomJoining(socket) {
  socket.on('join', function (room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  })
}

//用户断开连接
function handleClientDisconnection(socket, nickNames) {
  socket.on('disconnect', function () {
    nickNames.delete(socket.id);// 用户断开连接后，删除该用户
  })
}