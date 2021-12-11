console.log("linked");

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
    slicedImage.id = `img${i}`;
    var div = document.getElementById("test");
    div.appendChild(slicedImage);
    i++;
  });

  // imagePieces now contains data urls of all the pieces of the image

  // load one piece onto the page
  var anImageElement = document.querySelector(".content-box");
  anImageElement.src = imagePieces[0];
  //   console.log(imagePieces[0]);

  anImageElement.src = imagePieces[1];
  //   console.log(imagePieces[1]);

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
var ctx2 = canvas2.getContext("2d");
// ctx2.fillStyle = "red";
// ctx2.fillRect(40, 20, 300, 100);
// immm = document.getElementById("img1");
console.log(imagePieces[1]);
ctx2.drawImage(imagePieces[1], 1, 2, 100, 200);
