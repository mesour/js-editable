import Text from './Text';
import FieldType from './../Utils/FieldType';
import NumberHelper from './../Utils/NumberHelper';
import Validators from './../Utils/Validators';

export default class Number
{

	TYPE = FieldType.TYPE_NUMBER;
	editableClosure;
	popover;
	input;
	element;
	fieldName;
	rules = [];
	unit;
	separator;
	decimalPoint;
	decimals;
	isNullable;

	constructor(fieldStructure, editableClosure, element, parameters, identifier, isSpecial)
	{
		this.editableClosure = editableClosure;
		this.element = element;
		this.text = new Text(fieldStructure, editableClosure, element, parameters, identifier, true);
		this.input = this.text.getInput();
		this.popover = this.text.getEditablePopover();

		this.fieldName = fieldStructure['name'];
		this.rules = fieldStructure['rules'];
		this.unit = fieldStructure['unit'];
		this.separator = fieldStructure['separator'];
		this.decimalPoint = fieldStructure['decimalPoint'];
		this.decimals = fieldStructure['decimals'];
		this.isNullable = fieldStructure['nullable'];

		this.initialize(identifier);
	}

	initialize(identifier)
	{
		let save = () => {
			let isValid = Validators.validate(
				this.rules,
				this.input.val(),
				this.input,
				true,
				this.isNullable,
				() => {return this}
			);
			if (isValid) {
				this.getEditable().save(this.fieldName, identifier);
			}
		}

		this.input.val(this.fixNumber(this.input.val()));
		this.input.attr('placeholder', NumberHelper.numberFormat(0, this.decimals));

		if (this.unit) {
			this.input.after('<span style="" class="input-group-addon">' + this.unit + '</span>');
		}

		this.input.focus();

		this.popover.onSave(function() {
			save();
		});

		this.input.off('keydown.mesour-editable');
		this.input.on('keydown.mesour-editable', (e) => {
			if (e.keyCode === 13) {
				save();
			} else if (e.keyCode === 27) {
				this.text.reset();
			}
		});
	}

	getEditable()
	{
		return this.editableClosure();
	}

	getElement()
	{
		return this.element;
	}

	getValue()
	{
		let value = this.text.getValue();

		value['oldValue'] = this.fixNumber(value['oldValue']);

		return value;
	}

	reset()
	{
		this.text.reset();
	}

	save()
	{
		let val = this.input.val();
		this.element.empty().text(NumberHelper.numberFormat(val, this.decimals, this.decimalPoint, this.separator) + (this.unit ? (' ' + this.unit) : ''));
		this.popover.destroy();
	}

	fixNumber(value)
	{
		let fixedValue = jQuery.trim(value.replace(new RegExp(this.separator === '.' ? '\\.' : this.separator, 'g'), '')
			.replace(this.decimalPoint, '.')
			.replace(this.unit, ''));
		if (!NumberHelper.isNumeric(fixedValue)) {
			return '';
		}
		return fixedValue;
	}

}