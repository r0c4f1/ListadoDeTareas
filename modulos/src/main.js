import {
  data,
  mainContainer,
  mainInsertButton,
  mainInsertTextarea,
} from "./variables/variables";
import { createCard } from "./createCard/crearCard";

const insertTask = () => {
  let value = mainInsertTextarea.value.trim();
  createCard(mainContainer, value);
  mainInsertTextarea.value = "";
};

mainInsertButton.addEventListener("click", insertTask);

mainInsertTextarea.addEventListener("keyup", (e) =>
  e.keyCode === 13 ? insertTask() : ""
);

data.addEventListener("click", () => {
  data.setAttribute("contenteditable", true);
});

data.addEventListener("focusout", () => {
  data.setAttribute("contenteditable", false);
});
