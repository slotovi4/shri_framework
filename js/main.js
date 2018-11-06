class Store {
  /* store data */
  constructor(
    page,
    data,
    title,
    titleEl,
    update,
    dataFunc,
    activeEl,
    savedData
  ) {
    this.page = page;
    this.data = data;
    this.title = title;
    this.titleEl = titleEl;
    this.update = update;
    this.dataFunc = dataFunc;
    this.activeEl = activeEl;
    this.savedData = savedData;
  }
  /*metods*/
  setDefaultPage(page, dataName, path, savedData) {
    let saveData = checkSavedData(savedData, dataName);
    let json;
    let obj = {};
    let arrobj = obj;
    let svData = saveData;
    if (!saveData) {
      json = getData(path, dataName);
      arrobj.dataName = dataName;
      arrobj.data = json;
      this.savedData.push(arrobj);
    } else {
      json = svData;
    }
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
    let oldActive = this.activeEl;
    let arr = [];
    el.forEach(item => {
      if (item.classList.contains(actClass)) arr.push(item);
    });
    arr.length < 1 ? (this.activeEl = false) : (this.activeEl = arr);
    oldActive != this.activeEl ? (this.update = true) : (this.update = false);
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
function checkSavedData(savedData, curDataName) {
  let data = false;
  savedData.forEach(obj => {
    let item = obj;
    if (item) {
      let itemName = item.dataName;
      let itemData = item.data;
      if (curDataName == itemName) {
        data = itemData;
        return;
      }
    }
  });
  if (data) {
    return data;
  } else {
    return false;
  }
}

//
class Dispatcher {
  constructor() {
    this.defPage = false;
    this.pageTitle = false;
    this.newPage = false;
  }
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
          dataActive,
          []
        );
        this.store.setDefaultPage(
          pageName,
          dataName,
          dataPath,
          this.store.savedData
        );
        this.defPage = true;
      }
      if (this.store) {
        this.store.update = false; //set default
        if (action === "setPageTitle") {
          if (this.store.title != title) {
            this.store.setPageTitle(el, title);
            this.pageTitle = true;
          }
        }
        if (action === "setNewPage") {
          if (this.store.page != pageName) {
            this.store.setDefaultPage(
              pageName,
              dataName,
              dataPath,
              this.store.savedData
            );
            this.store.dataFunc = dataFunc;
            this.newPage = true;
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
      if (this.defPage || this.newPage) {
        //обновление title
        changePageTitle(this.store.titleEl, this.store.title);
        //запуск кастомной функции для Store date
        if (this.store.dataFunc)
          changePageContent(this.store.data, this.store.dataFunc);
      }
      if (this.pageTitle) {
        changePageTitle(this.store.titleEl, this.store.title);
      }
      this.defPage = false;
      this.pageTitle = false;
      this.newPage = false;
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
const dataDispatcher = new Dispatcher();
