//получаю состояние от Dispatcher
class Store {
  private page: string;
  private data: object;
  private title: string;
  private titleEl: string;
  private update: boolean;
  private dataFunc: Function | false;

  /* store data */
  constructor(
    page: string,
    data: object,
    title: string,
    titleEl: string,
    update: boolean,
    dataFunc: Function | false
  ) {
    this.page = page;
    this.data = data;
    this.title = title;
    this.titleEl = titleEl;
    this.update = update;
    this.dataFunc = dataFunc;
  }

  /*metods*/

  getCurrentPage(): string {
    return this.page;
  }

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
}

function getData(patch: string, file: string): object {
  var xhr = new XMLHttpRequest();
  let filePath = patch + file;
  xhr.open("GET", filePath, false);
  xhr.send();
  if (xhr.status != 200) {
    // обработать ошибку
    throw "getData Error " +
      xhr.status +
      ": " +
      xhr.statusText +
      ", " +
      filePath +
      " file not found";
  } else {
    // вывести результат
    let data = xhr.responseText;
    let jsondata: object = JSON.parse(data);
    return jsondata;
  }
}

export default Store;
