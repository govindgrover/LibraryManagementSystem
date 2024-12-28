import { sendFormData } from "./../../functions.js";

// JS to handle add author operation

const OperationKeys = [
	"author"
	, "publisher"
	, "category"
	, "genre"
	, "language"
]

const bsAddButtons = {
	"author" 		:	new bootstrap.Button('#add-author-button')
	, "publisher"	:	new bootstrap.Button('#add-publisher-button')
	, "category"	:	new bootstrap.Button('#add-category-button')
	, "genre"		:	new bootstrap.Button('#add-genre-button')
	, "language"	:	new bootstrap.Button('#add-language-button')
};

const addMasterForms = {
	"author" 		:	document.forms["add-author-form"]
	, "publisher"	:	document.forms["add-publisher-form"]
	, "category"	:	document.forms["add-category-form"]
	, "genre"		:	document.forms["add-genre-form"]
	, "language"	:	document.forms["add-language-form"]
};

OperationKeys.forEach(key => {
	sendFormData(
		addMasterForms[key]
		, bsAddButtons[key]
	);
});

