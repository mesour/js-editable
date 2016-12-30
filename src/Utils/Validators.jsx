import NumberHelper from './NumberHelper'

export default class Validators
{

	static validateNumber(editable, val, input, isNormal, isNullable, fieldClosure)
	{
		let isNumeric = NumberHelper.isNumeric(val.replace(',', '.'));
		if ((!isNullable && !val) || (isNullable && val && !isNumeric)) {
			if (!isNormal) {
				input.closest('form')
					.find('.main-form-group:visible:first')
					.prepend(
						editable.createAlert(editable.getEditableWidget().getTranslate('invalidNumber'), 'danger')
					);
			} else {
				let popover = $('.editable-popover:visible .popover-content');
				popover.find('.mesour-editable-alert').remove();

				window.mesour.popover.show(fieldClosure().getElement(), function() {
					popover.prepend(
						editable.createAlert(editable.getEditableWidget().getTranslate('invalidNumber'), 'danger', false)
					);
				});
			}

			if (input) {
				let group = input.closest('.form-group');
				if (!group.is('*')) {
					group = input.closest('.input-group');
				}
				group.addClass('has-error');
				input.trigger('focus');
			}
			return false;
		}
		return true;
	}

}