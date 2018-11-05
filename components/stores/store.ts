//получаю состояние от Dispatcher
class Store {
  private page: string;
  private data: string;
  private update: boolean;

  constructor(page: string, data: string, update: boolean) {
    this.page = page;
    this.data = data;
    this.update = update;

    //возвращаю состояние
    if (this.update) {
    }
  }

  /*metods*/

  getCurrentPage(): string {
    return this.page;
  }

  //setDefaultPage
  setDefaultPage(page: string, data: string, path: string) {
    this.page = page;
    this.data = data;
    this.update = true;
    //get data
    let json = getData(path, data);
    //draw
    templateEngine(json);
  }

  //new page
  newPage(page: string, data: string) {
    this.page = page;
    this.data = data;
    this.update = true;
  }
}

function getData(patch: string, file: string) {
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
    let jsondata: object = JSON.parse(data);
    return jsondata;
  }
}

interface tempData {
  title: string;
}

function templateEngine(data: object) {
  let datats = data as tempData;
  let title = datats.title;
  let page = <HTMLElement>document.querySelector(".page");
  page.textContent = title;
}

export default Store;
