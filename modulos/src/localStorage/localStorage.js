import { mainContainer } from '../variables/variables'

class Storage {
  #count = 1

  insert (text, done = '#e2bcbc', textDone = 'Tarea No Realizada') {
    const obj = {
      text,
      done,
      textDone
    }
    const key = this.#count + window.localStorage.length
    window.localStorage.setItem(key, JSON.stringify(obj))

    return key
  }

  getInfo (key) {
    const { text, done, textDone } = JSON.parse(window.localStorage.getItem(key))

    return {
      text,
      done,
      textDone
    }
  }

  getAllCards (create) {
    for (let i = 0; i < window.localStorage.length; i++) { create(mainContainer, '', window.localStorage.key(i)) }
  }

  updateParagraph (id, data) {
    const obj = JSON.parse(window.localStorage.getItem(id))
    obj.text = data
    window.localStorage.setItem(id, JSON.stringify(obj))
  }

  updateStatus (id, data, textDone) {
    const obj = JSON.parse(window.localStorage.getItem(id))
    obj.done = data
    obj.textDone = textDone
    window.localStorage.setItem(id, JSON.stringify(obj))
  }

  delete = (id) => window.localStorage.removeItem(id)
}

export default Storage
