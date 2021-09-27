// JSON
// var thePets = [
//   {
//     name: "Meowsalot",
//     species: "cat",
//     favFood: "tuna",
//   },
//   {
//     name: "Barky",
//     species: "dog",
//     favFood: "carrots",
//   },
// ];

var urlFront = "https://learnwebcode.github.io/json-example/animals-";
var pageCounter = 1;
var urlBack = ".json";

var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  let request = new XMLHttpRequest();
  request.open("GET", urlFront + pageCounter + urlBack);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      renderHTML(data);
    } else {
      console.error("Cannot fetch data from the server.");
    }
  };

  request.onerror = () => {
    console.error("Connection Error");
  };

  request.send();
  pageCounter++;
  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  let htmlString = "";

  for (let i = 0; i < data.length; i++) {
    htmlString +=
      "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
    for (let j = 0; j < data[i].foods.likes.length; j++) {
      if (j == 0) {
        htmlString += data[i].foods.likes[j];
      } else {
        htmlString += " and " + data[i].foods.likes[j];
      }
    }
    htmlString += " and dislikes ";
    for (let j = 0; j < data[i].foods.dislikes.length; j++) {
      if (j == 0) {
        htmlString += data[i].foods.dislikes[j];
      } else {
        htmlString += " and " + data[i].foods.dislikes[j];
      }
    }
    htmlString += ".</p>";
  }
  animalContainer.insertAdjacentHTML("beforeend", htmlString);
}
