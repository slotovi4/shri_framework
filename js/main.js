//получаю состояние от Dispatcher
class Store {
  constructor(page, data, update) {
    this.page = page;
    this.data = data;
    this.update = update;
    //возвращаю состояние
    if (this.update) {
    }
  }
  /*metods*/
  getCurrentPage() {
    return this.page;
  }
  //setDefaultPage
  setDefaultPage(page, data, path) {
    this.page = page;
    this.data = data;
    this.update = true;
    //get data
    let json = getData(path, data);
    //draw
    templateEngine(json);
  }
  //new page
  newPage(page, data) {
    this.page = page;
    this.data = data;
    this.update = true;
  }
}
function getData(patch, file) {
  var xhr = new XMLHttpRequest();
  let filePath = patch + file;
  xhr.open("GET", filePath, false);
  xhr.send();
  if (xhr.status != 200) {
    // обработать ошибку
    throw "Error: " + xhr.status + ": " + xhr.statusText;
  } else {
    // вывести результат
    let data = xhr.responseText;
    let jsondata = JSON.parse(data);
    return jsondata;
  }
}
function templateEngine(data) {
  let datats = data;
  let title = datats.title;
  let page = document.querySelector(".page");
  page.textContent = title;
}

//
class Dispatcher {
  dispatch(obj) {
    let objts = obj;
    let objdata = objts.data;
    let action = objts.actionType;
    let page = objdata.page;
    let file = objdata.file;
    if (action === "new-page") {
      //if (defaultStorePage != page) {
      //newStore.
      //newPage(page, file);
      //}
      //const store = new Store('video');
    }
  }
}
let dataDispatcher = new Dispatcher();
//action
dataDispatcher.dispatch({
  actionType: "new-page",
  data: {
    page: "video",
    file: "video.json"
  }
});
/* function getJson() {
  let newStore = Store;
} */
/* function newPage(page: string, file: string) {
  let newStore = Store;
} */
//обращаюсь к store
/* dataDispatcher.register(function(payload) {
  if (payload.actionType === "new-page") {
    store.page = payload.data;
  }
});
 */
