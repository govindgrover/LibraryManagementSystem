import { sendFormData } from "../../functions.js";

let returnForms = document.getElementsByTagName("form");


for(let i = 0; i < returnForms.length; i++) {
	sendFormData(
		returnForms[i]
	)
	console.log(returnForms[i])
}

