(function() {
    emailjs.init("user_okaI2d5BZr9wdrnselFor");
})();

function sendMail() {
    console.log("Send mail...");
    form = document.getElementById('contact-form');
    if (form == undefined || !form.checkValidity() || form.user_email == undefined || form.user_email.value == undefined || form.user_email.value.isEmpty() || form.is_already_sent.value == 'true') {
        console.error("Error, email empty or wrong or buzz already sent");
        return;
    }
    var email = form.user_email.value
    console.log("Email: " + email);
    // generate the contact number value
    var number = Math.random() * 100000 | 0;
    var name = email.substring(0, email.indexOf('@'));
    var params = {
        email: email,
        name: name,
        number: number
    };

    form.is_already_sent.value = 'true';
    emailjs.send('inkos', 'inkos_template', params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
            form.is_already_sent.value = false;
        });
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};