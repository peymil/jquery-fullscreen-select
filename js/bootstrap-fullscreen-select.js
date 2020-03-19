'use strict';
/*!
 * Bootstrap-fullscreen-select v1.5.1 (http://craftpip.github.io/bootstrap-fullscreen-select/)
 * Author: boniface pereira
 * Website: www.craftpip.com
 * Contact: hey@craftpip.com
 *
 * Copyright 2013-2014 bootstrap-select
 * Licensed under MIT (https://github.com/craftpip/bootstrap-fullscreen-select/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
	throw new Error('Mobileselect requires jQuery');
}

(function($) {
	$.fn.mobileSelect = function(options) {
		var $this = $(this);
		/*
		 * backout if no elements are selected.
		 */
		if (!$this.length) return 'no elements to process';

		/*
		 * set an empty object if options === undefined
		 */
		if (!options) options = {};

		if (typeof options === 'string') {
			if (options === 'destroy') {
				// destroy the mobile select initialization.
				$this.each(function(i, a) {
					var id = $(a).attr('data-msid');
					$.mobileSelect.elements[id].destroy();
					delete $.mobileSelect.elements[id];
				});
			}
			if (options === 'sync' || options === 'refresh') {
				//sync changes in the options.
				$this.each(function(i, a) {
					var id = $(a).attr('data-msid');
					$.mobileSelect.elements[id].refresh();
				});
			}
			if (options === 'hide') {
				// programmically hide a shown mobileSelect
				$this.each(function(i, a) {
					var id = $(a).attr('data-msid');
					$.mobileSelect.elements[id].hide();
				});
			}
			if (options === 'show') {
				// programmicallly show a mobileSelect
				$this.each(function(i, a) {
					var id = $(a).attr('data-msid');
					$.mobileSelect.elements[id].show();
				});
			}
			return;
		}
		// if user defaults provided overwrite with mobileSelect defaults.
		if ($.mobileSelect.defaults) {
			$.extend($.fn.mobileSelect.defaults, $.mobileSelect.defaults);
		}
		// options to be merged with defaults.
		options = $.extend({}, $.fn.mobileSelect.defaults, options);
		// start iterating over!
		$this.each(function(i, a) {
			var $elm = $(a);
			//reject non SELECT elements
			if ($elm[0].tagName !== 'SELECT') {
				console.warn(
					'Sorry, cannot initialized a ' +
						$elm[0].tagName +
						' element'
				);
				return true;
				// continue;
			}
			if ($elm.attr('data-msid') !== undefined) {
				console.error('This element is already Initialized');
				return true;
				// continue
			}
			// track objects via generated IDs
			var id = Math.floor(Math.random() * 999999);
			$elm.attr('data-msid', id);
			var mobileSelectObj = new Mobileselect(a, options);
			$.mobileSelect.elements[id] = mobileSelectObj;
		});
	};
	var Mobileselect = function(element, options) {
		this.$e = $(element);
		$.extend(this, options);
		this.init();
	};
	Mobileselect.prototype = {
		init: function() {
			this._setUserOptions();
			this._extractOptions();
			this._buildHTML();
			this._bindEvents();
		},
		_mobilecheck: function() {
			var check = false;
			(function(a) {
				if (
					/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
						a
					) ||
					/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
						a.substr(0, 4)
					)
				)
					check = true;
			})(navigator.userAgent || navigator.vendor || window.opera);
			return check;
		},
		_buildHTML: function() {
			/*
			 * build and insert the trigger element
			 */

			if (this.$e.attr('data-triggerOn') === undefined) {
				// no custom trigger element.
				if (this.$e.attr('data-style') !== undefined) {
					this.style = this.$e.attr('data-style');
				}

				var b = this.$e.attr('disabled') || '';
				this.$e.before(
					'<button type="button" class="btn ' +
						this.style +
						' btn-mobileSelect-gen" ' +
						b +
						'><span class="text"></span> <span class="caret"></span></button>'
				);
				this.$triggerElement = this.$e.prev();
				this.$e.hide();
			} else {
				this.$triggerElement = $(this.$e.attr('data-triggerOn'));
			}

			/*
			 * Build mobile select container HTML.
			 */

			//seting up the container.
			this.$c = $('<div class="mobileSelect-container"></div>')
				.addClass(this.theme)
				.appendTo('body');

			//appending the container template
			this.$c.html($.fn.mobileSelect.defaults.template);

			//settings container animations.
			this.$c
				.children('div')
				.css({
					'-webkit-transition':
						'all ' + this.animationSpeed / 1000 + 's',
					transition: 'all ' + this.animationSpeed / 1000 + 's'
				})
				.css(this.padding)
				.addClass('anim-' + this.animation);

			/*
			 * set title buttons text.
			 */
			this.$c
				.find('.mobileSelect-title')
				.html(this.title)
				.end()
				.find('.mobileSelect-search-div')
				.html(this.searchInput)
				.end()
				.find('.mobileSelect-savebtn')
				.html(this.buttonSave)
				.end()
				.find('.mobileSelect-clearbtn')
				.html(this.buttonClear)
				.end()
				.find('.mobileSelect-cancelbtn')
				.html(this.buttonCancel)
				.end();
			this.$listcontainer = this.$c.find('.list-container');

			if (!this.useSaveButton && !this.isMultiple) {
				this.$c.find('.mobileSelect-savebtn').remove();
			}
			if (!this.isMultiple) {
				this.$c.find('.mobileSelect-clearbtn').remove();
			} else {
				this.$listcontainer.data('multiple', 'true');
			}
			this._appendOptionsList();
		},
		_appendOptionsList: function() {
			/*
			 * append options list.
			 */
			this.$listcontainer.html('');
			var that = this;
			var prevGroup = '';
			var b = '';
			$.each(this.options, function(i, a) {
				if (a.group && a.group !== prevGroup) {
					if (a.groupDisabled) {
						b = 'disabled';
					}
					that.$listcontainer.append(
						'<span class="mobileSelect-group" ' +
							b +
							'>' +
							a.group +
							'</span>'
					);
					prevGroup = a.group;
				}
				if (a.groupDisabled || a.disabled) {
					b = 'disabled';
				}
				that.$listcontainer.append(
					'<a href="#" class="mobileSelect-control" ' +
						b +
						' data-value="' +
						a.value +
						'">' +
						a.text +
						'</a>'
				);
			});
			this.sync();
			this._updateBtnCount();
		},
		_updateBtnCount: function() {
			/*
			 * Update generated button count.
			 */
			if (
				this.$triggerElement.is('button') &&
				this.$triggerElement.hasClass('btn-mobileSelect-gen')
			) {
				var a = this.$triggerElement.find('.text'),
					b = this.$triggerElement.next() || this.$e,
					c = this.$e.attr('data-btntitle'),
					d = this.$e.attr('data-selected');

				a.width(this.$triggerElement.width() - 10);

				if (b.val() == null && c == undefined) {
					a.html(this.nothingSelectedText);
					return false;
				}
				if (b.val() == null) {
					a.html(c);
					return false;
				}
				if (this.isMultiple) {
					if (b.val().length <= this.maxMultiItemShow) {
						a.html(b.val().join(', '));
					} else {
						if (d == undefined) {
							a.html(
								b.val().length + ' ' + this.itemsSelectedText
							);
						} else {
							a.html(b.val().length + ' ' + d);
						}
					}
				} else {
					if (c == undefined) {
						a.html(b.find(':selected').text());
					} else {
						a.html(c);
					}
				}
			}
		},
		_bindEvents: function() {
			/*
			 * binding events on trigger element & buttons.
			 */
			var that = this;
			this.$triggerElement.on('click', function(e) {
				e.preventDefault();
				that.show();
				//if user press esc, window closes
				$(document).on('keyup', function(e) {
					if (e.key === 'Escape') {
						e.preventDefault();
						that.hide();
					}
				});
			});
			//if user click outer div, window closes
			this.$c.on('click', function(e) {
				e.preventDefault();
				if (this == e.target) {
					that.hide();
				}
			});
			this.$c.find('.mobileSelect-savebtn').on('click', function(e) {
				e.preventDefault();
				that.syncR();
				that.hide();
			});
			this.$c.find('.mobileSelect-clearbtn').on('click', function(e) {
				e.preventDefault();
				that.$listcontainer.find('.selected').removeClass('selected');
				that.syncR();
				that.hide();
			});
			this.$c.find('.mobileSelect-cancelbtn').on('click', function(e) {
				e.preventDefault();
				that.hide();
			});
			this.$c.find('.mobileSelect-control').on('click', function(e) {
				e.preventDefault();
				var $this = $(this);

				if ($this.attr('disabled') == 'disabled') return false;
				if (that.isMultiple) {
					$this.toggleClass('selected');
				} else {
					$this
						.siblings()
						.removeClass('selected')
						.end()
						.addClass('selected');
					if (!that.useSaveButton) {
						that.syncR();
						that.hide();
					}
				}
			});

			this.$c.find('.mobileSelect-search').on('keyup', function(e) {
				//.mobileSelect-control
				var s = that.optionsRef.filter((doc) =>
					doc.text.toLowerCase().includes(
						$(e.currentTarget)
							.val()
							.toLowerCase()
					)
				);
				//var output = "Hello world!".split('');
				that.options = s;
				that.refreshSearch();
			});
		},
		_unbindEvents: function() {
			/*
			 * to unbind events while destroy.
			 */
			this.$triggerElement.unbind('click');
			//Outer div click event unbind
			this.$c.unbind('click');
			this.$c.find('.mobileSelect-clearbtn').unbind('click');
			this.$c.find('.mobileSelect-cancelbtn').unbind('click');
			this.$c.find('.mobileSelect-search').unbind('keyup');
			this.$c.find('.mobileSelect-control').unbind('click');
		},
		sync: function() {
			/*
			 * sync from select element to mobile select container
			 */
			var selectedOptions = this.$e.val();
			if (!this.isMultiple) selectedOptions = [selectedOptions];
			this.$c.find('a').removeClass('selected');
			for (var i in selectedOptions) {
				this.$c
					.find('a[data-value="' + selectedOptions[i] + '"]')
					.addClass('selected');
			}
		},
		syncR: function() {
			/*
			 * sync from mobile select container to select element
			 */
			var selectedOptions = [];
			this.$c.find('.selected').each(function() {
				selectedOptions.push($(this).data('value'));
			});
			this.$e.val(selectedOptions);
		},
		hide: function() {
			/*
			 * hide animation with onClose callback
			 */
			this.$c.children('div').addClass('anim-' + this.animation);
			var that = this;
			this._updateBtnCount();
			setTimeout(function() {
				that.$c.hide();
				$('body').removeClass('mobileSelect-noscroll');
				that.onClose.apply(that.$e);
			}, this.animationSpeed);
			//Esc event unbind
			$(document).unbind('keyup');
		},
		show: function() {
			/*
			 * show animation with onOpen callback
			 */
			this.$c.show();
			this.sync();
			$('body').addClass('mobileSelect-noscroll');
			var that = this;
			setTimeout(function() {
				that.$c
					.children('div')
					.removeClass($.mobileSelect.animations.join(' '));
			}, 10);
			this.onOpen.apply(this.$e);
		},
		_setUserOptions: function() {
			/*
			 * overwrite options with data-attributes if provided.
			 */
			this.isMultiple = this.$e.attr('multiple') ? true : false;
			if (this.$e.data('title') !== undefined) {
				this.title = this.$e.data('title');
			}
			if (this.$e.data('animation') !== undefined) {
				this.animation = this.$e.data('animation');
			}
			if (this.$e.data('animation-speed') !== undefined) {
				this.animationSpeed = this.$e.data('animation-speed');
			}
			if (this.$e.data('max-multi-item') !== undefined) {
				this.maxMultiItemShow = this.$e.data('max-multi-item');
			}
			if (this.$e.data('padding') !== undefined) {
				this.padding = this.$e.data('padding');
			} else {
				if (this._mobilecheck()) {
					this.padding = {
						top: '0px',
						left: '0px',
						right: '0px',
						bottom: '0px'
					};
				}
			}
			if (this.$e.data('btntext-save') !== undefined) {
				this.buttonSave = this.$e.data('btntext-save');
			}
			if (this.$e.data('btntext-clear') !== undefined) {
				this.buttonClear = this.$e.data('btntext-clear');
			}
			if (this.$e.data('btntext-cancel') !== undefined) {
				this.buttonCancel = this.$e.data('btntext-cancel');
			}
			if (this.$e.data('theme') !== undefined) {
				this.theme = this.$e.data('theme');
			}
			if (this.animation === 'none') {
				this.animationSpeed = 0;
			}
			if (this.$e.data('search-text') !== undefined) {
				this.searchText = this.$e.data('search-text');
			}

			if (this.search == true) {
				this.searchInput =
					'<input class="form-control mobileSelect-search" type="text" placeholder="' +
					this.searchText +
					'">';
			}
		},
		_extractOptions: function() {
			/*
			 * Get options from the select element and store them in an array.
			 */
			var options = [];
			$.each(this.$e.find('option'), function(i, a) {
				var $t = $(a);
				if ($t.text()) {
					//                    var label = $t.parent().is('optgroup') ? $t.parent().attr('label') : false;

					var label = false;
					var labelDisabled = false;
					if ($t.parent().is('optgroup')) {
						label = $t.parent().attr('label');
						labelDisabled = $t.parent().prop('disabled');
					}
					options.push({
						value: $t.val(),
						text: $.trim($t.text()),
						disabled: $t.prop('disabled'),
						group: label,
						groupDisabled: labelDisabled
					});
				}
			});
			this.options = options;
			this.optionsRef = options;
		},
		destroy: function() {
			/*
			 * destroy the select
			 * unbind events
			 * remove triggerElement, container
			 * show the Native select
			 */
			this.$e.removeAttr('data-msid');
			this._unbindEvents();
			this.$triggerElement.remove();
			this.$c.remove();
			this.$e.show();
			console.log('done ');
		},
		refresh: function() {
			/*
			 * refresh/sync the native select with the mobileSelect.
			 */
			this._extractOptions();
			this._appendOptionsList();
			this._unbindEvents();
			this._bindEvents();
		},
		refreshSearch: function() {
			this._appendOptionsList();
			this._unbindEvents();
			this._bindEvents();
		}
	};

	/*
	 * for user defaults.
	 */
	$.mobileSelect = {
		elements: {}, //to store records
		animations: [
			'anim-top',
			'anim-bottom',
			'anim-left',
			'anim-right',
			'anim-opacity',
			'anim-scale',
			'anim-zoom',
			'anim-none'
		] //supported animations
	};

	/*
	 * plugin defaults
	 */
	$.fn.mobileSelect.defaults = {
		template:
			'<div><div class="mobileSelect-title"></div><div class="mobileSelect-search-div"></div><div class="list-container"></div><div class="mobileSelect-buttons"><a href="#" class="mobileSelect-savebtn"></a><a href="#" class="mobileSelect-clearbtn"></a><a href="#" class="mobileSelect-cancelbtn"></a></div></div>',
		title: 'Select an option',
		buttonSave: 'Save',
		useSaveButton: false,
		search: true,
		buttonClear: 'Clear',
		buttonCancel: 'Cancel',
		searchText: 'Search',
		nothingSelectedText: 'Nothing Selected',
		itemsSelectedText: 'items selected',
		padding: {
			top: '20%',
			left: '25%',
			right: '25%',
			bottom: '20%'
		},
		animation: 'bottom',
		maxMultiItemShow: 3,
		animationSpeed: 200,
		theme: 'white',
		onOpen: function() {},
		onClose: function() {},
		style: 'btn-default'
	};
	// eslint-disable-next-line no-undef
})(jQuery);
