define("stores/store", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //получаю состояние от Dispatcher
    class Store {
        /* store data */
        constructor(page, data, title, titleEl, update, dataFunc) {
            this.page = page;
            this.data = data;
            this.title = title;
            this.titleEl = titleEl;
            this.update = update;
            this.dataFunc = dataFunc;
        }
        /*metods*/
        getCurrentPage() {
            return this.page;
        }
        setDefaultPage(page, dataName, path) {
            let json = getData(path, dataName); //get data
            if (page != "" && json) {
                this.page = page;
                this.data = json;
                this.update = true;
            }
            else
                this.update = false;
        }
        setPageTitle(titleEl, title) {
            if (titleEl != "" && title != "") {
                this.titleEl = titleEl;
                this.title = title;
                this.update = true;
            }
            else
                this.update = false;
        }
    }
    function getData(patch, file) {
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
        }
        else {
            // вывести результат
            let data = xhr.responseText;
            let jsondata = JSON.parse(data);
            return jsondata;
        }
    }
    exports.default = Store;
});
define("dispatcher/dispatcher", ["require", "exports", "stores/store"], function (require, exports, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //
    class Dispatcher {
        //Вызываю коллбэк из Store
        dispatch(arr) {
            arr.forEach(obj => {
                let objts = obj, objd = objts.data, action = objts.actionType, el = objd.el, title = objd.title, pageName = objd.pageName, dataName = objd.dataName, dataPath = objd.dataPath, dataFunc = objd.dataFunc;
                if (dataFunc === undefined)
                    dataFunc = false;
                if (action === "setDefaultPage") {
                    this.store = new store_1.default(pageName, {}, title, el, true, dataFunc);
                    this.store.setDefaultPage(pageName, dataName, dataPath);
                }
                if (this.store) {
                    if (action === "setPageTitle") {
                        if (this.store.title != title)
                            this.store.setPageTitle(el, title);
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
        register() {
            if (this.store && this.store.update) {
                //обновление title
                changePageTitle(this.store.titleEl, this.store.title);
                //запуск кастомной функции для Store date
                if (this.store.dataFunc)
                    changePageContent(this.store.data, this.store.dataFunc);
            }
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
});
