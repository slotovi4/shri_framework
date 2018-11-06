//получаю состояние от Dispatcher
interface savData {
  dataName: string;
  data: object;
}

class Store {
  private page: string;
  private data: object;
  private title: string;
  private titleEl: string;
  private update: boolean;
  private dataFunc: Function | false;
  private activeEl: Array<HTMLElement> | false;
  private savedData: Array<object>;

  /* store data */
  constructor(
    page: string,
    data: object,
    title: string,
    titleEl: string,
    update: boolean,
    dataFunc: Function | false,
    activeEl: Array<HTMLElement> | false,
    savedData: Array<object>
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
  setDefaultPage(
    page: string,
    dataName: string,
    path: string,
    savedData: Array<object>
  ): void {
    let saveData = checkSavedData(savedData, dataName);
    let json: object;
    let obj: object = {};
    let arrobj = obj as savData;
    let svData = saveData as savData;

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

  setPageTitle(titleEl: string, title: string): void {
    if (titleEl != "" && title != "") {
      this.titleEl = titleEl;
      this.title = title;
      this.update = true;
    } else this.update = false;
  }

  setActiveItems(el: Array<HTMLElement>, actClass: string): void {
    let oldActive = this.activeEl;
    let arr: Array<HTMLElement> = [];

    el.forEach(item => {
      if (item.classList.contains(actClass)) arr.push(item);
    });

    arr.length < 1 ? (this.activeEl = false) : (this.activeEl = arr);
    oldActive != this.activeEl ? (this.update = true) : (this.update = false);
  }
}

function getData(patch: string, file: string): object {
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
    let jsondata: object = JSON.parse(data);
    return jsondata;
  }
}

function checkSavedData(
  savedData: Array<Object>,
  curDataName: string
): object | false {
  let data: object | false = false;
  savedData.forEach(obj => {
    let item = obj as savData;

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

export default Store;
