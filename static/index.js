
document.addEventListener("DOMContentLoaded", () => {

    const socket = io();

    let room;

    let id;

    // const join_button = document.querySelector("#join");
    socket.on("meConnected", (message) => {
      id = message;
      localStorage.setItem("userConnected", message);
      // document.querySelector("#root").append(message);
      // document.querySelector("#root").innerHTML += "<br/>"
    })

    socket.on("userConnected", (message) => {


      id = message;
      //localStorage.setItem("userConnected", message);
      document.querySelector("#root").append(message);
      document.querySelector("#root").innerHTML += "<br/>"
    })

    // join_button.onclick = () => {
    //   socket.emit("join_room", "WEB50", (res) => {
    //     room = res;
    //     document.querySelector("#root").innerText = `Te has unido a la sala ${room}`;
    //     document.querySelector("#root").innerHTML += "<br/>"
    //   });
    // }

    // socket.on("userConnected", (message) => {
    //   document.querySelector("#root").append(message);
    //   document.querySelector("#root").innerHTML += "<br/>"
    // })

    const send_message = document.querySelector("#send-message");

    send_message.onclick = () => {
      const user = localStorage.getItem("userConnected");

      const message = document.querySelector("#message-input").value+" "+user;
      // console.log('test');

      console.log(message);

      socket.emit("message", message);
      document.querySelector("#message-input").value = '';

    }

    socket.on("message", data => {
      console.log(data);
      const html = `<div class="mensaje">${data}</div>`;

      document.querySelector("#root").innerHTML += html;
      //document.querySelector("#root").innerHTML += "<br/>";
    })
})