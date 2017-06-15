import FieldType from './../Utils/FieldType';
import EditablePopover from './../EditablePopover';

export default class Enum
{

	TYPE = FieldType.TYPE_ENUM;
	editableClosure;
	select;
	element;
	parameters;
	fieldName;
	value;
	values;
	isNullable;
	removeRow;
	popover;

	constructor(fieldStructure, editableClosure, element, parameters, identifier, value, values, disableEmptyValue)
	{
		this.editableClosure = editableClosure;
		this.element = element;
		this.parameters = parameters || {};
		this.oldValue = element.text();
		this.fieldName = fieldStructure['name'];
		this.value = value;
		this.values = values ? values : fieldStructure['values'];
		this.isNullable = fieldStructure['nullable'];
		this.removeRow = typeof this.parameters['remove_row'] !== 'undefined' ? (!this.parameters['remove_row'] ? false : true) : null;
		this.select = $('<select class="form-control"></select>');
		this.popover = new EditablePopover(fieldStructure, identifier, editableClosure, element, this.select);

		this.initialize(identifier, disableEmptyValue);
	}

	initialize(identifier, disableEmptyValue)
	{
		this.select.css('width', '100%');

		for (let i in this.values) {
			if (!this.values.hasOwnProperty(i)) {
				continue;
			}
			let value = this.values[i];

			let option = this.createOption(value['key'], value['name']);

			this.select.append(option);
		}

		if (this.isNullable && !disableEmptyValue) {
			this.select.prepend('<option value="">' + this.getEditable().getEditableWidget().getTranslate('emptyValue') + '</option>');
		}

		this.select.on('keydown.mesour-editable', (e) => {
			if (e.keyCode === 27) {
				this.reset();
			}
		});

		this.popover.onSave(() => {
			this.getEditable().save(this.fieldName, identifier);
		});
		this.popover.onReset(() => {
			this.reset();
		});
	}

	createOption(key, name)
	{
		if (typeof name === 'string') {
			let option = $('<option>')
				.attr('value', key)
				.text(name);

			if (key == this.value) {
				option.prop('selected', true);
			}
			return option;
		} else {
			let optgroup = $('<optgroup>')
				.attr('label', key);

			for (let i in name) {
				if (!name.hasOwnProperty(i)) {
					continue;
				}
				optgroup.append(this.createOption(i, name[i]));
			}

			return optgroup;
		}
	}

	getEditable()
	{
		return this.editableClosure();
	}

	getEditablePopover()
	{
		return this.popover;
	}

	getElement()
	{
		return this.element;
	}

	getSelect()
	{
		return this.select;
	}

	getValue()
	{
		return {
			oldValue: this.value,
			value: this.select.find(':selected').val(),
			params: this.parameters
		};
	}

	reset()
	{
		this.popover.destroy();
	}

	save()
	{
		this.popover.destroy();
		this.element.empty().text(this.select.find(':selected').text());
	}

}