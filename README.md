<b>Фреймворк на Flux-подходе.</b><br>
<br>
<b><u>Описание:</u></b><br>
TS Фреймфорка находиться в папке components.<br>
Файл для подключения main.min.js, находиться в папке js.<br>
<br>
Dispatcher по умолчанию: dataDispatcher<br>
Объявление нового Dispatcher: let custDis = new Dispatcher();<br>
Создание Action: dataDispatcher.dispatch([{Action}]);<br>
Несколько Action: dataDispatcher.dispatch([{Action},{Action},...]);<br>
<br>
<b><u>Структура Action:</u></b><br>

<pre>
{
    actionType: ActionName,
    data: {ActionParams}
}
</pre>
<br>
<b><u>Список Action:</u></b><br>
<br>
<b>setDefaultPage</b><br>
Устанавливает начальную страницу, создает Store, принимает параметры:<br>
pageName: string   - название страницы<br>
dataName: string   - json данные страницы(название файла)<br>
dataPath: string   - дирректория расположения данных(путь к файлу)<br>
dataFunc: function - функция обрабатывающая данные(false dafault)<br>
<br>
<i>Пример:</i><br>
<pre>
dataDispatcher.dispatch([{
    actionType: "setDefaultPage",
    data: {
        pageName: "event",
        dataName: "event.json",
        dataPath: "/data/",
        dataFunc: templateEngine
    }
}]);
</pre>
<br>
<b>setPageTitle</b><br>
Меняет заголовок страницы, принимает параметры:<br>
el: string    - класс заголовка/заголовков<br>
title: string - текст заголовка<br>
<br>
<i>Пример:</i><br>
<pre>
dataDispatcher.dispatch([{
    actionType: "setPageTitle",
    data: {
        el: ".st-page-title",
        title: "st page title"
    }
}]);
</pre>
<br>
<b>setNewPage</b><br>
Устанавливает новую страницу, принимает параметры setDefaultPage<br>
<br>
<b>itemStatus</b><br>
Отслеживает активные элементы, принимает параметры:<br>
dataActive: Array<HTMLElement> - массив отслеживаемых элементов<br>
activeClass: string            - класс идентификатор активного элемента(название класса без .)<br>
<i>Пример:</i><br>
<pre>
const buttons = document.querySelectorAll('.st-button');
dataDispatcher.dispatch([{
    actionType: "itemStatus",
    data: {
        dataActive: buttons,
        activeClass: 'st-button_active',
    }
}]);
</pre>
<br>
<b><u>Metods:</u></b><br>
<br>
getCurrentPage<br>
Возвращает название текущей страницы<br>
<i>Пример:</i><br>
<pre>
dataDispatcher.getCurrentPage();
</pre>
<br>
getActiveItems<br>
Возвражает активные элементы<br>
<i>Пример:</i><br>
<pre>
dataDispatcher.getActiveItems();
</pre>
