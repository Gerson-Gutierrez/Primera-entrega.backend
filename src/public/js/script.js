const socket = io();
socket.emit('nombre_mensaje', 'Data enviada desde frontend')