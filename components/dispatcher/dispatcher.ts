import Store from "../stores/store";
//const Store = require("../stores/store.ts").Store;
//const store = new Store();

//default / init page
/* const defaultPage = {
  page: "event",
  file: "event.json"
};

const defaultStore = new Store(defaultPage.page, defaultPage.file, true);
const defaultStorePage = defaultStore.getCurrentPage(); */

interface disData {
  actionType: string;
  data: object;
  page: string;
  file: string;
}

//
class Dispatcher {
  dispatch(obj: object): void {
    let objts = obj as disData;
    let objdata = objts.data as disData;
    let action: string = objts.actionType;
    let page: string = objdata.page;
    let file: string = objdata.file;

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
