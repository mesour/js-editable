export default class Alert
{

	static createAlert(message, type, dismissButton)
	{
		type = !type ? 'danger' : type;
		let $alert = $('<div class="alert alert-' + type + ' mesour-editable-alert">' + message + '</div>');
		if (typeof dismissButton === 'undefined' || dismissButton) {
			$alert.prepend('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>');
		}
		return $alert;
	}

}