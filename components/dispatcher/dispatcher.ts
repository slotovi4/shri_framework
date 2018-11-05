import Store from "../stores/store";

interface disData {
  actionType: string;
  data: object;
  el: string;
  title: string;
  pageName: string;
  dataName: string;
  dataPath: string;
  dataFunc: Function | false;
}

//
class Dispatcher {
  private store: any;

  //Вызываю коллбэк из Store
  dispatch(arr: Array<Object>): void {
    arr.forEach(obj => {
      let objts = obj as disData,
        objd = objts.data as disData,
        action = objts.actionType,
        el = objd.el,
        title = objd.title,
        pageName = objd.pageName,
        dataName = objd.dataName,
        dataPath = objd.dataPath,
        dataFunc = objd.dataFunc;

      if (dataFunc === undefined) dataFunc = false;

      if (action === "setDefaultPage") {
        this.store = new Store(pageName, {}, title, el, true, dataFunc);
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

        this.register();
      }
    });
  }

  //Беру данные из store и обновляю
  register(): void {
    if (this.store && this.store.update) {
      //обновление title
      changePageTitle(this.store.titleEl, this.store.title);

      //запуск кастомной функции для Store date
      if (this.store.dataFunc)
        changePageContent(this.store.data, this.store.dataFunc);
    }
  }
}

function changePageTitle(el: string, title: string): void {
  let titles = document.querySelectorAll(el);
  titles.forEach(item => {
    item.textContent = title;
  });
}

function changePageContent(data: any, fun: Function) {
  fun(data);
}
