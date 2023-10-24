import { data, mainContainer } from "./variables/variables";
import { createCard, deleteCard } from "./createCard/crearCard";

document.getElementById("e").addEventListener("click", () => {
  createCard(mainContainer, "Necesito terminar esta pinga");
});

data.addEventListener("click", () => {
  data.setAttribute("contenteditable", true);
});

data.addEventListener("focusout", () => {
  data.setAttribute("contenteditable", false);
});
