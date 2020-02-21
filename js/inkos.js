(function() {
    emailjs.init("user_okaI2d5BZr9wdrnselFor");
})();

function sendContactMail() {
    var form = document.getElementById('contact-form');
    sendMail(form, $("#contact-check"));
}

function sendMail(form, checkbutton) {
    if (form == undefined || !form.checkValidity() || form.user_email == undefined || form.user_email.value == undefined || form.user_email.value.isEmpty() || form.is_already_sent.value == 'true') {
        console.error("Error, email empty or wrong or buzz already sent");
        return;
    }

    var email = form.user_email.value
    // generate the contact number value
    var number = Math.random() * 100000 | 0;
    var name = email.substring(0, email.indexOf('@'));
    date = "Not booked";
    if (form.date_to_book) {
    	date = form.date_to_book;
    }

    var params = {
        email: email,
        name: name,
        number: number,
        datebooking: date
    };

    form.is_already_sent.value = 'true';
    emailjs.send('inkos', 'inkos_template', params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        	checkbutton.removeClass("hide");
        }, function(error) {
            console.log('FAILED...', error);
            form.is_already_sent.value = false;
        });
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

let date_to_book;

(function() {
    today = new Date();
    $("#datepicker").datepicker({
        onSelect: function(date) {
            date_to_book = date;
            $("#input-email-book").removeClass("hide");
            $("#book-button").html('Reserver');
        },
        minDate: new Date(),
        firstDay: 1,
        dateFormat: "dd/mm/yy"
    });
})();

function book() {
    if ($("#book-button").text() == 'Choisir la date') {
        $("#datepicker").datepicker().show();
        $("#datepicker").focus();
    } else if ($("#book-button").text() == 'Reserver') {
        var form = document.getElementById('book-form');
        if (!date_to_book || date_to_book.isEmpty() || !form.checkValidity()) {
            console.error("Email or date missing");
            $("#error-book").removeClass("hide");
            $("#error-book").html('Veuillez renseigner email & date');
            return;
        }

        form.date_to_book = date_to_book;
        $("#book-button").addClass("hide");

        sendMail(form, $("#book-check"));
    }
}













//sd