import FieldType from './../Utils/FieldType';
import Validators from './../Utils/Validators';
import EditablePopover from './../EditablePopover';

export default class Text
{

	TYPE = FieldType.TYPE_TEXT;
	parameters = {};
	editableClosure;
	popover;
	input;
	isNullable;
	element;
	rules = [];

	constructor(fieldStructure, editableClosure, element, parameters, identifier, isSpecial, value)
	{
		this.parameters = parameters || {};
		this.editableClosure = editableClosure;
		this.element = element;
		this.oldValue = value ? value : $.trim(element.text());
		this.rules = fieldStructure['rules'] || [];
		this.isNullable = fieldStructure['nullable'];

		this.initialize(fieldStructure, identifier, isSpecial);
	}

	initialize(fieldStructure, identifier, isSpecial)
	{
		let fieldName = fieldStructure['name'],
			hasTextarea = !isSpecial ? (fieldStructure['hasTextarea'] === 'false' ? false : true) : false,
			hasSoftReset = true,
			_this = this;

		if (hasTextarea) {
			this.input = $('<textarea type="text" class="form-control" name="' + fieldName + '"></textarea>');
			this.input.text(this.oldValue);
			hasSoftReset = false;
		} else {
			this.input = $('<input type="text" value="' + this.oldValue + '" class="form-control" name="' + fieldName + '">');
			this.input.on('keydown.mesour-editable', (e) => {
				if (e.keyCode === 13) {
					this.getEditable().save(fieldName, identifier);
				} else if (e.keyCode === 27) {
					this.reset();
				}
			});
		}

		this.popover = new EditablePopover(fieldName, identifier, this.editableClosure, this.element, this.input, hasSoftReset);

		if (hasTextarea) {
			this.input.on('keydown', function(e) {
				_this.getEditable().textareaTabFix(e, this);
			});
		}

		this.input.css('width', '100%');

		this.popover.onSave(() => {
			let isValid = Validators.validate(
				this.rules,
				this.input.val(),
				this.input,
				true,
				this.isNullable,
				() => {return this}
			);
			if (isValid) {
				this.getEditable().save(fieldName, identifier);
			}
		});
		this.popover.onReset(() => {
			this.reset();
		});

		this.input.focus();
	}

	getEditable()
	{
		return this.editableClosure();
	}

	getInput()
	{
		return this.input;
	}

	getEditablePopover()
	{
		return this.popover;
	}

	getElement()
	{
		return this.element;
	}

	getValue()
	{
		return {
			oldValue: this.oldValue,
			value: this.input.val(),
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
		this.element.empty().text(this.input.val());
	}

}