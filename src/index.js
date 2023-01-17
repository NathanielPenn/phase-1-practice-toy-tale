let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//EVENT LISTENER
document.querySelector(".add-toy-form").addEventListener("submit", handleSubmit);


// //EVENT HANDLERS
function handleSubmit(e) {
  e.preventDefault();
  const toyObj = {
  name:e.target.name.value,
  image:e.target.image.value,
  likes:0
  }
  buildToyCard(toyObj);
  addNewToy(toyObj);
}

function buildToyCard(toy) {
  const div = document.createElement('div');
    div.className = "card";

  const h2 = document.createElement('h2');
    h2.textContent = toy.name;

  const img = document.createElement('img');
    img.src = toy.image;
    img.alt = `Picture of ${toy.name}`;
    img.className = "toy-avatar";

  const p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;

  const likeButton = document.createElement('button');
    likeButton.className = "like-btn";
    likeButton.textContent = "Like ❤️";
    likeButton.id = toy.id

  div.append(h2, img, p, likeButton);
  //console.log(toy);

  document.querySelector('#toy-collection').appendChild(div);

  div.querySelector(".like-btn").addEventListener("click", () => {
  toy.likes += 1  
  div.querySelector("p").textContent = `${toy.likes} Likes`
  updateLikes(toy)
  })
  }

  //ALL MY CRUDs

function addNewToy(toyObj){
  //console.log(JSON.stringify(toyObj));
  fetch('http://localhost:3000/toys/',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)//{
      // "name": toyObj.name.value,
      // "image": toyObj.image.value,
      // "likes": 0
    // })
  })
.then(response => response.json())
.then(toys => console.log(toys))
}

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json())
  .then(toys => console.log(toys))
}

function getEveryToy() {
  fetch('http://localhost:3000/toys/')
  .then(response => response.json())
  //.then(data => console.log(data))
  .then(toys => toys.forEach(toy => buildToyCard(toy)))
}
function engage() {
  getEveryToy();
  //toys.forEach(toy => buildToyCard(toy));
}

engage();

