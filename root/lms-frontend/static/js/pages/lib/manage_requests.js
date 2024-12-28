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
			loadDataCallback(data, "#theRequestsDataTable");
		}
	).catch(
		err =>	{
			console.log("Error occured! Please contact developer.");
			console.log(err);
		}
	)
}

function loadRequestData(d, dataTableId) {
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
			caption: "For: Raised/Closed Requests of Books"
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
					title: "Date Requested"
					, data: "date_of_request"
				}
				, {
					title: "Requested By"
					, data: "requested_by_name"
				}
				, {
					title: "Chargeble Rate"
					, data: "max_price"
				}
				, {
					title: "Action"
					, defaultContent: "\
					<form class='form' action='/lib/process/issue-requests/issue' method='POST' name='' app-data-selector='issueForm'>\
						<input class='requestee-id' type='hidden' name='book_requested_by' value='' />\
						<input class='requested-book-id' type='hidden' name='requested_book_id' value='' />\
						\
						<div class='btn-group' role='group'>\
							<button type='submit' class='btn btn-outline-success'>Issue</button>\
							<button type='button' class='btn btn-outline-info' data-bs-toggle='modal' data-bs-target='#purchase_book_modal' onclick='processPurchase(this);'>Purchase</button>\
						</div>\
					</form>\
					"
					, createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
						$(cell).find('.requestee-id').attr('value', rowData.requested_by_id);
						$(cell).find('.requested-book-id').attr('value', rowData.book_id);
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
	"/lib/process/get/issue-requests"
	, loadRequestData
)
