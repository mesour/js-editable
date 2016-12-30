import EditableWidget from './EditableWidget.jsx';
import 'mesour-core/dist/mesour.min.js';
import Modal from 'mesour-modal/lib/Modal';
import PopoverWidget from './PopoverWidget';
import DateTime from 'mesour-datetime/lib/DateTime';

(function(mesour) {
	mesour.createWidget('datetime', new DateTime());
	mesour.createWidget('modal', new Modal());
	mesour.createWidget('popover', new PopoverWidget());
	mesour.createWidget('editable', new EditableWidget());
})(window.mesour);

import './../scss/style.scss';
