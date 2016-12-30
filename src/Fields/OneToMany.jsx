import FieldType from './../Utils/FieldType';

export default class OneToMany
{

	TYPE = FieldType.TYPE_ONE_TO_MANY;
	editableClosure;
	element;
	parameters;
	select;
	oldText;
	oldValue;
	title;
	reference;
	table;
	primaryKey;
	column;
	pattern;
	fieldName;
	createNewRow;

	constructor(fieldStructure, editableClosure, element, parameters, identifier, value)
	{
		this.editableClosure = editableClosure;
		this.element = element;
		this.parameters = parameters || {};
		this.oldText = element.text();
		this.oldValue = element.attr('data-value');
		this.title = fieldStructure['title'];
		this.reference = fieldStructure['reference'];
		this.table = this.reference['table'];
		this.primaryKey = this.reference['primary_key'];
		this.column = this.reference['column'];
		this.pattern = this.reference['pattern'];
		this.fieldName = fieldStructure['name'];
		this.createNewRow = this.parameters['create_new_row'];

		this.initialize(identifier, value);
	}

	initialize(identifier, value)
	{
		this.getEditable().getEditableWidget().getReferenceData(this.getEditable().getName(), this.table, (data) => {
			data = data.data ? data.data : data;

			let values = {},
				hiddenValues = {};

			for (let i in data) {
				if (!data.hasOwnProperty(i)) {
					continue;
				}

				if (data[i][this.primaryKey] == value) {
					values = data[i];
					hiddenValues[this.column] = data[i][this.column];
					break;
				}
			}

			this.getEditable().getModal().show();
			this.getEditable().getModal().setTitle(this.title);

			let elementFields = this.getEditable().getElementStructure(this.table);
			let form = this.getEditable().getModal().createForm(elementFields.fields ? elementFields.fields : elementFields);
			this.getEditable().getModal().fillForm(form, values, hiddenValues);
			this.getEditable().getModal().addHiddenField(form, '__fieldName', this.fieldName);

			if (identifier) {
				this.getEditable().getModal().addHiddenField(form, '__identifier', identifier);

				if(value) {
					let identifierField = this.getEditable().getModal().addHiddenField(form, this.primaryKey, value);
					identifierField.attr('data-editable-in-data', 'true');
				}
			}

			this.getEditable().getModal().onSubmit(identifier, (e, currentIdentifier) => {
				let _this = this;
				this.getValue = function () {
					return _this.getDefaultValues(values, _this.getEditable().getModal().getFormValues(form));
				};

				if (value) {
					this.getEditable().editForm(this.fieldName, currentIdentifier, form, this.table);
				} else {
					this.getEditable().create(this.fieldName, identifier, form, this.table);
				}

				this.getValue = function () {
					return _this.getDefaultValues(values);
				};


			})
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
		return this.getDefaultValues();
	}

	reset()
	{

	}

	save()
	{

	}

	getDefaultValues(oldValues, values)
	{
		values = !values ? {} : values;
		oldValues = !oldValues ? {} : oldValues;
		let references = null;
		if (values['id']) {
			references = {
				id: values['id']
			};
		}
		return {
			oldValues: oldValues,
			newValues: values,
			params: this.parameters,
			values: references
		};
	}

}