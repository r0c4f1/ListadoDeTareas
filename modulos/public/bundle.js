'use strict';

const data = document.querySelector(".card__task__paragraph"),
  mainContainer = document.querySelector(".main__container"),
  mainInsertButton = document.querySelector(".main__insert__button"),
  mainInsertTextarea = document.querySelector(".main__insert__textarea");

class Storage {
  #count = 1;

  constructor() {}

  insert(text, done = "#e2bcbc", textDone = "Tarea No Realizada") {
    let obj = {
      text,
      done,
      textDone,
    };
    let key = this.#count + localStorage.length;
    localStorage.setItem(key, JSON.stringify(obj));

    return key;
  }

  getInfo(key) {
    let { text, done, textDone } = JSON.parse(localStorage.getItem(key));

    return {
      text,
      done,
      textDone,
    };
  }

  getAllCards(create) {
    for (let i = 0; i < localStorage.length; i++)
      create(mainContainer, "", localStorage.key(i));
  }

  updateParagraph(id, data) {
    let obj = JSON.parse(localStorage.getItem(id));
    obj.text = data;
    localStorage.setItem(id, JSON.stringify(obj));
  }

  updateStatus(id, data, textDone) {
    let obj = JSON.parse(localStorage.getItem(id));
    obj.done = data;
    obj.textDone = textDone;
    localStorage.setItem(id, JSON.stringify(obj));
  }

  delete = (id) => localStorage.removeItem(id);
}

const storage = new Storage();

const create = (element) => document.createElement(element);

function createCard(container = document, text = "", keyParam) {
  let key = text === "" ? "" : storage.insert(text);
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

  //Style Card
  card.style.backgroundColor = storage.getInfo(key || keyParam).done;
  /////////////

  //Insert Id
  card.dataset.id = key || keyParam;
  /////////////

  //Add Event

  cardTaskParagraph.addEventListener("click", () =>
    cardTaskParagraph.setAttribute("contenteditable", true)
  );

  cardTaskParagraph.addEventListener("focusout", () => {
    cardTaskParagraph.setAttribute("contenteditable", false);
    storage.updateParagraph(card.dataset.id, cardTaskParagraph.textContent);
  });

  buttons.addEventListener("click", () => {
    deleteCard(container, card.dataset.id);
  });

  cardIconLike.addEventListener("click", () => {
    cardIconLike.classList.add("animation__like");
    setTimeout(() => cardIconLike.classList.remove("animation__like"), 900);
    cardProgressTitle.textContent = "Tarea Realizada";
    card.style.backgroundColor = "#bce2c1";
    storage.updateStatus(card.dataset.id, "#bce2c1", cardProgress.textContent);
  });

  cardIconDisLike.addEventListener("click", () => {
    cardIconDisLike.classList.add("animation__dislike");
    setTimeout(
      () => cardIconDisLike.classList.remove("animation__dislike"),
      900
    );
    cardProgressTitle.textContent = "Tarea No Realizada";
    card.style.backgroundColor = "#e2bcbc";
    storage.updateStatus(card.dataset.id, "#e2bcbc", cardProgress.textContent);
  });

  //////////////

  //Insert Info
  cardTaskTitle.textContent = "Tarea";
  cardTaskParagraph.textContent = storage.getInfo(key || keyParam).text;
  cardProgressTitle.textContent = storage.getInfo(key || keyParam).textDone;
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

  storage.delete(id);
}

addEventListener("DOMContentLoaded", () => {
  storage.getAllCards(createCard);
});

const insertTask = () => {
  let value = mainInsertTextarea.value.trim();
  createCard(mainContainer, value);
  mainInsertTextarea.value = "";
};

mainInsertButton.addEventListener("click", insertTask);

mainInsertTextarea.addEventListener("keyup", (e) =>
  e.keyCode === 13 ? insertTask() : ""
);

if (data) {
  data.addEventListener("click", () =>
    data.setAttribute("contenteditable", true)
  );

  data.addEventListener("focusout", () =>
    data.setAttribute("contenteditable", false)
  );
}
