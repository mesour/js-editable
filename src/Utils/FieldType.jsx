export default class FieldType
{

	static get TYPE_TEXT()
	{
		return 'text';
	}

	static get TYPE_NUMBER()
	{
		return 'number';
	}

	static get TYPE_DATE()
	{
		return 'date';
	}

	static get TYPE_ENUM()
	{
		return 'enum';
	}

	static get TYPE_BOOL()
	{
		return 'bool';
	}

	static get TYPE_ONE_TO_ONE()
	{
		return 'one_to_one';
	}

	static get TYPE_MANY_TO_ONE()
	{
		return 'many_to_one';
	}

	static get TYPE_ONE_TO_MANY()
	{
		return 'one_to_many';
	}

	static get TYPE_MANY_TO_MANY()
	{
		return 'many_to_many';
	}

}