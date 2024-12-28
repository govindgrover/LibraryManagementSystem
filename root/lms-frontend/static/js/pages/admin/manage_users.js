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
			loadDataCallback(data, "#theAppUserListDataTable");
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
			caption: "For: List of App Users"
			, retrieve: true
			, columnDefs: [
				{
					targets: -1
					, searchable: true
					, orderable: true
				}
			]
			, columns: [
				{
					title: "Profile Pic"
					, defaultContent: "<img class='img-thumbnail' src='' alt='' width='64px' height='64px' />"
				}
				, {
					title: "Name"
					, data: "name"
				}
				, {
					title: "E-Mail"
					, data: "email"
				}
				, {
					title: "Role"
					, data: "role"
				}
				, {
					title: "DOB"
					, data: "dob"
				}
				, {
					title: "Gender"
					, data: "gender"
				}
			]
	
			, data: data["data"]
	
			, rowId: function(row, data) {
				return row.user_id;
			}

			, rowCallback: function(row, data) {
				if (data.is_active == 0) {
					row.setAttribute("class", "table-warning");
				}
				else if (data.is_active == 1) {
					row.setAttribute("class", "table-success");
				}
				else if (data.is_deleted == 1) {
					row.setAttribute("class", "table-danger");
				}

				row.childNodes[0].setAttribute("class", "text-center")
				row.childNodes[0].childNodes[0].setAttribute("src", "http://127.0.0.1:8080/static/pp/" + data.profile_picture);
			}
		});
	}
}

fetchDataFromController(
	"/admin/process/get/users"
	, loadRequestData
)
