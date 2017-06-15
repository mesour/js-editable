import FieldType from './Utils/FieldType';
import NumberHelper from './Utils/NumberHelper';
import Validators from './Utils/Validators';

export default class EditableModal
{

	editableCallback;
	element;
	modalName;

	constructor(name, editableCallback)
	{
		this.name = name;
		this.editableCallback = editableCallback;
		this.element = jQuery('[data-editable-modal="' + name + '"]'),
		this.modalName = this.element.attr('data-mesour-modal')
	}

	addTextarea(group, id, name, key, placeholder, rules)
	{
		let label = jQuery('<label for="' + id + '">' + name + '</label>');
		group.append(label);

		let textField = jQuery('<textarea type="text" class="form-control" id="' + id + '" name="' + key + '">');
		if (placeholder) {
			textField.attr('placeholder', placeholder);
		}
		group.append(textField);

		textField.data('rules', rules || []);

		textField.on('keydown', this.getEditable().textareaTabFix);

		return textField;
	}

	addTextField(group, id, name, key, placeholder, rules)
	{
		let label = jQuery('<label for="' + id + '">' + name + '</label>');
		group.append(label);

		let textField = jQuery('<input type="text" class="form-control" id="' + id + '" name="' + key + '">');
		if (placeholder) {
			textField.attr('placeholder', placeholder);
		}
		group.append(textField);

		textField.data('rules', rules || []);

		textField.on('keydown', (e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
				this.element.find('[data-editable-form-save]').trigger('click');
			}
		});

		return textField;
	}

	addCheckboxField(group, id, name, key)
	{
		let label = jQuery('<label for="' + id + '"> ' + name + '</label>');
		group.append(label);

		let checkbox = jQuery('<input type="checkbox" id="' + id + '" name="' + key + '">');
		label.prepend(checkbox);
		group.append(label);

		return checkbox;
	}

	addGroupToForm(form, className)
	{
		className = !className ? 'form-group' : className;
		let group = jQuery('<div class="' + className + '">');
		form.append(group);
		return group;
	}

	createTogglesGroup()
	{
		let group = jQuery('<div class="main-form-group">');
		let formGroup = this.addGroupToForm(group);

		formGroup.append('<label for="__type_selector">' + this.getEditable().getEditableWidget().getTranslate('selectOne') + '</label>');

		let groupHtml = jQuery('<div class="btn-group" role="group" aria-label="__type_selector" data-mesour-toggle-group="true">');
		let oldButton = jQuery('<button type="button" class="btn btn-info" data-mesour-toggle="old">' + this.getEditable().getEditableWidget().getTranslate('attachExisting') + '</button>');
		let newButton = jQuery('<button type="button" class="btn btn-info" data-mesour-toggle="new">' + this.getEditable().getEditableWidget().getTranslate('createNew') + '</button>');


		let _this = this;
		let toggle = function() {
			_this.toogle(this);
		};
		oldButton.on('click.mesour-editable-toggle', toggle);
		newButton.on('click.mesour-editable-toggle', toggle);

		groupHtml.append(oldButton);
		groupHtml.append(newButton);

		oldButton.trigger('click.mesour-editable-toggle');

		group.append(jQuery(groupHtml));
		return group;
	}

	_createForm(dataStructure)
	{
		let form = $('<form><div class="main-form-group" data-mesour-has-toggle="new">'),
			_this = this;

		function addFormGroup(className) {
			return _this.addGroupToForm(form.children('div[data-mesour-has-toggle="new"]'), className);
		};

		for (let i in dataStructure) {
			if (!dataStructure.hasOwnProperty(i)) {
				continue;
			}
			let structure = dataStructure[i];

			if (structure['type'] === FieldType.TYPE_TEXT) {
				let args = [addFormGroup(), this.name + structure['name'], structure['title'], structure['name'], structure['title'], structure['rules']];
				if (structure['hasTextarea'] === 'false') {
					this.addTextField.apply(_this, args);
				} else if (structure['hasTextarea'] === 'true') {
					this.addTextarea.apply(_this, args);
				}
			} else if (structure['type'] === FieldType.TYPE_CUSTOM) {
				let args = [addFormGroup(), this.name + structure['name'], structure['title'], structure['name'], structure['title'], structure['rules']];
				this.getEditable().getCustomField(structure['customType'])
					.createFormElement(addFormGroup(), this.name + structure['name'], structure, this.editableCallback);
			} else if (structure['type'] === FieldType.TYPE_BOOL) {
				this.addCheckboxField(addFormGroup('checkbox'), this.name + structure['name'], structure['title'], structure['name']);
			} else if (structure['type'] === FieldType.TYPE_NUMBER) {
				let field = this.addTextField(
					addFormGroup(),
					this.name + structure['name'],
					structure['title'],
					structure['name'],
					NumberHelper.numberFormat(0, structure['decimals']),
					structure['rules']
				);
				field.attr('data-validate-number', 'true');
				field.attr('data-nullable', structure['nullable'] ? 'true' : 'false');
				if (structure['unit']) {
					field.wrap('<div class="input-group">');
					field.after($('<span style="text-align:right;"  class="input-group-addon">' + structure['unit'] + '</span>'));
				}
			} else if (structure['type'] === FieldType.TYPE_ENUM) {
				let group = addFormGroup(),
					id = this.name + structure['name'];
				let label = $('<label for="' + id + '">' + structure['title'] + '</label>');
				group.append(label);
				let select = $('<select class="form-control" id="' + id + '" placeholder="' + structure['title'] + '" name="' + structure['name'] + '">');
				if (structure['nullable']) {
					select.prepend('<option value="">' + this.getEditable().getEditableWidget().getTranslate('emptyValue') + '</option>');
				}
				for (let j in structure['values']) {
					if (!structure['values'].hasOwnProperty(j)) {
						continue;
					}
					let current = structure['values'][j];

					let option = this.createOption(current['key'], current['name']);

					select.append(option);
				}
				group.append(select);
			} else if (structure['type'] === FieldType.TYPE_DATE) {
				let field = this.addTextField(addFormGroup(), this.name + structure['name'], structure['title'], structure['name'], structure['format']);
				window.mesour.datetime.picker.create(field, structure['format']);
			}
		}

		return form;
	}

	createOption(key, name)
	{
		if (typeof name === 'string') {
			let option = $('<option>')
				.attr('value', key)
				.text(name);

			if (key == this.value) {
				option.prop('selected', true);
			}
			return option;
		} else {
			let optgroup = $('<optgroup>')
				.attr('label', key);

			for (let i in name) {
				if (!name.hasOwnProperty(i)) {
					continue;
				}
				optgroup.append(this.createOption(i, name[i]));
			}

			return optgroup;
		}
	}

	getName()
	{
		return this.modalName;
	}

	show()
	{
		mesour.modal.show(this.modalName);
		mesour.modal.onHide(this.modalName, () => {
			let _form = this.element.find('form');
			this.getEditable().close(_form.find('[name="__fieldName"]').val(), _form.find('[name="__identifier"]').val());
		});
	}

	setTitle(title)
	{
		let modalHeader = this.element.find('.modal-header'),
			titleSpan = modalHeader.find('.modal-title');

		if (!titleSpan.is('*')) {
			titleSpan = jQuery('<h4 class="modal-title">');
			modalHeader.append(titleSpan);
		}

		titleSpan.empty().text(title);
	}

	hide = function()
	{
		mesour.modal.hide(this.modalName);
	}

	onSubmit(identifier, callback)
	{
		let _this = this;
		let refreshCallback = function(e) {
			e.preventDefault();

			let _form = _this.element.find('form'),
				values = _this.getFormValues(_form);

			if (identifier != _form.find('[name="__identifier"]').val()) {
				return;
			}

			_form.find('.has-error').removeClass('has-error');
			_form.find('.alert').remove();

			let valid = true;
			for (let i in values) {
				if (!values.hasOwnProperty(i)) {
					continue;
				}
				let input = _form.find('[name="' + i + '"]');

				let rules = input.data('rules') || [];
				if (rules.length > 0 && input.closest('.main-form-group').is(':visible')) {
					let isNullable = input.attr('data-nullable') === 'true' ? true : false;
					if (!Validators.validate(rules, values[i], input, false, isNullable)) {
						valid = false;
					}
				}
			}

			if (valid) {
				callback(e, _form.find('[name="__identifier"]').val());
			}
		};

		this.refresh = () => {
			let formSave = this.element.find('[data-editable-form-save]');
			formSave.off('click.mesour-editable');
			formSave.on('click.mesour-editable', refreshCallback);
		};
		this.refresh();
	}

	getModalBody()
	{
		return window.mesour.modal.getBody(this.modalName);
	}

	getElement()
	{
		return this.element;
	}

	disable()
	{
		$('.modal-backdrop.fade.in').fadeOut(function(){
			$(this).remove();
			$('body').removeClass('modal-open');
		});
		this.element.find('[data-editable-form-save]').hide();
	}

	enable()
	{
		this.element.find('[data-editable-form-save]').show();
	}

	createForm(dataStructure)
	{
		let body = this.getModalBody(),
			form = this._createForm(dataStructure);
		body.empty();
		body.append(form);
		return form;
	}

	appendToggleForm(form, name)
	{
		this.addHiddenField(form, '__type_selector', name);

		let group = $('<div class="main-form-group" data-mesour-has-toggle="' + name + '">');
		form.append(group);
		form.prepend(this.createTogglesGroup());
		return group;
	}

	addHiddenField(form, name, value, inData)
	{
		let input = form.find('input[name="' + name + '"]');
		if (!input.is('*')) {
			input = $('<input type="hidden" name="' + name + '" value="' + value + '">');
			form.append(input);
		} else {
			input.val(value);
		}
		if (inData) {
			input.attr('data-editable-in-data', true);
		}
		return input;
	}

	getFormValues(form)
	{
		let values = {};
		form.find('input[type=text], select, [data-editable-in-data], textarea').each(function() {
			let $this = $(this);
			values[$this.attr('name')] = $this.val();
		});
		form.find('input[type=checkbox]').each(function() {
			let $this = $(this);
			values[$this.attr('name')] = $this.is(':checked') ? true : false;
		});
		return values;
	}

	fillForm(form, values, hidden)
	{
		for (let _key in values) {
			if (!values.hasOwnProperty(_key)) {
				continue;
			}
			let input = form.find('input[name="' + _key + '"], select[name="' + _key + '"], textarea[name="' + _key + '"]');
			if (input.is('*')) {
				if (input.is('input[type=checkbox]') && values[_key]) {
					input.prop('checked', true);
				} else {
					input.val(values[_key]);
				}
			}
		}
		for (let _key in hidden) {
			if (!hidden.hasOwnProperty(_key)) {
				continue;
			}
			let hiddenField = this.addHiddenField(form, _key, hidden[_key]);
			hiddenField.attr('data-editable-in-data', 'true');
		}

		let customFields = this.getEditable().getCustomFields();
		for(let i in customFields) {
			if (!customFields.hasOwnProperty(i)) {
				continue;
			}
			if (typeof customFields[i].fillForm === 'function') {
				customFields[i].fillForm(form, values);
			}
		}
	}

	getEditable()
	{
		return this.editableCallback();
	}

	toogle(_this)
	{
		let $this = jQuery(_this),
			group = $this.attr('data-mesour-toggle'),
			others = $this.closest('[data-mesour-toggle-group]')
				.find('[data-mesour-toggle]')
				.not($this);

		this.element.find('.has-error').removeClass('has-error');
		this.element.find('.alert').remove();

		if (!$this.hasClass('active')) {
			others.removeClass('active');
			$this.addClass('active');

			this.element.find('input[name="__type_selector"]').val(group);
			this.element.find('[data-mesour-has-toggle]').hide();
			this.element.find('[data-mesour-has-toggle="' + group + '"]').show();
		}
	}

}