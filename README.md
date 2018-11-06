<b>Фреймворк на Flux-подходе.</b><br>
<br>
<ins>Описание:</ins><br>
TS Фреймфорка находиться в папке components.<br>
Файл для подключения main.min.js, находиться в папке js.<br>
<br>
Dispatcher по умолчанию: <i>dataDispatcher</i><br>
Объявление нового Dispatcher: <i>let custDis = new Dispatcher();</i><br>
Создание Action: <i>dataDispatcher.dispatch([{Action}]);</i><br>
Несколько Action: <i>dataDispatcher.dispatch([{Action},{Action},...]);</i><br>
<br>
<ins>Структура Action:</ins><br>

<pre>
{
    actionType: ActionName,
    data: {ActionParams}
}
</pre>
<br>
<ins>Список Action:</ins><br>
<br>
<b>setDefaultPage</b><br>
Устанавливает начальную страницу, создает Store, принимает параметры:<br>
<i>pageName: string</i>   - название страницы<br>
<i>dataName: string</i>   - json данные страницы(название файла)<br>
<i>dataPath: string</i>   - дирректория расположения данных(путь к файлу)<br>
<i>dataFunc: function</i> - функция обрабатывающая данные(false dafault)<br>
<br>
Пример:<br>
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
<i>el: string</i>    - класс заголовка/заголовков<br>
<i>title: string</i> - текст заголовка<br>
<br>
Пример:<br>
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
<i>dataActive: Array<HTMLElement></i> - массив отслеживаемых элементов<br>
<i>activeClass: string</i>            - класс идентификатор активного элемента(название класса без .)<br>
Пример:<br>
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
<ins>Metods:</ins><br>
<br>
<b>getCurrentPage</b><br>
Возвращает название текущей страницы<br>
Пример:<br>
<pre>
dataDispatcher.getCurrentPage();
</pre>
<br>
<b>getActiveItems</b><br>
Возвражает активные элементы<br>
Пример:<br>
<pre>
dataDispatcher.getActiveItems();
</pre>
