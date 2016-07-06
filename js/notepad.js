$(document).ready(function () {

    $('#addNoteForm').submit(function (event) {
        return false;
    });

    loadFromLocalStorage();

    //create note
    $('#htmlSet').click(function () {

        var id = maxId();
        id++;
        var note = {
            idNote: "note" + id,
            title: $('#title').val(),
            description: $('#description').val()
        }

        localStorage.setItem(note.idNote, JSON.stringify(note));
        var newNote = $("<div class='note' id='" + note.idNote + "'></div>")
            .append("<h3>" + note.title + "</h3>")
            .append("<p>" + note.description + "</p>");
        $('#target').prepend(newNote);

    });

});

//remove one note
$(document).on('dblclick', '.note', function () {
    id = $(this).attr("id");
    localStorage.removeItem(id);
    $(this).remove();
});

//remove all notes
$(document).on('click', '#removeAll', function () {
    $('#target').children().remove();

    var localStorageLength = localStorage.length;

    for (var i = localStorageLength - 1; i >= 0; i--) {
        var keyName = localStorage.key(i);
        console.log(keyName);
        if (keyName.indexOf("note") == 0) {
            localStorage.removeItem(keyName);
        }
    }
});

//load notes from localltorage
function loadFromLocalStorage() {
    var localStorageLength = localStorage.length;
    if (localStorageLength > 0) {
        for (var i = 0; i < localStorageLength; i++) {
            var keyName = localStorage.key(i);
            if (keyName.indexOf("note") == 0) {
                var note = JSON.parse(localStorage.getItem(keyName));
                var newNote = $("<div class='note' id='" + note.idNote + "'></div>")
                    .append("<h3>" + note.title + "</h3>")
                    .append("<p>" + note.description + "</p>");
                $('#target').prepend(newNote);
            }
        }
    }
}

//search max key in localltorage
function maxId() {
    var localStorageLength = localStorage.length;
    var max = 0;
    for (var i = 0; i < localStorageLength; i++) {
        var keyName = localStorage.key(i);
        if (keyName.indexOf("note") == 0) {
            if (parseInt(localStorage.key(i).slice(4)) > max) {
                max = parseInt(localStorage.key(i).slice(4));
            }
        }
    }
    return max;
};
