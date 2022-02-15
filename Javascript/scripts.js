// console.log("linked");
// drag and drop resources:
// https://web.dev/drag-and-drop/
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// http://jsfiddle.net/YCa3S/23 <- drag and drop on dynamically created element

const imageUrl = "../assets/maps.jpg";

// const outputImageAspectRatio = 1;

// const inputImage = new Image();
// imagePieces = [];

const outputImage = document.createElement("canvas");
(imagePieces = []), (inputImage = new Image());

inputImage.onload = () => {
  //store width and height of orignal
  const inputWidth = inputImage.naturalWidth;
  const inputHeight = inputImage.naturalHeight;

  //set number of rows
  const numRows = 4;
  const numCols = 4;
  // calculate piece sizes
  const pieceWidth = inputWidth / numCols;
  const pieceHeight = inputHeight / numRows;

  // const outputImage = document.createElement("canvas");
  const ctx = outputImage.getContext("2d");

  for (var y = 0; y < numCols; ++y) {
    for (var x = 0; x < numRows; ++x) {
      outputImage.width = pieceWidth;
      outputImage.height = pieceHeight;
      // cut
      ctx.drawImage(
        inputImage,
        x * pieceWidth,
        y * pieceHeight,
        pieceWidth,
        pieceHeight,
        0,
        0,
        outputImage.width,
        outputImage.height
      );
      imagePieces.push(outputImage.toDataURL());
    }
  }
  // generate correct rows and columns for image
  const container = document.getElementById("test");
  container.style.display = "grid";
  // make number of columns and rows string
  let numberCols = "";
  for (let j = 0; j < numCols; j++) {
    numberCols += " 1fr";
  }
  let numberRows = "";
  for (let j = 0; j < numRows; j++) {
    numberRows += " 1fr";
  }
  container.style.gridTemplateColumns = numberCols;
  container.style.gridTemplateRows = numberRows;

  // for (let i = 0; i < imagePieces.length; i++) {
  //   const im = imagePieces[i];

  // }

  // fill array with values 1 - number of image pieces
  var numberedArray = Array.from(Array(imagePieces.length).keys());
  // console.log(numberedArray);
  // randomise order
  numberedArray.sort(() => Math.random() - 0.5);
  // console.log(numberedArray);

  imagePieces.forEach((im, i) => {
    //create dropzone
    const dropzone = document.createElement("div");
    dropzone.id = `drop${i}`;
    dropzone.className = "drop-zone";
    dropzone.addEventListener(
      "dragover",
      (ev) => {
        ev.preventDefault();
      },
      false
    );
    dropzone.addEventListener(
      "drop",
      (ev) => {
        ev.preventDefault();
        dropzone.appendChild(
          document.getElementById(ev.dataTransfer.getData("text"))
        );
      },
      false
    );
    document.getElementById("test").appendChild(dropzone);
    const dropZones = document.getElementsByClassName("drop-zone");
    // console.log(dropZones);
    for (let j = 0; j < dropZones.length; j++) {
      dropZones[j].style.minHeight = pieceHeight + "px";
    }

    // //create image
    // const image = document.createElement("img");
    // image.src = im;
    // image.id = "img" + i;
    // // add image to div
    // dropzone.appendChild(image);
    // image.onload = (e) => {
    //   this.addEventListener("dragstart", drag, false);
    // };
  });
  // create images and assign to a random dropzone
  imagePieces.forEach((im, i) => {
    function drag(ev) {
      ev.dataTransfer.setData("Text/plain", ev.target.id);
      console.log(ev.dataTransfer.getData("text"));
    }
    j = numberedArray[i];
    const dropzone = document.getElementById(`drop${j}`);
    //create image
    const image = document.createElement("img");
    image.src = im;
    image.id = "img" + i;
    image.className = "draggable";
    // add image to dropzone
    dropzone.appendChild(image);
    image.onload = (e) => {
      this.addEventListener("dragstart", drag, false);
    };
  });
};

inputImage.src = imageUrl;

function checkPositions() {
  var dropzones = document.getElementsByClassName("drop-zone");
  correct = true;
  // console.log(dropzones);
  Array.from(dropzones).map((zone) => {
    // console.log("zone");
    // console.log(zone);
    var zoneNum = zone.id.replace(/^\D+/g, "");
    // console.log(zoneNum);
    var child = zone.querySelector(".draggable");
    // var child = zone.querySelector(".img");
    // console.log("child");
    // console.log(child.id);
    // console.log(zone.childNodes[1].id);
    var dragNum = child.id.replace(/^\D+/g, "");
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
// function onDragStart(event) {
//   event.dataTransfer.setData("text/plain", event.target.id);
//   event.currentTarget.style.backgroundColor = "yellow";
// }

// function onDragOver(event) {
//   event.preventDefault();
// }

// function onDrop(event) {
//   const id = event.dataTransfer.getData("text");
//   const draggableElement = document.getElementById(id);
//   console.log(draggableElement.id);
//   const dropzone = event.target;
//   dropzone.appendChild(draggableElement);
//   event.dataTransfer.clearData();
// }
// function onDragEnd(event) {
//   event.currentTarget.style.backgroundColor = "#4AAE9B";
// }
