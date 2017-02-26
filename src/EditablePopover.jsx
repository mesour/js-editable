export default class EditablePopover
{

	element;
	fieldName;
	identifier;
	editableClosure;
	prependButtons = {};
	input;
	softReset;
	softResetButton;
	onSaveCallback;
	onResetCallback;

	constructor(fieldName, identifier, editableClosure, element, input, softReset, prependButtons)
	{
		this.element = element;
		this.fieldName = fieldName;
		this.identifier = identifier;
		this.editableClosure = editableClosure;
		this.prependButtons = prependButtons || {};
		this.input = input;
		this.softReset = softReset;

		this.initialize(softReset);
	}

	initialize(softReset)
	{
		let _this = this,
			content = $('<div class="input-group input-group-sm">');

		content.append(this.input);

		if(this.getEditable().isInline()) {
			content.addClass('editable-inline');
		}

		let buttonGroup = $('<span class="input-group-btn"></span>');

		for (let i in this.prependButtons) {
			if (!this.prependButtons.hasOwnProperty(i)) {
				continue;
			}
			buttonGroup.append(this.prependButtons[i]);
		}
		let saveButton = $('<button class="btn btn-primary" title="' + this.getEditable().getEditableWidget().getTranslate('saveItem') + '"><i class="fa fa-check"></i></button>');
		buttonGroup.append(saveButton);

		let resetButton = $('<button class="btn btn-default" title="' + this.getEditable().getEditableWidget().getTranslate('cancelEdit') + '"><i class="fa fa-remove"></i></button>');
		buttonGroup.append(resetButton);

		this.input.after(buttonGroup);

		this.addButton = function(button) {
			buttonGroup.prepend(button);
		};

		if (!this.getEditable().isInline()) {
			if (this.softReset) {
				this.softResetButton = $('<i class="fa fa-times-circle editable-soft-reset" title="' + this.getEditable().getEditableWidget().getTranslate('reset') + '"></i>');

				if (!this.input.val()) {
					this.softResetButton.hide();
				}

				this.input.after(this.softResetButton);

				this.softResetButton.on('click', () => {
					this.input.val(null);
					this.softResetButton.hide();
					if (this.input.attr('data-is-date') !== 'true') {
						this.input.focus();
					}
				});

				let updateSoftButton = function(e) {
					if ($(this).val().length > 0) {
						_this.softResetButton.show();
					} else {
						_this.softResetButton.hide();
					}
				};
				this.input.on('propertychange change click keyup input paste blur', function(e) {
					updateSoftButton.apply(this, [e]);
				});
			}

			window.mesour.popover.create(this.element, {
				content: function() {
					return content;
				},
				html: true,
				container: 'body',
				placement: 'auto',
				trigger: 'manual',
				template: '<div class="popover editable-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><form class="form-inline"></form></div></div>'
			});

			window.mesour.popover.show(this.element, () => {
				if (this.softReset) {
					this.softResetButton.css('left', this.input.width());
				}
			}, true);
		} else {
			this.oldContent = this.element.contents().clone();
			this.element.empty().append(content);
		}

		saveButton.on('click', function(e) {
			e.preventDefault();
			if (typeof _this.onSaveCallback === 'function') {
				_this.onSaveCallback.apply(this, [e]);
			}
		});

		resetButton.on('click', function(e) {
			e.preventDefault();
			_this.getEditable().removeEditedField(_this.fieldName, _this.identifier)
			if (typeof _this.onResetCallback === 'function') {
				_this.onResetCallback.apply(this, [e]);
			}
		});
	}

	getEditable()
	{
		return this.editableClosure();
	}

	onSave(callback)
	{
		this.onSaveCallback = callback;
	}

	onReset(callback)
	{
		this.onResetCallback = callback;
	}

	hide()
	{
		if(!this.getEditable().isInline()) {
			window.mesour.popover.hide(this.element);
		} else {
			this.element.empty().append(this.oldContent);
		}
	}

	destroy()
	{
		if(!this.getEditable().isInline()) {
			window.mesour.popover.destroy(this.element);
		} else {
			this.element.empty().append(this.oldContent);
		}
	}

}