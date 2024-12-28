import { showToasts, sendFormData } from "../../functions.js";

const formsToUpdateDifferentAttributesOfBook = {
	"title"				:	document.forms["update-book-title-form"]
	, "desc"			:	document.forms["update-book-desc-form"]
	, "price"			:	document.forms["update-book-price-form"]
	, "cover_img"		:	document.forms["update-book-cover-image-form"]
	, "active_status"	:	document.forms["update-book-active-status-form"]
	, "delete"			:	document.forms["delete-book-form"]
}

formsToUpdateDifferentAttributesOfBook["title"].action			=	"/lib/process/book/modify/title";
formsToUpdateDifferentAttributesOfBook["desc"].action			=	"/lib/process/book/modify/desc";
formsToUpdateDifferentAttributesOfBook["price"].action			=	"/lib/process/book/modify/price";
formsToUpdateDifferentAttributesOfBook["cover_img"].action		=	"/lib/process/book/modify/cimg";
formsToUpdateDifferentAttributesOfBook["active_status"].action	=	"/lib/process/book/modify/active";
formsToUpdateDifferentAttributesOfBook["delete"].action			=	"/lib/process/book/modify/delete";


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
			loadDataCallback(data, "#theBookDataTable");
		}
	).catch(
		err =>	{
			console.log("Error occured! Please contact developer.");
			console.log(err);
		}
	)
}

function loadBooksData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}
	
	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Books"
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
					title: "Title"
					, data: "title"
				}
				, {
					title: "ISBN"
					, data: "isbn"
				}
				, {
					title: "Edition"
					, data: "edition"
				}
				, {
					title: "Price"
					, data: "price"
				}
				, {
					title: "Publication Date"
					, data: "publication_date"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<div class='btn-group' role='group'>\
						<button type='button' class='btn btn-outline-secondary' data-bs-toggle='offcanvas' data-bs-target='#informationOffcanvas_for_book' aria-controls='informationOffcanvas_for_book' onclick='openSideBookPanel(this);'>Update</button>\
						<button type='button' class='btn btn-primary view-book-details' data-bs-toggle='modal' data-bs-target='#view_book_details_modal' onclick='openBookDetailsModal(this);'>View</button>\
					</div>\
					"
					, createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
						$(cell).find('.view-book-details').attr('app-data-book-id', rowData.book_id);
					}
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.book_id;
			}
	
			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
	
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}

				$(row).find(".view-book-details").data(
					"hidden_data"
					, {
						"authors"		:	data["authors"]
						, "publisher"	:	data["publisher"]
						, "category"	:	data["category"]
						, "genre"		:	data["genre"]
						, "language"	:	data["language"]

						, "description"	:	data["description"]
						, "feedbacks"	:	data["feedbacks"]
						, "cover_image"	:	data["cover_image"]
					}
				);
			}
		});
	}
}

fetchDataFromController(
	"/lib/process/get/books"
	, loadBooksData
)


window.onload = function () {
	for (let [key, form] of Object.entries(formsToUpdateDifferentAttributesOfBook)) {
		sendFormData(
			form
			, null
			, false
		);
	}
};

