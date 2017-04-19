JSONEditor.defaults.options.disable_collapse = true;
JSONEditor.defaults.options.disable_edit_json = true;
JSONEditor.defaults.options.disable_properties = true;
JSONEditor.defaults.options.template = 'markup';
JSONEditor.defaults.options.expand_height = true;

var jsoneditor;

var router  = new Grapnel();

router.get('', function(req) {
    showIndexPage();
});
router.get('/:folder/:file', function(req) {
    showFormPage(req.params.folder, req.params.file);
});

function showIndexPage() {
    // switch to index page
    $('#form-page').hide();
    $('#index-page').show();
    // show body (hidden to avoid fouc)
    $('body').css('visibility', 'visible');
}

function showFormPage(folder, file) {
    $('#index-page').hide();
    // remove message that apears after sending email (in case someone backed out after sending an email)
    $('#message').text('');
    return fetchival("/form/"+folder+"/"+file, { credentials: "same-origin"}).get()
        .then(setSchema)
        .then(function(){
            // show body (hidden to avoid fouc)
            $('body').css('visibility', 'visible');
            // show filename as header
            $('#form-name').text(file);
            $('#form-page').show();
            $('#editor').garlic({
                onRetrieve: function ( elem, retrievedValue ) {
                    // call native javascript change event (garlic is jquery)
                    var e = new Event('change');
                    elem[0].dispatchEvent(e);
                }
            });

        }).catch(function(err) {
            console.error(err);
            // show body (hidden to avoid fouc)
            $('body').css('visibility', 'visible');
            $('#form-page').text('Form existiert nicht');
        });
}

function setSchema(schema) {
    if(jsoneditor) jsoneditor.destroy();
    var editor = document.getElementById('editor');
    jsoneditor = new JSONEditor(editor,{
        schema: schema
    });
    window.jsoneditor = jsoneditor;
}

$('.accordion').on('click', 'label', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var content = this.nextElementSibling;
    this.classList.toggle('active');
    content.classList.toggle('collapsed');
});


$('#send').on('click', function(e) {
    sendMail();
});

function sendMail() {
    var errors = jsoneditor.validate();
    if (errors.length) {
        jsoneditor.options.show_errors = "always";
        jsoneditor.onChange();
    } else { //it's valid!
        $("#editor").garlic('destroy'); //needs testing. docs say this doesn't work.
        var data = jsoneditor.getValue();

        fetchival("/mail", { credentials: "same-origin"}).post(data)
            .then(function(res) {
                $('#message').text(res.message);
                // disable send button for 5 seconds to limit accidental sends
                $('#send').prop('disabled', true);
                setTimeout(function() {
                    $('#send').prop('disabled', false);
                }, 5000);
            }).catch(function() {
                // catch server errors
                $('#message').text('Ein Fehler ist aufgetreten');
            });
    }
}
