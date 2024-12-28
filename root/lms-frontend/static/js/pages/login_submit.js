import { sendFormData } from "./../functions.js";

const bsButton = new bootstrap.Button('#login-button');
let loginForm = document.forms["login-op-form"];

sendFormData(
	loginForm
	, bsButton
);
