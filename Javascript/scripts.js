// console.log("linked");

function checkPositions() {
  var dropzones = document.getElementsByClassName("drop-zone");
  correct = true;
  console.log(dropzones);
  Array.from(dropzones).map((zone) => {
    // console.log("zone");
    // console.log(zone);
    var zoneNum = zone.id.replace(/^\D+/g, "");
    console.log(zoneNum);
    var child = zone.querySelector(".draggable");
    // console.log("child");
    // console.log(child.id);
    // console.log(zone.childNodes[1].id);
    var dragNum = child.id.replace(/^\D+/g, "");
    console.log(dragNum);
    if (dragNum === zoneNum) {
      document.getElementById(zone.id).style.border = "solid 4px green";
    } else {
      correct = false;
      document.getElementById(zone.id).style.border = "solid 4px red";
    }
  });
  if (correct) {
    alert("Correct!");
  } else {
    alert("Incorrect");
  }
}
function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.style.backgroundColor = "yellow";
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  console.log(draggableElement.id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}
function onDragEnd(event) {
  event.currentTarget.style.backgroundColor = "#4AAE9B";
}

const contentBox = document.querySelector(".content-box");
const contentBoxWidth = contentBox.clientWidth;
const contentBoxHeight = contentBox.clientHeight;

// console.log(contentBox);
// console.log(contentBoxWidth);
// console.log(contentBoxHeight);
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// var imagePieces = [];

// const image = new Image();
// image.onload = cutImageUp();

var canvas = document.createElement("canvas");
// var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
  imagePieces = [],
  img = new Image();
img.onload = cutImage;
// ctx.fillStyle = "red";
// ctx.fillRect(40, 20, 300, 100);

function cutImage() {
  const numRows = 2;
  const numCols = 2;
  const pieceWidth = contentBoxWidth / numCols;
  const pieceHeight = contentBoxHeight / numRows;
  //   const numCols = 4;
  //   const numRows = 4;
  //   console.log("aaa");
  //   pieceHeight = pieceWidth;
  for (var x = 0; x < numCols; ++x) {
    for (var y = 0; y < numRows; ++y) {
      canvas.width = pieceWidth;
      canvas.height = pieceHeight;
      //   console.log(this.ctx);
      ctx.drawImage(
        this,
        x * pieceWidth,
        y * pieceHeight,
        pieceWidth,
        pieceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      ctx.fillStyle = "red";
      ctx.fillRect(20, 20, 150, 100);
      imagePieces.push(canvas.toDataURL());
    }
    // for test div
  }
  tempArr = [
    [1, 2, 3],
    [2, 3, 4, 5],
  ];
  const dimentions = [tempArr.length, tempArr[0].length];
  //   console.log(tempArr);

  //   console.log(imagePieces.length);
  //   console.log(imagePieces);
  i = 0;
  imagePieces.forEach((im) => {
    var slicedImage = document.createElement("img");
    slicedImage.src = im;
    slicedImage.className = `img${i}`;
    var div = document.getElementById("test");
    div.appendChild(slicedImage);
    i++;
  });

  // imagePieces now contains data urls of all the pieces of the image

  // load one piece onto the page
  var anImageElement = document.querySelector(".content-box");
  anImageElement.src = imagePieces[0];
  console.log(anImageElement);

  anImageElement.src = imagePieces[1];
  console.log(imagePieces[1]);

  // ctx.drawImage(imagePieces[1], 0, 0);

  //   // for test div
  //   var slicedImage = document.createElement("img");
  //   slicedImage.src = parts[i];
  //   var div = document.getElementById("test");
  //   div.appendChild(slicedImage);
}
// console.log("eee");

// image.src = "../assets/maps.jpg";
img.src = "../assets/maps.jpg";
// console.log("map");
// console.log(image.src);
//   imagePieces = [],

var canvas2 = document.getElementById("canvas");
const temp = document.getElementById("source");
console.log(temp);
var ctx2 = canvas2.getContext("2d");
// ctx2.drawImage('temp', 40, 20, 500, 200);
temp.addEventListener("load", (e) => {
  console.log("loaded");
  // ctx.drawImage(temp, 0, 0);
});
// ctx2.fillStyle = "red";
// ctx2.fillRect(40, 20, 300, 100);
// immm = document.getElementById("img1");
// console.log(imagePieces[1]);
