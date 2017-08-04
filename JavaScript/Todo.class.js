/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


let Todo = function(containerSelector)
{
    let self = this;
    this.todoId = -1;
    this.containerSelector = containerSelector;
    this.container = $(containerSelector);
    
    this.plattform = '';
    this.iStufe = '';
    this.auslesestatus = '';
    this.flashNoetig = '';
    this.todo = '';
    
    
    
    this.createDbEntry = function()
    {
        $.getJSON('Php/addNewTodo.php', function(data)
        {
            self.todoId = data.id;
            self.injectHtml();
            self.setEventHandler();
        });
    };
    
    this.setEventHandler = function()
    {
        let row = $('tr#todo-id-' + this.todoId);
        row.find('button[data-action="updateForm"]').on('click', function(){ self.updateForm(); });
        row.find('button[data-action="delete"]').on('click', function(){ self.delete(); });
        row.find('button[data-action="save"]').on('click', function(){ self.save(); });
        row.find('button[data-action="cancel"]').on('click', function(){ self.cancel(); });
    };
    
    this.injectHtml = function()
    {
        let html = '<tr id="todo-id-' + this.todoId + '">'
            + '<td><input type="text" name="plattform" class="form-control" value="' + this.plattform + '" /></td>'
            + '<td><input type="text" name="i-stufe" class="form-control" value="' + this.iStufe + '" /></td>'
            + '<td><input type="text" name="auslesestatus" class="form-control" value="' + this.auslesestatus + '" /></td>'
            + '<td><input type="text" name="flash-noetig" class="form-control" value="' + this.flashNoetig + '" /></td>'
            + '<td><input type="text" name="todo" class="form-control" value="' + this.todo + '" /></td>'
            + '<td>'
                + '<button type="button" class="btn btn-info" data-fortodoid="' + this.todoId + '" data-action="save"><i class="fa fa-save"></i></button>'
                + '<button type="button" class="btn btn-info hidden" data-fortodoid="' + this.todoId + '" data-action="cancel"><i class="fa fa-close"></i></button>'
                + '<button type="button" class="btn btn-info hidden" data-fortodoid="' + this.todoId + '" data-action="updateForm"><i class="fa fa-pencil"></i></button">'
                + '<button type="button" class="btn btn-danger" data-fortodoid="' + this.todoId + '" data-action="delete"><i class="fa fa-trash"></i></button>'
            + '</td>'
        + '</tr>';
        this.container.append(html);
    };
    
    this.updateForm = function()
    {
        let row = $('tr#todo-id-' + this.todoId);
        row.find('input[type="text"]').removeAttr('disabled');
        row.find('button[data-action="updateForm"]').addClass('hidden');
        row.find('button[data-action="delete"]').addClass('hidden');
        row.find('button[data-action="save"]').removeClass('hidden');
        row.find('button[data-action="cancel"]').removeClass('hidden');
    };
    
    this.save = function()
    {
        let row = $('tr#todo-id-' + this.todoId);
        self.plattform = row.find('input[name="plattform"]').val();
        self.iStufe = row.find('input[name="i-stufe"]').val();
        self.auslesestatus = row.find('input[name="auslesestatus"]').val();
        self.flashNoetig = row.find('input[name="flash-noetig"]').val();
        self.todo = row.find('input[name="todo"]').val();
        
        $.ajax(
        {
            url: 'Php/saveTodo.php',
            method: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                id: self.todoId,
                plattform: self.plattform,
                iStufe: self.iStufe,
                auslesestatus: self.auslesestatus,
                flashNoetig: self.flashNoetig,
                todo: self.todo
            }
        });
        
        row.find('input[type="text"]').attr('disabled', 'disables');
        row.find('button[data-action="updateForm"]').removeClass('hidden');
        row.find('button[data-action="delete"]').removeClass('hidden');
        row.find('button[data-action="save"]').addClass('hidden');
        row.find('button[data-action="cancel"]').addClass('hidden');
    };
    
    this.delete = function()
    {
        $.ajax(
        {
            url: 'Php/deleteTodo.php',
            method: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                id: self.todoId
            }
        }).done(function(data)
        {
            if(data.dbRet)
            {
                $('tr#todo-id-' + self.todoId).remove();
            }
        });
    };
    
    this.cancel = function()
    {
        let row = $('tr#todo-id-' + this.todoId);
        row.find('input[name="plattform"]').val(self.plattform);
        row.find('input[name="i-stufe"]').val(self.iStufe);
        row.find('input[name="auslesestatus"]').val(self.auslesestatus);
        row.find('input[name="flash-noetig"]').val(self.flashNoetig);
        row.find('input[name="todo"]').val(self.todo);
        row.find('input[type="text"]').attr('disabled', 'disables');
        row.find('button[data-action="updateForm"]').removeClass('hidden');
        row.find('button[data-action="delete"]').removeClass('hidden');
        row.find('button[data-action="save"]').addClass('hidden');
        row.find('button[data-action="cancel"]').addClass('hidden');
    };
};