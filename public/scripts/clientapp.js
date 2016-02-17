$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();

               // displayPeople(data);
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            displayPeople(data);

        }
    });
}
function displayPeople(data){
    $('#people').children().remove();
    $.each(data, function(i, person){
        $('#people').append('<div></div>');
        var $el = $('#people').children().last();
        $el.append('<h2>'+ person.name + '</h2>');
        $el.append('<h4>'+ person.address + '</h4>');
        $el.append('<h4>'+ person.city + '</h4>');
        $el.append('<h4>'+ person.state + '</h4>');
        $el.append('<h4>'+ person.zip_code + '</h4>');
    })
}