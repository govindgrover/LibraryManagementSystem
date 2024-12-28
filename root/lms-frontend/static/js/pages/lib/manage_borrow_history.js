import { showToasts, sendFormData } from "../../functions.js";


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
			loadDataCallback(data, "#theBorrowDataTable");
		}
	).catch(
		err =>	{
			console.log("Error occured! Please contact developer.");
			console.log(err);
		}
	)
}

function loadBorrowData(d, dataTableId) {
	let data = d;
	
	if ($.fn.DataTable.isDataTable(dataTableId)) {
		$(dataTableId).DataTable().clear();
		$(dataTableId).DataTable().destroy();
	}

	if ($.isEmptyObject(data)) {
		return;
	}
	
	if (data["status"] == "ok") {
		$(dataTableId).DataTable({
			caption: "For: Currently Active Borrows"
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
					, data: "book_title"
				}
				, {
					title: "ISBN"
					, data: "book_isbn"
				}
				, {
					title: "Issued To"
					, data: "issued_to_name"
				}
				, {
					title: "Date of Issue"
					, data: "date_of_issue"
				}
				, {
					title: "Date of Return"
					, data: "date_of_return"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<form action='/lib/process/borrow-history/revoke' method='POST' name='grant-access-form' onclick='processGrant(this);'>\
						<button type='submit' class='btn btn-outline-warning'>Revoke Access</button>\
						\
						<input class='issued-to-id' type='hidden' name='issued_to_id' value='' />\
						<input class='issued-book-id' type='hidden' name='issued_book_id' value='' />\
					</form>\
					"
					, createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
						$(cell).find('.issued-to-id').attr('value', rowData.issued_to_id);
						$(cell).find('.issued-book-id').attr('value', rowData.book_id);
					}
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.book_id;
			}

			, drawCallback: function (s) {
				let Forms = document.getElementsByTagName('form');
		
				for(let i = 0; i < Forms.length; i++) {
					sendFormData(
						Forms[i]
						, null
						, true
					);
				}
			}
		});
	}
}

fetchDataFromController(
	"/lib/process/get/borrow-history"
	, loadBorrowData
)

