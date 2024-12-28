import { showToasts, sendFormData } from "../functions.js";

const bsButton = new bootstrap.Button('#register-button');
let registerForm = document.forms["register-form"];

sendFormData(
	registerForm
	, bsButton
);
