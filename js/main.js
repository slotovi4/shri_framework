//получаю состояние от Dispatcher
class Store {
  /* store data */
  constructor(page, data, title, titleEl, update, dataFunc, activeEl) {
    this.page = page;
    this.data = data;
    this.title = title;
    this.titleEl = titleEl;
    this.update = update;
    this.dataFunc = dataFunc;
    this.activeEl = activeEl;
  }
  /*metods*/
  setDefaultPage(page, dataName, path) {
    let json = getData(path, dataName); //get data
    if (page != "" && json) {
      this.page = page;
      this.data = json;
      this.update = true;
    } else this.update = false;
  }
  setPageTitle(titleEl, title) {
    if (titleEl != "" && title != "") {
      this.titleEl = titleEl;
      this.title = title;
      this.update = true;
    } else this.update = false;
  }
  setActiveItems(el, actClass) {
    let arr = [];
    el.forEach(item => {
      if (item.classList.contains(actClass)) arr.push(item);
    });
    arr.length < 1 ? (this.activeEl = false) : (this.activeEl = arr);
  }
}
function getData(patch, file) {
  var xhr = new XMLHttpRequest();
  let filePath = patch + file;
  xhr.open("GET", filePath, false);
  xhr.send();
  if (xhr.status != 200) {
    // ERROR
    throw "getData Error " +
      xhr.status +
      ": " +
      xhr.statusText +
      ", " +
      filePath +
      " file not found";
  } else {
    // Result
    let data = xhr.responseText;
    let jsondata = JSON.parse(data);
    return jsondata;
  }
}

//
class Dispatcher {
  //Вызываю коллбэк из Store
  dispatch(arr) {
    arr.forEach(obj => {
      let objts = obj,
        objd = objts.data,
        action = objts.actionType,
        el = objd.el,
        title = objd.title,
        pageName = objd.pageName,
        dataName = objd.dataName,
        dataPath = objd.dataPath,
        dataFunc = objd.dataFunc,
        dataActive = objd.dataActive,
        activeClass = objd.activeClass;
      if (dataFunc === undefined) dataFunc = false; //set default
      if (dataActive === undefined) dataActive = false; //set default
      if (action === "setDefaultPage") {
        this.store = new Store(
          pageName,
          {},
          title,
          el,
          true,
          dataFunc,
          dataActive
        );
        this.store.setDefaultPage(pageName, dataName, dataPath);
      }
      if (this.store) {
        if (action === "setPageTitle") {
          if (this.store.title != title) this.store.setPageTitle(el, title);
        }
        if (action === "setNewPage") {
          if (this.store.page != pageName) {
            this.store.setDefaultPage(pageName, dataName, dataPath);
            this.store.dataFunc = dataFunc;
          }
        }
        if (action === "itemStatus") {
          this.store.setActiveItems(dataActive, activeClass);
        }
        this.register();
      }
    });
  }
  //Беру данные из store и обновляю
  register() {
    if (this.store && this.store.update) {
      //обновление title
      changePageTitle(this.store.titleEl, this.store.title);
      //запуск кастомной функции для Store date
      if (this.store.dataFunc)
        changePageContent(this.store.data, this.store.dataFunc);
    }
  }
  //Metods
  getCurrentPage() {
    return this.store.page;
  }
  getActiveItems() {
    return this.store.activeEl;
  }
}
function changePageTitle(el, title) {
  let titles = document.querySelectorAll(el);
  titles.forEach(item => {
    item.textContent = title;
  });
}
function changePageContent(data, fun) {
  fun(data);
}
