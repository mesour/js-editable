import Alert from './Utils/Alert';
import EditableModal from './EditableModal';
import FieldEditor from './FieldEditor';
import EditablePopover from './EditablePopover';

export default class Editable
{

	widgetClosure;
	name;
	modal;
	inline = false;
	disabledInlineAlerts = false;
	structure = {};
	elements = {};
	openedEdits = {};
	customFields = {};
	onComplete = function () {};

	constructor(name, data, widgetClosure)
	{
		this.name = name;
		this.widgetClosure = widgetClosure;
		this.modal = new EditableModal(name, () => {
			return this;
		});
		this.structure = data.fields || [];
		this.elements = data.elements || {};
	}

	setInline(isInline)
	{
		this.inline = isInline === "true" ? true : false;
	}

	isInline()
	{
		return this.inline;
	}

	setDisabledInlineAlerts(isDisabled)
	{
		this.disabledInlineAlerts = isDisabled === "true" ? true : false;
	}

	isDisabledInlineAlerts()
	{
		return this.disabledInlineAlerts;
	}

	getEditableWidget()
	{
		return this.widgetClosure();
	}

	getFieldStructure(fieldName, need)
	{
		need = typeof need === 'undefined' ? true : need;
		for (let i = 0; i < this.structure.length; i++) {
			if (this.structure[i]['name'] === fieldName) {
				return this.structure[i];
			}
		}
		if (need) {
			throw new Error('No structure for field with name ' + fieldName);
		} else {
			return null;
		}
	}

	textareaTabFix(e, _this)
	{
		if (e.keyCode === 9) {
			let start = _this.selectionStart;
			let end = _this.selectionEnd;

			let $this = $(_this);
			let value = $this.val();

			$this.val(value.substring(0, start)
				+ "\t"
				+ value.substring(end));

			_this.selectionStart = _this.selectionEnd = start + 1;

			e.preventDefault();
		}
	}

	isFieldOpened(fieldName, identifier)
	{
		if (identifier) {
			return this.openedEdits[fieldName] && this.openedEdits[fieldName][identifier] instanceof FieldEditor;
		} else {
			return this.openedEdits[fieldName] && this.openedEdits[fieldName] instanceof FieldEditor;
		}
	}

	removeEditedField(fieldName, identifier)
	{
		if (!this.openedEdits[fieldName]) {
			return;
		}
		if (identifier) {
			delete this.openedEdits[fieldName][identifier];
		} else {
			delete this.openedEdits[fieldName];
		}
	}

	getEditedField(fieldName, identifier, need)
	{
		need = typeof need === "undefined" ? true : need;
		if (need && !this.openedEdits[fieldName]) {
			throw new Error('Field with name ' + fieldName + ' is not edited');
		}
		if (!this.openedEdits[fieldName])
			return null;
		if (identifier) {
			if (need && !this.openedEdits[fieldName][identifier]) {
				throw new Error('Field with name ' + fieldName + ' and identifier ' + identifier + ' is not edited');
			}
			return this.openedEdits[fieldName][identifier];
		} else {
			if (need && !this.openedEdits[fieldName]) {
				throw new Error('Field with name ' + fieldName + ' is not edited');
			}
			return this.openedEdits[fieldName];
		}
	}

	editField(fieldStructure, element, identifier, value, forceForm)
	{
		let fieldName = fieldStructure['name'];

		for (let i in this.openedEdits) {
			if (!this.openedEdits.hasOwnProperty(i)) {
				continue;
			}
			if (this.openedEdits[i] instanceof FieldEditor) {
				this.openedEdits[i].resetValue();
				delete this.openedEdits[i];
			} else {
				for (let j in this.openedEdits[i]) {
					if (!this.openedEdits[i].hasOwnProperty(j)) {
						continue;
					}
					this.openedEdits[i][j].resetValue();
					delete this.openedEdits[i][j];
				}
			}
		}

		this.modal.enable();

		if (identifier) {
			this.openedEdits[fieldName] = this.openedEdits[fieldName] || {};
			this.openedEdits[fieldName][identifier] = new FieldEditor(
				() => {return this}, fieldStructure, element, identifier, value, forceForm
			);
		} else {
			this.openedEdits[fieldName] = new FieldEditor(
				() => {return this}, fieldStructure, element, identifier, value, forceForm
			);
		}
	}

	createEditablePopover(fieldStructure, identifier, editableClosure, element, input, hasSoftReset)
	{
		return new EditablePopover(fieldStructure, identifier, editableClosure, element, input, hasSoftReset);
	}

	addCustomField(customType, instance)
	{
		this.customFields[customType] = instance;
	}

	getCustomFields()
	{
		return this.customFields;
	}

	getCustomField(customType)
	{
		if (!this.customFields[customType]) {
			throw new Error('Custom field with name ' + customType + ' not exist.');
		}
		return this.customFields[customType];
	}

	isCustomField(customType)
	{
		if (!customType || !this.customFields[customType]) {
			return false;
		}
		return true;
	}

	getElementStructure(tableName)
	{
		if (!this.elements[tableName]) {
			throw new Error('Element with table name ' + tableName + ' not exist.');
		}
		return this.elements[tableName];
	}

	setOnCompleteCallback(callback)
	{
		if (typeof callback !== 'function') {
			throw new Error('Callback must be function.');
		}
		this.onComplete = callback;
	};

	getModal()
	{
		return this.modal;
	}

	getName = function()
	{
		return this.name;
	}

	close(fieldName, identifier)
	{
		let field = this.getEditedField(fieldName, identifier, false);
		if (field) {
			field.resetValue();
		}
		this.removeEditedField(fieldName, identifier);
	}

	refresh()
	{
		this.modal = new EditableModal(this.name, () => {return this});
		mesour.modal.delete(this.modal.getName());
		mesour.modal.create(this.modal.getElement());
	}

	remove(fieldName, element, identifier, value)
	{
		let created = mesour.url.createLink(this.name, 'remove', {
			name: fieldName,
			identifier: identifier,
			value: value
		}, true);

		jQuery.post(created[0], created[1]).complete((r) => {
			this.postCallback(null, fieldName, null, null, r, identifier, true);
		});
		this.getEditableWidget().removeReference(this.name);
	}

	newEntry(fieldName, element, identifier)
	{
		if (!element) {
			throw new Error('Element for edit is required.');
		}
		let fieldStructure = this.getFieldStructure(fieldName);

		this.editField(fieldStructure, element, identifier);
	}

	edit(fieldName, element, identifier, value, forceForm)
	{
		if (!element) {
			throw new Error('Element for edit is required.');
		}
		let fieldStructure = this.getFieldStructure(fieldName);
		let edited = this.getEditedField(fieldName, identifier, false);

		this.editField(fieldStructure, element, identifier, value, forceForm);
	}

	save(fieldName, identifier)
	{
		let field = this.getEditedField(fieldName, identifier);

		let values = field.getValues(),
			postData = {
				name: fieldName,
				identifier: identifier,
				params: values['params'],
				newValue: values['value'],
				oldValue: values['oldValue']
			};

		let created = mesour.url.createLink(this.name, 'edit', postData, true);

		jQuery.post(created[0], created[1]).complete((r) => {
			this.postCallback(null, fieldName, null, field, r, identifier, true);
		});
	}

	editForm(fieldName, identifier, form, table)
	{
		let field = this.getEditedField(fieldName, identifier);

		let values = field.getValues(),
			postData = {
				name: fieldName,
				identifier: identifier,
				params: values['params'],
				values: values['newValues'],
				oldValues: values['oldValues']
			};
		if (values['reference']) {
			postData['reference'] = values['reference'];
		}

		let created = mesour.url.createLink(this.name, 'editForm', postData, true);
		jQuery.post(created[0], created[1]).complete((r) => {
			this.postCallback(form, fieldName, table, field, r, identifier);
		});
	}

	attach(fieldName, identifier, form, table) {
		let field = this.getEditedField(fieldName, identifier);

		let values = field.getValues(),
			postData = {
				name: fieldName,
				identifier: identifier,
				params: values['params'],
				reference: values['reference']
			};

		let created = mesour.url.createLink(this.name, 'attach', postData, true);
		jQuery.post(created[0], created[1]).complete((r) => {
			this.postCallback(form, fieldName, table, field, r, identifier);
		});
	}

	create(fieldName, identifier, form, table) {
		let field = this.getEditedField(fieldName, identifier);

		let values = field.getValues(),
			postData = {
				name: fieldName,
				params: values['params'],
				identifier: identifier,
				references: values['values'],
				values: this.getModal().getFormValues(form)
			};

		let created = mesour.url.createLink(this.name, 'create', postData, true);
		jQuery.post(created[0], created[1]).complete((r) => {
			this.postCallback(form, fieldName, table, field, r);
		});
	}

	postCallback(form, fieldName, table, field, response, identifier, isNormal)
	{
		try {
			let data = jQuery.parseJSON(response.responseText);
			if (data.error) {
				if (isNormal) {
					let alertElement = Alert.createAlert(data.error.message, 'danger', false),
						input;
					if (!this.isInline()) {
						let popover = mesour.popover.getTip(field.getField()).find('.popover-content');
						popover.find('.mesour-editable-alert').remove();

						mesour.popover.show(field.getField(), function() {
							popover.prepend(alertElement);
						});
						input = popover.find('[name="' + data.error.field + '"]');
					} else {
						if (!this.isDisabledInlineAlerts()) {
							field.getField().find('.mesour-editable-alert').remove();
							field.getField().prepend(alertElement);
						}
						input = field.getField().find('[name="' + data.error.field + '"]');
					}

					if (data.error.field) {
						input.closest('.input-group').addClass('has-error');
						input.trigger('focus');
					}
				} else {
					form.find('.mesour-editable-alert').remove();
					form.prepend(Alert.createAlert(data.error.message));
					if (data.error.field) {
						let input = form.find('[name="' + data.error.field + '"]');
						input.closest('.form-group').addClass('has-error');
						input.trigger('focus');
					}
				}
			}
		} catch (e) {
			if (response.status === 200) {
				if (field) {
					field.saveValue();
					this.removeEditedField(fieldName, identifier);
				}
				mesour.redrawCallback(response);

				if (!isNormal) {
					this.getEditableWidget().removeReference(this.name, table);
					this.modal.getModalBody().empty().append(
						Alert.createAlert(this.getEditableWidget().getTranslate('dataSaved'), 'success', false)
					);
					this.modal.disable();
				}

				this.onComplete(fieldName);
			} else {
				let message = this.getEditableWidget().getTranslate('statusError').replace('%status%', response.status);
				if (!isNormal) {
					alert(message);
				} else {
					form.find('.mesour-editable-alert').remove();
					form.prepend(
						Alert.createAlert(message, 'danger')
					);
				}
			}
		}
	};

}