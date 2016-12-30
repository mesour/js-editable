import Enum from './Enum';
import FieldType from './../Utils/FieldType';

export default class ManyToOne
{

	TYPE = FieldType.TYPE_MANY_TO_ONE;
	editableClosure;
	element;
	parameters;
	oldValue;
	select;
	popover;
	title;
	reference;
	table;
	primaryKey;
	column;
	editButton;
	fieldName;
	createNewRow;
	editCurrentRow;

	constructor(fieldStructure, editableClosure, element, parameters, identifier, value, forceForm)
	{
		this.editableClosure = editableClosure;
		this.element = element;
		this.parameters = parameters || {};
		this.oldValue = element.text();
		this.title = fieldStructure['title'];
		this.reference = fieldStructure['reference'];
		this.table = this.reference['table'];
		this.primaryKey = this.reference['primary_key'];
		this.column = this.reference['column'];
		this.editButton = jQuery('<button class="btn btn-info" title="' + this.getEditable().getEditableWidget().getTranslate('editItem') + '"><i class="fa fa-pencil"></i></button>');
		this.pattern = this.reference['pattern'];
		this.fieldName = fieldStructure['name'];
		this.createNewRow = this.parameters['create_new_row'];
		this.editCurrentRow = this.parameters['edit_current_row'];

		this.initialize(fieldStructure, identifier, value, forceForm);
	}

	initialize(fieldStructure, identifier, value, forceForm)
	{
		this.getEditable().getEditableWidget().getReferenceData(this.getEditable().getName(), this.table, (data) => {
			data = data.data ? data.data : data;

			let values = {};

			if (this.createNewRow) {
				values[0] = {
					key: '__add_new_record__',
					name: '+ Add new record'
				};
			}

			let found = null;
			for (let i in data) {
				if (!data.hasOwnProperty(i)) {
					continue;
				}
				if (data[i][this.primaryKey] == value) {
					found = data[i];
				}

				values[data[i][this.primaryKey]] = {
					key: data[i][this.primaryKey],
					name: this.pattern ? window.mesour.parseValue(this.pattern, data[i]) : data[i][this.primaryKey]
				};
			}

			this.select = new Enum(fieldStructure, this.editableClosure, this.element, this.parameters, identifier, value, values);
			this.popover = this.select.getEditablePopover();

			if (this.editCurrentRow) {
				this.popover.addButton(this.editButton);
			}

			let _this = this;
			this.select.getSelect().on('change', function() {
				let $this = $(this);
				if ($this.val() === '__add_new_record__') {
					_this.createForm(identifier, value, found);
				}
			});

			if (forceForm) {
				this.createForm(identifier, value, found, true);
			}

			this.editButton.on('click', (e) => {
				e.preventDefault();

				this.getEditable().close(this.fieldName, identifier, true);
				this.getEditable().edit(this.fieldName, this.element, identifier, value, true);
			});

			this.popover.onSave(function() {
				let $this = $(this).closest('.input-group').find(':input:first');
				if ($this.val() === '__add_new_record__') {
					_this.createForm(identifier, value, found);
				} else {
					_this.getEditable().save(_this.fieldName, identifier);
				}
			});
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
		return this.select.getValue();
	}

	reset()
	{
		this.popover.destroy();
		this.select.reset();
	}

	save()
	{
		this.select.save();
	}

	createForm(identifier, value, found, formValues)
	{
		this.popover.hide();

		this.getEditable().getModal().show();
		this.getEditable().getModal().setTitle(this.title);

		let elementFields = this.getEditable().getElementStructure(this.table);
		let form = this.getEditable().getModal().createForm(elementFields.fields ? elementFields.fields : elementFields);

		if (formValues) {
			if (!found) {
				throw new Error('Item not found.');
			}
			this.getEditable().getModal().addHiddenField(form, 'id', identifier, true);
			this.getEditable().getModal().fillForm(form, found);
		}

		this.getEditable().getModal().addHiddenField(form, '__fieldName', this.fieldName);
		this.getEditable().getModal().addHiddenField(form, '__identifier', identifier);

		this.getEditable().getModal().onSubmit(identifier, (e, currentIdentifier) => {
			let _this = this;
			this.getValue = function() {
				let out = _this.select.getValue();
				out['newValues'] = _this.getEditable().getModal().getFormValues(form);
				if (!found) {
					out['oldValues'] = {};
					out['oldValues'][this.primaryKey] = value;
				} else {
					out['oldValues'] = found;
				}
				return out;
			};

			if (formValues) {
				this.getEditable().editForm(this.fieldName, currentIdentifier, form, this.table);
			} else {
				this.getEditable().create(this.fieldName, currentIdentifier, form, this.table);
			}

			this.getValue = function() {
				return _this.select.getValue();
			};
		});
	}

}