import FieldType from './../Utils/FieldType';

export default class ManyToMany
{

	TYPE = FieldType.TYPE_MANY_TO_MANY;
	editableClosure;
	element;
	parameters = {};
	select;
	title;
	table;
	referencedTable;
	primaryKey;
	column;
	selfColumn;
	fieldName;
	attachNewRow;
	createNewRow;

	constructor(fieldStructure, editableClosure, element, parameters, identifier, value)
	{
		this.editableClosure = editableClosure;
		this.element = element;
		this.parameters = parameters || {};
		this.title = fieldStructure['title'];
		this.fieldName = fieldStructure['name'];
		this.attachNewRow = this.parameters['attach_row'];
		this.createNewRow = this.parameters['create_new_row'];

		let reference = fieldStructure['reference'];
		this.table = reference['table'];
		this.referencedTable = reference['referenced_table'],
		this.primaryKey = reference['primary_key'];
		this.column = reference['column'];
		this.selfColumn = reference['self_column'];

		this.initialize(identifier, value);
	}

	initialize(identifier, value)
	{
		this.getEditable().getEditableWidget().getReferenceData(this.getEditable().getName(), this.table, (data) => {
			let references = data.reference ? data.reference : [];
			data = data.data ? data.data : data;

			let values = {};
			if (value) {
				let foundIds = [];
				for (let j in references) {
					if (!references.hasOwnProperty(j)) {
						continue;
					}

					if (references[j][this.column] == identifier) {
						foundIds.push(references[j][this.primaryKey]);
					}
				}
				if (!foundIds.length) {
					throw new Error('Referenced id not found.');
				}
			}

			let foundId = null;
			if (value) {
				foundId = value;
			}

			for (let i in data) {
				if (!data.hasOwnProperty(i)) {
					continue;
				}

				if (data[i][this.primaryKey] == foundId) {
					values = data[i];
					break;
				}
			}

			this.getEditable().getModal().show();
			this.getEditable().getModal().setTitle(this.title);

			let elementFields = this.getEditable().getElementStructure(this.table);
			let form = this.getEditable().getModal().createForm(elementFields.fields ? elementFields.fields : elementFields);

			if (typeof value === 'undefined' && this.attachNewRow && this.createNewRow) {
				form.find('[data-mesour-has-toggle="new"]').prepend('<h3>' + this.getEditable().getEditableWidget().getTranslate('createNew') + '</h3>');
			}

			this.getEditable().getModal().fillForm(form, values);
			this.getEditable().getModal().addHiddenField(form, '__fieldName', this.fieldName);
			if (identifier) {
				this.getEditable().getModal().addHiddenField(form, '__identifier', identifier);

				if (value) {
					let identifierField = this.getEditable().getModal().addHiddenField(form, this.primaryKey, value);
					identifierField.attr('data-editable-in-data', 'true');
				}
			}

			if (typeof value === 'undefined' && this.attachNewRow) {
				let group = this.getEditable().getModal().appendToggleForm(form, 'old');

				let formGroup = $('<div class="form-group"><h3>' + this.getEditable().getEditableWidget().getTranslate('selectExisting') + '</h3></div>');
				let select = $('<select class="form-control" name="' + this.selfColumn + '">');

				let referencedIds = [];
				for (let j in references) {
					if (!references.hasOwnProperty(j)) {
						continue;
					}
					if (references[j][this.column] == identifier) {
						referencedIds.push(references[j][this.selfColumn]);
					}
				}

				let selectData = [];
				for (let i in data) {
					if (!data.hasOwnProperty(i)) {
						continue;
					}

					if (referencedIds.indexOf(data[i][this.primaryKey]) === -1) {
						selectData.push(data[i]);
					}
				}

				if (selectData.length > 0) {
					select.append('<option value="">' + this.getEditable().getEditableWidget().getTranslate('select') + '</option>');

					for (let k = 0; k < selectData.length; k++) {
						select.append('<option value="' + selectData[k][this.primaryKey] + '">' + selectData[k]['name'] + '</option>');
					}
				} else {
					select.append('<option>' + this.getEditable().getEditableWidget().getTranslate('allSelected') + '</option>');
				}

				formGroup.append(select);

				group.append(formGroup);
			}

			if (!this.createNewRow) {
				form.find('.main-form-group:first').hide();
			}

			this.getEditable().getModal().onSubmit(identifier, (e, currentIdentifier) => {
				let typeSelector = form.find('[name="__type_selector"]'),
					_this = this;

				this.getValue = function() {
					if (typeSelector.is('*') && typeSelector.val() === 'old') {
						let formValues = _this.getEditable().getModal().getFormValues(form);
						let referenceColumnValue = formValues[_this.selfColumn];
						delete formValues[_this.selfColumn];
						let out = _this.getDefaultValues(values, formValues, referenceColumnValue, currentIdentifier, true);
						return out;
					} else {
						return _this.getDefaultValues(values, _this.getEditable().getModal().getFormValues(form), value, currentIdentifier);
					}
				};

				if (typeSelector.is('*') && typeSelector.val() === 'old') {
					this.getEditable().attach(this.fieldName, currentIdentifier, form, this.table);
				} else if (typeof value !== 'undefined') {
					this.getEditable().editForm(this.fieldName, currentIdentifier, form, this.table);
				} else {
					this.getEditable().create(this.fieldName, identifier, form, this.table);
				}

				this.getValue = function() {
					return _this.getDefaultValues(values);
				};
			})
		}, this.referencedTable);
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
		return this.getDefaultValues();
	}

	reset()
	{

	}

	save()
	{

	}

	getDefaultValues(oldValues, values, selfValue, referenceValue, attach)
	{
		values = !values ? {} : values;
		for (let j in values) {
			if (!values.hasOwnProperty(j)) {
				continue;
			}
			values[j] = typeof values[j] === 'null' || typeof values[j] === 'undefinded' ? '' : values[j];
		}
		oldValues = !oldValues ? {} : oldValues;
		let out = {
			reference: {
				'selfColumn': {
					name: this.selfColumn,
					value: selfValue
				},
				'column': {
					name: this.column,
					value: referenceValue
				}
			},
			params: this.parameters
		};
		if (attach) {
			return out;
		}

		out['oldValues'] = oldValues;
		out['newValues'] = values;

		return out;
	}

}