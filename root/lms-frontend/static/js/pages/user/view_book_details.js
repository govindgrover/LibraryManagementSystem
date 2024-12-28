import { sendFormData } from "../../functions.js";

let raiseBorrowRequestButton = document.forms["raise-book-issue-request-form"];

sendFormData(
	raiseBorrowRequestButton
);

let bookFeedbackForm	=	document.forms["book-feedback-form"];

sendFormData(
	bookFeedbackForm
);

