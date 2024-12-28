import { showToasts, sendFormData } from "../../functions.js";

const formsToUpdateDifferentMasters = {
	"author": {
		"name": document.forms["update-author-name-form"]
		, "bio": document.forms["update-author-bio-form"]
		, "active_status": document.forms["update-author-active-status-form"]
		, "delete": document.forms["delete-author-form"]
	}
	, "publisher": {
		"name": document.forms["update-publisher-name-form"]
		, "desc": document.forms["update-publisher-desc-form"]
		, "active_status": document.forms["update-publisher-active-status-form"]
		, "delete": document.forms["delete-publisher-form"]
	}
	, "category": {
		"name": document.forms["update-category-name-form"]
		, "active_status": document.forms["update-category-active-status-form"]
		, "delete": document.forms["delete-category-form"]
	}
	, "genre": {
		"name": document.forms["update-genre-name-form"]
		, "active_status": document.forms["update-genre-active-status-form"]
		, "delete": document.forms["delete-genre-form"]
	}
	, "language": {
		"name": document.forms["update-language-name-form"]
		, "active_status": document.forms["update-language-active-status-form"]
		, "delete": document.forms["delete-language-form"]
	}
}

formsToUpdateDifferentMasters["author"]["name"].action			=	"/lib/process/author/modify/name";
formsToUpdateDifferentMasters["author"]["bio"].action			=	"/lib/process/author/modify/bio";
formsToUpdateDifferentMasters["author"]["active_status"].action	=	"/lib/process/author/modify/active";
formsToUpdateDifferentMasters["author"]["delete"].action		=	"/lib/process/author/modify/delete";

formsToUpdateDifferentMasters["publisher"]["name"].action			=	"/lib/process/publisher/modify/name";
formsToUpdateDifferentMasters["publisher"]["desc"].action			=	"/lib/process/publisher/modify/desc";
formsToUpdateDifferentMasters["publisher"]["active_status"].action	=	"/lib/process/publisher/modify/active";
formsToUpdateDifferentMasters["publisher"]["delete"].action			=	"/lib/process/publisher/modify/delete";

formsToUpdateDifferentMasters["category"]["name"].action			=	"/lib/process/category/modify/name";
formsToUpdateDifferentMasters["category"]["active_status"].action	=	"/lib/process/category/modify/active";
formsToUpdateDifferentMasters["category"]["delete"].action			=	"/lib/process/category/modify/delete";

formsToUpdateDifferentMasters["genre"]["name"].action			=	"/lib/process/genre/modify/name";
formsToUpdateDifferentMasters["genre"]["active_status"].action	=	"/lib/process/genre/modify/active";
formsToUpdateDifferentMasters["genre"]["delete"].action			=	"/lib/process/genre/modify/delete";

formsToUpdateDifferentMasters["language"]["name"].action			=	"/lib/process/language/modify/name";
formsToUpdateDifferentMasters["language"]["active_status"].action	=	"/lib/process/language/modify/active";
formsToUpdateDifferentMasters["language"]["delete"].action			=	"/lib/process/language/modify/delete";



function fetchDataFromController(action, loadDataCallback) {
	fetch(
		action
		, {
			method: "POST"
		}
		).then(
		response => response.json()			
	).then(
		data => {
			showToasts(data, 'msg', "Message");
			loadDataCallback(data, "#theDataTable");
		}
	).catch(
		err =>	{
			console.log("Error occured! Please contact developer.");
			console.log(err);
		}
	)
}

function loadAuthorData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}
	
	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Author"
			, retrieve: true
			, columnDefs: [
				{
					targets: -1
					, searchable: false
					, orderable: false
				}
			]
			, columns: [
				{
					title: "Name"
					, data: "name"
				}
				, {
					title: "Biography"
					, data: "bio"
				}
				, {
					title: "Date Created"
					, data: "uploaded_on"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<button type='button' class='btn btn-outline-secondary' data-bs-toggle='offcanvas' data-bs-target='#informationOffcanvas_author' aria-controls='informationOffcanvas_author' onclick='openSideAuthorPanel(this);'>Open</button>\
					"
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.author_id;
			}
	
			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
	
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}
			}
		});
	}
}

function loadPublisherData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}

	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Publisher"
			, retrieve: true
			, columnDefs: [
				{
					targets: -1
					, searchable: false
					, orderable: false
				}
			]
			, columns: [
				{
					title: "Name"
					, data: "name"
				}
				, {
					title: "Description"
					, data: "desc"
				}
				, {
					title: "Date Created"
					, data: "uploaded_on"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<button type='button' class='btn btn-outline-secondary' data-bs-toggle='offcanvas' data-bs-target='#informationOffcanvas_publisher' aria-controls='informationOffcanvas_publisher' onclick='openPublisherSidePanel(this);'>Open</button>\
					"
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.publisher_id;
			}
	
			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
	
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}
			}
		});
	}
}

function loadCategoryData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}

	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Category"
			, retrieve: true
			, columnDefs: [
				{
					targets: [-1, -2]
					, searchable: false
					, orderable: false
				}
			]
			, columns: [
				{
					title: "Name"
					, data: "name"
				}
				, {
					title: "Date Created"
					, data: "uploaded_on"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<button type='button' class='btn btn-outline-secondary' data-bs-toggle='offcanvas' data-bs-target='#informationOffcanvas_category' aria-controls='informationOffcanvas_category' onclick='openCategorySidePanel(this);'>Open</button>\
					"
				}
				, {
					title: ""
					, data: null
					, defaultContent: ""
					, visible: false
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.category_id;
			}
	
			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}
			}
		});
	}
}

function loadGenreData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}

	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Genre"
			, retrieve: true
			, columnDefs: [
				{
					targets: [-1, -2]
					, searchable: false
					, orderable: false
				}
			]
			, columns: [
				{
					title: "Name"
					, data: "name"
				}
				, {
					title: "Date Created"
					, data: "uploaded_on"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<button type='button' class='btn btn-outline-secondary' data-bs-toggle='offcanvas' data-bs-target='#informationOffcanvas_genre' aria-controls='informationOffcanvas_genre' onclick='openGenreSidePanel(this);'>Open</button>\
					"
				}
				, {
					title: ""
					, data: null
					, defaultContent: ""
					, visible: false
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.genre_id;
			}
	
			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
	
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}	
			}
		});
	}
}

function loadLanguageData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}

	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Language"
			, retrieve: true
			, columnDefs: [
				{
					targets: [-1, -2]
					, searchable: false
					, orderable: false
				}
			]
			, columns: [
				{
					title: "Name"
					, data: "name"
				}
				, {
					title: "Date Created"
					, data: "uploaded_on"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<button type='button' class='btn btn-outline-secondary' data-bs-toggle='offcanvas' data-bs-target='#informationOffcanvas_language' aria-controls='informationOffcanvas_language' onclick='openLanguageSidePanel(this);'>Open</button>\
					"
				}
				, {
					title: ""
					, data: null
					, defaultContent: ""
					, visible: false
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.language_id;
			}
	
			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
	
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}
			}
		});
	}
}


document.getElementById("view_master_select").addEventListener("change", function e() {
	if (this.value == "author") {
		fetchDataFromController("/lib/process/get/author", loadAuthorData);
	}
	else if (this.value == "publisher") {
		fetchDataFromController("/lib/process/get/publisher", loadPublisherData);
	}
	else if (this.value == "category") {
		fetchDataFromController("/lib/process/get/category", loadCategoryData);
	}
	else if (this.value == "genre") {
		fetchDataFromController("/lib/process/get/genre", loadGenreData);
	}
	else if (this.value == "language") {
		fetchDataFromController("/lib/process/get/language", loadLanguageData);
	}
});


for (let [master, forms] of Object.entries(formsToUpdateDifferentMasters)) {
	for (let [x, form] of Object.entries(forms)) {
		sendFormData(
			form
			, null
			, false
		);
	}
}
