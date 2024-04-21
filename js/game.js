let canvas;
let world;
let keyboard = new Keyboard();
let scaleFactorX = 1;
let scaleFactorY = 1;

let titel;
let descripton;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  titel = document.getElementById("titel");
  descripton = document.getElementById("descripton");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.key === "a" || event.key === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.key === "w" || event.key === "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.key === "s" || event.key === "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.key === " ") {
    keyboard.SPACE = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.key === "a" || event.key === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.key === "w" || event.key === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.key === "s" || event.key === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.key === " ") {
    keyboard.SPACE = false;
  }
});

function addCssFullSize() {
  if (fullSize === true) {
    canvas.classList.add("fullSize");
    titel.classList.add("none");
    descripton.classList.add("none");
  } else {
    if (canvas.classList.contains("fullSize")) {
      canvas.classList.remove("fullSize");
      titel.classList.remove("none");
      descripton.classList.remove("none");
    }
  }
}

document.addEventListener("click", function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  keyboard.mouseX = mouseX;
  keyboard.mouseY = mouseY;
});

//function playOrBreak() {
//   if (play === false) {
//     play = true;
//     world.buttons[0] = new Buttons(
//       "/img/Diverse/icons8-wiedergabe-eingekreist-64.png",
//       590,
//       5
//     );
//   } else {
//     play = false;
//     world.buttons[0] = new Buttons(
//       "/img/Diverse/icons8-umkreiste-pause-64.png",
//       590,
//       5
//     );
//   }
// }
