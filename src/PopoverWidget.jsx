export default class PopoverWidget
{

	create(element, options)
	{
		element.popover(!options ? {} : options);
	}

	show(element, onInserted, persist)
	{
		if(typeof onInserted === 'function') {
			if(persist) {
				element.on('shown.bs.popover', onInserted);
			} else {
				element.off('shown.bs.popover.non-persist');
				element.on('shown.bs.popover.non-persist', onInserted);
			}
		}
		element.popover('show');
	}

	hide(element)
	{
		element.popover('hide');
	}

	destroy(element)
	{
		element.popover('destroy');
	}

	getTip(element)
	{
		return element.data('bs.popover').$tip;
	}

}