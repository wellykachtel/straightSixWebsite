$(document).ready(function() {

	var form = $('#formAddUser');
	form.validate({
		rules: {
			password: {
				required: true,
				minlength: 8,
			}
		},
		onfocusout: function(element) {
			$(element).valid();
			/*if($(element).valid() == false) {
				$('#submit').prop('disabled',true);
			} else {
				$('#submit').prop('disabled', false);
			}*/
		}

	});

	$('#password_confirm').blur(function() {

		var password = $('#password').val();
		var passwordCnf = $('#password_confirm').val();
		if(password != passwordCnf) {
			$('#submit').prop('disabled', true);
			$('#pwdError').css('display', 'block');
		} else {
			$('#pwdError').css('display', 'none');
			$('#submit').prop('disabled', false);
		}

	});



});
