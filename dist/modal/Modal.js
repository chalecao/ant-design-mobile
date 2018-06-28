'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classnames = _interopDefault(require('classnames'));
var React = _interopDefault(require('react'));
var Dialog = _interopDefault(require('rmc-dialog'));
var TouchFeedback = _interopDefault(require('rmc-feedback'));

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

var ModalComponent = function (_React$Component) {
    inherits(ModalComponent, _React$Component);

    function ModalComponent() {
        classCallCheck(this, ModalComponent);
        return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    return ModalComponent;
}(React.Component);

var Modal = function (_ModalComponent) {
    inherits(Modal, _ModalComponent);

    function Modal() {
        classCallCheck(this, Modal);
        return possibleConstructorReturn(this, _ModalComponent.apply(this, arguments));
    }

    Modal.prototype.renderFooterButton = function renderFooterButton(button, prefixCls, i) {
        var buttonStyle = {};
        if (button.style) {
            buttonStyle = button.style;
            if (typeof buttonStyle === 'string') {
                var styleMap = {
                    cancel: {},
                    default: {},
                    destructive: { color: 'red' }
                };
                buttonStyle = styleMap[buttonStyle] || {};
            }
        }
        var onClickFn = function onClickFn(e) {
            e.preventDefault();
            if (button.onPress) {
                button.onPress();
            }
        };
        return React.createElement(
            TouchFeedback,
            { activeClassName: prefixCls + '-button-active', key: i },
            React.createElement(
                'a',
                { className: prefixCls + '-button', role: 'button', style: buttonStyle, onClick: onClickFn },
                button.text || 'Button'
            )
        );
    };

    Modal.prototype.render = function render() {
        var _this3 = this,
            _classnames,
            _classnames2;

        var _a = this.props,
            prefixCls = _a.prefixCls,
            className = _a.className,
            wrapClassName = _a.wrapClassName,
            transitionName = _a.transitionName,
            maskTransitionName = _a.maskTransitionName,
            style = _a.style,
            platform = _a.platform,
            _a$footer = _a.footer,
            footer = _a$footer === undefined ? [] : _a$footer,
            operation = _a.operation,
            animated = _a.animated,
            transparent = _a.transparent,
            popup = _a.popup,
            animationType = _a.animationType,
            restProps = __rest(_a, ["prefixCls", "className", "wrapClassName", "transitionName", "maskTransitionName", "style", "platform", "footer", "operation", "animated", "transparent", "popup", "animationType"]);
        var btnGroupClass = classnames(prefixCls + '-button-group-' + (footer.length === 2 && !operation ? 'h' : 'v'), prefixCls + '-button-group-' + (operation ? 'operation' : 'normal'));
        var footerDom = footer.length ? React.createElement(
            'div',
            { className: btnGroupClass, role: 'group' },
            footer.map(function (button, i) {
                return (
                    // tslint:disable-next-line:jsx-no-multiline-js
                    _this3.renderFooterButton(button, prefixCls, i)
                );
            })
        ) : null;
        var transName = void 0;
        var maskTransName = void 0;
        if (animated) {
            // tslint:disable-next-line:prefer-conditional-expression
            if (transparent) {
                transName = maskTransName = 'am-fade';
            } else {
                transName = maskTransName = 'am-slide-up';
            }
            if (popup) {
                transName = animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
                maskTransName = 'am-fade';
            }
        }
        var wrapCls = classnames(wrapClassName, (_classnames = {}, _classnames[prefixCls + '-wrap-popup'] = popup, _classnames));
        var cls = classnames(className, (_classnames2 = {}, _classnames2[prefixCls + '-transparent'] = transparent, _classnames2[prefixCls + '-popup'] = popup, _classnames2[prefixCls + '-popup-' + animationType] = popup && animationType, _classnames2[prefixCls + '-android'] = platform === 'android', _classnames2));
        return React.createElement(Dialog, _extends({}, restProps, { prefixCls: prefixCls, className: cls, wrapClassName: wrapCls, transitionName: transitionName || transName, maskTransitionName: maskTransitionName || maskTransName, style: style, footer: footerDom }));
    };

    return Modal;
}(ModalComponent);

Modal.defaultProps = {
    prefixCls: 'am-modal',
    transparent: false,
    popup: false,
    animationType: 'slide-down',
    animated: true,
    style: {},
    onShow: function onShow() {},

    footer: [],
    closable: false,
    operation: false,
    platform: 'ios'
};

exports.ModalComponent = ModalComponent;
exports.default = Modal;
