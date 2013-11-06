$(document).ready(function () {
    var todo_form = $('#todo-form')

    todo_form.on('submit', function (e) {
        var new_todo = $('#todo-input')
        console.log(new_todo.find('textarea').val())

        if (new_todo.find('textarea').val() === '') {
            new_todo.addClass('has-error')
            return false
        }
    })
})
