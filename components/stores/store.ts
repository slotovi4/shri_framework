//получаю состояние от Dispatcher
class Store {
  private page: string;
  private data: object;
  private title: string;
  private titleEl: string;
  private update: boolean;
  private dataFunc: Function | false;
  private activeEl: Array<HTMLElement> | false;

  /* store data */
  constructor(
    page: string,
    data: object,
    title: string,
    titleEl: string,
    update: boolean,
    dataFunc: Function | false,
    activeEl: Array<HTMLElement> | false
  ) {
    this.page = page;
    this.data = data;
    this.title = title;
    this.titleEl = titleEl;
    this.update = update;
    this.dataFunc = dataFunc;
    this.activeEl = activeEl;
  }

  /*metods*/
  setDefaultPage(page: string, dataName: string, path: string): void {
    let json = getData(path, dataName); //get data
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

export default Store;
