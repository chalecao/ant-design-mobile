'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classnames = _interopDefault(require('classnames'));
var React = _interopDefault(require('react'));
var TouchFeedback = _interopDefault(require('rmc-feedback'));
var ReactDOM = _interopDefault(require('react-dom'));

function hasClass(node, className) {
    if (node.classList) {
        return node.classList.contains(className);
    }
    var originClass = node.className;
    return (' ' + originClass + ' ').indexOf(' ' + className + ' ') > -1;
}
function addClass(node, className) {
    if (node.classList) {
        node.classList.add(className);
    } else if (!hasClass(node, className)) {
        node.className = node.className + ' ' + className;
    }
}
function removeClass(node, className) {
    if (node.classList) {
        node.classList.remove(className);
    } else if (hasClass(node, className)) {
        var originClass = node.className;
        node.className = (' ' + originClass + ' ').replace(' ' + className + ' ', '');
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var IS_IOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
var KeyboardItem = function (_React$Component) {
    inherits(KeyboardItem, _React$Component);

    function KeyboardItem() {
        classCallCheck(this, KeyboardItem);
        return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    KeyboardItem.prototype.render = function render() {
        var _a = this.props,
            prefixCls = _a.prefixCls,
            _onClick = _a.onClick,
            className = _a.className,
            disabled = _a.disabled,
            children = _a.children,
            tdRef = _a.tdRef,
            label = _a.label,
            iconOnly = _a.iconOnly,
            restProps = __rest(_a, ["prefixCls", "onClick", "className", "disabled", "children", "tdRef", "label", "iconOnly"]);
        var value = children;
        if (className === 'keyboard-delete') {
            value = 'delete';
        } else if (className === 'keyboard-hide') {
            value = 'hide';
        } else if (className === 'keyboard-confirm') {
            value = 'confirm';
        }
        var wrapCls = classnames(prefixCls + '-item', className);
        return React.createElement(
            TouchFeedback,
            { activeClassName: prefixCls + '-item-active' },
            React.createElement(
                'td',
                _extends({ ref: tdRef
                    // tslint:disable-next-line:jsx-no-multiline-js
                    , onClick: function onClick(e) {
                        _onClick(e, value);
                    }, className: wrapCls }, restProps),
                children,
                iconOnly && React.createElement(
                    'i',
                    { className: 'sr-only' },
                    label
                )
            )
        );
    };

    return KeyboardItem;
}(React.Component);
KeyboardItem.defaultProps = {
    prefixCls: 'am-number-keyboard',
    onClick: function onClick() {},
    disabled: false
};

var CustomKeyboard = function (_React$Component2) {
    inherits(CustomKeyboard, _React$Component2);

    function CustomKeyboard() {
        classCallCheck(this, CustomKeyboard);

        var _this2 = possibleConstructorReturn(this, _React$Component2.apply(this, arguments));

        _this2.onKeyboardClick = function (e, value) {
            e.nativeEvent.stopImmediatePropagation();
            if (value === 'confirm' && _this2.confirmDisabled) {
                return null;
            } else {
                if (_this2.linkedInput) {
                    _this2.linkedInput.onKeyboardClick(value);
                }
            }
        };
        _this2.renderKeyboardItem = function (item, index) {
            return React.createElement(
                KeyboardItem,
                { onClick: _this2.onKeyboardClick, key: 'item-' + item + '-' + index },
                item
            );
        };
        return _this2;
    }

    CustomKeyboard.prototype.render = function render() {
        var _this3 = this;

        var _props = this.props,
            prefixCls = _props.prefixCls,
            confirmLabel = _props.confirmLabel,
            backspaceLabel = _props.backspaceLabel,
            cancelKeyboardLabel = _props.cancelKeyboardLabel,
            wrapProps = _props.wrapProps;

        var wrapperCls = classnames(prefixCls + '-wrapper', prefixCls + '-wrapper-hide');
        return React.createElement(
            'div',
            _extends({ className: wrapperCls, ref: function ref(el) {
                    return _this3.antmKeyboard = el;
                } }, wrapProps),
            React.createElement(
                'table',
                null,
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        ['1', '2', '3'].map(function (item, index) {
                            return (
                                // tslint:disable-next-line:jsx-no-multiline-js
                                _this3.renderKeyboardItem(item, index)
                            );
                        }),
                        React.createElement(KeyboardItem, _extends({ className: 'keyboard-delete', rowSpan: 2, onClick: this.onKeyboardClick }, this.getAriaAttr(backspaceLabel)))
                    ),
                    React.createElement(
                        'tr',
                        null,
                        ['4', '5', '6'].map(function (item, index) {
                            return (
                                // tslint:disable-next-line:jsx-no-multiline-js
                                _this3.renderKeyboardItem(item, index)
                            );
                        })
                    ),
                    React.createElement(
                        'tr',
                        null,
                        ['7', '8', '9'].map(function (item, index) {
                            return (
                                // tslint:disable-next-line:jsx-no-multiline-js
                                _this3.renderKeyboardItem(item, index)
                            );
                        }),
                        React.createElement(
                            KeyboardItem,
                            { className: 'keyboard-confirm', rowSpan: 2, onClick: this.onKeyboardClick, tdRef: function tdRef(el) {
                                    return _this3.confirmKeyboardItem = el;
                                } },
                            confirmLabel
                        )
                    ),
                    React.createElement(
                        'tr',
                        null,
                        ['.', '0'].map(function (item, index) {
                            return (
                                // tslint:disable-next-line:jsx-no-multiline-js
                                _this3.renderKeyboardItem(item, index)
                            );
                        }),
                        React.createElement(KeyboardItem, _extends({ className: 'keyboard-hide', onClick: this.onKeyboardClick }, this.getAriaAttr(cancelKeyboardLabel)))
                    )
                )
            )
        );
    };

    CustomKeyboard.prototype.getAriaAttr = function getAriaAttr(label) {
        if (IS_IOS) {
            return { label: label, iconOnly: true };
        } else {
            return { role: 'button', 'aria-label': label };
        }
    };

    return CustomKeyboard;
}(React.Component);

CustomKeyboard.defaultProps = {
    prefixCls: 'am-number-keyboard'
};

var createPortal = ReactDOM.createPortal;

var Portal = function (_React$Component) {
    inherits(Portal, _React$Component);

    function Portal(props) {
        classCallCheck(this, Portal);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.container = _this.props.getContainer();
        return _this;
    }

    Portal.prototype.render = function render() {
        if (this.props.children) {
            return createPortal(this.props.children, this.container);
        }
        return null;
    };

    return Portal;
}(React.Component);

var instanceArr = [];
var customNumberKeyboard = null;
var IS_REACT_16 = !!ReactDOM.createPortal;

var NumberInput = function (_React$Component) {
    inherits(NumberInput, _React$Component);

    function NumberInput(props) {
        classCallCheck(this, NumberInput);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.onChange = function (value) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value.target.value });
            }
            _this.props.onChange(value);
        };
        _this.onConfirm = function (value) {
            _this.props.onVirtualKeyboardConfirm(value);
        };
        _this.addBlurListener = function () {
            document.addEventListener('click', _this.doBlur, false);
        };
        _this.removeBlurListener = function () {
            document.removeEventListener('click', _this.doBlur, false);
        };
        _this.saveRef = function (el) {
            if (IS_REACT_16 && el) {
                customNumberKeyboard = el;
                instanceArr.push({ el: el, container: _this.container });
            }
        };
        _this.doBlur = function (ev) {
            var value = _this.state.value;

            if (ev.target !== _this.inputRef) {
                _this.onInputBlur(value);
            }
        };
        _this.removeCurrentExtraKeyboard = function () {
            instanceArr = instanceArr.filter(function (item) {
                var el = item.el,
                    container = item.container;

                if (el && container && el !== customNumberKeyboard) {
                    container.parentNode.removeChild(container);
                }
                return el === customNumberKeyboard;
            });
        };
        _this.unLinkInput = function () {
            if (customNumberKeyboard && customNumberKeyboard.antmKeyboard && customNumberKeyboard.linkedInput && customNumberKeyboard.linkedInput === _this) {
                customNumberKeyboard.linkedInput = null;
                addClass(customNumberKeyboard.antmKeyboard, _this.props.keyboardPrefixCls + '-wrapper-hide');
            }
            // for unmount
            _this.removeBlurListener();
            if (IS_REACT_16) {
                _this.removeCurrentExtraKeyboard();
            }
        };
        _this.onInputBlur = function (value) {
            var focus = _this.state.focus;

            if (focus) {
                _this.setState({
                    focus: false
                });
                _this.props.onBlur(value);
                setTimeout(function () {
                    _this.unLinkInput();
                }, 50);
            }
        };
        _this.onInputFocus = function () {
            var value = _this.state.value;

            _this.props.onFocus(value);
            _this.setState({
                focus: true
            }, function () {
                if (customNumberKeyboard) {
                    customNumberKeyboard.linkedInput = _this;
                    if (customNumberKeyboard.antmKeyboard) {
                        removeClass(customNumberKeyboard.antmKeyboard, _this.props.keyboardPrefixCls + '-wrapper-hide');
                    }
                    customNumberKeyboard.confirmDisabled = value === '';
                    if (customNumberKeyboard.confirmKeyboardItem) {
                        if (value === '') {
                            addClass(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                        } else {
                            removeClass(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                        }
                    }
                }
            });
        };
        _this.onKeyboardClick = function (KeyboardItemValue) {
            var maxLength = _this.props.maxLength;
            var value = _this.state.value;
            // tslint:disable-next-line:no-this-assignment

            var onChange = _this.onChange;

            var valueAfterChange = void 0;
            // 删除键
            if (KeyboardItemValue === 'delete') {
                valueAfterChange = value.substring(0, value.length - 1);
                onChange({ target: { value: valueAfterChange } });
                // 确认键
            } else if (KeyboardItemValue === 'confirm') {
                valueAfterChange = value;
                onChange({ target: { value: valueAfterChange } });
                _this.onInputBlur(value);
                _this.onConfirm(value);
                // 收起键
            } else if (KeyboardItemValue === 'hide') {
                valueAfterChange = value;
                _this.onInputBlur(valueAfterChange);
            } else {
                if (maxLength !== undefined && +maxLength >= 0 && (value + KeyboardItemValue).length > maxLength) {
                    valueAfterChange = (value + KeyboardItemValue).substr(0, maxLength);
                    onChange({ target: { value: valueAfterChange } });
                } else {
                    valueAfterChange = value + KeyboardItemValue;
                    onChange({ target: { value: valueAfterChange } });
                }
            }
            if (customNumberKeyboard) {
                customNumberKeyboard.confirmDisabled = valueAfterChange === '';
                if (customNumberKeyboard.confirmKeyboardItem) {
                    if (valueAfterChange === '') {
                        addClass(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                    } else {
                        removeClass(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                    }
                }
            }
        };
        _this.onFakeInputClick = function () {
            _this.focus();
        };
        _this.focus = function () {
            // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
            _this.removeBlurListener();
            var focus = _this.state.focus;

            if (!focus) {
                _this.onInputFocus();
            }
            setTimeout(function () {
                _this.addBlurListener();
            }, 50);
        };
        _this.state = {
            focus: false,
            value: props.value || ''
        };
        return _this;
    }

    NumberInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };

    NumberInput.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderCustomKeyboard();
    };

    NumberInput.prototype.componentWillUnmount = function componentWillUnmount() {
        // focus:true unmount 不能触发 blur
        if (this.state.focus) {
            this.props.onBlur(this.state.value);
        }
        this.unLinkInput();
    };

    NumberInput.prototype.getComponent = function getComponent() {
        var _props = this.props,
            confirmLabel = _props.confirmLabel,
            backspaceLabel = _props.backspaceLabel,
            cancelKeyboardLabel = _props.cancelKeyboardLabel,
            keyboardPrefixCls = _props.keyboardPrefixCls,
            moneyKeyboardWrapProps = _props.moneyKeyboardWrapProps;

        return React.createElement(CustomKeyboard, { ref: this.saveRef, onClick: this.onKeyboardClick, prefixCls: keyboardPrefixCls, confirmLabel: confirmLabel, backspaceLabel: backspaceLabel, cancelKeyboardLabel: cancelKeyboardLabel, wrapProps: moneyKeyboardWrapProps });
    };

    NumberInput.prototype.getContainer = function getContainer() {
        var keyboardPrefixCls = this.props.keyboardPrefixCls;

        if (IS_REACT_16) {
            if (!this.container) {
                var container = document.createElement('div');
                container.setAttribute('id', keyboardPrefixCls + '-container-' + new Date().getTime());
                document.body.appendChild(container);
                this.container = container;
            }
        } else {
            var _container = document.querySelector('#' + keyboardPrefixCls + '-container');
            if (!_container) {
                _container = document.createElement('div');
                _container.setAttribute('id', keyboardPrefixCls + '-container');
                document.body.appendChild(_container);
            }
            this.container = _container;
        }
        return this.container;
    };

    NumberInput.prototype.renderCustomKeyboard = function renderCustomKeyboard() {
        if (IS_REACT_16) {
            return;
        }
        customNumberKeyboard = ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(), this.getContainer());
    };

    NumberInput.prototype.renderPortal = function renderPortal() {
        var _this2 = this;

        if (!IS_REACT_16) {
            return null;
        }
        return React.createElement(
            Portal,
            { getContainer: function getContainer() {
                    return _this2.getContainer();
                } },
            this.getComponent()
        );
    };

    NumberInput.prototype.render = function render() {
        var _this3 = this;

        var _props2 = this.props,
            placeholder = _props2.placeholder,
            disabled = _props2.disabled,
            editable = _props2.editable,
            moneyKeyboardAlign = _props2.moneyKeyboardAlign;
        var _state = this.state,
            focus = _state.focus,
            value = _state.value;

        var preventKeyboard = disabled || !editable;
        var fakeInputCls = classnames('fake-input', {
            focus: focus,
            'fake-input-disabled': disabled
        });
        var fakeInputContainerCls = classnames('fake-input-container', {
            'fake-input-container-left': moneyKeyboardAlign === 'left'
        });
        return React.createElement(
            'div',
            { className: fakeInputContainerCls },
            value === '' &&
            // tslint:disable-next-line:jsx-no-multiline-js
            React.createElement(
                'div',
                { className: 'fake-input-placeholder' },
                placeholder
            ),
            React.createElement(
                'div',
                { role: 'textbox', 'aria-label': value || placeholder, className: fakeInputCls, ref: function ref(el) {
                        return _this3.inputRef = el;
                    }, onClick: preventKeyboard ? function () {} : this.onFakeInputClick },
                value
            ),
            this.renderPortal()
        );
    };

    return NumberInput;
}(React.Component);

NumberInput.defaultProps = {
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    onVirtualKeyboardConfirm: function onVirtualKeyboardConfirm() {},
    placeholder: '',
    disabled: false,
    editable: true,
    prefixCls: 'am-input',
    keyboardPrefixCls: 'am-number-keyboard'
};

module.exports = NumberInput;
