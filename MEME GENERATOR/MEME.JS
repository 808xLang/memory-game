const newMeme = document.getElementById("form");
const memeGroup = document.getElementsByClassName(".memeGroup");
let memes = [];


//when the button is hit it runs this code
newMeme.addEventListener("submit", function (event) {
  event.preventDefault();
  const newDiv = document.createElement("div");
  newDiv.class='meme-container'
  const img = new Image();
  img.src = document.getElementById("memeLink").value;
//the id follows the lenght of the memes string
  const id = `${memes.length}`;

  const a = document.querySelector("#topTextInput").value;

  const topDiv = document.createElement("div");
  topDiv.id = id;
  topDiv.className = 'topDiv';
  topDiv.innerHTML = a;

  const b = document.querySelector("#bottomTextInput").value;

  const bottomDiv = document.createElement("div");
  bottomDiv.id = id;
  bottomDiv.className = 'bottomDiv';
  bottomDiv.innerHTML = b;

  //adding the divs to the page
  newDiv.appendChild(topDiv);

  newDiv.appendChild(img);

  newDiv.appendChild(bottomDiv);

  memes.push(newDiv);

  targetDiv = document.querySelector(".memeGroup");
  for (let i = 0; i <= memes.length; i++) {
    targetDiv.appendChild(memes[i]);
  }
});

// [img, img2, img3 ]

// {
//  img, img, img2, img, img2,img
// }

// newMeme.addEventListener("submit", function(event){
//     event.preventDefault()
//     console.log(event)
//     console.log("hope and pray")

// const img = document.createElement("img");
//     img.src = document.getElementById("memeLink").value;
//     // document.body.appendChild(img);

// const a = document.querySelector('#topTextInput').value;
// // document.querySelector('.topText').innerHTML = a;

// const b = document.querySelector('#bottomTextInput').value;
// // document.querySelector('.bottomText').innerHTML = b;

// });
