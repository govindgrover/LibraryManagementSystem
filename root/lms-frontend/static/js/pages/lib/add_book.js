import { sendFormData } from "../../functions.js";


sendFormData(
	document.forms["add-book-form"]
	, new bootstrap.Button('#add-book-button')
);
