import FieldType from './Utils/FieldType';

import Bool from './Fields/Bool';
import Date from './Fields/Date';
import Enum from './Fields/Enum';
import ManyToMany from './Fields/ManyToMany';
import ManyToOne from './Fields/ManyToOne';
import Number from './Fields/Number';
import OneToMany from './Fields/OneToMany';
import OneToOne from './Fields/OneToOne';
import Text from './Fields/Text';

export default class FieldEditor
{

	name;
	type;
	parameters;
	field;

	constructor(editableClosure, fieldStructure, element, identifier, value, forceForm)
	{
		this.name = fieldStructure['name'];
		this.type = fieldStructure['type'];
		this.parameters = fieldStructure['params'];

		if (identifier) {
			if(typeof this.parameters[identifier] !== 'undefined') {
				this.parameters = this.parameters[identifier];
			} else {
				this.parameters = this.parameters[0];
			}
		}

		if (this.type === FieldType.TYPE_TEXT) {
			this.field = new Text(fieldStructure, editableClosure, element, this.parameters, identifier);
		} else if (this.type === FieldType.TYPE_NUMBER) {
			this.field = new Number(fieldStructure, editableClosure, element, this.parameters, identifier);
		} else if (this.type === FieldType.TYPE_DATE) {
			this.field = new Date(fieldStructure, editableClosure, element, this.parameters, identifier, value);
		} else if (this.type === FieldType.TYPE_ENUM) {
			this.field = new Enum(fieldStructure, editableClosure, element, this.parameters, identifier, value);
		} else if (this.type === FieldType.TYPE_BOOL) {
			this.field = new Bool(fieldStructure, editableClosure, element, this.parameters, identifier, value);
		} else if (this.type === FieldType.TYPE_ONE_TO_ONE) {
			this.field = new OneToOne(fieldStructure, editableClosure, element, this.parameters, identifier, value);
		} else if (this.type === FieldType.TYPE_MANY_TO_ONE) {
			this.field = new ManyToOne(fieldStructure, editableClosure, element, this.parameters, identifier, value, forceForm);
		} else if (this.type === FieldType.TYPE_ONE_TO_MANY) {
			this.field = new OneToMany(fieldStructure, editableClosure, element, this.parameters, identifier, value);
		} else if (this.type === FieldType.TYPE_MANY_TO_MANY) {
			this.field = new ManyToMany(fieldStructure, editableClosure, element, this.parameters, identifier, value);
		} else {
			throw new Error('Unknown field type ' + this.type);
		}
	}

	getField()
	{
		return this.field.getElement();
	}

	getValues()
	{
		return this.field.getValue();
	}

	resetValue()
	{
		return this.field.reset();
	}

	saveValue()
	{
		return this.field.save();
	}

}