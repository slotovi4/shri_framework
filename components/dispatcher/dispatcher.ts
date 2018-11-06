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
  dataActive: Array<HTMLElement> | false;
  activeClass: string;
}

//
class Dispatcher {
  private store: any;
  private defPage: boolean = false;
  private pageTitle: boolean = false;
  private newPage: boolean = false;

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
  register(): void {
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
  getCurrentPage(): string {
    return this.store.page;
  }

  getActiveItems(): false | Array<HTMLElement> {
    return this.store.activeEl;
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

const dataDispatcher = new Dispatcher();
