import { sendFormData } from "../functions.js";

// JS to handle account delete operation
const bsDeleteButton = new bootstrap.Button('#account-delete-button');
let accDelForm = document.forms["account-delete"];

sendFormData(
	accDelForm
	, bsDeleteButton
)


// JS to handle account update name operation
const bsUpdateNameButton = new bootstrap.Button('#acc-update-name-button');
let accUpdateNameForm = document.forms["acc-update-name"];

sendFormData(
	accUpdateNameForm
	, bsUpdateNameButton
)


// JS to handle account update password operation
const bsUpdatePasswordButton = new bootstrap.Button('#acc-update-password-button');
let accUpdatePasswordForm = document.forms["acc-update-password"];

sendFormData(
	accUpdatePasswordForm
	, bsUpdatePasswordButton
)



// JS to handle account update profile picture operation
const bsUpdatePPButton = new bootstrap.Button('#acc-update-pp-button');
let accUpdatePPForm = document.forms["acc-update-pp"];

sendFormData(
	accUpdatePPForm
	, bsUpdatePPButton
)

