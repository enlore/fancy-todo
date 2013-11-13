$(document).ready(function () {
    var todo_form = $('#todo-form')
        , new_todo = $('#todo-input')
        , keys = []
        , stamps = []

    todo_form.focus()
    todo_form.on('keyup', function (e) {
        // this only concerns the form
        e.stopPropagation()

        // if the key pressed is ctrl or enter
        if (e.which === 13 || e.which === 17) {
            // stick its code and time stamp in the respsective arrays
            keys.push(e.which)
            stamps.push(e.timeStamp)
        }

        // when the arrays have two members
        if (keys.length === 2) {
            // and keys 13 and 17 were pressed
            if (keys.indexOf(13) !== -1 && keys.indexOf(17) !== -1) {
                // and the timestamps are less than half(ish) a second apart
                if ( stamps[1] - stamps[0] < 601 ) {
                    // ZANG! form submission
                    todo_form.trigger('submit')
                }
            }
        // pressed two keys that weren't 13 and 17?
        } else if (keys.length > 2) {
            // empty those arrays; only two members at a time
            // (does this even work?)
            keys = []
            stamps = []
        }
    })

    todo_form.on('submit', function (e) {

        if (new_todo.find('textarea').val() === '') {
            new_todo.addClass('has-error')
            return false
        }
    })
})
