'use strict';

const data = document.querySelector(".card__task__paragraph");
const mainContainer = document.querySelector(".main__container");

function createCard(container = document, text) {
  //Creation
  const card = document.createElement("div"),
    cardFirst = document.createElement("div"),
    cardSecond = document.createElement("div"),
    cardTask = document.createElement("div"),
    cardTaskTitle = document.createElement("h3"),
    cardTaskParagraph = document.createElement("p"),
    cardProgress = document.createElement("div"),
    cardDelete = document.createElement("div"),
    cardProgressTitle = document.createElement("h3"),
    cardProgressIcons = document.createElement("div"),
    cardIconDisLike = document.createElement("img"),
    cardIconLike = document.createElement("img"),
    cardDeleteButton = document.createElement("button");
  /////////////

  //Integrate classes

  card.classList.add("card");
  card.setAttribute(
    "title",
    "Puede Editar Esta Tarea Dandole Doble Click Al Parrafo"
  );
  cardFirst.classList.add("card__first");
  cardSecond.classList.add("card__second");
  cardTask.classList.add("card__task");
  cardTaskParagraph.classList.add("card__task__paragraph");
  cardProgress.classList.add("card__progress");
  cardDelete.classList.add("card__delete");
  cardProgressTitle.classList.add("card__progress__title");
  cardProgressIcons.classList.add("card__progress__icons");
  cardIconDisLike.classList.add("card__icon__dislike");
  cardIconLike.classList.add("card__icon__like");
  cardDeleteButton.classList.add("card__delete__button");
  //////////////

  //Insert Id
  card.dataset.id = 1;
  /////////////

  //Add Event

  cardTaskParagraph.addEventListener("click", () =>
    cardTaskParagraph.setAttribute("contenteditable", true)
  );

  cardTaskParagraph.addEventListener("focusout", () =>
    cardTaskParagraph.setAttribute("contenteditable", false)
  );

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(container, card.dataset.id);
  });
  //////////////

  //Insert Info
  cardTaskTitle.textContent = "Tarea";
  cardTaskParagraph.textContent = text;
  cardProgressTitle.textContent = "Tarea Realizada";
  cardIconDisLike.setAttribute(
    "src",
    "modulos/public/styles/icons/bx-dislike.svg"
  );
  cardIconLike.setAttribute("src", "modulos/public/styles/icons/bx-like.svg");
  cardDeleteButton.textContent = "Eliminar Tarea";
  //////////////

  //Insert in Container
  cardTask.appendChild(cardTaskTitle);
  cardTask.appendChild(cardTaskParagraph);
  cardFirst.appendChild(cardTask);
  cardProgress.appendChild(cardProgressTitle);
  cardProgress.appendChild(cardProgressIcons);
  cardProgressIcons.appendChild(cardIconLike);
  cardProgressIcons.appendChild(cardIconDisLike);
  cardDelete.appendChild(cardDeleteButton);
  cardSecond.appendChild(cardProgress);
  cardSecond.appendChild(cardDelete);
  card.appendChild(cardFirst);
  card.appendChild(cardSecond);
  container.appendChild(card);
}

function deleteCard(container = document, id) {
  let containerChild = container.children;

  for (let i = 0; i < containerChild.length; i++)
    if (containerChild.item(i).dataset.id === id)
      container.removeChild(containerChild.item(i));
}

document.getElementById("e").addEventListener("click", () => {
  createCard(mainContainer, "Necesito terminar esta pinga");
});

data.addEventListener("click", () => {
  data.setAttribute("contenteditable", true);
});

data.addEventListener("focusout", () => {
  data.setAttribute("contenteditable", false);
});
