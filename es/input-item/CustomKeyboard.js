import classnames from 'classnames';
import React from 'react';
import TouchFeedback from 'rmc-feedback';

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

export default CustomKeyboard;
export { KeyboardItem };
