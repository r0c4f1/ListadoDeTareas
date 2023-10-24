import { mainContainer, data } from "../variables/variables";

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

export default Storage;
