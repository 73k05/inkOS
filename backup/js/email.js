//Validate form, and sending email using emailJS service.
//@author:stvplx

// validate the form before the the email
function validateForm() {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("Email").value)) {
		document.getElementById("FormMsg").innerHTML = "<div class='alert alert-info' role='alert'>Email sending...";
		var name = document.getElementById("Name").value;
		var email = document.getElementById("Email").value;
		var message = document.getElementById("Message").value;
		sendEmail(name, email, message);
	} else {
		document.getElementById("FormMsg").innerHTML = "<div class='alert alert-danger' role='alert'>Email must be correctly filled out</div>";
	}
}

// Send email using emailJS service
function sendEmail(name, email, message) {
// parameters: service_id, template_id, template_parameters
emailjs.send("inkos","inkos_template",{"from_name": name, "from_email": email, "message_html": message})
.then(function(response) {
   console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
   document.getElementById("FormMsg").innerHTML = "<div class='alert alert-success' role='alert'>Email has been succesfully sent</div>";
}, function(err) {
   console.log("FAILED. error=", err);
   document.getElementById("FormMsg").innerHTML = "<div class='alert alert-danger' role='alert'>An error has occured, please try again in few seconds</div>";
});
}
