import Text from './Text';
import FieldType from './../Utils/FieldType';

export default class Date
{

	TYPE = FieldType.TYPE_DATE;
	input;
	element;
	fieldName;
	format;

	constructor(fieldStructure, editableClosure, element, parameters, identifier, value)
	{
		this.element = element;
		this.text = new Text(fieldStructure, editableClosure, element, parameters, identifier, true);
		this.input = this.text.getInput();

		this.fieldName = fieldStructure['name'];
		this.format = fieldStructure['format'];

		this.initialize(identifier, value);
	}

	initialize(identifier, value)
	{
		this.element.parent().css('position', 'relative');

		this.oldValue = value;
		this.input.val(!this.oldValue || this.oldValue === '-' ? '' : this.oldValue);
		this.input.attr('data-is-date', 'true');
		this.input.attr('placeholder', this.format);

		window.mesour.datetime.picker.create(this.input, this.format, true);
		window.mesour.datetime.picker.show(this.input);
	}

	getElement()
	{
		return this.element;
	}

	getValue()
	{
		let out = this.text.getValue();
		out['oldValue'] = this.oldValue;
		return out;
	}

	reset()
	{
		window.mesour.datetime.picker.destroy(this.input);
		this.text.reset();
	}

	save()
	{
		window.mesour.datetime.picker.destroy(this.input);
		this.text.save();
	}

}