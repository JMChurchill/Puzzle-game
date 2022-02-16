// console.log("linked");
// drag and drop resources:
// https://web.dev/drag-and-drop/
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// http://jsfiddle.net/YCa3S/23 <- drag and drop on dynamically created element

const imageUrl = "../assets/maps.jpg";

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
  const container = document.getElementById("puzzle");
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

  // fill array with values 1 - number of image pieces
  var numberedArray = Array.from(Array(imagePieces.length).keys());
  // randomize order
  numberedArray.sort(() => Math.random() - 0.5);

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
      "dragenter",
      (ev) => {
        // ev.preventDefault();
        dropzone.classList.add("over");
      },
      false
    );
    dropzone.addEventListener(
      "dragleave",
      (ev) => {
        // ev.preventDefault();
        dropzone.classList.remove("over");
      },
      false
    );
    dropzone.addEventListener(
      "dragend",
      (ev) => {
        // ev.preventDefault();
        dropzone.classList.remove("over");
      },
      false
    );

    dropzone.addEventListener(
      "drop",
      (ev) => {
        ev.preventDefault();
        //get source element
        sourceZone = document.getElementById(
          ev.dataTransfer.getData("text")
        ).parentNode;
        // switch orignal img with moved image
        sourceZone.appendChild(ev.srcElement.parentNode.childNodes[0]);
        dropzone.appendChild(
          document.getElementById(ev.dataTransfer.getData("text"))
        );
      },
      false
    );
    document.getElementById("puzzle").appendChild(dropzone);
    const dropZones = document.getElementsByClassName("drop-zone");
    for (let j = 0; j < dropZones.length; j++) {
      dropZones[j].style.minHeight = pieceHeight + "px";
    }
  });
  // create images and assign to a random dropzone
  imagePieces.forEach((im, i) => {
    function drag(ev) {
      console.log(ev);
      dragSrcEl = image;
      ev.dataTransfer.effectAllowed = "move";
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
  Array.from(dropzones).map((zone) => {
    var zoneNum = zone.id.replace(/^\D+/g, "");
    var child = zone.querySelector(".draggable");
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
