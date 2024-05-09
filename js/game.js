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

/**
 * Initializes the application's main elements and handlers.
 * Sets up the canvas, world object, title, description, and calculates responsive dimensions.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  titel = document.getElementById("titel");
  descripton = document.getElementById("descripton");
  rect = canvas.getBoundingClientRect();
  responsivH = rect.height / 480;
  responsivW = rect.width / 720;
}

/**
 * Event listener for keydown events to handle keyboard controls.
 * Updates the keyboard object based on the user's key presses.
 * @param {KeyboardEvent} event - The event object representing a keydown.
 */
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

/**
 * Event listener for keyup events to handle keyboard controls.
 * Updates the keyboard object based on the user's key releases.
 * @param {KeyboardEvent} event - The event object representing a keyup.
 */
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

/**
 * Handles touch start events on screen controls for mobile or touch-screen users.
 * Sets the appropriate movement flags in the keyboard object.
 * @param {string} id - The ID of the touch control that was activated.
 */
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

/**
 * Handles touch end events on screen controls, resetting the appropriate movement flags.
 * @param {string} id - The ID of the touch control that was deactivated.
 */
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

/**
 * Initializes touch and mouse control handling after the DOM has fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  let controller = document.getElementById("controller");
  toucheController(controller);
  mouseController(controller);
});

/**
 * Adds event listeners for touch interactions on the specified controller.
 * @param {HTMLElement} controller - The element that responds to touch interactions.
 */
function toucheController(controller) {
  controller.addEventListener(
    "touchstart",
    function (event) {
      if (event.cancelable) {
        event.preventDefault();
      }
      let actionId = event.target.closest("div[id]").id;
      handleTouchStart(actionId);
    },
    { passive: false }
  );
  controller.addEventListener(
    "touchend",
    function (event) {
      if (event.cancelable) {
        event.preventDefault();
      }
      let actionId = event.target.closest("div[id]").id;
      handleTouchEnd(actionId);
    },
    { passive: false }
  );
}

/**
 * Adds event listeners for mouse interactions on the specified controller.
 * @param {HTMLElement} controller - The element that responds to mouse interactions.
 */
function mouseController(controller) {
  controller.addEventListener("mousedown", function (event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    let actionId = event.target.closest("div[id]").id;
    handleTouchStart(actionId);
  });

  controller.addEventListener("mouseup", function (event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    let actionId = event.target.closest("div[id]").id;
    handleTouchEnd(actionId);
  });
}

/**
 * Toggles CSS classes for enabling fullscreen mode and hides other UI elements.
 */
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

/**
 * Adjusts UI scaling in response to window resizing.
 */
window.addEventListener("resize", function (event) {
  rect = canvas.getBoundingClientRect();
  responsivH = rect.height / 480;
  responsivW = rect.width / 720;
  checkDeviceAndOrientation();
});

/**
 * Handles mouse click events for interaction within the canvas.
 */
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

/**
 * Tracks mouse movement over the canvas and interacts with UI elements if applicable.
 */
document.addEventListener("mousemove", function (event) {
  if (canvas) {
    canvas = document.getElementById("canvas");
    rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    if (world && world.buttons) {
      hoverBtn(mouseX, mouseY);
    }
  }
});
/**
 * Checks if the coordinates (x, y) are within the boundaries of the specified button.
 * This function adjusts for responsive screen sizes.
 * @param {number} x - The x-coordinate to check.
 * @param {number} y - The y-coordinate to check.
 * @param {Object} btn - The button object with properties x, y, width, and height.
 * @returns {boolean} True if the coordinates are within the button's boundaries, false otherwise.
 */
function checkBtn(x, y, btn) {
  return (
    x >= btn.x * responsivW &&
    x <= (btn.x + btn.width) * responsivW &&
    y >= btn.y * responsivH &&
    y <= (btn.y + btn.height) * responsivH
  );
}

/**
 * Handles the cursor style on hover over interactive buttons.
 * Changes cursor to pointer if over a button, otherwise defaults to the default cursor.
 * @param {number} x - The x-coordinate of the mouse position.
 * @param {number} y - The y-coordinate of the mouse position.
 */
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

/**
 * Determines the device type and orientation to adjust UI components accordingly.
 */
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

/**
 * Checks if the current device is a mobile device based on the user agent string.
 * @param {string} userAgent - The navigator's user agent string.
 * @returns {boolean} True if the device is mobile, false otherwise.
 */
function checkIfMobileDevice(userAgent) {
  return (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    ) || /iPad/i.test(userAgent)
  );
}

/**
 * Adjusts the screen layout based on device orientation.
 * @param {ScreenOrientation} orientation - The current orientation of the device.
 * @param {HTMLElement} screenElement - The element representing the mobile screen display.
 * @param {HTMLElement} controller - The controller element for the game.
 */
function changeScreen(orientation, screenElement, controller) {
  if (orientation.type.startsWith("portrait")) {
    screenElement.classList.remove("none");
    controller.style.display = "none";
  } else {
    screenElement.classList.add("none");
    controller.style.display = "flex";
  }
}

/**
 * Initializes event listeners for device orientation and DOM content loaded.
 */
function initializeEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    checkDeviceAndOrientation();
  });

  window.addEventListener("orientationchange", () => {
    checkDeviceAndOrientation();
  });
}

initializeEventListeners();

/**
 * Requests fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
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

/**
 * Exits fullscreen mode, if active.
 */
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

/**
 * Toggles the fullscreen state of the page.
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    enterFullscreen(document.documentElement);
    document.body.classList.add("fullscreen-active");
  } else {
    exitFullscreen();
    document.body.classList.remove("fullscreen-active");
  }
}

/**
 * Determines if a click is on a button and triggers a specific action if it is.
 * @param {number} x - The x-coordinate of the click.
 * @param {number} y - The y-coordinate of the click.
 */
function checkChlick(x, y) {
  world.buttons.forEach((button, index) => {
    if (checkBtn(x, y, button)) {
      this.buttonClicked(index);
    }
  });
}

/**
 * Executes an action based on the button clicked.
 * @param {number} btn - The index of the button that was clicked.
 */
function buttonClicked(btn) {
  if (btn == 1) {
    toggleFullscreen();
  }
}
