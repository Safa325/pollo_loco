let canvas;
let world;
let keyboard = new Keyboard();
let scaleFactorX = 1;
let scaleFactorY = 1;
let audio;
let titel;
let descripton;
let rect;
let responsivH;
let responsivW;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  titel = document.getElementById("titel");
  descripton = document.getElementById("descripton");
  rect = canvas.getBoundingClientRect();
  responsivH = rect.height / 480;
  responsivW = rect.width / 720;
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
  if (event.key === " ") {
    keyboard.SPACE = false;
  }
});

function handleTouchStart(id) {
  switch (id) {
    case "left":
      keyboard.LEFT = true;
      break;
    case "right":
      keyboard.RIGHT = true;
      break;
    case "jump":
      keyboard.UP = true;
      break;
    case "throw":
      keyboard.SPACE = true;
      break;
  }
}

function handleTouchEnd(id) {
  switch (id) {
    case "left":
      keyboard.LEFT = false;
      break;
    case "right":
      keyboard.RIGHT = false;
      break;
    case "jump":
      keyboard.UP = false;
      break;
    case "throw":
      keyboard.SPACE = false;
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let controller = document.getElementById("controller");
  toucheController(controller);
  mouseController(controller);
});

function toucheController(controller) {
  controller.addEventListener(
    "touchstart",
    function (event) {
      let actionId = event.target.closest("div[id]").id;
      handleTouchStart(actionId);
    },
    { passive: true }
  );
  controller.addEventListener(
    "touchend",
    function (event) {
      let actionId = event.target.closest("div[id]").id;
      handleTouchEnd(actionId);
    },
    { passive: true }
  );
}

function mouseController(controller) {
  controller.addEventListener("mousedown", function (event) {
    let actionId = event.target.closest("div[id]").id;
    handleTouchStart(actionId);
  });

  controller.addEventListener("mouseup", function (event) {
    let actionId = event.target.closest("div[id]").id;
    handleTouchEnd(actionId);
  });
}

function addCssFullSize() {
  if (world.fullSize === true) {
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

window.addEventListener("resize", function (event) {
  rect = canvas.getBoundingClientRect();
  responsivH = rect.height / 480;
  responsivW = rect.width / 720;
  checkDeviceAndOrientation();
});

document.addEventListener("click", function (event) {
  rect = canvas.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;
  keyboard.mouseX = mouseX;
  keyboard.mouseY = mouseY;
  keyboard.scaleX = responsivW;
  keyboard.scaleY = responsivH;
  checkChlick(keyboard.mouseX, keyboard.mouseY);
});

document.addEventListener("mousemove", function (event) {
  rect = canvas.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;

  hoverBtn(mouseX, mouseY);
});

function checkBtn(x, y, btn) {
  if (
    x >= btn.x * responsivW &&
    x <= btn.x * responsivW + btn.width * responsivW &&
    y >= btn.y * responsivH &&
    y <= btn.y * responsivH + btn.height * responsivH
  ) {
    return true;
  } else {
    return false;
  }
}

function hoverBtn(x, y) {
  let isCursorOverButton = false;

  world.buttons.forEach((button) => {
    if (checkBtn(x, y, button)) {
      canvas.style.cursor = "pointer";
      isCursorOverButton = true;
    }
  });

  if (!isCursorOverButton) {
    canvas.style.cursor = "default";
  }
}

function checkDeviceAndOrientation() {
  let screenElement = document.getElementById("mobileScreen");
  let controller = document.querySelector(".controller");
  let userAgent = navigator.userAgent;
  let isMobile = checkIfMobileDevice(userAgent);
  let orientation = screen.orientation || window.orientation;
  if (isMobile) {
    changeScreen(orientation, screenElement, controller);
  } else {
    controller.style.display = "none";
  }
}

function checkIfMobileDevice(userAgent) {
  return (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    ) || /iPad/i.test(userAgent)
  );
}

function changeScreen(orientation, screenElement, controller) {
  if (orientation.type.startsWith("portrait")) {
    screenElement.classList.remove("none");
    controller.style.display = "none";
  } else {
    screenElement.classList.add("none");
    controller.style.display = "flex";
  }
}

function initializeEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    checkDeviceAndOrientation();
  });

  window.addEventListener("orientationchange", () => {
    checkDeviceAndOrientation();
  });
}

initializeEventListeners();

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari & Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    enterFullscreen(document.documentElement);
    document.body.classList.add("fullscreen-active");
  } else {
    exitFullscreen();
    document.body.classList.remove("fullscreen-active");
  }
}

function checkChlick(x, y) {
  world.buttons.forEach((button, index) => {
    if (
      x >= button.x * keyboard.scaleX &&
      x <= button.x * keyboard.scaleX + button.width * keyboard.scaleX &&
      y >= button.y * keyboard.scaleY &&
      y <= button.y * keyboard.scaleY + button.height * keyboard.scaleY
    ) {
      this.buttonClicked(index);
    }
  });
}

function buttonClicked(btn) {
  if (btn == 1) {
    toggleFullscreen();
  }
}
