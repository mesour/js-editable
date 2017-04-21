<?php

if (isset($_GET['m_do'])) {
	header('Content-type: application/json');

	$do = $_GET['m_do'];
	if ($do === 'mesourApp-editableTest-referenceData') {
		if ($_POST['m_mesourApp-editableTest-table'] === 'groups') {
			echo '{"data":[{"id":1,"name":"Group 1","type":"first","date":"2016-01-01 00:00:00","members":7},{"id":2,"name":"Best group :-)","type":"first","date":"2016-04-11 00:00:00","members":9},{"id":3,"name":"Group 3","type":"second","date":"2016-05-09 00:00:00","members":7},{"id":4,"name":"test","type":"first","date":"-0001-11-30 00:00:00","members":654654},{"id":5,"name":"New group","type":"second","date":"2016-03-16 00:00:00","members":123},{"id":6,"name":"Nov\u00e1 grupa","type":"first","date":"-0001-11-30 00:00:00","members":123},{"id":7,"name":"fdsfasdf","type":null,"date":"-0001-11-30 00:00:00","members":123456},{"id":8,"name":"test","type":null,"date":"-0001-11-30 00:00:00","members":123465},{"id":9,"name":"asdfasdf","type":null,"date":"-0001-11-30 00:00:00","members":654654},{"id":10,"name":"Testovac\u00ed nov\u00e1","type":"first","date":"2016-04-11 00:00:00","members":123465},{"id":11,"name":"TESTOVAC\u00cd","type":null,"date":"2016-04-11 00:00:00","members":123456},{"id":12,"name":"xxxxxxxxxxxxxxx","type":"first","date":"2016-04-21 00:00:00","members":34343},{"id":13,"name":"New group","type":"first","date":"2016-04-13 00:00:00","members":123},{"id":14,"name":"sdfadfas","type":null,"date":"-0001-11-30 00:00:00","members":116131},{"id":15,"name":"Sab\u010di skupina","type":"first","date":"2016-08-17 12:30:00","members":50}]}';
		} else if ($_POST['m_mesourApp-editableTest-table'] === 'user_addresses') {
			echo '{"data":[{"id":11,"user_id":1,"street":"dasd","city":"","zip":"","country":"cz"}]}';
		} else if ($_POST['m_mesourApp-editableTest-table'] === 'companies') {
			echo '{"data":[{"id":1,"name":"Google CZ","reg_num":"789123","verified":1},{"id":2,"name":"Google","reg_num":"789123","verified":1},{"id":3,"name":"Allianz","reg_num":"456789","verified":1},{"id":4,"name":"Ford","reg_num":"987654","verified":0},{"id":5,"name":"Foxconn","reg_num":"654321","verified":0},{"id":6,"name":"Verizon","reg_num":"357654","verified":1},{"id":7,"name":"Lukoil","reg_num":"236846","verified":1},{"id":8,"name":"Honda","reg_num":"982154","verified":0},{"id":18,"name":"Test company","reg_num":"123456","verified":1},{"id":19,"name":"test","reg_num":"","verified":0},{"id":20,"name":"asdfasdfa","reg_num":"6546","verified":0},{"id":21,"name":"cccccccccccccc","reg_num":"","verified":0},{"id":22,"name":"aaaaaa","reg_num":"1234564","verified":1}],"reference":[{"user_id":1,"company_id":2},{"user_id":1,"company_id":3},{"user_id":1,"company_id":4},{"user_id":1,"company_id":8},{"user_id":2,"company_id":5},{"user_id":4,"company_id":5},{"user_id":5,"company_id":5},{"user_id":5,"company_id":6},{"user_id":8,"company_id":1},{"user_id":8,"company_id":5},{"user_id":8,"company_id":8},{"user_id":9,"company_id":7},{"user_id":10,"company_id":8},{"user_id":12,"company_id":6},{"user_id":13,"company_id":6},{"user_id":15,"company_id":2},{"user_id":15,"company_id":8},{"user_id":17,"company_id":3},{"user_id":19,"company_id":2},{"user_id":19,"company_id":6},{"user_id":20,"company_id":2}]}';
		} else {
			echo '{"data":[{"id":11,"user_id":1,"amount":156,"currency":"CZK"}]}';
		}
	} elseif ($do === 'mesourApp-editableTest-dataStructure') {
		echo '{"data":{"fields":[{"name":"role","title":"Role","type":"enum","inline":"false","params":[{"id":0},{"id":1}],"values":{"admin":{"key":"admin","name":"Admin"},"moderator":{"key":"moderator","name":"Moderator"}},"nullable":true},{"name":"name","title":"Name","type":"text","inline":"true","params":[{"id":0},{"id":1}],"rules":[{"type":"email","message":"Test email message.","arg":null},{"type":"filled","message":"Test error message.","arg":null}],"nullable":true,"hasTextarea":"true","stripHtml":"false"},{"name":"surname","title":"Surname","type":"text","inline":"false","params":[{"id":0},{"id":1}],"rules":[{"type":"url","message":"Surname must be valid URL.","arg":null}],"nullable":true,"hasTextarea":"false","stripHtml":"true"},{"name":"email","title":"Email","type":"text","inline":"false","params":[{"id":0},{"id":1}],"rules":[],"nullable":false,"hasTextarea":"false","stripHtml":"true"},{"name":"last_login","title":"Last login","type":"date","inline":"false","params":[{"id":0},{"id":1}],"format":"YYYY-MM-DD HH:mm:ss","nullable":true},{"name":"amount","title":"Amount","type":"number","inline":"false","params":[{"id":0},{"id":1}],"rules":[],"unit":"EUR","separator":".","decimalPoint":",","decimals":2,"nullable":true},{"name":"has_pro","title":"Has PRO","type":"bool","inline":"false","params":[{"id":0},{"id":1}],"nullable":true,"description":"Has PRO"},{"name":"companies","title":"Companies","type":"many_to_many","inline":"false","params":[{"id":0,"attach_row":true,"create_new_row":true,"remove_row":true},{"id":1,"attach_row":true,"create_new_row":true,"remove_row":true}],"reference":{"table":"companies","primary_key":"id","column":"user_id","pattern":"{name}","self_column":"company_id","referenced_table":"user_companies"}},{"name":"group","title":"Group","type":"many_to_one","inline":"false","params":[{"id":0,"edit_current_row":true,"create_new_row":true,"remove_row":false},{"id":1,"edit_current_row":true,"create_new_row":true,"remove_row":false}],"reference":{"table":"groups","primary_key":"id","column":"group_id","pattern":"{name} ({members})"},"nullable":true},{"name":"addresses","title":"Addresses","type":"one_to_many","inline":"false","params":[{"id":0,"create_new_row":true,"remove_row":true},{"id":1,"create_new_row":true,"remove_row":true}],"reference":{"table":"user_addresses","primary_key":"id","column":"user_id","pattern":"{street}, {zip} {city}, {country}"}},{"name":"wallet","title":"Wallet","type":"one_to_one","inline":"false","params":[{"id":0,"create_new_row":true,"remove_row":true},{"id":1,"create_new_row":true,"remove_row":true}],"reference":{"table":"wallets","primary_key":"id","column":"wallet_id","pattern":"{amount}"},"nullable":true},{"name":"special","title":"Special","type":"custom","inline":"false","params":[{"id":0}],"nullable":false,"customType":"special"},{"name":"domains","title":"Domains","type":"one_to_one","inline":"false","params":{"1":{"id":1,"create_new_row":true,"remove_row":true}},"reference":{"table":"domains","primary_key":"id","column":null},"nullable":false}],"elements":{"groups":{"fields":[{"name":"name","title":"Name","type":"text","inline":"false","params":[{"id":0}],"rules":[{"type":"pattern","message":"Test email message.","arg":"[0-9a-z]{6}"}],"nullable":false,"hasTextarea":"false","stripHtml":"true"},{"name":"type","title":"Type","type":"enum","inline":"false","params":[{"id":0}],"values":{"":{"key":"","name":"--"},"first":{"key":"first","name":"First"},"second":{"key":"second","name":"Second"}},"nullable":false},{"name":"date","title":"Date","type":"date","inline":"false","params":[{"id":0}],"format":"YYYY-MM-DD HH:mm:ss","nullable":false},{"name":"members","title":"Members","type":"number","inline":"false","params":[{"id":0}],"rules":[{"type":"range","message":"Rule type range error","arg":[0,50]}],"unit":"EUR","separator":".","decimalPoint":",","decimals":2,"nullable":false}]},"wallets":{"fields":[{"name":"amount","title":"Amount","type":"number","inline":"false","params":[{"id":0}],"rules":[],"unit":null,"separator":".","decimalPoint":",","decimals":2,"nullable":false},{"name":"currency","title":"Currency","type":"enum","inline":"false","params":[{"id":0}],"values":{"CZK":{"key":"CZK","name":"CZK"},"EUR":{"key":"EUR","name":"EUR"}},"nullable":false}]},"user_addresses":{"fields":[{"name":"street","title":"Street","type":"text","inline":"false","params":[{"id":0}],"rules":[],"nullable":false,"hasTextarea":"true","stripHtml":"true"},{"name":"city","title":"City","type":"text","inline":"false","params":[{"id":0}],"rules":[],"nullable":false,"hasTextarea":"false","stripHtml":"true"},{"name":"zip","title":"Zip","type":"text","inline":"false","params":[{"id":0}],"rules":[],"nullable":false,"hasTextarea":"false","stripHtml":"true"},{"name":"country","title":"Country","type":"text","inline":"false","params":[{"id":0}],"rules":[],"nullable":false,"hasTextarea":"false","stripHtml":"true"}]},"user_companies":{"fields":[]},"companies":{"fields":[{"name":"name","title":"Name","type":"text","inline":"false","params":[{"id":0}],"rules":[],"nullable":false,"hasTextarea":"false","stripHtml":"true"},{"name":"reg_num","title":"Reg. number","type":"text","inline":"false","params":[{"id":0}],"rules":[],"nullable":false,"hasTextarea":"false","stripHtml":"true"},{"name":"verified","title":"Verified","type":"bool","inline":"false","params":[{"id":0}],"nullable":false,"description":"verified"},{"name":"special","title":"Special","type":"custom","inline":"false","params":[{"id":0}],"nullable":false,"customType":"special"}]},"domains":{"fields":[{"name":"url","title":"Url","type":"text","inline":"false","params":[{"id":0}],"rules":[{"type":"url","message":"Url is not valid","arg":null}],"nullable":false,"hasTextarea":"false","stripHtml":"true"}]}}}}';
	} elseif ($do === 'mesourApp-editableTest-edit') {
		echo '{"error":{"message":"Value must be valid email.","field":"email"}}';
	}
	die;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" href="../dist/css/mesour.editable.css">
</head>
<body>

	<div class="container">


		<hr style="margin-bottom: 50px;">

		<div class="container" id="m_snippet-mesourApp-editableTest">

			<div><script>var mesour = !mesour ? {} : mesour;mesour.editable = !mesour.editable ? [] : mesour.editable;mesour.editable.push(["enable","mesourApp-editableTest","false","false"]);mesour.editable.push(["setTranslations",{"select":"Select...","selectOne":"Select one","selectExisting":"Select from existing","allSelected":"All existing companies are attachet to this client...","attachExisting":"Attach existing","createNew":"Create new","dataSaved":"Successfuly saved","invalidNumber":"Value must be valid number","statusError":"ERROR! Status: %status%. Try save data later.","emptyValue":"- none","saveEmptyValue":"Really save empty value?","saveItem":"Save","cancelEdit":"Cancel","editItem":"Edit in form","reset":"Cancel","emptyButton":"Set empty value"}]);</script><div class="modal fade" tabindex="-1" role="dialog" data-editable-modal="mesourApp-editableTest" data-mesour-modal="mesourApp-editableTest-modal" data-show="false" data-mesour-show="false" data-keyboard="true" data-backdrop="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" data-mesour-modal-body="true" data-ajax-loading="false" data-is-cached="false"></div><div class="modal-footer"><button class="btn btn-default" role="button" data-dismiss="modal">Close</button><a data-editable-form-save="true" class="btn btn-primary" role="button">Save</a></div></div></div></div></div>
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title">User detail</h3>
				</div>
				<div class="panel-body">
					<div class="row">

						<div class="col-lg-6">
							<table class="table styled-table">
								<tr>
									<th>Name</th>
									<td data-editable="name" data-id="1" title="Enter firstname">
										<span>John</span>
									</td>
								</tr>
								<tr>
									<th>Surname</th>
									<td data-editable="surname" data-id="1" title="Enter lastname">
										Doe							</td>
								</tr>
								<tr>
									<th>Email</th>
									<td data-editable="email" data-id="1" title="Enter email">
										test@doe.cz							</td>
								</tr>
								<tr>
									<th>Special</th>
									<td data-editable="special" data-id="1" title="Enter info">
										test@doe.cz							</td>
								</tr>
								<tr>
									<th>Birth date</th>
									<td data-editable="last_login" data-id="1" data-value="2016-03-17 12:07:03" title="Enter birth date">
										2016-03-17 12:07:03							</td>
								</tr>
								<tr>
									<th>Addresses</th>
									<td>
										<ul>
											<li data-editable="addresses" data-no-action="true">
										<span data-editable="addresses" data-id="1"
										      data-value="11">dasd,  , cz</span>
												<a href="#" class="fa fa-remove" data-editable="addresses"
												   data-id="1"
												   data-value="11"
												   data-confirm="Really delete address dasd,  , cz?"
												   data-is-remove="true"></a>
											</li>
											<li>
												<a data-editable="addresses" data-is-add="true"
												   data-id="1" class="add-new">
													<i class="fa fa-plus"></i>
													Add new address
												</a>
											</li>
										</ul>
									</td>
								</tr>
							</table>
						</div>

						<div class="col-lg-6">
							<table class="table styled-table">
								<tr>
									<th>Amount</th>
									<td data-editable="amount" data-id="1" title="Enter amount">
										150,00 EUR							</td>
								</tr>
								<tr>
									<th>Role</th>
									<td data-editable="role" data-id="1"
									    data-value="moderator" title="Select role">
										Moderator							</td>
								</tr>
								<tr>
									<th>Group</th>
									<td data-editable="group" data-id="1"
									    data-value="15" title="Select group">
										Sabči skupina (50)</td>
								</tr>
								<tr>
									<th>Has PRO</th>
									<td data-editable="has_pro" data-id="1"
									    data-value="1" title="Set PRO">
										<b style="color:green">Yes</b>	</td>
								</tr>
								<tr>
									<th>Wallet</th>
									<td data-editable="wallet" data-no-action="true">
								<span data-editable="wallet" data-id="1"
								      data-value="11">
									156</span>
										<a href="#" class="fa fa-remove" data-editable="wallet"
										   data-id="1"
										   data-value="11"
										   data-confirm="Really remove wallet with: 156 CZK?"
										   data-is-remove="true"></a>
									</td>
								</tr>
								<tr>
									<th>Companies</th>
									<td>
										<ul>
											<li data-editable="companies" data-no-action="true">
										<span data-editable="companies" data-id="1"
										      data-value="1">Google CZ</span>
												<a href="#" class="fa fa-remove" data-editable="companies"
												   data-id="1"
												   data-value="1"
												   data-confirm="Really unattach company Google CZ?"
												   data-is-remove="true"></a>
											</li>
											<li data-editable="companies" data-no-action="true">
										<span data-editable="companies" data-id="1"
										      data-value="2">Google</span>
												<a href="#" class="fa fa-remove" data-editable="companies"
												   data-id="1"
												   data-value="2"
												   data-confirm="Really unattach company Google?"
												   data-is-remove="true"></a>
											</li>
											<li data-editable="companies" data-no-action="true">
										<span data-editable="companies" data-id="1"
										      data-value="3">Allianz</span>
												<a href="#" class="fa fa-remove" data-editable="companies"
												   data-id="1"
												   data-value="3"
												   data-confirm="Really unattach company Allianz?"
												   data-is-remove="true"></a>
											</li>
											<li data-editable="companies" data-no-action="true">
										<span data-editable="companies" data-id="1"
										      data-value="4">Ford</span>
												<a href="#" class="fa fa-remove" data-editable="companies"
												   data-id="1"
												   data-value="4"
												   data-confirm="Really unattach company Ford?"
												   data-is-remove="true"></a>
											</li>
											<li data-editable="companies" data-no-action="true">
										<span data-editable="companies" data-id="1"
										      data-value="5">Foxconn</span>
												<a href="#" class="fa fa-remove" data-editable="companies"
												   data-id="1"
												   data-value="5"
												   data-confirm="Really unattach company Foxconn?"
												   data-is-remove="true"></a>
											</li>
											<li data-editable="companies" data-no-action="true">
										<span data-editable="companies" data-id="1"
										      data-value="6">Verizon</span>
												<a href="#" class="fa fa-remove" data-editable="companies"
												   data-id="1"
												   data-value="6"
												   data-confirm="Really unattach company Verizon?"
												   data-is-remove="true"></a>
											</li>
											<li>
												<a data-editable="companies" data-is-add="true"
												   data-id="1" class="add-new">
													<i class="fa fa-plus"></i>
													Add new address
												</a>
											</li>
										</ul>
									</td>
								</tr>
							</table>
						</div>

					</div>
				</div>
			</div>

		</div>

		<hr>
	</div>

	<hr>

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
	        integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
	        crossorigin="anonymous"></script>

	<script src="../node_modules/eonasdan-bootstrap-datetimepicker/node_modules/moment/min/moment.min.js"></script>
	<script src="../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>

	<script src="../dist/js/mesour.editable.js"></script>

	<script>
		$(function() {
			var COMPONENT_NAME = 'mesourApp-editableTest';

			var CustomField = function(fieldStructure, editableClosure, element, parameters, identifier, value) {
				var parameters = parameters || {},
					oldValue = value ? value : $.trim(element.html()),
					rules = fieldStructure['rules'] || [],
					isNullable = fieldStructure['nullable'],
					fieldName = fieldStructure['name'],
					getEditable = function() {
						return editableClosure();
					},
					_this = this;

				var group = $('<div class="input-group input-group-sm">');

				var select = $('<select id="lunch" class="form-control">');
				select.append('<option>Baby Back Ribs</option>');
				group.append(select);

				var input = $('<input type="text" value="' + oldValue + '" class="form-control" name="' + fieldName + '">');
				group.append(input);

				input.on('keydown.mesour-editable', function(e) {
					if (e.keyCode === 13) {
						getEditable().save(fieldName, identifier);
					} else if (e.keyCode === 27) {
						_this.reset();
					}
				});

				var popover = getEditable()
					.createEditablePopover(fieldStructure, identifier, editableClosure, element, group);

				popover.onSave(function() {
					var isValid = mesour.editable.validators.validate(
						rules,
						input.val(),
						input,
						true,
						isNullable,
						function() {return _this}
					);
					if (isValid) {
						getEditable().save(fieldName, identifier);
					}
				});
				popover.onReset(function() {
					_this.reset();
				});

				input.focus();

				this.getElement = function() {
					return element;
				};

				this.getValue = function() {
					return {
						oldValue: oldValue,
						value: input.val(),
						params: parameters
					};
				};

				this.reset = function() {
					popover.destroy();
				};

				this.save = function() {
					popover.destroy();
					element.empty().text(input.val());
				};
			};

			var Field = function() {

				this.getFieldInstance = function(fieldStructure, editableClosure, element, parameters, identifier, value) {
					return new CustomField(fieldStructure, editableClosure, element, parameters, identifier, value);
				};

				this.createFormElement = function(group, id, fieldStructure, editableClosure) {
					var title = fieldStructure['title'],
						name = fieldStructure['name'];

					var label = jQuery('<label for="' + id + '">' + title + '</label>');
					group.append(label);

					var inputGroup = $('<div class="input-group">');

					var select = $('<select id="lunch" class="form-control" name="' + name + '-select">');
					select.append('<option>--</option>');
					select.append('<option value="1">Baby Back Ribs</option>');
					select.append('<option value="2">Foo value</option>');
					inputGroup.append(select);

					var input = $('<input type="text" class="form-control" id="' + id + '" name="' + name + '">');
					inputGroup.append(input);

					group.append(inputGroup);

					//textField.data('rules', fieldStructure['rules'] || []);
				};

			};

			window.mesour = !window.mesour ? {} : window.mesour;
			window.mesour.editable = !window.mesour.editable ? [] : window.mesour.editable;
			window.mesour.editable.push(['addCustomField', COMPONENT_NAME, 'special', new Field()]);

			$(document).on('click', '[data-editable]', function(e) {
				var $this = $(this);

				if ($this.attr('data-no-action')) {
					return;
				}

				var name = $this.attr('data-editable'),
					isRemove = $this.attr('data-is-remove'),
					isAdd = $this.attr('data-is-add'),
					value = $this.attr('data-value'),
					id = $this.attr('data-id');

				if (!isRemove && (e.ctrlKey || e.metaKey)) {
					e.preventDefault();

					mesour.editable.getComponent(COMPONENT_NAME).edit(name, $this, id, value);
				} else if (isRemove || isAdd) {
					e.preventDefault();

					if (isAdd) {
						mesour.editable.getComponent(COMPONENT_NAME).newEntry(name, $this, id);
					} else {
						var confirmText = $this.attr('data-confirm');
						if (!confirmText || (confirmText && confirm(confirmText))) {
							mesour.editable.getComponent(COMPONENT_NAME).remove(name, $this, id, value);
						}
					}
				}

				mesour.editable.getComponent(COMPONENT_NAME).setOnCompleteCallback(function(fieldName) {
					var $this = $('[data-editable="' + fieldName + '"]');

					$this.css('background-color', '#bce8f1');
					$this.animate({ backgroundColor: "#fff" }, 1200);
				});
			});
		});
	</script>

	<script>

		/**!
		 * @preserve Color animation 1.6.0
		 * http://www.bitstorm.org/jquery/color-animation/
		 * Copyright 2011, 2013 Edwin Martin
		 * Released under the MIT and GPL licenses.
		 */

		(function($) {
			/**
			 * Check whether the browser supports RGBA color mode.
			 *
			 * Author Mehdi Kabab <http://pioupioum.fr>
			 * @return {boolean} True if the browser support RGBA. False otherwise.
			 */
			function isRGBACapable() {
				var $script = $('script:first'),
					color = $script.css('color'),
					result = false;
				if (/^rgba/.test(color)) {
					result = true;
				} else {
					try {
						result = ( color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color') );
						$script.css('color', color);
					} catch (e) {
					}
				}

				return result;
			}

			$.extend(true, $, {
				support: {
					'rgba': isRGBACapable()
				}
			});

			var properties = ['color', 'backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'outlineColor'];
			$.each(properties, function(i, property) {
				$.Tween.propHooks[ property ] = {
					get: function(tween) {
						return $(tween.elem).css(property);
					},
					set: function(tween) {
						var style = tween.elem.style;
						var p_begin = parseColor($(tween.elem).css(property));
						var p_end = parseColor(tween.end);
						tween.run = function(progress) {
							style[property] = calculateColor(p_begin, p_end, progress);
						}
					}
				}
			});

			// borderColor doesn't fit in standard fx.step above.
			$.Tween.propHooks.borderColor = {
				set: function(tween) {
					var style = tween.elem.style;
					var p_begin = [];
					var borders = properties.slice(2, 6); // All four border properties
					$.each(borders, function(i, property) {
						p_begin[property] = parseColor($(tween.elem).css(property));
					});
					var p_end = parseColor(tween.end);
					tween.run = function(progress) {
						$.each(borders, function(i, property) {
							style[property] = calculateColor(p_begin[property], p_end, progress);
						});
					}
				}
			}

			// Calculate an in-between color. Returns "#aabbcc"-like string.
			function calculateColor(begin, end, pos) {
				var color = 'rgb' + ($.support['rgba'] ? 'a' : '') + '('
					+ parseInt((begin[0] + pos * (end[0] - begin[0])), 10) + ','
					+ parseInt((begin[1] + pos * (end[1] - begin[1])), 10) + ','
					+ parseInt((begin[2] + pos * (end[2] - begin[2])), 10);
				if ($.support['rgba']) {
					color += ',' + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
				}
				color += ')';
				return color;
			}

			// Parse an CSS-syntax color. Outputs an array [r, g, b]
			function parseColor(color) {
				var match, quadruplet;

				// Match #aabbcc
				if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color)) {
					quadruplet = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

					// Match #abc
				} else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color)) {
					quadruplet = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

					// Match rgb(n, n, n)
				} else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
					quadruplet = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];

				} else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(color)) {
					quadruplet = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10),parseFloat(match[4])];

					// No browser returns rgb(n%, n%, n%), so little reason to support this format.
				} else {
					quadruplet = colors[color];
				}
				return quadruplet;
			}

			// Some named colors to work with, added by Bradley Ayers
			// From Interface by Stefan Petre
			// http://interface.eyecon.ro/
			var colors = {
				'aqua': [0,255,255,1],
				'azure': [240,255,255,1],
				'beige': [245,245,220,1],
				'black': [0,0,0,1],
				'blue': [0,0,255,1],
				'brown': [165,42,42,1],
				'cyan': [0,255,255,1],
				'darkblue': [0,0,139,1],
				'darkcyan': [0,139,139,1],
				'darkgrey': [169,169,169,1],
				'darkgreen': [0,100,0,1],
				'darkkhaki': [189,183,107,1],
				'darkmagenta': [139,0,139,1],
				'darkolivegreen': [85,107,47,1],
				'darkorange': [255,140,0,1],
				'darkorchid': [153,50,204,1],
				'darkred': [139,0,0,1],
				'darksalmon': [233,150,122,1],
				'darkviolet': [148,0,211,1],
				'fuchsia': [255,0,255,1],
				'gold': [255,215,0,1],
				'green': [0,128,0,1],
				'indigo': [75,0,130,1],
				'khaki': [240,230,140,1],
				'lightblue': [173,216,230,1],
				'lightcyan': [224,255,255,1],
				'lightgreen': [144,238,144,1],
				'lightgrey': [211,211,211,1],
				'lightpink': [255,182,193,1],
				'lightyellow': [255,255,224,1],
				'lime': [0,255,0,1],
				'magenta': [255,0,255,1],
				'maroon': [128,0,0,1],
				'navy': [0,0,128,1],
				'olive': [128,128,0,1],
				'orange': [255,165,0,1],
				'pink': [255,192,203,1],
				'purple': [128,0,128,1],
				'violet': [128,0,128,1],
				'red': [255,0,0,1],
				'silver': [192,192,192,1],
				'white': [255,255,255,1],
				'yellow': [255,255,0,1],
				'transparent': [255,255,255,0]
			};
		})(jQuery);
	</script>

</body>
</html>