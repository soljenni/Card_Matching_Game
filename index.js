const $wrapper = document.querySelector("#wrapper");
const total = parseInt(prompt("카드 개수를 짝수로 입력하세요(최대:20)."));
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "white",
  "black",
  "cyan",
  "tomato",
  "pink",
  "blue",
];
let colorSlice = colors.slice(0, total / 2);
let colorCopy = colorSlice.concat(colorSlice);
let clickable = false;
let shuffled = [];
let clicked = [];
let completed = [];
let startTime;

function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  const card = document.createElement("div");
  const cardInner = document.createElement("div");
  const cardFront = document.createElement("div");
  const cardBack = document.createElement("div");
  card.className = "card";
  cardInner.className = "card-inner";
  cardFront.className = "card-front";
  cardBack.className = "card-back";
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardBack);
  cardInner.appendChild(cardFront);
  card.append(cardInner);

  return card;
}

function onClickCard() {
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle("flipped");
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBack =
    clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondBack =
    clicked[1].querySelector(".card-back").style.backgroundColor;

  if (firstBack === secondBack) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== total) {
      return;
    }
    const endTime = new Date();
    setTimeout(() => {
      alert(`축하합니다. ${(endTime - startTime) / 1000}초`);
      resetGame();
    }, 1000);
    return;
  }
  clickable = false;
  setTimeout(() => {
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true;
  }, 500);
}

function resetGame() {
  $wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
}

function startGame() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener("click", onClickCard);
    $wrapper.appendChild(card);
  }
  document.querySelectorAll(".card").forEach((ele, index) => {
    setTimeout(() => {
      ele.classList.add("flipped");
    }, 1000 + 100 * index);
  });
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((ele) => {
      ele.classList.remove("flipped");
    });
    clickable = true;
    startTime = new Date();
  }, 5000);
}
startGame();
