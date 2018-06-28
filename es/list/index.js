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

var Brief = function (_React$Component) {
    inherits(Brief, _React$Component);

    function Brief() {
        classCallCheck(this, Brief);
        return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Brief.prototype.render = function render() {
        return React.createElement(
            'div',
            { className: 'am-list-brief', style: this.props.style || {} },
            this.props.children
        );
    };

    return Brief;
}(React.Component);

var ListItem = function (_React$Component2) {
    inherits(ListItem, _React$Component2);

    function ListItem(props) {
        classCallCheck(this, ListItem);

        var _this2 = possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.onClick = function (ev) {
            var _this2$props = _this2.props,
                onClick = _this2$props.onClick,
                platform = _this2$props.platform;

            var isAndroid = platform === 'android';
            if (!!onClick && isAndroid) {
                if (_this2.debounceTimeout) {
                    clearTimeout(_this2.debounceTimeout);
                    _this2.debounceTimeout = null;
                }
                var Item = ev.currentTarget;
                var RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
                var ClientRect = ev.currentTarget.getBoundingClientRect();
                var pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
                var pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
                var coverRippleStyle = {
                    width: RippleWidth + 'px',
                    height: RippleWidth + 'px',
                    left: pointX + 'px',
                    top: pointY + 'px'
                };
                _this2.setState({
                    coverRippleStyle: coverRippleStyle,
                    RippleClicked: true
                }, function () {
                    _this2.debounceTimeout = setTimeout(function () {
                        _this2.setState({
                            coverRippleStyle: { display: 'none' },
                            RippleClicked: false
                        });
                    }, 1000);
                });
            }
            if (onClick) {
                onClick(ev);
            }
        };
        _this2.state = {
            coverRippleStyle: { display: 'none' },
            RippleClicked: false
        };
        return _this2;
    }

    ListItem.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    };

    ListItem.prototype.render = function render() {
        var _classnames,
            _classnames2,
            _classnames3,
            _classnames4,
            _this3 = this;

        var _a = this.props,
            prefixCls = _a.prefixCls,
            className = _a.className,
            activeStyle = _a.activeStyle,
            error = _a.error,
            align = _a.align,
            wrap = _a.wrap,
            disabled = _a.disabled,
            children = _a.children,
            multipleLine = _a.multipleLine,
            thumb = _a.thumb,
            extra = _a.extra,
            arrow = _a.arrow,
            onClick = _a.onClick,
            restProps = __rest(_a, ["prefixCls", "className", "activeStyle", "error", "align", "wrap", "disabled", "children", "multipleLine", "thumb", "extra", "arrow", "onClick"]);var otherProps = __rest(restProps, ["platform"]);var _state = this.state,
            coverRippleStyle = _state.coverRippleStyle,
            RippleClicked = _state.RippleClicked;

        var wrapCls = classnames(prefixCls + '-item', className, (_classnames = {}, _classnames[prefixCls + '-item-disabled'] = disabled, _classnames[prefixCls + '-item-error'] = error, _classnames[prefixCls + '-item-top'] = align === 'top', _classnames[prefixCls + '-item-middle'] = align === 'middle', _classnames[prefixCls + '-item-bottom'] = align === 'bottom', _classnames));
        var rippleCls = classnames(prefixCls + '-ripple', (_classnames2 = {}, _classnames2[prefixCls + '-ripple-animate'] = RippleClicked, _classnames2));
        var lineCls = classnames(prefixCls + '-line', (_classnames3 = {}, _classnames3[prefixCls + '-line-multiple'] = multipleLine, _classnames3[prefixCls + '-line-wrap'] = wrap, _classnames3));
        var arrowCls = classnames(prefixCls + '-arrow', (_classnames4 = {}, _classnames4[prefixCls + '-arrow-horizontal'] = arrow === 'horizontal', _classnames4[prefixCls + '-arrow-vertical'] = arrow === 'down' || arrow === 'up', _classnames4[prefixCls + '-arrow-vertical-up'] = arrow === 'up', _classnames4));
        var content = React.createElement(
            'div',
            _extends({}, otherProps, { onClick: function onClick(ev) {
                    _this3.onClick(ev);
                }, className: wrapCls }),
            thumb ? React.createElement(
                'div',
                { className: prefixCls + '-thumb' },
                typeof thumb === 'string' ? React.createElement('img', { src: thumb }) : thumb
            ) : null,
            React.createElement(
                'div',
                { className: lineCls },
                children !== undefined && React.createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    children
                ),
                extra !== undefined && React.createElement(
                    'div',
                    { className: prefixCls + '-extra' },
                    extra
                ),
                arrow && React.createElement('div', { className: arrowCls, 'aria-hidden': 'true' })
            ),
            React.createElement('div', { style: coverRippleStyle, className: rippleCls })
        );
        var touchProps = {};
        Object.keys(otherProps).forEach(function (key) {
            if (/onTouch/i.test(key)) {
                touchProps[key] = otherProps[key];
                delete otherProps[key];
            }
        });
        return React.createElement(
            TouchFeedback,
            _extends({}, touchProps, { disabled: disabled || !onClick, activeStyle: activeStyle, activeClassName: prefixCls + '-item-active' }),
            content
        );
    };

    return ListItem;
}(React.Component);

ListItem.defaultProps = {
    prefixCls: 'am-list',
    align: 'middle',
    error: false,
    multipleLine: false,
    wrap: false,
    platform: 'ios'
};
ListItem.Brief = Brief;

var List = function (_React$Component) {
    inherits(List, _React$Component);

    function List() {
        classCallCheck(this, List);
        return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    List.prototype.render = function render() {
        var _a = this.props,
            prefixCls = _a.prefixCls,
            children = _a.children,
            className = _a.className,
            style = _a.style,
            renderHeader = _a.renderHeader,
            renderFooter = _a.renderFooter,
            restProps = __rest(_a, ["prefixCls", "children", "className", "style", "renderHeader", "renderFooter"]);
        var wrapCls = classnames(prefixCls, className);
        return React.createElement(
            'div',
            _extends({ className: wrapCls, style: style }, restProps),
            renderHeader ? React.createElement(
                'div',
                { className: prefixCls + '-header' },
                typeof renderHeader === 'function' ? renderHeader() : renderHeader
            ) : null,
            children ? React.createElement(
                'div',
                { className: prefixCls + '-body' },
                children
            ) : null,
            renderFooter ? React.createElement(
                'div',
                { className: prefixCls + '-footer' },
                typeof renderFooter === 'function' ? renderFooter() : renderFooter
            ) : null
        );
    };

    return List;
}(React.Component);

List.Item = ListItem;
List.defaultProps = {
    prefixCls: 'am-list'
};

export default List;
