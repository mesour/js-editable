import Editable from './Editable';

export default class EditableWidget
{

	items = {};
	traslations = {};
	references = {};

	enable(name, isInline, isDisabledInlineAlerts)
	{
		if (this.items[name]) {
			this.items[name].refresh();
			return;
		}
		jQuery.get(mesour.url.createLink(name, 'dataStructure')).complete((response) => {
			try {
				let data = jQuery.parseJSON(response.responseText).data;

				this.items[name] = new Editable(name, data, () => {
					return this;
				});
				this.items[name].setInline(isInline);
				this.items[name].setDisabledInlineAlerts(isDisabledInlineAlerts);
			} catch (e) {
				throw e;
			}
		});
	}

	getTranslate(key)
	{
		return this.traslations[key];
	}

	setTranslations(translates)
	{
		this.traslations = translates;
	}

	removeReference(name, table)
	{
		if (table) {
			delete this.references[name][table];
		} else {
			delete this.references[name];
		}
	}

	getReferenceData(name, table, callback, referencedTable)
	{
		this.references[name] = this.references[name] || {};
		if (!this.references[name][table]) {
			let postData = {
				'table': table,
				'referencedTable': null
			};
			if (referencedTable) {
				postData['referencedTable'] = referencedTable;
			}
			let created = mesour.url.createLink(name, 'referenceData', postData, true);
			jQuery.post(created[0], created[1]).complete((r) => {
				let data = jQuery.parseJSON(r.responseText);
				this.references[name][table] = data;

				callback(data);
				//mesour.redrawCallback(r); todo??
			});
		} else {
			callback(this.references[name][table]);
		}
	}

	getComponent(name)
	{
		if (!this.items[name]) {
			throw new Error('Editable component with name ' + name + ' not exits');
		}
		return this.items[name];
	}

}