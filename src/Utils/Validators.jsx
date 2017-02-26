import Alert from './Alert'

export default class Validators
{

	static validate(rules, val, input, isNormal, isNullable, fieldClosure)
	{
		for (let i = 0; i < rules.length; i++) {
			let rule = rules[i],
				arg = rule['arg'] || null;
			if (rule['type'] === mesour.validator.type.FILLED) {
				return Validators.validateFilled(val, input, isNormal, fieldClosure, rule['message']);
			} else if (rule['type'] === mesour.validator.type.NUMERIC) {
				return Validators.validateNumber(val, input, isNormal, isNullable, fieldClosure, rule['message']);
			} else {
				return Validators.validateField(val, input, isNormal, isNullable, fieldClosure, rule['message'], rule['type'], arg);
			}
		}
		return true;
	}

	static validateFilled(val, input, isNormal, fieldClosure, message)
	{
		if (!val) {
			Validators.applyError(input, isNormal, fieldClosure, message);
			return false;
		}
		return true;
	}

	static validateField(val, input, isNormal, isNullable, fieldClosure, message, type, arg)
	{
		if (isNullable && (!val || val === '')) {
			return true;
		}

		if (!mesour.validator.validate(type, val, arg)) {
			Validators.applyError(input, isNormal, fieldClosure, message);
			return false;
		}
		return true;
	}

	static validateNumber(val, input, isNormal, isNullable, fieldClosure, message)
	{
		if ((!isNullable && !val) || (isNullable && val && !mesour.validator.validate(mesour.validator.type.NUMERIC, val.replace(',', '.')))) {
			Validators.applyError(input, isNormal, fieldClosure, message);
			return false;
		}
		return true;
	}

	static applyError(input, isNormal, fieldClosure, message)
	{
		if (!isNormal) {
			Validators.formError(input, message);
		} else {
			Validators.popoverError(fieldClosure, message);
		}
		Validators.afterUpdate(input);
	}

	static formError(input, message)
	{
		input.closest('form')
			.find('.main-form-group:visible:first')
			.find('.form-group:first')
			.before(Alert.createAlert(message, 'danger'));
	}

	static popoverError(fieldClosure, message)
	{
		let popover = jQuery('.editable-popover:visible .popover-content');
		popover.find('.mesour-editable-alert').remove();

		window.mesour.popover.show(fieldClosure().getElement(), function() {
			popover.prepend(
				Alert.createAlert(message, 'danger', false)
			);
		});
	}

	static afterUpdate(input)
	{
		if (input) {
			let group = input.closest('.form-group');
			if (!group.is('*')) {
				group = input.closest('.input-group');
			}
			group.addClass('has-error');
			input.trigger('focus');
		}
	}

}