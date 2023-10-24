"use strict";

const create = (element) => document.createElement(element);

function createCard(container = document, text) {
  //Creation
  const card = create("div"),
    cardFirst = create("div"),
    cardSecond = create("div"),
    cardTask = create("div"),
    cardTaskTitle = create("h3"),
    cardTaskParagraph = create("p"),
    cardProgress = create("div"),
    cardDelete = create("div"),
    cardProgressTitle = create("h3"),
    cardProgressIcons = create("div"),
    cardIconDisLike = create("img"),
    cardIconLike = create("img"),
    buttons = create("button");
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
  buttons.classList.add("buttons");
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

  buttons.addEventListener("click", () => {
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
  buttons.textContent = "Eliminar Tarea";
  //////////////

  //Insert in Container
  cardTask.appendChild(cardTaskTitle);
  cardTask.appendChild(cardTaskParagraph);
  cardFirst.appendChild(cardTask);
  cardProgress.appendChild(cardProgressTitle);
  cardProgress.appendChild(cardProgressIcons);
  cardProgressIcons.appendChild(cardIconLike);
  cardProgressIcons.appendChild(cardIconDisLike);
  cardDelete.appendChild(buttons);
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

export { createCard };
