const canvas = document.querySelector("canvas");
const canvasDiv = document.querySelector("canvas").parentElement;
const context = canvas.getContext("2d");
const socket = io();

let radius = 20;
const start = 0;
const end = Math.PI * 2;

let current = {
  color: "black",
};

let drawing = false;

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseout", onMouseUp);

socket.on("drawing", onDrawingEvent);

const onResize = () => {
  canvas.width = canvasDiv.offsetWidth;
  canvas.height = canvasDiv.offsetHeight;
  context.lineWidth = radius * 2;
};

window.addEventListener("resize", onResize, false);
onResize();

function drawLine(x0, y0, x1, y1, color, emit) {
  console.log("Currnet location: " + x0 + " " + y0);
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.strokeStyle = color;
  context.lineWidth = current.lineWidth;
  context.lineCap = "round";
  context.stroke();
  context.closePath();

  if (!emit) {
    return;
  }
  let myCanvasWidth = canvas.width;
  let myCanvasHeight = canvas.height;

  socket.emit("drawing", {
    x0: x0 / myCanvasWidth,
    y0: y0 / myCanvasHeight,
    x1: x1 / myCanvasWidth,
    y1: y1 / myCanvasHeight,
    color: color,
  });
}

function onMouseDown(event) {
  drawing = true;
  current.x = event.clientX || event.touches[0].clientX;
  current.y = event.clientY || event.touches[0].clientY;
}

function onMouseUp(event) {
  if (!drawing) {
    return;
  }
  drawing = false;
  drawLine(
    current.x,
    current.y,
    event.clientX || event.touches[0].clientX,
    event.clientY || event.touches[0].clientY,
    current.color,
    true
  );
}

function onMouseMove(event) {
  console.log("Currnet location: " + event.clientX + " " + event.clientY);
  if (!drawing) {
    return;
  }
  drawLine(
    current.x,
    current.y,
    event.clientX || event.touches[0].clientX,
    event.clientY || event.touches[0].clientY,
    current.color,
    true
  );
  current.x = event.clientX || event.touches[0].clientX;
  current.y = event.clientY || event.touches[0].clientY;
}

function onColorUpdate(event) {
  current.color = event.target.className.split(" ")[1];
}

function onDrawingEvent(data) {
  let myCanvasWidth = canvas.width;
  let myCanvasHeight = canvas.height;
  drawLine(
    data.x0 * myCanvasWidth,
    data.y0 * myCanvasHeight,
    data.x1 * myCanvasWidth,
    data.y1 * myCanvasHeight,
    data.color
  );
}

function getCanvasDimensions() {
  return {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  };
}
