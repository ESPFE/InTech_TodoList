/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function()
{
    // set event handler
    $('#addToDo').on('click', function()
    {
        let todo = new Todo('.todo-table tbody');
        todo.createDbEntry();
    });
    $('#refreshTodo').on('click', function()
    {
        location.reload();
    });
    
    /**
     * load todos from database
     */
    $.getJSON('Php/loadTodo.php', function(data)
    {
        for(let i = 0; i < data.length; i++)
        {
            let todo = new Todo('.todo-table tbody');
            todo.todoId = data[i].id;
            todo.plattform = data[i].plattform;
            todo.iStufe = data[i].istufe;
            todo.auslesestatus = data[i].auslesestatus;
            todo.flashNoetig = data[i].flashnoetig;
            todo.todo = data[i].todo;
            todo.injectHtml();
            todo.setEventHandler();
            todo.cancel();
        }
    });
});