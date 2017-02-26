import EditablePopover from './../EditablePopover';
import FieldType from './../Utils/FieldType';

export default class Bool
{

	TYPE = FieldType.TYPE_BOOL;
	editableClosure;
	parameters = {};
	fieldName;
	description;
	nullable;
	element;
	value;
	oldValue;
	input;
	label;
	prependButtons = [];

	constructor(fieldStructure, editableClosure, element, parameters, identifier, value)
	{
		this.editableClosure = editableClosure;
		this.parameters = parameters || {};
		this.fieldName = fieldStructure['name'];
		this.description = fieldStructure['description'];
		this.nullable = fieldStructure['nullable'];
		this.element = element;
		this.value = value;
		this.oldValue = element.text();
		this.input = $('<input type="checkbox" value="1">');
		this.label = $('<label>');

		this.initialize(identifier);
	}

	initialize(identifier)
	{
		if (this.nullable) {
			let emptyButton = $('<button class="btn btn-warning" title="'+this.getEditable().getEditableWidget().getTranslate('emptyButton')+'"><i class="fa fa-ban"></i></button>');
			this.prependButtons = [emptyButton];

			emptyButton.on('click', (e) => {
				e.preventDefault();

				if (confirm(this.getEditable().getEditableWidget().getTranslate('saveEmptyValue'))) {
					this.input.prop('checked', false);
					this.getEditable().save(this.fieldName, identifier);
				}
			});
		}

		this.popover = new EditablePopover(this.fieldName, identifier, this.editableClosure, this.element, this.input, false, this.prependButtons);

		this.popover.onSave((e) => {
			this.getEditable().save(this.fieldName, identifier);
		});
		this.popover.onReset((e) => {
			this.reset();
		});

		if (this.value == 1 || this.value === 'true' || this.value === true) {
			this.input.prop('checked', true);
		}

		this.input.wrap(this.label);
		this.input.after(' ' + this.description);
	}

	getEditable()
	{
		return this.editableClosure();
	}

	getInputValue()
	{
		return this.input.is(':checked');
	}

	getElement()
	{
		return this.element;
	}

	getInput()
	{
		return this.input;
	}

	getValue()
	{
		return {
			oldValue: this.value,
			value: this.getInputValue(),
			params: this.parameters
		};
	}

	save()
	{
		this.popover.destroy();
	}

	reset()
	{
		this.popover.destroy();
	}

}