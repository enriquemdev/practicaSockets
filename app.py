from flask import Flask, render_template
from flask_socketio import emit, join_room, leave_room, SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

clients_arr = []

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def connect():
    # //currentSocketId = request.namespace.socket.sessid
    global clients_arr
    clients_arr.append("cliente")
    emit('meConnected', len(clients_arr), broadcast=False, include_self=True)
    emit('userConnected', len(clients_arr), broadcast=True, include_self=False)
    
    
# ///////////////////////
# @socketio.on("join_room")
# def entrar(room):
#     # Ingresamos al usuario a la room
#     join_room(room)

#     # Emitimos un aviso a los usuarios conectados a la room, exceptuando a la persona que se unio
#     emit('mensaje', f'Un usuario ha entrado a la sala {room}', broadcast=False, include_self=False, to=room)

#     # Mandamos una respuesta al evento emit del cliente
#     return room


@socketio.on("message") 
def message(data):
  print(data)
  emit("message", data,  broadcast=True, include_self=True)
    


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
  