import socket, {Server} from "socket.io";
import http from "http";

export default (http: http.Server) => {
  const io = new Server(http);

  io.on('connection', function(socket: any){
    console.log('SOCKET CONNECTED');
    socket.emit('111', 'asdasdasdasdasddd--!')
  })

  return io;
};