'use strict';

var require$$0 = require('react');

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      react_stack_bottom_frame: function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

/**
 * Layout alignment and sizing enums following Flutter's layout system
 */
/**
 * Main axis alignment controls how children are positioned along the main axis
 */
exports.MainAxisAlignment = void 0;
(function (MainAxisAlignment) {
    MainAxisAlignment["START"] = "flex-start";
    MainAxisAlignment["CENTER"] = "center";
    MainAxisAlignment["END"] = "flex-end";
    MainAxisAlignment["SPACE_BETWEEN"] = "space-between";
    MainAxisAlignment["SPACE_AROUND"] = "space-around";
    MainAxisAlignment["SPACE_EVENLY"] = "space-evenly";
})(exports.MainAxisAlignment || (exports.MainAxisAlignment = {}));
/**
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
exports.CrossAxisAlignment = void 0;
(function (CrossAxisAlignment) {
    CrossAxisAlignment["START"] = "flex-start";
    CrossAxisAlignment["CENTER"] = "center";
    CrossAxisAlignment["END"] = "flex-end";
    CrossAxisAlignment["STRETCH"] = "stretch";
    CrossAxisAlignment["BASELINE"] = "baseline";
})(exports.CrossAxisAlignment || (exports.CrossAxisAlignment = {}));
/**
 * Main axis size controls how much space the flex container should occupy
 */
exports.MainAxisSize = void 0;
(function (MainAxisSize) {
    MainAxisSize["MIN"] = "min";
    MainAxisSize["MAX"] = "max";
})(exports.MainAxisSize || (exports.MainAxisSize = {}));
/**
 * Vertical direction for column layout
 */
exports.VerticalDirection = void 0;
(function (VerticalDirection) {
    VerticalDirection["UP"] = "column-reverse";
    VerticalDirection["DOWN"] = "column";
})(exports.VerticalDirection || (exports.VerticalDirection = {}));
/**
 * Clip behavior for overflow handling
 */
var Clip;
(function (Clip) {
    Clip["NONE"] = "visible";
    Clip["HARD_EDGE"] = "hidden";
    Clip["ANTI_ALIAS"] = "hidden";
    Clip["ANTI_ALIAS_WITH_SAVE_LAYER"] = "hidden";
})(Clip || (Clip = {}));

var Flex$1;
(function (Flex) {
    /**
     * Builds flex container CSS styles based on Flutter flex properties
     * @param options - Flutter flex configuration
     * @returns CSS style object
     */
    function buildFlexStyles(options) {
        const { spacing, clipBehavior } = options;
        const styles = {};
        if (spacing !== undefined && spacing > 0) {
            styles.gap = `${spacing}px`;
        }
        if (clipBehavior !== undefined) {
            styles.overflow = clipBehavior;
        }
        return styles;
    }
    Flex.buildFlexStyles = buildFlexStyles;
    /**
     * Builds flex child CSS styles for Container (includes flex/expanded/flexible)
     * @param options - Container flex configuration
     * @returns CSS style object
     */
    function buildContainerFlexStyles(options) {
        const { flex, expanded, flexible, width, height } = options;
        const styles = {};
        if (width !== undefined) {
            styles.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (height !== undefined) {
            styles.height = typeof height === 'number' ? `${height}px` : height;
        }
        if (expanded) {
            styles.flexGrow = 1;
            styles.flexShrink = 1;
        }
        else if (flexible) {
            styles.flexGrow = 1;
            styles.flexShrink = 0;
        }
        else if (flex !== undefined) {
            styles.flex = flex;
        }
        else {
            // Default: don't grow or shrink
            styles.flexGrow = 0;
            styles.flexShrink = 0;
        }
        return styles;
    }
    Flex.buildContainerFlexStyles = buildContainerFlexStyles;
    /**
     * Gets CSS classes for main axis alignment
     * @param alignment - Main axis alignment value
     * @returns CSS class string
     */
    function getMainAxisAlignmentClass(alignment) {
        switch (alignment) {
            case exports.MainAxisAlignment.START:
                return 'justify-start';
            case exports.MainAxisAlignment.CENTER:
                return 'justify-center';
            case exports.MainAxisAlignment.END:
                return 'justify-end';
            case exports.MainAxisAlignment.SPACE_BETWEEN:
                return 'justify-between';
            case exports.MainAxisAlignment.SPACE_AROUND:
                return 'justify-around';
            case exports.MainAxisAlignment.SPACE_EVENLY:
                return 'justify-evenly';
            default:
                return 'justify-start';
        }
    }
    Flex.getMainAxisAlignmentClass = getMainAxisAlignmentClass;
    /**
     * Gets CSS classes for cross axis alignment
     * @param alignment - Cross axis alignment value
     * @returns CSS class string
     */
    function getCrossAxisAlignmentClass(alignment) {
        switch (alignment) {
            case exports.CrossAxisAlignment.START:
                return 'items-start';
            case exports.CrossAxisAlignment.CENTER:
                return 'items-center';
            case exports.CrossAxisAlignment.END:
                return 'items-end';
            case exports.CrossAxisAlignment.STRETCH:
                return 'items-stretch';
            case exports.CrossAxisAlignment.BASELINE:
                return 'items-baseline';
            default:
                return 'items-start';
        }
    }
    Flex.getCrossAxisAlignmentClass = getCrossAxisAlignmentClass;
    /**
     * Gets CSS styles for main axis size behavior
     * @param size - Main axis size value
     * @param direction - Flex direction ('row' or 'column')
     * @returns CSS style object
     */
    function getMainAxisSizeStyles(size, direction) {
        const styles = {};
        switch (size) {
            case exports.MainAxisSize.MIN:
                if (direction === 'row') {
                    styles.width = 'fit-content';
                }
                else {
                    styles.height = 'fit-content';
                }
                break;
            case exports.MainAxisSize.MAX:
                if (direction === 'row') {
                    styles.width = '100%';
                }
                else {
                    styles.height = '100%';
                }
                break;
        }
        return styles;
    }
    Flex.getMainAxisSizeStyles = getMainAxisSizeStyles;
})(Flex$1 || (Flex$1 = {}));

exports.TextDirection = void 0;
(function (TextDirection) {
    TextDirection["ltr"] = "ltr";
    TextDirection["rtl"] = "rtl";
})(exports.TextDirection || (exports.TextDirection = {}));
class AlignmentGeometry {
    multiply(factor) {
        if (this instanceof Alignment$1) {
            return new Alignment$1(this.x * factor, this.y * factor);
        }
        if (this instanceof AlignmentDirectional) {
            return new AlignmentDirectional(this.x * factor, this.y * factor);
        }
        throw new Error('Unknown AlignmentGeometry type');
    }
    divide(factor) {
        return this.multiply(1 / factor);
    }
    remainder(factor) {
        if (this instanceof Alignment$1) {
            return new Alignment$1(this.x % factor, this.y % factor);
        }
        if (this instanceof AlignmentDirectional) {
            return new AlignmentDirectional(this.x % factor, this.y % factor);
        }
        throw new Error('Unknown AlignmentGeometry type');
    }
    integerDivide(factor) {
        if (this instanceof Alignment$1) {
            return new Alignment$1(Math.floor(this.x / factor), Math.floor(this.y / factor));
        }
        if (this instanceof AlignmentDirectional) {
            return new AlignmentDirectional(Math.floor(this.x / factor), Math.floor(this.y / factor));
        }
        throw new Error('Unknown AlignmentGeometry type');
    }
    negate() {
        if (this instanceof Alignment$1) {
            return new Alignment$1(-this.x, -this.y);
        }
        if (this instanceof AlignmentDirectional) {
            return new AlignmentDirectional(-this.x, -this.y);
        }
        throw new Error('Unknown AlignmentGeometry type');
    }
    equals(other) {
        return (other instanceof AlignmentGeometry &&
            this.x === other.x &&
            this.y === other.y &&
            this.constructor === other.constructor);
    }
    get hashCode() {
        return this.x * 37 + this.y * 41;
    }
    toString() {
        return `${this.constructor.name}(${this.x}, ${this.y})`;
    }
    static directional(start, y) {
        return new AlignmentDirectional(start, y);
    }
    static xy(x, y) {
        return new Alignment$1(x, y);
    }
    static lerp(a, b, t) {
        if (a === null && b === null)
            return null;
        if (a === null)
            return b?.multiply(t) ?? null;
        if (b === null)
            return a.multiply(1 - t);
        if (a.constructor === b.constructor) {
            if (a instanceof Alignment$1 && b instanceof Alignment$1) {
                return new Alignment$1(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
            }
            if (a instanceof AlignmentDirectional && b instanceof AlignmentDirectional) {
                return new AlignmentDirectional(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
            }
        }
        const resolvedA = a.resolve(exports.TextDirection.ltr);
        const resolvedB = b.resolve(exports.TextDirection.ltr);
        return new Alignment$1(resolvedA.x + (resolvedB.x - resolvedA.x) * t, resolvedA.y + (resolvedB.y - resolvedA.y) * t);
    }
}
let Alignment$1 = class Alignment extends AlignmentGeometry {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    add(other) {
        const resolved = other.resolve(null);
        return new Alignment(this.x + resolved.x, this.y + resolved.y);
    }
    subtract(other) {
        return new Alignment(this.x - other.x, this.y - other.y);
    }
    multiply(factor) {
        return new Alignment(this.x * factor, this.y * factor);
    }
    divide(factor) {
        return new Alignment(this.x / factor, this.y / factor);
    }
    remainder(factor) {
        return new Alignment(this.x % factor, this.y % factor);
    }
    integerDivide(factor) {
        return new Alignment(Math.floor(this.x / factor), Math.floor(this.y / factor));
    }
    negate() {
        return new Alignment(-this.x, -this.y);
    }
    resolve(_direction) {
        return this;
    }
    alongOffset(other) {
        return {
            dx: other.dx * this.x,
            dy: other.dy * this.y,
        };
    }
    alongSize(other) {
        return {
            dx: (other.width / 2) * (1 + this.x),
            dy: (other.height / 2) * (1 + this.y),
        };
    }
    inscribe(size, rect) {
        const x = rect.left + ((rect.width - size.width) / 2) * (1 + this.x);
        const y = rect.top + ((rect.height - size.height) / 2) * (1 + this.y);
        return {
            left: x,
            top: y,
            width: size.width,
            height: size.height,
        };
    }
    withinRect(rect) {
        return {
            dx: rect.left + (rect.width / 2) * (1 + this.x),
            dy: rect.top + (rect.height / 2) * (1 + this.y),
        };
    }
    static lerp(a, b, t) {
        if (a === null && b === null)
            return null;
        if (a === null)
            return b?.multiply(t) ?? null;
        if (b === null)
            return a.multiply(1 - t);
        return new Alignment(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }
};
// Static constants
Alignment$1.topLeft = new Alignment$1(-1, -1);
Alignment$1.topCenter = new Alignment$1(0, -1);
Alignment$1.topRight = new Alignment$1(1, -1);
Alignment$1.centerLeft = new Alignment$1(-1, 0);
Alignment$1.center = new Alignment$1(0, 0);
Alignment$1.centerRight = new Alignment$1(1, 0);
Alignment$1.bottomLeft = new Alignment$1(-1, 1);
Alignment$1.bottomCenter = new Alignment$1(0, 1);
Alignment$1.bottomRight = new Alignment$1(1, 1);
class AlignmentDirectional extends AlignmentGeometry {
    get x() {
        return this.start;
    }
    constructor(start, y) {
        super();
        this.start = start;
        this.y = y;
    }
    add(other) {
        if (other instanceof AlignmentDirectional) {
            return new AlignmentDirectional(this.start + other.start, this.y + other.y);
        }
        return new AlignmentDirectional(this.start + other.x, this.y + other.y);
    }
    resolve(direction) {
        if (direction === exports.TextDirection.rtl) {
            return new Alignment$1(-this.start, this.y);
        }
        return new Alignment$1(this.start, this.y);
    }
}
// Static constants
AlignmentDirectional.topStart = new AlignmentDirectional(-1, -1);
AlignmentDirectional.topCenter = new AlignmentDirectional(0, -1);
AlignmentDirectional.topEnd = new AlignmentDirectional(1, -1);
AlignmentDirectional.centerStart = new AlignmentDirectional(-1, 0);
AlignmentDirectional.center = new AlignmentDirectional(0, 0);
AlignmentDirectional.centerEnd = new AlignmentDirectional(1, 0);
AlignmentDirectional.bottomStart = new AlignmentDirectional(-1, 1);
AlignmentDirectional.bottomCenter = new AlignmentDirectional(0, 1);
AlignmentDirectional.bottomEnd = new AlignmentDirectional(1, 1);
/**
 * Converts Flutter-style alignment (-1 to 1) to CSS percentage values
 */
function alignmentToCSS(alignment) {
    const resolved = alignment.resolve(null);
    const x = (((resolved.x + 1) / 2) * 100).toFixed(1);
    const y = (((resolved.y + 1) / 2) * 100).toFixed(1);
    return { x: `${x}%`, y: `${y}%` };
}
/**
 * Converts alignment to CSS justify-content and align-items classes for flexbox
 */
function alignmentToFlexClasses(alignment) {
    const resolved = alignment.resolve(null);
    const classes = ['flex'];
    // Justify content (x-axis)
    if (resolved.x === -1)
        classes.push('justify-start');
    else if (resolved.x === 0)
        classes.push('justify-center');
    else if (resolved.x === 1)
        classes.push('justify-end');
    // Align items (y-axis)
    if (resolved.y === -1)
        classes.push('items-start');
    else if (resolved.y === 0)
        classes.push('items-center');
    else if (resolved.y === 1)
        classes.push('items-end');
    return classes;
}
/**
 * Converts alignment to CSS transform-origin property
 */
function alignmentToTransformOrigin(alignment) {
    const resolved = alignment.resolve(null);
    const originX = resolved.x === -1 ? 'left' : resolved.x === 0 ? 'center' : 'right';
    const originY = resolved.y === -1 ? 'top' : resolved.y === 0 ? 'center' : 'bottom';
    return `${originX} ${originY}`;
}
// Legacy constant exports for backward compatibility
({
    topLeft: Alignment$1.topLeft,
    topCenter: Alignment$1.topCenter,
    topRight: Alignment$1.topRight,
    centerLeft: Alignment$1.centerLeft,
    center: Alignment$1.center,
    centerRight: Alignment$1.centerRight,
    bottomLeft: Alignment$1.bottomLeft,
    bottomCenter: Alignment$1.bottomCenter,
    bottomRight: Alignment$1.bottomRight,
});

exports.BoxConstraints = void 0;
(function (BoxConstraints) {
    /**
     * Converts BoxConstraints to CSS properties
     */
    function toCSS(constraints) {
        if (!constraints)
            return {};
        const styles = {};
        if (constraints.minWidth !== undefined)
            styles.minWidth = constraints.minWidth;
        if (constraints.maxWidth !== undefined)
            styles.maxWidth = constraints.maxWidth;
        if (constraints.minHeight !== undefined)
            styles.minHeight = constraints.minHeight;
        if (constraints.maxHeight !== undefined)
            styles.maxHeight = constraints.maxHeight;
        return styles;
    }
    BoxConstraints.toCSS = toCSS;
    /**
     * Creates BoxConstraints that expand to fill available space
     */
    function expand(width, height) {
        return {
            minWidth: width,
            maxWidth: width,
            minHeight: height,
            maxHeight: height,
        };
    }
    BoxConstraints.expand = expand;
    /**
     * Creates BoxConstraints with tight dimensions
     */
    function tight(width, height) {
        return {
            minWidth: width,
            maxWidth: width,
            minHeight: height,
            maxHeight: height,
        };
    }
    BoxConstraints.tight = tight;
    /**
     * Creates BoxConstraints with tight width
     */
    function tightFor(options) {
        return {
            minWidth: options.width,
            maxWidth: options.width,
            minHeight: options.height,
            maxHeight: options.height,
        };
    }
    BoxConstraints.tightFor = tightFor;
    /**
     * Creates BoxConstraints with loose constraints
     */
    function loose(maxWidth, maxHeight) {
        return {
            minWidth: 0,
            maxWidth: maxWidth,
            minHeight: 0,
            maxHeight: maxHeight,
        };
    }
    BoxConstraints.loose = loose;
})(exports.BoxConstraints || (exports.BoxConstraints = {}));

exports.Decoration = void 0;
(function (Decoration) {
    /**
     * Converts BoxFit to CSS object-fit
     */
    function boxFitToCSS(fit) {
        switch (fit) {
            case 'fill':
                return 'fill';
            case 'contain':
                return 'contain';
            case 'cover':
                return 'cover';
            case 'fitWidth':
                return 'scale-down';
            case 'fitHeight':
                return 'scale-down';
            case 'none':
                return 'none';
            case 'scaleDown':
                return 'scale-down';
            default:
                return 'cover';
        }
    }
    /**
     * Converts ImageRepeat to CSS background-repeat
     */
    function imageRepeatToCSS(repeat) {
        switch (repeat) {
            case 'repeat':
                return 'repeat';
            case 'repeatX':
                return 'repeat-x';
            case 'repeatY':
                return 'repeat-y';
            case 'noRepeat':
                return 'no-repeat';
            default:
                return 'no-repeat';
        }
    }
    /**
     * Converts DecorationImage to CSS properties
     */
    function decorationImageToCSS(image) {
        const styles = {};
        // Set background image
        styles.backgroundImage = `url(${image.image})`;
        // Set background size based on fit
        if (image.fit) {
            if (image.fit === 'fitWidth') {
                styles.backgroundSize = '100% auto';
            }
            else if (image.fit === 'fitHeight') {
                styles.backgroundSize = 'auto 100%';
            }
            else {
                // For other fit values that correspond directly to CSS
                const cssObjectFit = boxFitToCSS(image.fit);
                if (cssObjectFit === 'fill') {
                    styles.backgroundSize = '100% 100%';
                }
                else if (cssObjectFit === 'contain') {
                    styles.backgroundSize = 'contain';
                }
                else if (cssObjectFit === 'cover') {
                    styles.backgroundSize = 'cover';
                }
                else if (cssObjectFit === 'none') {
                    styles.backgroundSize = 'auto';
                }
                else {
                    styles.backgroundSize = 'contain';
                }
            }
        }
        else {
            styles.backgroundSize = 'cover';
        }
        // Set background position based on alignment
        if (image.alignment) {
            const alignment = alignmentToCSS(image.alignment);
            styles.backgroundPosition = `${alignment.x} ${alignment.y}`;
        }
        else {
            styles.backgroundPosition = 'center center';
        }
        // Set background repeat
        styles.backgroundRepeat = imageRepeatToCSS(image.repeat);
        // Set opacity if specified
        if (image.opacity !== undefined && image.opacity < 1) {
            styles.opacity = image.opacity;
        }
        return styles;
    }
    /**
     * Converts BoxDecoration to CSS properties
     */
    function toCSS(decoration) {
        if (!decoration)
            return {};
        const styles = {};
        if (decoration.color)
            styles.backgroundColor = decoration.color;
        if (decoration.borderRadius) {
            if (typeof decoration.borderRadius === 'object' && 'toCSS' in decoration.borderRadius) {
                styles.borderRadius = decoration.borderRadius.toCSS();
            }
            else if (typeof decoration.borderRadius === 'number') {
                styles.borderRadius = `${decoration.borderRadius}px`;
            }
            else {
                styles.borderRadius = decoration.borderRadius;
            }
        }
        if (decoration.borderWidth && decoration.borderWidth > 0) {
            styles.borderWidth = `${decoration.borderWidth}px`;
            styles.borderColor = decoration.borderColor;
            styles.borderStyle = decoration.borderStyle || 'solid';
        }
        if (decoration.boxShadow)
            styles.boxShadow = decoration.boxShadow;
        // Handle background layers: color -> gradient -> image (in CSS stacking order)
        // Image goes on top (first in CSS background shorthand)
        if (decoration.image) {
            const imageStyles = decorationImageToCSS(decoration.image);
            Object.assign(styles, imageStyles);
        }
        // Gradient goes in the middle
        if (decoration.gradient) {
            if (decoration.image) {
                // If both image and gradient, use multiple backgrounds
                const currentBg = styles.backgroundImage;
                styles.backgroundImage = `${currentBg}, ${decoration.gradient.toCSS()}`;
            }
            else {
                styles.background = decoration.gradient.toCSS();
                if (decoration.color) {
                    styles.backgroundColor = 'transparent';
                }
            }
        }
        return styles;
    }
    Decoration.toCSS = toCSS;
    /**
     * Converts Clip behavior to CSS classes
     */
    function clipToClasses(clipBehavior) {
        if (!clipBehavior || clipBehavior === 'none')
            return [];
        switch (clipBehavior) {
            case 'hardEdge':
                return ['overflow-hidden'];
            case 'antiAlias':
                return ['overflow-hidden', 'rounded-inherit'];
            case 'antiAliasWithSaveLayer':
                return ['overflow-hidden', 'rounded-inherit', 'isolate'];
            default:
                return [];
        }
    }
    Decoration.clipToClasses = clipToClasses;
})(exports.Decoration || (exports.Decoration = {}));

exports.Matrix4 = void 0;
(function (Matrix4) {
    /**
     * Creates an identity matrix (no transformation)
     */
    function identity() {
        return {};
    }
    Matrix4.identity = identity;
    /**
     * Creates a translation matrix
     */
    function translationValues(x, y, _z) {
        return {
            translateX: x,
            translateY: y,
        };
    }
    Matrix4.translationValues = translationValues;
    /**
     * Creates a rotation matrix around Z axis
     */
    function rotationZ(radians) {
        return {
            rotateZ: radians,
        };
    }
    Matrix4.rotationZ = rotationZ;
    /**
     * Creates a scale matrix
     */
    function diagonal3Values(x, y, _z) {
        return {
            scaleX: x,
            scaleY: y,
        };
    }
    Matrix4.diagonal3Values = diagonal3Values;
    /**
     * Creates a skew matrix (approximated using scale and rotation)
     */
    function skew(alpha, _beta) {
        // Note: This is a simplified implementation
        // Full skew transformation would require more complex CSS
        return {
            rotateZ: alpha * 0.1, // Approximate skew with rotation
        };
    }
    Matrix4.skew = skew;
    /**
     * Converts Matrix4 to CSS transform and transform-origin properties
     */
    function toCSS(transform, transformAlignment) {
        if (!transform)
            return {};
        const transforms = [];
        if (transform.translateX !== undefined)
            transforms.push(`translateX(${transform.translateX}px)`);
        if (transform.translateY !== undefined)
            transforms.push(`translateY(${transform.translateY}px)`);
        if (transform.scaleX !== undefined)
            transforms.push(`scaleX(${transform.scaleX})`);
        if (transform.scaleY !== undefined)
            transforms.push(`scaleY(${transform.scaleY})`);
        if (transform.rotateX !== undefined)
            transforms.push(`rotateX(${transform.rotateX}rad)`);
        if (transform.rotateY !== undefined)
            transforms.push(`rotateY(${transform.rotateY}rad)`);
        if (transform.rotateZ !== undefined)
            transforms.push(`rotateZ(${transform.rotateZ}rad)`);
        const styles = {};
        if (transforms.length > 0) {
            styles.transform = transforms.join(' ');
        }
        if (transformAlignment) {
            styles.transformOrigin = alignmentToTransformOrigin(transformAlignment);
        }
        return styles;
    }
    Matrix4.toCSS = toCSS;
})(exports.Matrix4 || (exports.Matrix4 = {}));

function resolvePaddingMargin(value) {
    if (!value)
        return undefined;
    if (typeof value === 'string')
        return value;
    return value.toPadding();
}
/**
 * Container component equivalent to Flutter's Container widget.
 * Provides a convenient way to create a widget with common painting, positioning, and sizing properties.
 *
 * @example
 * ```tsx
 * // Basic usage with decoration
 * <Container
 *   padding={EdgeInsets.all(16)}
 *   margin={EdgeInsets.symmetric({ horizontal: 8 })}
 *   width="100%"
 *   decoration={{
 *     color: "#f5f5f5",
 *     borderRadius: 8,
 *     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
 *   }}
 *   alignment={Alignment.center}
 * >
 *   <div>Content goes here</div>
 * </Container>
 *
 * // With gradient and transform
 * <Container
 *   constraints={{ minHeight: 200, maxWidth: 400 }}
 *   decoration={{
 *     gradient: new LinearGradient({
 *       begin: Alignment.topCenter,
 *       end: Alignment.bottomCenter,
 *       colors: ['rgba(0,0,0,0.2)', 'transparent'],
 *       stops: [0.0, 0.1],
 *     })
 *   }}
 *   transform={{ rotateZ: 0.1, scaleX: 1.1 }}
 *   transformAlignment={Alignment.center}
 *   clipBehavior="antiAlias"
 * >
 *   <div>Transformed content</div>
 * </Container>
 * ```
 *
 * Utility class methods:
 * - EdgeInsets.all(16) - uniform spacing on all sides
 * - EdgeInsets.symmetric({ horizontal: 8, vertical: 16 }) - symmetric spacing
 * - EdgeInsets.only({ left: 8, top: 16 }) - individual side control
 * - EdgeInsets.zero() - no spacing
 * - Alignment.center, Alignment.topLeft, etc. - predefined alignments
 * - LinearGradient, RadialGradient, SweepGradient - gradient classes
 */
function Container(props) {
    const { children, alignment, padding, color, decoration, foregroundDecoration, width, height, constraints, margin, transform, transformAlignment, clipBehavior, 
    // Legacy properties (with fallback support)
    backgroundColor, borderRadius, borderWidth = 0, borderColor, borderStyle = 'solid', 
    // Flex properties
    flex, expanded, flexible, flexShrink, alignSelf, className = '', style = {}, } = props;
    // Build flex styles for Container (includes flex child properties)
    const flexStyles = Flex$1.buildContainerFlexStyles({
        flex,
        expanded,
        flexible,
        width,
        height,
    });
    // Handle flex shrink
    if (flexShrink === false) {
        flexStyles.flexShrink = 0;
    }
    // Create effective decoration (merge decoration with legacy props)
    const effectiveDecoration = {
        ...decoration,
        // Legacy fallbacks
        color: decoration?.color || color || backgroundColor,
        borderRadius: decoration?.borderRadius || borderRadius,
        borderWidth: decoration?.borderWidth || (borderWidth > 0 ? borderWidth : undefined),
        borderColor: decoration?.borderColor || borderColor,
        borderStyle: decoration?.borderStyle || borderStyle,
    };
    // Build Tailwind classes
    const alignmentClasses = alignment ? alignmentToFlexClasses(alignment) : [];
    const clipClasses = exports.Decoration.clipToClasses(clipBehavior);
    // Build CSS styles for properties that don't have good Tailwind equivalents
    const constraintStyles = exports.BoxConstraints.toCSS(constraints);
    const transformStyles = exports.Matrix4.toCSS(transform, transformAlignment);
    const decorationStyles = exports.Decoration.toCSS(effectiveDecoration);
    // Resolve padding and margin
    const resolvedPadding = resolvePaddingMargin(padding);
    const resolvedMargin = resolvePaddingMargin(margin);
    // Combine all CSS classes
    const allClasses = [
        ...alignmentClasses,
        ...clipClasses,
        foregroundDecoration ? 'relative' : '', // Required for foregroundDecoration positioning
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Container styles combining all properties
    const containerStyle = {
        ...flexStyles,
        ...constraintStyles,
        ...decorationStyles,
        ...transformStyles,
        padding: resolvedPadding,
        margin: resolvedMargin,
        alignSelf,
        ...style,
    };
    // Create foreground decoration element if specified
    const foregroundElement = foregroundDecoration ? (jsxRuntimeExports.jsx("div", { style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            ...exports.Decoration.toCSS(foregroundDecoration),
            backgroundColor: 'transparent', // Don't paint background for foreground
        } })) : null;
    return (jsxRuntimeExports.jsxs("div", { className: allClasses, style: containerStyle, children: [children, foregroundElement] }));
}

/**
 * A Flutter Divider widget-inspired React component for creating horizontal dividers.
 *
 * A thin horizontal line, with padding on either side.
 * In the Material Design language, this represents a divider.
 * Dividers can be used in lists, Drawers, and elsewhere to separate content.
 *
 * The box's total height is controlled by height. The appropriate padding is automatically computed from the height.
 *
 * @example
 * ```tsx
 * // Basic divider
 * <Divider />
 *
 * // Custom styled divider
 * <Divider
 *   height={20}
 *   thickness={5}
 *   indent={20}
 *   color="#000000"
 * />
 *
 * // Divider with rounded corners
 * <Divider
 *   thickness={2}
 *   color="#e5e7eb"
 *   radius={1}
 * />
 * ```
 */
const Divider = ({ height = 16, thickness = 1, indent = 0, endIndent = 0, color = '#e5e7eb', radius = 0, className, }) => {
    const { containerStyle, lineStyle } = require$$0.useMemo(() => {
        // Calculate padding for the container to achieve the desired height
        const lineHeight = thickness;
        const totalPadding = Math.max(0, height - lineHeight);
        const verticalPadding = totalPadding / 2;
        const containerCSS = {
            height: `${height}px`,
            paddingTop: `${verticalPadding}px`,
            paddingBottom: `${verticalPadding}px`,
            paddingLeft: `${indent}px`,
            paddingRight: `${endIndent}px`,
        };
        const lineCSS = {
            height: `${thickness}px`,
            backgroundColor: color,
            borderRadius: radius > 0 ? `${radius}px` : undefined,
        };
        return {
            containerStyle: containerCSS,
            lineStyle: lineCSS,
        };
    }, [height, thickness, indent, endIndent, color, radius]);
    return (jsxRuntimeExports.jsx("div", { className: `w-full ${className || ''}`.trim(), style: containerStyle, children: jsxRuntimeExports.jsx("div", { className: "w-full", style: lineStyle }) }));
};

/**
 * Text-related enums following Flutter's text system
 */
/**
 * Text direction for layout purposes
 */
var TextDirection;
(function (TextDirection) {
    TextDirection["LTR"] = "ltr";
    TextDirection["RTL"] = "rtl";
    TextDirection["AUTO"] = "auto";
})(TextDirection || (TextDirection = {}));
/**
 * Text baseline for alignment
 */
exports.TextBaseline = void 0;
(function (TextBaseline) {
    TextBaseline["ALPHABETIC"] = "alphabetic";
    TextBaseline["IDEOGRAPHIC"] = "ideographic";
})(exports.TextBaseline || (exports.TextBaseline = {}));

/**
 * Row component that arranges children horizontally, equivalent to Flutter's Row widget.
 *
 * @example
 * ```tsx
 * <Row
 *   mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}
 *   crossAxisAlignment={CrossAxisAlignment.CENTER}
 *   padding={EdgeInsets.symmetric({ horizontal: 16 })}
 * >
 *   <div>Left Item</div>
 *   <div>Center Item</div>
 *   <div>Right Item</div>
 * </Row>
 * ```
 */
function Row(props) {
    const { children, mainAxisAlignment = exports.MainAxisAlignment.START, crossAxisAlignment = exports.CrossAxisAlignment.CENTER, mainAxisSize = exports.MainAxisSize.MAX, textDirection = TextDirection.LTR, textBaseline, spacing = 0, clipBehavior = Clip.NONE, } = props;
    const flexStyles = Flex$1.buildFlexStyles({
        spacing,
        clipBehavior,
    });
    const mainAxisSizeStyles = Flex$1.getMainAxisSizeStyles(mainAxisSize, 'row');
    const mainAxisClass = Flex$1.getMainAxisAlignmentClass(mainAxisAlignment);
    const crossAxisClass = Flex$1.getCrossAxisAlignmentClass(crossAxisAlignment);
    const containerClasses = ['flex', 'flex-row', mainAxisClass, crossAxisClass]
        .filter(Boolean)
        .join(' ');
    // Convert TextDirection enum to CSS direction value
    const cssDirection = textDirection === TextDirection.AUTO
        ? undefined
        : textDirection?.toLowerCase();
    const containerStyle = {
        ...flexStyles,
        ...mainAxisSizeStyles,
        direction: cssDirection,
        flexDirection: textDirection === TextDirection.RTL ? 'row-reverse' : 'row',
        alignItems: textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
    };
    return (jsxRuntimeExports.jsx("div", { className: containerClasses, style: containerStyle, children: children }));
}

/**
 * Column component that arranges children vertically, equivalent to Flutter's Column widget.
 *
 * @example
 * ```tsx
 * <Column
 *   mainAxisAlignment={MainAxisAlignment.CENTER}
 *   crossAxisAlignment={CrossAxisAlignment.START}
 *   padding={EdgeInsets.all(16)}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Column>
 * ```
 */
function Column(props) {
    const { children, mainAxisAlignment = exports.MainAxisAlignment.START, crossAxisAlignment = exports.CrossAxisAlignment.CENTER, mainAxisSize = exports.MainAxisSize.MAX, textBaseline, verticalDirection = exports.VerticalDirection.DOWN, spacing = 0, clipBehavior = Clip.NONE, } = props;
    const flexStyles = Flex$1.buildFlexStyles({
        spacing,
        clipBehavior,
    });
    const mainAxisSizeStyles = Flex$1.getMainAxisSizeStyles(mainAxisSize, 'column');
    const mainAxisClass = Flex$1.getMainAxisAlignmentClass(mainAxisAlignment);
    const crossAxisClass = Flex$1.getCrossAxisAlignmentClass(crossAxisAlignment);
    const containerClasses = ['flex', 'flex-col', mainAxisClass, crossAxisClass]
        .filter(Boolean)
        .join(' ');
    const containerStyle = {
        ...flexStyles,
        ...mainAxisSizeStyles,
        flexDirection: verticalDirection,
        alignItems: textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
    };
    return (jsxRuntimeExports.jsx("div", { className: containerClasses, style: containerStyle, children: children }));
}

/**
 * Flex component that provides flexible layout container, equivalent to Flutter's Flex widget.
 * This is the base component that both Column and Row extend from.
 *
 * @example
 * ```tsx
 * <Flex
 *   direction="row"
 *   mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}
 *   crossAxisAlignment={CrossAxisAlignment.CENTER}
 *   padding={EdgeInsets.all(16)}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
function Flex(props) {
    const { children, direction, mainAxisAlignment = exports.MainAxisAlignment.START, crossAxisAlignment = exports.CrossAxisAlignment.CENTER, mainAxisSize = exports.MainAxisSize.MAX, textDirection, textBaseline, spacing = 0, clipBehavior = Clip.NONE, } = props;
    const flexStyles = Flex$1.buildFlexStyles({
        spacing,
        clipBehavior,
    });
    const mainAxisSizeStyles = Flex$1.getMainAxisSizeStyles(mainAxisSize, direction);
    const mainAxisClass = Flex$1.getMainAxisAlignmentClass(mainAxisAlignment);
    const crossAxisClass = Flex$1.getCrossAxisAlignmentClass(crossAxisAlignment);
    const directionClass = direction === 'column' ? 'flex-col' : 'flex-row';
    const containerClasses = ['flex', directionClass, mainAxisClass, crossAxisClass]
        .filter(Boolean)
        .join(' ');
    // Convert TextDirection enum to CSS direction value
    const cssDirection = textDirection === TextDirection.AUTO
        ? undefined
        : textDirection?.toLowerCase();
    const containerStyle = {
        ...flexStyles,
        ...mainAxisSizeStyles,
        direction: cssDirection,
        alignItems: textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
    };
    return (jsxRuntimeExports.jsx("div", { className: containerClasses, style: containerStyle, children: children }));
}

/**
 * A widget that aligns its child within itself and optionally sizes itself based on the child's size.
 *
 * This is equivalent to Flutter's Align widget, providing precise control over child positioning
 * within a container using the Flutter alignment coordinate system.
 *
 * @example
 * ```tsx
 * // React-style children prop
 * <Align alignment={Alignment.topRight}>
 *   <div>Top Right Content</div>
 * </Align>
 *
 * // Flutter-style child prop
 * <Align
 *   alignment={Alignment.center}
 *   child={<div>Centered content</div>}
 * />
 *
 * // Custom alignment with size factors
 * <Align
 *   alignment={new Alignment(0.2, 0.6)}
 *   widthFactor={2.0}
 *   heightFactor={1.5}
 * >
 *   <div>Custom positioned content</div>
 * </Align>
 * ```
 */
function Align({ alignment = Alignment$1.center, widthFactor, heightFactor, child, children, className, style, }) {
    // Support both child (Flutter-style) and children (React-style)
    const content = child ?? children;
    const containerStyles = require$$0.useMemo(() => {
        const alignmentCSS = alignmentToCSS(alignment);
        // Base container styles
        const baseStyles = {
            display: 'flex',
            position: 'relative',
            // Convert Flutter alignment coordinates to CSS positioning
            alignItems: alignmentCSS.y === '50%' ? 'center' : alignmentCSS.y === '0%' ? 'flex-start' : 'flex-end',
            justifyContent: alignmentCSS.x === '50%' ? 'center' : alignmentCSS.x === '0%' ? 'flex-start' : 'flex-end',
        };
        // Default behavior: fit content, not fill space (like Flutter)
        baseStyles.width = 'auto';
        baseStyles.height = 'auto';
        baseStyles.flexShrink = 0; // Don't shrink in flex containers
        // Handle size factors - these override the defaults
        if (widthFactor != null) {
            baseStyles.width = 'fit-content';
            baseStyles.transform = `scaleX(${widthFactor})`;
            baseStyles.transformOrigin = 'left center';
        }
        if (heightFactor != null) {
            baseStyles.height = 'fit-content';
            const existingTransform = baseStyles.transform || '';
            baseStyles.transform = existingTransform
                ? `${existingTransform} scaleY(${heightFactor})`
                : `scaleY(${heightFactor})`;
            baseStyles.transformOrigin = widthFactor != null ? 'left top' : 'center top';
        }
        // If the alignment is not exactly center/start/end, use more precise positioning
        const needsPreciseAlignment = !['0%', '50%', '100%'].includes(alignmentCSS.x) ||
            !['0%', '50%', '100%'].includes(alignmentCSS.y);
        if (needsPreciseAlignment) {
            baseStyles.alignItems = 'flex-start';
            baseStyles.justifyContent = 'flex-start';
        }
        return baseStyles;
    }, [alignment, widthFactor, heightFactor]);
    const childWrapperStyles = require$$0.useMemo(() => {
        const alignmentCSS = alignmentToCSS(alignment);
        // Check if we need precise positioning
        const needsPreciseAlignment = !['0%', '50%', '100%'].includes(alignmentCSS.x) ||
            !['0%', '50%', '100%'].includes(alignmentCSS.y);
        if (!needsPreciseAlignment) {
            return undefined;
        }
        const childStyles = {};
        // Handle precise alignment
        if (needsPreciseAlignment) {
            childStyles.position = 'absolute';
            childStyles.left = alignmentCSS.x;
            childStyles.top = alignmentCSS.y;
            childStyles.transform = `translate(-${alignmentCSS.x}, -${alignmentCSS.y})`;
        }
        // Size factors are handled in containerStyles, not here
        return childStyles;
    }, [alignment]);
    const combinedStyle = require$$0.useMemo(() => ({
        ...containerStyles,
        ...style,
    }), [containerStyles, style]);
    return (jsxRuntimeExports.jsx("div", { className: className, style: combinedStyle, children: content != null &&
            (childWrapperStyles ? jsxRuntimeExports.jsx("div", { style: childWrapperStyles, children: content }) : content) }));
}

function SizedBox({ width, height }) {
    const style = {};
    if (width !== undefined) {
        style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
        style.height = typeof height === 'number' ? `${height}px` : height;
    }
    return jsxRuntimeExports.jsx("div", { style: style });
}

function Spacer({ flex = 1 }) {
    return jsxRuntimeExports.jsx("div", { style: { flex, flexShrink: 1 } });
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

/**
 * Defines the scroll direction for ListView components.
 * @enum {string}
 */
exports.Axis = void 0;
(function (Axis) {
    /** Vertical scrolling (default) */
    Axis["VERTICAL"] = "vertical";
    /** Horizontal scrolling */
    Axis["HORIZONTAL"] = "horizontal";
})(exports.Axis || (exports.Axis = {}));
/**
 * Defines the scroll physics behavior for ListView components.
 * @enum {string}
 */
exports.ScrollPhysics = void 0;
(function (ScrollPhysics) {
    /** Default scrolling behavior (allows scrolling) */
    ScrollPhysics["DEFAULT"] = "default";
    /** Disables user scrolling (equivalent to NeverScrollableScrollPhysics) */
    ScrollPhysics["NEVER"] = "never";
    /** iOS-style bouncing scrolling (Safari supports; other browsers ignore) */
    ScrollPhysics["BOUNCING"] = "bouncing";
    /** Android/desktop-style clamping scrolling (Web roughly equivalent to default) */
    ScrollPhysics["CLAMPING"] = "clamping";
})(exports.ScrollPhysics || (exports.ScrollPhysics = {}));
/**
 * Converts EdgeInsets to Tailwind padding classes.
 * @param p - EdgeInsets value (number or object with top/right/bottom/left)
 * @returns Tailwind padding classes or empty string if no padding specified
 */
function toPaddingClasses(p) {
    if (p == null)
        return '';
    if (typeof p === 'number')
        return `p-[${p}px]`;
    const classes = [];
    const { top, right, bottom, left } = p;
    if (top)
        classes.push(`pt-[${top}px]`);
    if (right)
        classes.push(`pr-[${right}px]`);
    if (bottom)
        classes.push(`pb-[${bottom}px]`);
    if (left)
        classes.push(`pl-[${left}px]`);
    return classes.join(' ');
}
/**
 * Generates container classes for ListView using Tailwind CSS.
 * This is where the core scrolling logic is implemented.
 * @param axis - Scroll direction (vertical or horizontal)
 * @param reverse - Whether to reverse item order
 * @param shrinkWrap - Whether to size to content instead of filling space
 * @param physics - Scroll physics behavior
 * @param clip - Clipping behavior for overflow
 * @param paddingClasses - Processed padding classes
 * @param className - User-provided CSS classes
 * @returns Complete Tailwind class string for the container
 */
function buildContainerClasses(axis, reverse, shrinkWrap, physics, _clip, paddingClasses, className) {
    const classes = [];
    // Base layout classes
    classes.push('flex', 'list-none', 'm-0');
    // Add padding if no user padding
    if (!paddingClasses) {
        classes.push('p-0');
    }
    const isVertical = axis === exports.Axis.VERTICAL;
    const enableScroll = physics !== exports.ScrollPhysics.NEVER && !shrinkWrap;
    // Direction classes
    if (reverse) {
        classes.push(isVertical ? 'flex-col-reverse' : 'flex-row-reverse');
    }
    else {
        classes.push(isVertical ? 'flex-col' : 'flex-row');
    }
    // Scroll and overflow classes
    if (enableScroll) {
        if (isVertical) {
            classes.push('overflow-y-auto', 'overflow-x-hidden');
        }
        else {
            classes.push('overflow-x-auto', 'overflow-y-hidden');
        }
    }
    else {
        classes.push('overflow-hidden');
    }
    // Size classes
    if (shrinkWrap) {
        classes.push('flex-none');
    }
    else {
        classes.push('flex-1');
    }
    // Physics classes (PageScrollPhysics)
    if (physics && typeof physics === 'object' && 'getClasses' in physics) {
        const direction = isVertical ? 'vertical' : 'horizontal';
        classes.push(...physics.getClasses(direction));
    }
    // Momentum scrolling for iOS (bouncing physics)
    if (physics === exports.ScrollPhysics.BOUNCING) {
        // Use smooth scrolling behavior
        classes.push('scroll-smooth');
    }
    return clsx(classes, paddingClasses, className);
}
/**
 * Wrapper component for ListView items.
 * Handles itemExtent (fixed item sizing) and provides semantic listitem role.
 * @param axis - Scroll direction to determine which dimension to fix
 * @param itemExtent - Fixed size for the item in the main axis
 * @param physics - Physics to apply item-specific classes
 * @param children - Child content to wrap
 */
const ItemWrap = ({ axis, itemExtent, physics, children }) => {
    const classes = [];
    // Fixed size classes
    if (itemExtent) {
        if (axis === exports.Axis.VERTICAL) {
            classes.push(`h-[${itemExtent}px]`);
        }
        else {
            classes.push(`w-[${itemExtent}px]`);
        }
    }
    // Physics item classes (for PageScrollPhysics snap alignment)
    if (physics && typeof physics === 'object' && 'getItemClasses' in physics) {
        classes.push(...physics.getItemClasses());
    }
    return jsxRuntimeExports.jsx("li", { className: clsx(classes), children: children });
};
/**
 * Base ListView component implementation.
 * Handles the core functionality for children-based ListView (equivalent to Flutter's ListView(...)).
 * @param props - ListView properties
 * @param ref - Forward ref for imperative operations
 */
const ListViewBase = require$$0.forwardRef(function ListView({ children = [], scrollDirection = exports.Axis.VERTICAL, reverse = false, shrinkWrap = false, primary, physics = exports.ScrollPhysics.DEFAULT, padding, itemExtent, prototypeItem, clipBehavior = 'visible', className, style, semanticChildCount, ...aria }, ref) {
    const elRef = require$$0.useRef(null);
    require$$0.useImperativeHandle(ref, () => ({
        scrollTo: (opts) => elRef.current?.scrollTo(opts),
        getScrollElement: () => elRef.current,
    }), []);
    const paddingClasses = require$$0.useMemo(() => toPaddingClasses(padding), [padding]);
    const containerClasses = require$$0.useMemo(() => buildContainerClasses(scrollDirection, reverse, shrinkWrap, physics, clipBehavior, paddingClasses, className), [scrollDirection, reverse, shrinkWrap, physics, clipBehavior, paddingClasses, className]);
    return (jsxRuntimeExports.jsx("ul", { ref: elRef, className: containerClasses, style: style, "aria-orientation": scrollDirection === exports.Axis.VERTICAL ? 'vertical' : 'horizontal', ...aria, "data-primary": primary ? 'true' : undefined, children: children?.map((child, i) => (jsxRuntimeExports.jsx(ItemWrap, { axis: scrollDirection, itemExtent: itemExtent, physics: physics, children: child }, child?.key ?? i))) }));
});
/**
 * Builder function for dynamic ListView variants (builder and separated).
 * Creates items on-demand using provided builder functions.
 * @template T - Type parameter for future extensibility
 * @param props - Builder props including itemCount and builder functions
 * @param ref - Forward ref for imperative operations
 */
function Builder({ itemCount, itemBuilder, separatorBuilder, ...rest }, ref) {
    const items = require$$0.useMemo(() => {
        const out = [];
        for (let i = 0; i < itemCount; i++) {
            out.push(itemBuilder(i));
            if (separatorBuilder && i < itemCount - 1)
                out.push(separatorBuilder(i));
        }
        return out;
    }, [itemCount, itemBuilder, separatorBuilder]);
    return (jsxRuntimeExports.jsx(ListViewBase, { ref: ref, ...rest, children: items }));
}
/**
 * Flutter-inspired ListView component with multiple variants. Supports basic children, builder pattern, and separated items.
 *
 * @example
 * ```tsx
 * // Basic ListView with children
 * <ListView>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </ListView>
 *
 * // Builder pattern
 * <ListView.builder
 *   itemCount={100}
 *   itemBuilder={(index) => <div key={index}>Item {index}</div>}
 * />
 *
 * // With separators
 * <ListView.separated
 *   itemCount={10}
 *   itemBuilder={(index) => <div key={index}>Item {index}</div>}
 *   separatorBuilder={(index) => <hr key={`sep-${index}`} />}
 * />
 * ```
 */
const ListView$1 = Object.assign(ListViewBase, {
    builder: require$$0.forwardRef((p, ref) => Builder(p, ref)),
    separated: require$$0.forwardRef((p, ref) => Builder(p, ref)),
});

class EdgeInsets {
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    /**
     * Creates EdgeInsets with the same value for all sides
     */
    static all(value) {
        return new EdgeInsets(value, value, value, value);
    }
    /**
     * Creates EdgeInsets with symmetric horizontal and vertical values
     */
    static symmetric(options) {
        const horizontal = options.horizontal || 0;
        const vertical = options.vertical || 0;
        return new EdgeInsets(vertical, horizontal, vertical, horizontal);
    }
    /**
     * Creates EdgeInsets with individual side values
     */
    static only(options) {
        return new EdgeInsets(options.top || 0, options.right || 0, options.bottom || 0, options.left || 0);
    }
    /**
     * Creates EdgeInsets from LTRB (left, top, right, bottom) values
     * This matches Flutter's EdgeInsets.fromLTRB constructor
     */
    static fromLTRB(left, top, right, bottom) {
        return new EdgeInsets(top, right, bottom, left);
    }
    /**
     * Converts EdgeInsets to CSS padding string
     */
    toPadding() {
        if (this.top === this.right && this.right === this.bottom && this.bottom === this.left) {
            return `${this.top}px`;
        }
        if (this.top === this.bottom && this.left === this.right) {
            return `${this.top}px ${this.right}px`;
        }
        return `${this.top}px ${this.right}px ${this.bottom}px ${this.left}px`;
    }
    /**
     * Converts EdgeInsets to CSS margin string
     */
    toMargin() {
        return this.toPadding();
    }
    /**
     * Converts EdgeInsets to CSS object for padding
     */
    toPaddingObject() {
        return {
            paddingTop: `${this.top}px`,
            paddingRight: `${this.right}px`,
            paddingBottom: `${this.bottom}px`,
            paddingLeft: `${this.left}px`,
        };
    }
    /**
     * Converts EdgeInsets to CSS object for margin
     */
    toMarginObject() {
        return {
            marginTop: `${this.top}px`,
            marginRight: `${this.right}px`,
            marginBottom: `${this.bottom}px`,
            marginLeft: `${this.left}px`,
        };
    }
    /**
     * Returns a new EdgeInsets with added values
     */
    add(other) {
        return new EdgeInsets(this.top + other.top, this.right + other.right, this.bottom + other.bottom, this.left + other.left);
    }
    /**
     * Returns a new EdgeInsets with subtracted values
     */
    subtract(other) {
        return new EdgeInsets(this.top - other.top, this.right - other.right, this.bottom - other.bottom, this.left - other.left);
    }
    /**
     * Returns true if all sides are equal to zero
     */
    get isZero() {
        return this.top === 0 && this.right === 0 && this.bottom === 0 && this.left === 0;
    }
    /**
     * Returns true if all sides are equal
     */
    get isUniform() {
        return this.top === this.right && this.right === this.bottom && this.bottom === this.left;
    }
    /**
     * Creates a copy of this EdgeInsets with optional modifications
     */
    copyWith(options) {
        return new EdgeInsets(options.top !== undefined ? options.top : this.top, options.right !== undefined ? options.right : this.right, options.bottom !== undefined ? options.bottom : this.bottom, options.left !== undefined ? options.left : this.left);
    }
    toString() {
        return `EdgeInsets(${this.top}, ${this.right}, ${this.bottom}, ${this.left})`;
    }
    equals(other) {
        return (this.top === other.top &&
            this.right === other.right &&
            this.bottom === other.bottom &&
            this.left === other.left);
    }
    /**
     * The total offset in the horizontal direction
     */
    get horizontal() {
        return this.left + this.right;
    }
    /**
     * The total offset in the vertical direction
     */
    get vertical() {
        return this.top + this.bottom;
    }
    /**
     * Returns a new rect that is smaller than the given rect in each direction
     * by the amount of inset in each direction
     */
    deflateRect(rect) {
        return {
            x: rect.x + this.left,
            y: rect.y + this.top,
            width: rect.width - this.horizontal,
            height: rect.height - this.vertical,
        };
    }
    /**
     * Returns a new rect that is bigger than the given rect in each direction
     * by the amount of inset in each direction
     */
    inflateRect(rect) {
        return {
            x: rect.x - this.left,
            y: rect.y - this.top,
            width: rect.width + this.horizontal,
            height: rect.height + this.vertical,
        };
    }
    /**
     * Returns a new size that is smaller than the given size by the amount
     * of inset in the horizontal and vertical directions
     */
    deflateSize(size) {
        return {
            width: size.width - this.horizontal,
            height: size.height - this.vertical,
        };
    }
    /**
     * Returns a new size that is bigger than the given size by the amount
     * of inset in the horizontal and vertical directions
     */
    inflateSize(size) {
        return {
            width: size.width + this.horizontal,
            height: size.height + this.vertical,
        };
    }
    /**
     * Whether every dimension is non-negative
     */
    get isNonNegative() {
        return this.top >= 0 && this.right >= 0 && this.bottom >= 0 && this.left >= 0;
    }
    /**
     * Returns an EdgeInsets with top and bottom as well as left and right flipped
     */
    get flipped() {
        return new EdgeInsets(this.bottom, this.left, this.top, this.right);
    }
}
/**
 * An EdgeInsets with zero offsets in each direction
 */
EdgeInsets.zero = new EdgeInsets(0, 0, 0, 0);

/**
 * Scroll direction for ListView
 */
exports.ScrollDirection = void 0;
(function (ScrollDirection) {
    ScrollDirection["VERTICAL"] = "vertical";
    ScrollDirection["HORIZONTAL"] = "horizontal";
})(exports.ScrollDirection || (exports.ScrollDirection = {}));
// MainAxisAlignment and CrossAxisAlignment are imported from Layout.ts to avoid duplication
/**
 * Padding direction options for convenience methods
 */
exports.PaddingDirection = void 0;
(function (PaddingDirection) {
    PaddingDirection["ALL"] = "all";
    PaddingDirection["HORIZONTAL"] = "horizontal";
    PaddingDirection["VERTICAL"] = "vertical";
    PaddingDirection["NONE"] = "none";
})(exports.PaddingDirection || (exports.PaddingDirection = {}));
var ListView;
(function (ListView) {
    function getPhysicsClassName(physics) {
        switch (physics) {
            case exports.ScrollPhysics.BOUNCING:
                return 'scroll-smooth';
            case exports.ScrollPhysics.CLAMPING:
                return 'scroll-auto';
            case exports.ScrollPhysics.NEVER:
                return 'overflow-hidden';
            case exports.ScrollPhysics.DEFAULT:
                return 'overflow-scroll';
            default:
                return 'scroll-auto';
        }
    }
    ListView.getPhysicsClassName = getPhysicsClassName;
    function getScrollDirectionClasses(direction) {
        return direction === exports.ScrollDirection.VERTICAL
            ? 'flex-col overflow-y-auto overflow-x-hidden'
            : 'flex-row overflow-x-auto overflow-y-hidden';
    }
    ListView.getScrollDirectionClasses = getScrollDirectionClasses;
    function getCrossAxisAlignmentClass(alignment, direction) {
        const isVertical = direction === exports.ScrollDirection.VERTICAL;
        switch (alignment) {
            case exports.CrossAxisAlignment.START:
                return isVertical ? 'items-start' : 'justify-start';
            case exports.CrossAxisAlignment.CENTER:
                return isVertical ? 'items-center' : 'justify-center';
            case exports.CrossAxisAlignment.END:
                return isVertical ? 'items-end' : 'justify-end';
            case exports.CrossAxisAlignment.STRETCH:
                return isVertical ? 'items-stretch' : 'justify-stretch';
            default:
                return isVertical ? 'items-stretch' : 'justify-start';
        }
    }
    ListView.getCrossAxisAlignmentClass = getCrossAxisAlignmentClass;
    function getMainAxisAlignmentClass(alignment, direction) {
        const isVertical = direction === exports.ScrollDirection.VERTICAL;
        switch (alignment) {
            case exports.MainAxisAlignment.START:
                return isVertical ? 'justify-start' : 'items-start';
            case exports.MainAxisAlignment.CENTER:
                return isVertical ? 'justify-center' : 'items-center';
            case exports.MainAxisAlignment.END:
                return isVertical ? 'justify-end' : 'items-end';
            case exports.MainAxisAlignment.SPACE_BETWEEN:
                return isVertical ? 'justify-between' : 'items-between';
            case exports.MainAxisAlignment.SPACE_AROUND:
                return isVertical ? 'justify-around' : 'items-around';
            case exports.MainAxisAlignment.SPACE_EVENLY:
                return isVertical ? 'justify-evenly' : 'items-evenly';
            default:
                return isVertical ? 'justify-start' : 'items-start';
        }
    }
    ListView.getMainAxisAlignmentClass = getMainAxisAlignmentClass;
    function calculatePadding(options) {
        const { paddingAll, paddingHorizontal, paddingVertical, padding } = options;
        // Priority: convenience props > padding
        if (paddingAll !== undefined) {
            return EdgeInsets.all(typeof paddingAll === 'number' ? paddingAll : Number.parseFloat(paddingAll)).toPadding();
        }
        if (paddingHorizontal !== undefined || paddingVertical !== undefined) {
            return EdgeInsets.symmetric({
                horizontal: typeof paddingHorizontal === 'number'
                    ? paddingHorizontal
                    : paddingHorizontal
                        ? Number.parseFloat(paddingHorizontal)
                        : undefined,
                vertical: typeof paddingVertical === 'number'
                    ? paddingVertical
                    : paddingVertical
                        ? Number.parseFloat(paddingVertical)
                        : undefined,
            }).toPadding();
        }
        return padding;
    }
    ListView.calculatePadding = calculatePadding;
})(ListView || (ListView = {}));

function InkWell(props) {
    const { children, onTap, onDoubleTap, onLongPress, onHover, onFocusChange, splashColor = 'rgba(0, 0, 0, 0.12)', hoverColor = 'rgba(0, 0, 0, 0.04)', focusColor = 'rgba(0, 0, 0, 0.12)', highlightColor = 'rgba(0, 0, 0, 0.08)', borderRadius = 0, enabled = true, excludeFromSemantics = false, splashDuration = 300, hoverDuration = 200, className = '', style = {}, role = 'button', tabIndex = 0, } = props;
    const [isHovered, setIsHovered] = require$$0.useState(false);
    const [isFocused, setIsFocused] = require$$0.useState(false);
    const [isPressed, setIsPressed] = require$$0.useState(false);
    const [ripples, setRipples] = require$$0.useState([]);
    const containerRef = require$$0.useRef(null);
    const longPressTimerRef = require$$0.useRef();
    const doubleTapTimerRef = require$$0.useRef();
    const lastTapRef = require$$0.useRef(0);
    // Clean up timers on unmount
    require$$0.useEffect(() => {
        return () => {
            if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
            }
            if (doubleTapTimerRef.current) {
                clearTimeout(doubleTapTimerRef.current);
            }
        };
    }, []);
    const createRipple = require$$0.useCallback((event) => {
        if (!containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Calculate ripple size based on distance to furthest corner
        const maxX = Math.max(x, rect.width - x);
        const maxY = Math.max(y, rect.height - y);
        const size = Math.sqrt(maxX * maxX + maxY * maxY) * 2;
        const newRipple = {
            id: `ripple-${Date.now()}-${Math.random()}`,
            x,
            y,
            size,
            opacity: 1,
        };
        setRipples((prev) => [...prev, newRipple]);
        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, splashDuration);
    }, [splashDuration]);
    const handleMouseEnter = require$$0.useCallback(() => {
        if (!enabled)
            return;
        setIsHovered(true);
        onHover?.(true);
    }, [enabled, onHover]);
    const handleMouseLeave = require$$0.useCallback(() => {
        if (!enabled)
            return;
        setIsHovered(false);
        setIsPressed(false);
        onHover?.(false);
        // Clear long press timer
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    }, [enabled, onHover]);
    const handleMouseDown = require$$0.useCallback((event) => {
        if (!enabled)
            return;
        setIsPressed(true);
        createRipple(event);
        // Start long press timer
        longPressTimerRef.current = setTimeout(() => {
            onLongPress?.();
        }, 500); // 500ms for long press
    }, [enabled, createRipple, onLongPress]);
    const handleMouseUp = require$$0.useCallback(() => {
        if (!enabled)
            return;
        setIsPressed(false);
        // Clear long press timer
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    }, [enabled]);
    const handleClick = require$$0.useCallback(() => {
        if (!enabled)
            return;
        const now = Date.now();
        const timeSinceLastTap = now - lastTapRef.current;
        if (timeSinceLastTap < 300 && onDoubleTap) {
            // Double tap detected
            if (doubleTapTimerRef.current) {
                clearTimeout(doubleTapTimerRef.current);
            }
            onDoubleTap();
            lastTapRef.current = 0; // Reset to prevent triple tap
        }
        else {
            // Single tap - delay execution to check for double tap
            lastTapRef.current = now;
            doubleTapTimerRef.current = setTimeout(() => {
                onTap?.();
            }, onDoubleTap ? 300 : 0);
        }
    }, [enabled, onTap, onDoubleTap]);
    const handleFocus = require$$0.useCallback(() => {
        if (!enabled)
            return;
        setIsFocused(true);
        onFocusChange?.(true);
    }, [enabled, onFocusChange]);
    const handleBlur = require$$0.useCallback(() => {
        if (!enabled)
            return;
        setIsFocused(false);
        onFocusChange?.(false);
    }, [enabled, onFocusChange]);
    const handleKeyDown = require$$0.useCallback((event) => {
        if (!enabled)
            return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onTap?.();
        }
    }, [enabled, onTap]);
    // Combine all overlay colors
    const overlayColor = (() => {
        if (isPressed)
            return highlightColor;
        if (isFocused)
            return focusColor;
        if (isHovered)
            return hoverColor;
        return 'transparent';
    })();
    const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
        cursor: enabled ? 'pointer' : 'default',
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        outline: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        ...style,
    };
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: overlayColor,
        transition: `background-color ${hoverDuration}ms ease`,
        pointerEvents: 'none',
        borderRadius: 'inherit',
    };
    const rippleStyle = (ripple) => ({
        position: 'absolute',
        left: ripple.x - ripple.size / 2,
        top: ripple.y - ripple.size / 2,
        width: ripple.size,
        height: ripple.size,
        backgroundColor: splashColor,
        borderRadius: '50%',
        opacity: ripple.opacity,
        transform: 'scale(0)',
        animation: `inkwell-ripple ${splashDuration}ms ease-out`,
        pointerEvents: 'none',
    });
    return (jsxRuntimeExports.jsxs("div", { ref: containerRef, className: className, style: containerStyle, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onClick: handleClick, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown, role: excludeFromSemantics ? undefined : role, tabIndex: enabled && !excludeFromSemantics ? tabIndex : -1, "aria-disabled": !enabled, children: [jsxRuntimeExports.jsx("div", { style: overlayStyle }), ripples.map((ripple) => (jsxRuntimeExports.jsx("div", { style: rippleStyle(ripple) }, ripple.id))), jsxRuntimeExports.jsx("div", { style: { position: 'relative', zIndex: 1 }, children: children }), jsxRuntimeExports.jsx("style", { children: `
        @keyframes inkwell-ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      ` })] }));
}

/**
 * Flutter-style GestureDetector for the web (React + PointerEvents)
 * - Approximates Flutter's GestureDetector semantics for websites.
 * - Uses Pointer Events to unify mouse, touch, pen.
 * - Implements: tap, double tap, long press (with slop), pan/drag, optional scale (pinch/rotate alt.).
 * - Attempts to mirror HitTestBehavior semantics.
 */
// ===== Types aligned to Flutter naming =====
exports.HitTestBehavior = void 0;
(function (HitTestBehavior) {
    /** Only hit test if a child is hit. */
    HitTestBehavior["deferToChild"] = "deferToChild";
    /** Treat as hit even if it has no visible content. */
    HitTestBehavior["opaque"] = "opaque";
    /** Consider hit even if it is transparent; do not block children. */
    HitTestBehavior["translucent"] = "translucent";
})(exports.HitTestBehavior || (exports.HitTestBehavior = {}));
// ===== Internal helpers =====
class VelocityTracker {
    constructor(windowMs = 120) {
        this.windowMs = windowMs;
        this.samples = [];
    }
    push(x, y) {
        const now = performance.now();
        this.samples.push({ t: now, x, y });
        const cutoff = now - this.windowMs;
        while (this.samples.length && this.samples[0] && this.samples[0].t < cutoff) {
            this.samples.shift();
        }
    }
    getVelocity() {
        if (this.samples.length < 2)
            return { dx: 0, dy: 0 };
        const first = this.samples[0];
        const last = this.samples[this.samples.length - 1];
        if (!first || !last)
            return { dx: 0, dy: 0 };
        const dt = Math.max(1, last.t - first.t) / 1000; // seconds, avoid 0
        return { dx: (last.x - first.x) / dt, dy: (last.y - first.y) / dt };
    }
}
function getLocal(div, x, y) {
    if (!div)
        return { dx: x, dy: y };
    const r = div.getBoundingClientRect();
    return { dx: x - r.left, dy: y - r.top };
}
function distance(a, b) {
    const dx = a.dx - b.dx;
    const dy = a.dy - b.dy;
    return Math.hypot(dx, dy);
}
// ===== Component =====
function GestureDetector({ children, className, style, behavior = exports.HitTestBehavior.deferToChild, excludeFromSemantics = false, ariaLabel, onTap, onTapDown, onTapUp, onTapCancel, onDoubleTap, onLongPress, onLongPressStart, onLongPressMoveUpdate, onLongPressEnd, onPanStart, onPanUpdate, onPanEnd, onScaleStart, onScaleUpdate, onScaleEnd, longPressDelay = 500, doubleTapDelay = 300, tapSlop = 10, panSlop = 10, longPressMoveTolerance = 6, }) {
    const ref = require$$0.useRef(null);
    const pressedRef = require$$0.useRef(false);
    const startGlobal = require$$0.useRef(null);
    const lastGlobal = require$$0.useRef(null);
    const startTimeRef = require$$0.useRef(0);
    const lastTapTimeRef = require$$0.useRef(0);
    const waitingSingleTapRef = require$$0.useRef(null);
    const longPressTimerRef = require$$0.useRef(null);
    const isPanningRef = require$$0.useRef(false);
    const isLongPressRef = require$$0.useRef(false);
    const vTracker = require$$0.useRef(new VelocityTracker());
    // Multi-pointer for scale
    const activePointers = require$$0.useRef(new Map());
    const scaleActiveRef = require$$0.useRef(false);
    const clearTimers = require$$0.useCallback(() => {
        if (waitingSingleTapRef.current) {
            clearTimeout(waitingSingleTapRef.current);
            waitingSingleTapRef.current = null;
        }
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    }, []);
    const pointerCount = require$$0.useCallback(() => activePointers.current.size, []);
    const getFocal = require$$0.useCallback(() => {
        let sx = 0;
        let sy = 0;
        let n = 0;
        for (const p of activePointers.current.values()) {
            sx += p.dx;
            sy += p.dy;
            n++;
        }
        return n ? { dx: sx / n, dy: sy / n } : { dx: 0, dy: 0 };
    }, []);
    const getScaleRotate = require$$0.useCallback((prev, curr) => {
        // Return average scale and rotation between prev and curr pointers
        const ids = [...curr.keys()].filter((id) => prev.has(id));
        if (ids.length < 2)
            return { scale: 1, rotation: 0, hScale: 1, vScale: 1 };
        // Use first two pointers for simplicity (Flutter does more)
        const id0 = ids[0];
        const id1 = ids[1];
        if (id0 === undefined || id1 === undefined)
            return { scale: 1, rotation: 0, hScale: 1, vScale: 1 };
        const a0 = prev.get(id0);
        const a1 = prev.get(id1);
        const b0 = curr.get(id0);
        const b1 = curr.get(id1);
        if (!a0 || !a1 || !b0 || !b1)
            return { scale: 1, rotation: 0, hScale: 1, vScale: 1 };
        const da = { dx: a1.dx - a0.dx, dy: a1.dy - a0.dy };
        const db = { dx: b1.dx - b0.dx, dy: b1.dy - b0.dy };
        const la = Math.hypot(da.dx, da.dy) || 1;
        const lb = Math.hypot(db.dx, db.dy) || 1;
        const scale = lb / la;
        const rotA = Math.atan2(da.dy, da.dx);
        const rotB = Math.atan2(db.dy, db.dx);
        const rotation = rotB - rotA; // radians
        // Axis scales (rough): project db onto axes of da
        const cos = Math.cos(rotA);
        const sin = Math.sin(rotA);
        const par = (db.dx * cos + db.dy * sin) / la;
        const perp = (-db.dx * sin + db.dy * cos) / la;
        const hScale = Math.hypot(par, 0) || 1; // magnitude along axis
        const vScale = Math.hypot(perp, 0) || 1; // magnitude perpendicular
        return { scale, rotation, hScale, vScale };
    }, []);
    const fireTapCancel = require$$0.useCallback(() => {
        onTapCancel?.();
    }, [onTapCancel]);
    // === Pointer Handlers ===
    const onPointerDown = require$$0.useCallback((e) => {
        if (e.pointerType === 'mouse' && e.button !== 0)
            return; // primary only
        // Respect deferToChild: only handle if a child is hit, not the container itself
        if (behavior === exports.HitTestBehavior.deferToChild && e.target === ref.current) {
            // Don't handle gestures when clicking directly on container (only when child is clicked)
            return;
        }
        e.target.setPointerCapture?.(e.pointerId);
        pressedRef.current = true;
        const global = { dx: e.clientX, dy: e.clientY };
        const local = getLocal(ref.current, e.clientX, e.clientY);
        startGlobal.current = global;
        lastGlobal.current = global;
        startTimeRef.current = performance.now();
        vTracker.current = new VelocityTracker();
        vTracker.current.push(global.dx, global.dy);
        // Register pointer for scale
        activePointers.current.set(e.pointerId, local);
        // Long press timer with move tolerance
        clearTimers();
        if (onLongPress || onLongPressStart) {
            longPressTimerRef.current = setTimeout(() => {
                if (!pressedRef.current)
                    return;
                isLongPressRef.current = true;
                onLongPress?.();
                onLongPressStart?.({ globalPosition: global, localPosition: local });
            }, longPressDelay);
        }
        onTapDown?.({ globalPosition: global, localPosition: local });
        // Scale start if two pointers
        if (!scaleActiveRef.current &&
            pointerCount() === 2 &&
            (onScaleStart || onScaleUpdate || onScaleEnd)) {
            scaleActiveRef.current = true;
            const focal = getFocal();
            if (ref.current) {
                onScaleStart?.({
                    focalPoint: {
                        dx: focal.dx + ref.current.getBoundingClientRect().left,
                        dy: focal.dy + ref.current.getBoundingClientRect().top,
                    },
                    localFocalPoint: focal,
                    pointers: 2,
                });
            }
        }
    }, [
        behavior,
        clearTimers,
        getFocal,
        longPressDelay,
        onLongPress,
        onLongPressStart,
        onTapDown,
        onScaleStart,
        onScaleUpdate,
        onScaleEnd,
        pointerCount,
    ]);
    const onPointerMove = require$$0.useCallback((e) => {
        if (!pressedRef.current)
            return;
        const global = { dx: e.clientX, dy: e.clientY };
        const local = getLocal(ref.current, e.clientX, e.clientY);
        const start = startGlobal.current;
        const last = lastGlobal.current;
        if (!start || !last)
            return;
        // update trackers
        lastGlobal.current = global;
        vTracker.current.push(global.dx, global.dy);
        // update pointer map
        if (activePointers.current.has(e.pointerId)) {
            activePointers.current.set(e.pointerId, local);
        }
        // Handle scale if active and 2+ pointers
        if (scaleActiveRef.current && pointerCount() >= 2 && onScaleUpdate) {
            // For simplicity, recompute using last snapshot vs current snapshot is complex; we approximate using deltas
            const prev = new Map(activePointers.current);
            prev.set(e.pointerId, last ? getLocal(ref.current, last.dx, last.dy) : local);
            const curr = activePointers.current;
            const focal = getFocal();
            const { scale, rotation, hScale, vScale } = getScaleRotate(prev, curr);
            onScaleUpdate({
                focalPoint: ref.current
                    ? {
                        dx: focal.dx + ref.current.getBoundingClientRect().left,
                        dy: focal.dy + ref.current.getBoundingClientRect().top,
                    }
                    : focal,
                localFocalPoint: focal,
                scale,
                rotation,
                horizontalScale: hScale,
                verticalScale: vScale,
                pointers: pointerCount(),
            });
        }
        const movedFromStart = distance(start, global);
        // Cancel long press if exceeded tolerance
        if (!isPanningRef.current &&
            movedFromStart > longPressMoveTolerance &&
            longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
        // Start pan if exceed panSlop
        if (!isPanningRef.current && movedFromStart > panSlop) {
            isPanningRef.current = true;
            // cancel long press
            if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
            }
            onPanStart?.({
                globalPosition: start,
                localPosition: getLocal(ref.current, start.dx, start.dy),
            });
        }
        if (isPanningRef.current && onPanUpdate) {
            const delta = { dx: global.dx - last.dx, dy: global.dy - last.dy };
            onPanUpdate({ globalPosition: global, localPosition: local, delta });
        }
        if (isLongPressRef.current && onLongPressMoveUpdate) {
            const offsetFromOrigin = { dx: global.dx - start.dx, dy: global.dy - start.dy };
            onLongPressMoveUpdate({ globalPosition: global, localPosition: local, offsetFromOrigin });
        }
    }, [
        getFocal,
        getScaleRotate,
        longPressMoveTolerance,
        onLongPressMoveUpdate,
        onPanStart,
        onPanUpdate,
        onScaleUpdate,
        panSlop,
        pointerCount,
    ]);
    const onPointerUp = require$$0.useCallback((e) => {
        if (!pressedRef.current)
            return;
        const now = performance.now();
        const global = { dx: e.clientX, dy: e.clientY };
        const local = getLocal(ref.current, e.clientX, e.clientY);
        const start = startGlobal.current;
        if (!start)
            return;
        // Clean long press timer
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
        // Scale pointer removal
        activePointers.current.delete(e.pointerId);
        // Long press end
        if (isLongPressRef.current) {
            onLongPressEnd?.({ globalPosition: global, localPosition: local });
            isLongPressRef.current = false;
        }
        // Pan end
        if (isPanningRef.current) {
            const vel = vTracker.current.getVelocity();
            onPanEnd?.({ velocity: vel, primaryVelocity: Math.hypot(vel.dx, vel.dy) });
            isPanningRef.current = false;
        }
        else {
            // Tap logic with double-tap disambiguation
            const moved = distance(start, global);
            if (moved <= tapSlop) {
                onTapUp?.({ globalPosition: global, localPosition: local });
                const since = now - lastTapTimeRef.current;
                if (onDoubleTap) {
                    if (since <= doubleTapDelay) {
                        // double
                        if (waitingSingleTapRef.current) {
                            clearTimeout(waitingSingleTapRef.current);
                            waitingSingleTapRef.current = null;
                        }
                        onDoubleTap?.();
                        lastTapTimeRef.current = 0;
                    }
                    else {
                        // maybe single later
                        lastTapTimeRef.current = now;
                        waitingSingleTapRef.current = setTimeout(() => {
                            onTap?.();
                            waitingSingleTapRef.current = null;
                        }, doubleTapDelay);
                    }
                }
                else {
                    onTap?.();
                    lastTapTimeRef.current = now;
                }
            }
            else {
                fireTapCancel();
            }
        }
        // Scale end if no more multi-touch
        if (scaleActiveRef.current && pointerCount() < 2) {
            const vel = vTracker.current.getVelocity();
            onScaleEnd?.({ velocity: vel, pointers: pointerCount() });
            scaleActiveRef.current = false;
        }
        pressedRef.current = false;
        startGlobal.current = null;
        lastGlobal.current = null;
    }, [
        doubleTapDelay,
        fireTapCancel,
        onDoubleTap,
        onPanEnd,
        onScaleEnd,
        onTap,
        onTapUp,
        onLongPressEnd,
        tapSlop,
        pointerCount,
    ]);
    const onPointerCancel = require$$0.useCallback(() => {
        if (!pressedRef.current)
            return;
        clearTimers();
        fireTapCancel();
        pressedRef.current = false;
        isPanningRef.current = false;
        isLongPressRef.current = false;
        startGlobal.current = null;
        lastGlobal.current = null;
        activePointers.current.clear();
        if (scaleActiveRef.current) {
            onScaleEnd?.({ velocity: { dx: 0, dy: 0 }, pointers: 0 });
            scaleActiveRef.current = false;
        }
    }, [clearTimers, fireTapCancel, onScaleEnd]);
    // Keyboard accessibility: Space/Enter => onTap
    const onKeyDown = require$$0.useCallback((e) => {
        if (excludeFromSemantics)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTap?.();
        }
    }, [excludeFromSemantics, onTap]);
    // Cancel on window blur / visibility change (closer to Flutter's cancel conditions)
    require$$0.useEffect(() => {
        const cancel = () => onPointerCancel();
        window.addEventListener('blur', cancel);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden)
                cancel();
        });
        return () => {
            window.removeEventListener('blur', cancel);
            document.removeEventListener('visibilitychange', () => { });
        };
    }, [onPointerCancel]);
    // Styles approximating HitTestBehavior semantics without breaking layout
    const containerStyle = require$$0.useMemo(() => {
        const base = { ...style, touchAction: 'none' };
        switch (behavior) {
            case exports.HitTestBehavior.opaque:
                // ensure there is a hit area w/o visual change
                return {
                    ...base,
                    position: base.position || 'relative',
                    minWidth: base.minWidth || 1,
                    minHeight: base.minHeight || 1,
                };
            case exports.HitTestBehavior.translucent:
                // do not set pointer-events:none; we still want the container to receive events while letting children work
                return base;
            default:
                return base;
        }
    }, [behavior, style]);
    const commonProps = {
        ref,
        className,
        style: containerStyle,
        role: excludeFromSemantics ? undefined : 'button',
        tabIndex: excludeFromSemantics ? undefined : 0,
        'aria-label': excludeFromSemantics ? undefined : ariaLabel,
        onKeyDown,
        // Pointer events
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel: onPointerCancel,
    };
    return jsxRuntimeExports.jsx("div", { ...commonProps, children: children });
}

exports.AnimationCurve = void 0;
(function (AnimationCurve) {
    /** Linear animation curve */
    AnimationCurve["linear"] = "linear";
    /** Ease animation curve (default) */
    AnimationCurve["ease"] = "ease";
    /** Ease-in animation curve */
    AnimationCurve["easeIn"] = "ease-in";
    /** Ease-out animation curve */
    AnimationCurve["easeOut"] = "ease-out";
    /** Ease-in-out animation curve */
    AnimationCurve["easeInOut"] = "ease-in-out";
    /** Bounce animation curve */
    AnimationCurve["bounceIn"] = "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    /** Elastic animation curve */
    AnimationCurve["elasticIn"] = "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    /** Fast out slow in (Material Design) */
    AnimationCurve["fastOutSlowIn"] = "cubic-bezier(0.4, 0, 0.2, 1)";
    /** Decelerate (Material Design) */
    AnimationCurve["decelerate"] = "cubic-bezier(0, 0, 0.2, 1)";
})(exports.AnimationCurve || (exports.AnimationCurve = {}));
/**
 * AnimatedContainer component equivalent to Flutter's AnimatedContainer widget.
 * Automatically animates changes to its properties over a specified duration.
 *
 * @example
 * ```tsx
 * <AnimatedContainer
 *   width={isExpanded ? 200 : 100}
 *   height={isExpanded ? 200 : 100}
 *   backgroundColor={isExpanded ? '#ff0000' : '#0000ff'}
 *   duration={300}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Animation completed')}
 * >
 *   <span>Animated content</span>
 * </AnimatedContainer>
 * ```
 */
function AnimatedContainer(props) {
    const { children, duration, curve = exports.AnimationCurve.ease, delay = 0, onStart, onEnd, style = {}, 
    // Container props
    width, height, padding, margin, backgroundColor, borderRadius, borderWidth = 0, borderColor, borderStyle = 'solid', flex, expanded, flexible, flexShrink, alignSelf, className = '', } = props;
    const [currentStyles, setCurrentStyles] = require$$0.useState({});
    const [isAnimating, setIsAnimating] = require$$0.useState(false);
    const previousPropsRef = require$$0.useRef(props);
    const containerRef = require$$0.useRef(null);
    const animationTimeoutRef = require$$0.useRef();
    // Helper function to normalize values for comparison and animation
    const normalizeValue = require$$0.useCallback((value) => {
        if (value === undefined)
            return '';
        if (typeof value === 'number')
            return `${value}px`;
        return value;
    }, []);
    // Helper function to normalize EdgeInsets or string values
    const normalizeEdgeInsets = require$$0.useCallback((value) => {
        if (value === undefined)
            return '0';
        if (typeof value === 'string')
            return value;
        return value.toPadding();
    }, []);
    // Calculate effective padding and margin
    const calculateEffectivePadding = require$$0.useCallback(() => {
        return normalizeEdgeInsets(padding);
    }, [padding, normalizeEdgeInsets]);
    const calculateEffectiveMargin = require$$0.useCallback(() => {
        return normalizeEdgeInsets(margin);
    }, [margin, normalizeEdgeInsets]);
    // Calculate animated styles based on current props
    const calculateTargetStyles = require$$0.useCallback(() => {
        const effectivePadding = calculateEffectivePadding();
        const effectiveMargin = calculateEffectiveMargin();
        return {
            width: normalizeValue(width),
            height: normalizeValue(height),
            padding: effectivePadding,
            margin: effectiveMargin,
            backgroundColor: backgroundColor || 'transparent',
            borderRadius: normalizeValue(borderRadius),
            borderWidth: borderWidth || 0,
            borderColor: borderColor || 'transparent',
            borderStyle: borderStyle || 'solid',
        };
    }, [
        width,
        height,
        backgroundColor,
        borderRadius,
        borderWidth,
        borderColor,
        borderStyle,
        calculateEffectivePadding,
        calculateEffectiveMargin,
        normalizeValue,
    ]);
    // Check if props have changed and need animation
    const hasStyleChanged = require$$0.useCallback(() => {
        const prev = previousPropsRef.current;
        return (width !== prev.width ||
            height !== prev.height ||
            padding !== prev.padding ||
            margin !== prev.margin ||
            backgroundColor !== prev.backgroundColor ||
            borderRadius !== prev.borderRadius ||
            borderWidth !== prev.borderWidth ||
            borderColor !== prev.borderColor ||
            borderStyle !== prev.borderStyle);
    }, [
        width,
        height,
        padding,
        margin,
        backgroundColor,
        borderRadius,
        borderWidth,
        borderColor,
        borderStyle,
    ]);
    // Apply animation
    require$$0.useEffect(() => {
        if (!hasStyleChanged())
            return;
        const targetStyles = calculateTargetStyles();
        // Clear any existing timeout
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        // Start animation
        const startAnimation = () => {
            setIsAnimating(true);
            setCurrentStyles(targetStyles);
            onStart?.();
            // Animation complete callback
            animationTimeoutRef.current = setTimeout(() => {
                setIsAnimating(false);
                onEnd?.();
            }, duration + delay);
        };
        if (delay > 0) {
            animationTimeoutRef.current = setTimeout(startAnimation, delay);
        }
        else {
            startAnimation();
        }
        // Update previous props
        previousPropsRef.current = props;
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [duration, delay, onStart, onEnd, calculateTargetStyles, hasStyleChanged, props]);
    // Initialize styles on mount
    require$$0.useEffect(() => {
        setCurrentStyles(calculateTargetStyles());
    }, [calculateTargetStyles]);
    // Build flex styles (same logic as Container)
    const buildFlexStyles = () => {
        const flexStyles = {};
        if (expanded) {
            flexStyles.flex = '1 1 0';
        }
        else if (flexible) {
            flexStyles.flex = `${flex || 1} 1 auto`;
        }
        else if (flex !== undefined) {
            flexStyles.flex = `${flex} 0 auto`;
        }
        if (width !== undefined) {
            flexStyles.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (height !== undefined) {
            flexStyles.height = typeof height === 'number' ? `${height}px` : height;
        }
        if (flexShrink === false) {
            flexStyles.flexShrink = 0;
        }
        return flexStyles;
    };
    // Combine all styles
    const containerStyle = {
        ...buildFlexStyles(),
        ...currentStyles,
        borderRadius: typeof currentStyles.borderRadius === 'number'
            ? `${currentStyles.borderRadius}px`
            : currentStyles.borderRadius,
        borderWidth: currentStyles.borderWidth && currentStyles.borderWidth > 0
            ? `${currentStyles.borderWidth}px`
            : undefined,
        borderColor: currentStyles.borderWidth && currentStyles.borderWidth > 0
            ? currentStyles.borderColor
            : undefined,
        borderStyle: currentStyles.borderWidth && currentStyles.borderWidth > 0
            ? currentStyles.borderStyle
            : undefined,
        alignSelf,
        transition: isAnimating || hasStyleChanged() ? `all ${duration}ms ${curve}` : undefined,
        ...style,
    };
    return (jsxRuntimeExports.jsx("div", { ref: containerRef, className: className, style: containerStyle, children: children }));
}

/**
 * AnimatedOpacity component equivalent to Flutter's AnimatedOpacity widget.
 * Animates the opacity of its child over a specified duration.
 *
 * @example
 * ```tsx
 * <AnimatedOpacity
 *   opacity={isVisible ? 1.0 : 0.0}
 *   duration={300}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Fade completed')}
 * >
 *   <div>Content to fade</div>
 * </AnimatedOpacity>
 * ```
 */
function AnimatedOpacity(props) {
    const { children, opacity, duration, curve = exports.AnimationCurve.ease, delay = 0, onStart, onEnd, alwaysIncludeSemantics = false, className = '', style = {}, } = props;
    const [currentOpacity, setCurrentOpacity] = require$$0.useState(opacity);
    const [isAnimating, setIsAnimating] = require$$0.useState(false);
    const previousOpacityRef = require$$0.useRef(opacity);
    const animationTimeoutRef = require$$0.useRef();
    const startTimeoutRef = require$$0.useRef();
    // Clamp opacity value between 0 and 1
    const clampedOpacity = Math.max(0, Math.min(1, opacity));
    // Check if opacity has changed
    const hasOpacityChanged = require$$0.useCallback(() => {
        return Math.abs(clampedOpacity - previousOpacityRef.current) > 0.001;
    }, [clampedOpacity]);
    // Apply opacity animation
    require$$0.useEffect(() => {
        if (!hasOpacityChanged())
            return;
        // Clear any existing timeouts
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        if (startTimeoutRef.current) {
            clearTimeout(startTimeoutRef.current);
        }
        // Start animation
        const startAnimation = () => {
            setIsAnimating(true);
            setCurrentOpacity(clampedOpacity);
            onStart?.();
            // Animation complete callback
            animationTimeoutRef.current = setTimeout(() => {
                setIsAnimating(false);
                onEnd?.();
            }, duration);
        };
        if (delay > 0) {
            startTimeoutRef.current = setTimeout(startAnimation, delay);
        }
        else {
            startAnimation();
        }
        // Update previous opacity
        previousOpacityRef.current = clampedOpacity;
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            if (startTimeoutRef.current) {
                clearTimeout(startTimeoutRef.current);
            }
        };
    }, [clampedOpacity, duration, delay, onStart, onEnd, hasOpacityChanged]);
    // Initialize opacity on mount
    require$$0.useEffect(() => {
        setCurrentOpacity(clampedOpacity);
        previousOpacityRef.current = clampedOpacity;
    }, [clampedOpacity]);
    // Determine if content should be visible to screen readers
    const shouldIncludeSemantics = alwaysIncludeSemantics || currentOpacity > 0;
    // Container styles
    const containerStyle = {
        opacity: currentOpacity,
        transition: isAnimating || hasOpacityChanged() ? `opacity ${duration}ms ${curve}` : undefined,
        // Maintain layout space even when opacity is 0
        visibility: shouldIncludeSemantics ? 'visible' : 'hidden',
        ...style,
    };
    return (jsxRuntimeExports.jsx("div", { className: className, style: containerStyle, "aria-hidden": !shouldIncludeSemantics, children: children }));
}

exports.Orientation = void 0;
(function (Orientation) {
    Orientation["portrait"] = "portrait";
    Orientation["landscape"] = "landscape";
})(exports.Orientation || (exports.Orientation = {}));
exports.Brightness = void 0;
(function (Brightness) {
    Brightness["light"] = "light";
    Brightness["dark"] = "dark";
})(exports.Brightness || (exports.Brightness = {}));
const defaultBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const MediaQueryContext = require$$0.createContext(undefined);
const isBrowser = typeof window !== 'undefined';
const DEFAULT_DATA = {
    size: { width: 0, height: 0 },
    devicePixelRatio: 1,
    orientation: exports.Orientation.portrait,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    viewInsets: { top: 0, right: 0, bottom: 0, left: 0 },
    textScaleFactor: 1,
    platformBrightness: exports.Brightness.light,
    disableAnimations: false,
    highContrast: false,
    supportsTouch: false,
};
function MediaQuery({ children, breakpoints = defaultBreakpoints, data, }) {
    const [mediaQueryData, setMediaQueryData] = require$$0.useState(() => data ?? DEFAULT_DATA);
    require$$0.useEffect(() => {
        if (data) {
            setMediaQueryData(data);
            return;
        }
        if (!isBrowser)
            return;
        const root = document.documentElement;
        root.style.setProperty('--safe-area-inset-top', getComputedStyle(root).getPropertyValue('env(safe-area-inset-top)'));
        root.style.setProperty('--safe-area-inset-right', getComputedStyle(root).getPropertyValue('env(safe-area-inset-right)'));
        root.style.setProperty('--safe-area-inset-bottom', getComputedStyle(root).getPropertyValue('env(safe-area-inset-bottom)'));
        root.style.setProperty('--safe-area-inset-left', getComputedStyle(root).getPropertyValue('env(safe-area-inset-left)'));
        const update = () => setMediaQueryData(readCurrent());
        update();
        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);
        const orientationMQ = window.matchMedia('(orientation: portrait)');
        const darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
        const reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
        const highContrastMQ = window.matchMedia('(prefers-contrast: more), (prefers-contrast: high)');
        const forcedColorsMQ = window.matchMedia('(forced-colors: active)');
        orientationMQ.addEventListener('change', update);
        darkMQ.addEventListener('change', update);
        reduceMotionMQ.addEventListener('change', update);
        highContrastMQ.addEventListener('change', update);
        forcedColorsMQ.addEventListener('change', update);
        const vv = window.visualViewport;
        vv?.addEventListener('resize', update);
        vv?.addEventListener('scroll', update);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('orientationchange', update);
            orientationMQ.removeEventListener('change', update);
            darkMQ.removeEventListener('change', update);
            reduceMotionMQ.removeEventListener('change', update);
            highContrastMQ.removeEventListener('change', update);
            forcedColorsMQ.removeEventListener('change', update);
            vv?.removeEventListener('resize', update);
            vv?.removeEventListener('scroll', update);
        };
    }, [data]);
    const contextValue = require$$0.useMemo(() => ({ ...mediaQueryData, breakpoints }), [mediaQueryData, breakpoints]);
    return jsxRuntimeExports.jsx(MediaQueryContext.Provider, { value: contextValue, children: children });
}
function useMediaQuery() {
    const ctx = require$$0.useContext(MediaQueryContext);
    if (!ctx)
        throw new Error('useMediaQuery must be used within a <MediaQuery> provider');
    return ctx;
}
function useBreakpoint(breakpoints) {
    const { size, breakpoints: ctxBp } = useMediaQuery();
    const bp = breakpoints || ctxBp;
    return require$$0.useMemo(() => {
        const w = size.width;
        if (w >= bp.xl)
            return 'xl';
        if (w >= bp.lg)
            return 'lg';
        if (w >= bp.md)
            return 'md';
        if (w >= bp.sm)
            return 'sm';
        return 'xs';
    }, [size.width, bp]);
}
function useBreakpointMatch(condition, breakpoints) {
    const { size, breakpoints: ctxBp } = useMediaQuery();
    const bp = breakpoints || ctxBp;
    return require$$0.useMemo(() => {
        const w = size.width;
        switch (condition) {
            case 'xs-only':
                return w < bp.sm;
            case 'sm-only':
                return w >= bp.sm && w < bp.md;
            case 'md-only':
                return w >= bp.md && w < bp.lg;
            case 'lg-only':
                return w >= bp.lg && w < bp.xl;
            case 'xl-only':
                return w >= bp.xl;
            case 'xs-up':
                return w >= bp.xs;
            case 'sm-up':
                return w >= bp.sm;
            case 'md-up':
                return w >= bp.md;
            case 'lg-up':
                return w >= bp.lg;
            case 'xl-up':
                return w >= bp.xl;
            case 'sm-down':
                return w < bp.md;
            case 'md-down':
                return w < bp.lg;
            case 'lg-down':
                return w < bp.xl;
            default:
                return false;
        }
    }, [condition, size.width, bp]);
}
function readCurrent() {
    if (!isBrowser)
        return DEFAULT_DATA;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const orientation = width > height ? exports.Orientation.landscape : exports.Orientation.portrait;
    const padding = readSafeArea();
    const viewInsets = readViewInsets();
    const textScaleFactor = readTextScaleFactor();
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const highContrast = window.matchMedia('(prefers-contrast: more)').matches ||
        window.matchMedia('(prefers-contrast: high)').matches ||
        window.matchMedia('(forced-colors: active)').matches;
    const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return {
        size: { width, height },
        devicePixelRatio,
        orientation,
        padding,
        viewInsets,
        textScaleFactor,
        platformBrightness: dark ? exports.Brightness.dark : exports.Brightness.light,
        disableAnimations: reduce,
        highContrast,
        supportsTouch,
    };
}
function readSafeArea() {
    const cs = getComputedStyle(document.documentElement);
    const toNum = (v) => Number.parseFloat(v || '0') || 0;
    const top = toNum(cs.getPropertyValue('--safe-area-inset-top'));
    const right = toNum(cs.getPropertyValue('--safe-area-inset-right'));
    const bottom = toNum(cs.getPropertyValue('--safe-area-inset-bottom'));
    const left = toNum(cs.getPropertyValue('--safe-area-inset-left'));
    return { top, right, bottom, left };
}
function readViewInsets() {
    const vv = window.visualViewport;
    if (!vv)
        return { top: 0, right: 0, bottom: 0, left: 0 };
    const bottom = Math.max(0, window.innerHeight - vv.height);
    return { top: 0, right: 0, bottom, left: 0 };
}
function readTextScaleFactor() {
    const el = document.createElement('div');
    el.style.fontSize = '16px';
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.textContent = 'x';
    document.body.appendChild(el);
    const computed = Number.parseFloat(getComputedStyle(el).fontSize);
    document.body.removeChild(el);
    return computed / 16 || 1;
}

function LayoutBuilder({ builder, className = '', style = {} }) {
    const [constraints, setConstraints] = require$$0.useState(() => createDefaultConstraints());
    const containerRef = require$$0.useRef(null);
    const resizeObserverRef = require$$0.useRef();
    // Calculate constraints from element
    const calculateConstraints = require$$0.useCallback((element) => {
        const computedStyle = getComputedStyle(element);
        // Get the parent's constraints or use viewport
        const parentElement = element.parentElement;
        let maxWidth = window.innerWidth;
        let maxHeight = window.innerHeight;
        if (parentElement) {
            const parentRect = parentElement.getBoundingClientRect();
            maxWidth = parentRect.width;
            maxHeight = parentRect.height;
        }
        // Parse CSS constraints if any
        const minWidthPx = Number.parseFloat(computedStyle.minWidth) || 0;
        const maxWidthPx = computedStyle.maxWidth === 'none'
            ? maxWidth
            : Number.parseFloat(computedStyle.maxWidth) || maxWidth;
        const minHeightPx = Number.parseFloat(computedStyle.minHeight) || 0;
        const maxHeightPx = computedStyle.maxHeight === 'none'
            ? maxHeight
            : Number.parseFloat(computedStyle.maxHeight) || maxHeight;
        return createBoxConstraints({
            minWidth: minWidthPx,
            maxWidth: maxWidthPx,
            minHeight: minHeightPx,
            maxHeight: maxHeightPx,
        });
    }, []);
    // Set up resize observer
    require$$0.useEffect(() => {
        if (!containerRef.current)
            return;
        const element = containerRef.current;
        // Initial calculation
        setConstraints(calculateConstraints(element));
        // Set up ResizeObserver for dynamic updates
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserverRef.current = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const target = entry.target;
                    setConstraints(calculateConstraints(target));
                }
            });
            resizeObserverRef.current.observe(element);
        }
        else {
            // Fallback for browsers without ResizeObserver
            const handleResize = () => {
                setConstraints(calculateConstraints(element));
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [calculateConstraints]);
    // Memoize the built content
    const content = require$$0.useMemo(() => {
        return builder(constraints);
    }, [builder, constraints]);
    const containerStyle = {
        width: '100%',
        height: '100%',
        ...style,
    };
    return (jsxRuntimeExports.jsx("div", { ref: containerRef, className: className, style: containerStyle, children: content }));
}
// Helper functions for creating BoxConstraints
function createBoxConstraints({ minWidth = 0, maxWidth = Number.POSITIVE_INFINITY, minHeight = 0, maxHeight = Number.POSITIVE_INFINITY, }) {
    const hasBoundedWidth = maxWidth !== Number.POSITIVE_INFINITY;
    const hasBoundedHeight = maxHeight !== Number.POSITIVE_INFINITY;
    const hasTightWidth = minWidth === maxWidth;
    const hasTightHeight = minHeight === maxHeight;
    const isTight = hasTightWidth && hasTightHeight;
    const isNormalized = minWidth <= maxWidth && minHeight <= maxHeight;
    return {
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        hasBoundedWidth,
        hasBoundedHeight,
        hasTightWidth,
        hasTightHeight,
        isTight,
        isNormalized,
    };
}
function createTightConstraints(width, height) {
    return createBoxConstraints({
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
    });
}
function createLooseConstraints(maxWidth, maxHeight) {
    return createBoxConstraints({
        minWidth: 0,
        maxWidth: maxWidth ?? Number.POSITIVE_INFINITY,
        minHeight: 0,
        maxHeight: maxHeight ?? Number.POSITIVE_INFINITY,
    });
}
function createExpandedConstraints() {
    return createBoxConstraints({
        minWidth: Number.POSITIVE_INFINITY,
        maxWidth: Number.POSITIVE_INFINITY,
        minHeight: Number.POSITIVE_INFINITY,
        maxHeight: Number.POSITIVE_INFINITY,
    });
}
function createDefaultConstraints() {
    return createBoxConstraints({
        minWidth: 0,
        maxWidth: window.innerWidth,
        minHeight: 0,
        maxHeight: window.innerHeight,
    });
}
// Utility functions for working with constraints
const BoxConstraintsUtils = {
    /**
     * Returns the biggest size that satisfies the constraints
     */
    biggest(constraints) {
        return {
            width: constraints.hasBoundedWidth ? constraints.maxWidth : 0,
            height: constraints.hasBoundedHeight ? constraints.maxHeight : 0,
        };
    },
    /**
     * Returns the smallest size that satisfies the constraints
     */
    smallest(constraints) {
        return {
            width: constraints.minWidth,
            height: constraints.minHeight,
        };
    },
    /**
     * Returns a size that attempts to be the specified size within the constraints
     */
    constrain(constraints, width, height) {
        return {
            width: Math.max(constraints.minWidth, Math.min(constraints.maxWidth, width)),
            height: Math.max(constraints.minHeight, Math.min(constraints.maxHeight, height)),
        };
    },
    /**
     * Returns constraints with width constrained to the given value
     */
    tighten(constraints, width, height) {
        return createBoxConstraints({
            minWidth: width !== undefined ? width : constraints.minWidth,
            maxWidth: width !== undefined ? width : constraints.maxWidth,
            minHeight: height !== undefined ? height : constraints.minHeight,
            maxHeight: height !== undefined ? height : constraints.maxHeight,
        });
    },
    /**
     * Returns constraints with the width and height loosened
     */
    loosen(constraints) {
        return createBoxConstraints({
            minWidth: 0,
            maxWidth: constraints.maxWidth,
            minHeight: 0,
            maxHeight: constraints.maxHeight,
        });
    },
    /**
     * Returns constraints with the width tightened to the given value
     */
    tightenWidth(constraints, width) {
        return createBoxConstraints({
            minWidth: width,
            maxWidth: width,
            minHeight: constraints.minHeight,
            maxHeight: constraints.maxHeight,
        });
    },
    /**
     * Returns constraints with the height tightened to the given value
     */
    tightenHeight(constraints, height) {
        return createBoxConstraints({
            minWidth: constraints.minWidth,
            maxWidth: constraints.maxWidth,
            minHeight: height,
            maxHeight: height,
        });
    },
};

function OrientationBuilder({ builder, className = '', style = {} }) {
    const [orientation, setOrientation] = require$$0.useState(() => getCurrentOrientation());
    require$$0.useEffect(() => {
        const updateOrientation = () => {
            setOrientation(getCurrentOrientation());
        };
        // Listen for orientation changes
        const mediaQueryList = window.matchMedia('(orientation: portrait)');
        // For modern browsers
        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', updateOrientation);
        }
        else {
            // For older browsers
            mediaQueryList.addListener(updateOrientation);
        }
        // Also listen for resize events as a fallback
        window.addEventListener('resize', updateOrientation);
        // Listen for orientationchange event on mobile devices
        window.addEventListener('orientationchange', () => {
            // Small delay to ensure the orientation change is complete
            setTimeout(updateOrientation, 100);
        });
        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', updateOrientation);
            }
            else {
                mediaQueryList.removeListener(updateOrientation);
            }
            window.removeEventListener('resize', updateOrientation);
            window.removeEventListener('orientationchange', updateOrientation);
        };
    }, []);
    const content = builder(orientation);
    return (jsxRuntimeExports.jsx("div", { className: className, style: style, children: content }));
}
/**
 * Hook to get the current screen orientation
 */
function useOrientation() {
    const [orientation, setOrientation] = require$$0.useState(() => getCurrentOrientation());
    require$$0.useEffect(() => {
        const updateOrientation = () => {
            setOrientation(getCurrentOrientation());
        };
        const mediaQueryList = window.matchMedia('(orientation: portrait)');
        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', updateOrientation);
        }
        else {
            mediaQueryList.addListener(updateOrientation);
        }
        window.addEventListener('resize', updateOrientation);
        window.addEventListener('orientationchange', () => {
            setTimeout(updateOrientation, 100);
        });
        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', updateOrientation);
            }
            else {
                mediaQueryList.removeListener(updateOrientation);
            }
            window.removeEventListener('resize', updateOrientation);
            window.removeEventListener('orientationchange', updateOrientation);
        };
    }, []);
    return orientation;
}
/**
 * Hook to check if the current orientation matches the specified orientation
 */
function useOrientationMatch(targetOrientation) {
    const currentOrientation = useOrientation();
    return currentOrientation === targetOrientation;
}
/**
 * Hook that returns different values based on orientation
 */
function useOrientationValue(portraitValue, landscapeValue) {
    const orientation = useOrientation();
    return orientation === exports.Orientation.portrait ? portraitValue : landscapeValue;
}
// Helper functions
function getCurrentOrientation() {
    // First try to use the Screen Orientation API if available
    if (typeof window !== 'undefined' &&
        'screen' in window &&
        window.screen &&
        'orientation' in window.screen) {
        const screenWithOrientation = window.screen;
        const screenOrientation = screenWithOrientation.orientation;
        if (screenOrientation && typeof screenOrientation.angle === 'number') {
            // The Screen Orientation API provides more detailed orientation info
            return screenOrientation.angle === 0 || screenOrientation.angle === 180
                ? exports.Orientation.portrait
                : exports.Orientation.landscape;
        }
    }
    // Fallback to checking window dimensions
    return typeof window !== 'undefined' && window.innerHeight >= window.innerWidth
        ? exports.Orientation.portrait
        : exports.Orientation.landscape;
}
/**
 * Utility functions for working with orientation
 */
const OrientationUtils = {
    /**
     * Check if the current orientation is portrait
     */
    isPortrait() {
        return getCurrentOrientation() === exports.Orientation.portrait;
    },
    /**
     * Check if the current orientation is landscape
     */
    isLandscape() {
        return getCurrentOrientation() === exports.Orientation.landscape;
    },
    /**
     * Get the rotation angle (if supported)
     */
    getRotationAngle() {
        if ('screen' in window && 'orientation' in window.screen && window.screen.orientation) {
            return window.screen.orientation.angle;
        }
        // Fallback to deprecated window.orientation
        if ('orientation' in window) {
            const windowWithOrientation = window;
            return windowWithOrientation.orientation || 0;
        }
        return 0;
    },
    /**
     * Get aspect ratio of the screen
     */
    getAspectRatio() {
        return window.innerWidth / window.innerHeight;
    },
    /**
     * Check if the device is likely a mobile device based on orientation capabilities
     */
    isMobileDevice() {
        if (typeof window === 'undefined')
            return false;
        const windowWithOrientation = window;
        if ('orientation' in windowWithOrientation)
            return true;
        if ('screen' in window && window.screen && 'orientation' in window.screen) {
            return true;
        }
        return false;
    },
};

/**
 * Matrix4 class for 4x4 transformation matrices
 */
class Matrix4 {
    constructor(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 1, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 1, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1) {
        this.storage = new Float64Array([
            m00,
            m01,
            m02,
            m03,
            m10,
            m11,
            m12,
            m13,
            m20,
            m21,
            m22,
            m23,
            m30,
            m31,
            m32,
            m33,
        ]);
    }
    /**
     * Creates an identity matrix
     */
    static identity() {
        return new Matrix4();
    }
    /**
     * Creates a translation matrix
     */
    static translationValues(x, y, z = 0) {
        return new Matrix4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    }
    /**
     * Creates a scale matrix
     */
    static diagonal3Values(x, y, z = 1) {
        return new Matrix4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    }
    /**
     * Creates a rotation matrix around Z axis (degrees)
     */
    static rotationZ(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return new Matrix4(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    /**
     * Creates a rotation matrix around X axis (radians)
     */
    static rotationX(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return new Matrix4(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
    }
    /**
     * Creates a rotation matrix around Y axis (radians)
     */
    static rotationY(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return new Matrix4(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
    }
    /**
     * Creates a skew matrix
     */
    static skewX(radians) {
        const tan = Math.tan(radians);
        return new Matrix4(1, tan, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    static skewY(radians) {
        const tan = Math.tan(radians);
        return new Matrix4(1, 0, 0, 0, tan, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    /**
     * Multiplies this matrix by another matrix
     */
    multiply(other) {
        const result = new Matrix4();
        const a = this.storage;
        const b = other.storage;
        const r = result.storage;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const index = i * 4 + j;
                r[index] =
                    (a[i * 4 + 0] || 0) * (b[0 * 4 + j] || 0) +
                        (a[i * 4 + 1] || 0) * (b[1 * 4 + j] || 0) +
                        (a[i * 4 + 2] || 0) * (b[2 * 4 + j] || 0) +
                        (a[i * 4 + 3] || 0) * (b[3 * 4 + j] || 0);
            }
        }
        return result;
    }
    /**
     * Converts to CSS transform matrix3d string
     */
    toCssMatrix3d() {
        const m = this.storage;
        return `matrix3d(${Array.from(m).join(', ')})`;
    }
    /**
     * Converts to CSS transform matrix string (2D)
     */
    toCssMatrix() {
        const m = this.storage;
        return `matrix(${m[0]}, ${m[4]}, ${m[1]}, ${m[5]}, ${m[3]}, ${m[7]})`;
    }
    /**
     * Creates a copy of this matrix
     */
    clone() {
        const result = new Matrix4();
        result.storage.set(this.storage);
        return result;
    }
}
/**
 * Alignment enumeration for transform origin
 */
var Alignment;
(function (Alignment) {
    Alignment["topLeft"] = "top left";
    Alignment["topCenter"] = "top center";
    Alignment["topRight"] = "top right";
    Alignment["centerLeft"] = "center left";
    Alignment["center"] = "center";
    Alignment["centerRight"] = "center right";
    Alignment["bottomLeft"] = "bottom left";
    Alignment["bottomCenter"] = "bottom center";
    Alignment["bottomRight"] = "bottom right";
})(Alignment || (Alignment = {}));
exports.FilterQuality = void 0;
(function (FilterQuality) {
    /** Use browser default */
    FilterQuality["none"] = "auto";
    /** Low quality, fast */
    FilterQuality["low"] = "crisp-edges";
    /** Medium quality */
    FilterQuality["medium"] = "auto";
    /** High quality, slower */
    FilterQuality["high"] = "smooth";
})(exports.FilterQuality || (exports.FilterQuality = {}));
function Transform({ children, transform, alignment = Alignment.center, transformOrigin, filterQuality = exports.FilterQuality.medium, className = '', style = {}, }) {
    const transformStyle = require$$0.useMemo(() => {
        const origin = transformOrigin || alignment;
        return {
            transform: transform.toCssMatrix3d(),
            transformOrigin: origin,
            imageRendering: filterQuality,
        };
    }, [transform, alignment, transformOrigin, filterQuality]);
    const containerStyle = {
        ...transformStyle,
        ...style,
    };
    return (jsxRuntimeExports.jsx("div", { className: className, style: containerStyle, children: children }));
}
/**
 * Transform.rotate - Creates a rotation transformation
 */
Transform.rotate = ({ angle, children, alignment = Alignment.center, className = '', style = {}, }) => {
    const transform = Matrix4.rotationZ(angle);
    return (jsxRuntimeExports.jsx(Transform, { transform: transform, alignment: alignment, className: className, style: style, children: children }));
};
/**
 * Transform.scale - Creates a scale transformation
 */
Transform.scale = ({ scale, scaleX, scaleY, children, alignment = Alignment.center, className = '', style = {}, }) => {
    const sx = scaleX ?? scale ?? 1;
    const sy = scaleY ?? scale ?? 1;
    const transform = Matrix4.diagonal3Values(sx, sy);
    return (jsxRuntimeExports.jsx(Transform, { transform: transform, alignment: alignment, className: className, style: style, children: children }));
};
/**
 * Transform.translate - Creates a translation transformation
 */
Transform.translate = ({ offset, x = 0, y = 0, children, className = '', style = {}, }) => {
    const offsetX = offset?.x ?? x;
    const offsetY = offset?.y ?? y;
    const transform = Matrix4.translationValues(offsetX, offsetY);
    return (jsxRuntimeExports.jsx(Transform, { transform: transform, className: className, style: style, children: children }));
};
/**
 * Transform.flip - Creates a flip transformation
 */
Transform.flip = ({ flipX = false, flipY = false, children, alignment = Alignment.center, className = '', style = {}, }) => {
    const scaleX = flipX ? -1 : 1;
    const scaleY = flipY ? -1 : 1;
    const transform = Matrix4.diagonal3Values(scaleX, scaleY);
    return (jsxRuntimeExports.jsx(Transform, { transform: transform, alignment: alignment, className: className, style: style, children: children }));
};
/**
 * Utility functions for creating common transformations
 */
const TransformUtils = {
    /**
     * Convert degrees to radians
     */
    degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    },
    /**
     * Convert radians to degrees
     */
    radiansToDegrees(radians) {
        return (radians * 180) / Math.PI;
    },
    /**
     * Create a combined transformation matrix
     */
    combine(...matrices) {
        return matrices.reduce((acc, matrix) => acc.multiply(matrix), Matrix4.identity());
    },
    /**
     * Create a rotation transformation from degrees
     */
    rotationFromDegrees(degrees) {
        return Matrix4.rotationZ(this.degreesToRadians(degrees));
    },
    /**
     * Create a complex transformation with translation, rotation, and scale
     */
    createComplex({ translateX = 0, translateY = 0, rotation = 0, scaleX = 1, scaleY = 1, }) {
        const translate = Matrix4.translationValues(translateX, translateY);
        const rotate = Matrix4.rotationZ(rotation);
        const scale = Matrix4.diagonal3Values(scaleX, scaleY);
        // Apply transformations in order: scale, rotate, translate
        return translate.multiply(rotate).multiply(scale);
    },
};

function Opacity({ children, opacity, alwaysIncludeSemantics = false, className = '', style = {}, }) {
    // Clamp opacity value between 0 and 1
    const clampedOpacity = Math.max(0, Math.min(1, opacity));
    // Determine if content should be visible to screen readers
    const shouldIncludeSemantics = alwaysIncludeSemantics || clampedOpacity > 0;
    const containerStyle = {
        opacity: clampedOpacity,
        // Maintain layout space even when opacity is 0
        visibility: shouldIncludeSemantics ? 'visible' : 'hidden',
        ...style,
    };
    return (jsxRuntimeExports.jsx("div", { className: className, style: containerStyle, "aria-hidden": !shouldIncludeSemantics, children: children }));
}

function mapKeyboard(type) {
    switch (type) {
        case 'emailAddress':
            return { htmlType: 'email', inputMode: 'email' };
        case 'number':
            return { htmlType: 'text', inputMode: 'numeric' }; // keep text to allow custom validation
        case 'phone':
            return { htmlType: 'tel', inputMode: 'tel' };
        case 'url':
            return { htmlType: 'url', inputMode: 'url' };
        case 'password':
            return { htmlType: 'password' };
        default:
            return { htmlType: 'text' };
    }
}
function applyCapitalization(text, mode) {
    if (!mode || mode === 'none')
        return text;
    switch (mode) {
        case 'characters':
            return text.toUpperCase();
        case 'words':
            return text.replace(/(^|\s)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
        case 'sentences':
            return text.replace(/(^|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
        default:
            return text;
    }
}
/**
 * A Flutter TextField–inspired React component.
 *
 * NOTE: This mirrors common TextField props & behaviors from Flutter's material.TextField
 * (controller, decoration, obscureText, maxLength, minLines, maxLines, expands, enabled, readOnly,
 * autofocus, textInputAction-like submit on Enter, onEditingComplete, onSubmitted, etc.).
 * Some Flutter features don't map 1:1 to the web; where not possible, we emulate sensible equivalents.
 *
 * @example
 * ```tsx
 * // Basic text field
 * <TextField
 *   value={text}
 *   onChangeText={setText}
 *   decoration={{
 *     labelText: "Enter your name",
 *     hintText: "Type here..."
 *   }}
 * />
 *
 * // Multiline text field
 * <TextField
 *   maxLines={null}
 *   minLines={3}
 *   decoration={{
 *     labelText: "Description",
 *     border: "outline"
 *   }}
 * />
 *
 * // Password field
 * <TextField
 *   obscureText={true}
 *   keyboardType="password"
 *   decoration={{
 *     labelText: "Password",
 *     suffixIcon: <EyeIcon />
 *   }}
 * />
 * ```
 */
const TextField = require$$0.forwardRef(function TextField(props, ref) {
    const { value, defaultValue, onChangeText, onChanged, onEditingComplete, onSubmitted, onFocus, onBlur, onTap, style, textAlign = 'start', textDirection, textCapitalization = 'none', maxLength, maxLines = 1, minLines, expands = false, obscureText = false, obscuringCharacter: _, // not used directly; browser uses own mask
    enabled = true, readOnly = false, autoFocus = false, canRequestFocus: __ = true, keyboardType = 'text', textInputAction = 'none', inputMode, decoration = {}, id, name, placeholder, forwardedRef, className, containerStyle, } = props;
    const [inner, setInner] = require$$0.useState(defaultValue ?? '');
    const controlled = value !== undefined;
    const currentValue = controlled ? value : inner;
    const inputRef = require$$0.useRef(null);
    // expose imperative API
    require$$0.useImperativeHandle(ref ?? forwardedRef, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        select: () => inputRef.current?.select?.(),
        clear: () => {
            if (controlled) {
                (onChangeText ?? onChanged)?.('');
            }
            else {
                setInner('');
            }
        },
        getValue: () => currentValue,
        setValue: (v) => {
            if (!controlled)
                setInner(v);
        },
    }), [controlled, currentValue, onChangeText, onChanged]);
    // map Flutter keyboard type -> HTML
    const { htmlType, inputMode: autoInputMode } = require$$0.useMemo(() => mapKeyboard(obscureText ? 'password' : keyboardType), [keyboardType, obscureText]);
    // compute props
    const dir = textDirection;
    const ta = textAlign === 'start'
        ? undefined
        : textAlign === 'end'
            ? undefined
            : textAlign;
    // enterKeyHint mapping removed as it's not used in the implementation
    const handleChange = require$$0.useCallback((e) => {
        let text = e.target.value;
        if (textCapitalization && textCapitalization !== 'none') {
            const target = e.target;
            const cursor = target.selectionStart;
            text = applyCapitalization(text, textCapitalization);
            // try to restore caret if capitalization changed length (best-effort)
            if (cursor != null) {
                requestAnimationFrame(() => {
                    try {
                        target.setSelectionRange(cursor, cursor);
                    }
                    catch { }
                });
            }
        }
        if (controlled) {
            (onChangeText ?? onChanged)?.(text);
        }
        else {
            setInner(text);
            (onChangeText ?? onChanged)?.(text);
        }
    }, [controlled, onChangeText, onChanged, textCapitalization]);
    const handleKeyDown = require$$0.useCallback((e) => {
        if (e.key === 'Enter') {
            onEditingComplete?.();
            onSubmitted?.(currentValue);
            if (textInputAction === 'next') {
                // try to focus next focusable element
                const form = e.currentTarget.form;
                if (form) {
                    const elements = Array.from(form.querySelectorAll('input, textarea, [tabindex]'));
                    const idx = elements.indexOf(e.currentTarget);
                    if (idx >= 0 && idx + 1 < elements.length)
                        elements[idx + 1]?.focus();
                }
            }
        }
    }, [currentValue, onEditingComplete, onSubmitted, textInputAction]);
    const handleBlur = require$$0.useCallback(() => {
        onEditingComplete?.();
        onBlur?.();
    }, [onEditingComplete, onBlur]);
    const disabled = !enabled;
    const showTextarea = expands || maxLines == null || maxLines > 1 || (minLines != null && minLines > 1);
    const { labelText, hintText, helperText, errorText, prefixIcon, suffixIcon, counterText, filled, fillColor, border, } = decoration;
    const baseField = showTextarea ? (jsxRuntimeExports.jsx("textarea", { ref: inputRef, id: id, name: name, value: currentValue, onChange: handleChange, onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: handleBlur, onClick: onTap, placeholder: placeholder ?? hintText, maxLength: maxLength, readOnly: readOnly, disabled: disabled, 
        // biome-ignore lint/a11y/noAutofocus: autoFocus is needed for Flutter compatibility
        autoFocus: autoFocus, dir: dir, rows: minLines ?? 1, style: {
            width: '100%',
            resize: expands ? 'none' : 'vertical',
            flex: expands ? 1 : undefined,
            minHeight: expands ? 0 : undefined,
            textAlign: ta,
            ...style,
        }, className: "rtf-input" })) : (jsxRuntimeExports.jsx("input", { ref: inputRef, id: id, name: name, type: obscureText ? 'password' : htmlType, inputMode: inputMode ?? autoInputMode, value: currentValue, onChange: handleChange, onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: handleBlur, onClick: onTap, placeholder: placeholder ?? hintText, maxLength: maxLength, readOnly: readOnly, disabled: disabled, 
        // biome-ignore lint/a11y/noAutofocus: autoFocus is needed for Flutter compatibility
        autoFocus: autoFocus, dir: dir, style: {
            width: '100%',
            textAlign: ta,
            ...style,
        }, className: "rtf-input" }));
    const showCounter = maxLength != null || counterText;
    const computedCounterText = counterText ?? (maxLength != null ? `${currentValue.length} / ${maxLength}` : undefined);
    return (jsxRuntimeExports.jsxs("label", { className: `rtf-container ${className ?? ''}`, style: { display: 'block', ...containerStyle }, htmlFor: id, children: [labelText && jsxRuntimeExports.jsx("span", { className: "rtf-label", children: labelText }), jsxRuntimeExports.jsxs("div", { className: `rtf-wrapper ${errorText ? 'rtf-error ' : ''}${filled ? 'rtf-filled ' : ''}${border ? `rtf-border-${border} ` : 'rtf-border-outline '}`, style: { background: filled ? (fillColor ?? '#f6f6f6') : undefined }, children: [prefixIcon && jsxRuntimeExports.jsx("span", { className: "rtf-prefix", children: prefixIcon }), baseField, suffixIcon && jsxRuntimeExports.jsx("span", { className: "rtf-suffix", children: suffixIcon })] }), helperText && !errorText && jsxRuntimeExports.jsx("div", { className: "rtf-helper", children: helperText }), errorText && jsxRuntimeExports.jsx("div", { className: "rtf-error-text", children: errorText }), showCounter && jsxRuntimeExports.jsx("div", { className: "rtf-counter", children: computedCounterText }), jsxRuntimeExports.jsx("style", { children: `
        .rtf-container { font: inherit; color: inherit; }
        .rtf-label { display:block; margin-bottom: 4px; font-size: 0.875rem; color: #555; }
        .rtf-wrapper { display:flex; align-items:center; gap:8px; padding: 10px 12px; border-radius: 8px; }
        .rtf-border-outline { border:1px solid #d0d7de; }
        .rtf-border-underline { border-bottom:1px solid #d0d7de; border-radius:0; padding-left:0; padding-right:0; }
        .rtf-border-none { border:none; }
        .rtf-input { background:transparent; border:none; outline:none; font: inherit; color: inherit; }
        .rtf-input:disabled { color:#9aa0a6; }
        .rtf-filled { background: var(--rtf-fill, #f6f6f6); }
        .rtf-helper { margin-top: 4px; font-size: 0.75rem; color: #6b7280; }
        .rtf-error-text { margin-top: 4px; font-size: 0.75rem; color: #b00020; }
        .rtf-error .rtf-border-outline, .rtf-error .rtf-border-underline { border-color:#b00020; }
        .rtf-counter { margin-top: 4px; font-size: 0.75rem; color:#6b7280; text-align:right; }
        .rtf-prefix, .rtf-suffix { display:flex; align-items:center; }
      ` })] }));
});

/**
 * A Flutter Text widget-inspired React component for displaying text with advanced styling and layout options.
 *
 * NOTE: This mirrors Flutter's Text widget behavior including text overflow handling, line clamping,
 * text scaling, and advanced typography features. Some Flutter features are adapted for web compatibility
 * using modern CSS techniques like -webkit-line-clamp and CSS mask-image for fade effects.
 *
 * Key implementation details:
 * - maxLines: Uses -webkit-line-clamp for multi-line truncation or single-line techniques
 * - overflow: "ellipsis" uses text-overflow; "fade" uses CSS mask-image for fade effect
 * - softWrap: Controls white-space and word-wrap behavior
 * - textAlign: "start"/"end" converts to left/right based on text direction
 * - textScaleFactor/textScaler: Multiplies font-size by the scale factor
 * - selectionColor: Creates dynamic CSS class with ::selection rules
 *
 * @example
 * ```tsx
 * // Basic text display
 * <Text data="Hello, World!" />
 *
 * // Styled text with custom styling
 * <Text
 *   data="Styled Text"
 *   style={{
 *     fontSize: 18,
 *     fontWeight: 600,
 *     color: '#2563eb'
 *   }}
 *   textAlign="center"
 * />
 *
 * // Rich text with children
 * <Text>
 *   Hello <span style={{ fontWeight: 'bold' }}>World</span>!
 * </Text>
 *
 * // Text with line clamping and overflow
 * <Text
 *   data="This is a very long text that will be truncated after 2 lines with an ellipsis..."
 *   maxLines={2}
 *   overflow="ellipsis"
 *   softWrap={true}
 * />
 *
 * // Text with fade overflow effect
 * <Text
 *   data="This text will fade out at the end instead of being cut off abruptly"
 *   maxLines={1}
 *   overflow="fade"
 * />
 *
 * // Scaled text
 * <Text
 *   data="Large text"
 *   textScaler={1.5}
 *   style={{ fontSize: 16 }}
 * />
 *
 * // Text with custom selection color
 * <Text
 *   data="Select this text to see custom selection color"
 *   selectionColor="#fbbf24"
 * />
 * ```
 */
const Text = ({ data, children, style, textAlign, softWrap = true, overflow = 'clip', maxLines, textScaleFactor, textScaler, locale, textDirection = TextDirection.AUTO, semanticsLabel, semanticsIdentifier, selectionColor, className, }) => {
    const id = require$$0.useId(); // Used for selectionColor class generation
    // Generate Tailwind classes and custom styles
    const { tailwindClasses, customStyle } = require$$0.useMemo(() => {
        const classes = [];
        const css = {};
        // Handle text styling
        if (style) {
            const { color, fontSize, fontWeight, fontStyle, fontFamily, letterSpacing, wordSpacing, height, decoration, decorationColor, decorationStyle, decorationThickness, } = style;
            Object.assign(css, {
                color,
                fontStyle,
                fontFamily,
                fontWeight,
                letterSpacing,
                wordSpacing,
                textDecoration: decoration,
                textDecorationColor: decorationColor,
                textDecorationStyle: decorationStyle,
                textDecorationThickness: decorationThickness,
            });
            if (height !== undefined) {
                css.lineHeight = height;
            }
            // Text scaling: textScaler takes precedence over textScaleFactor
            const scale = textScaler ?? textScaleFactor ?? 1;
            if (fontSize !== undefined) {
                css.fontSize = Math.max(0, fontSize * scale);
            }
            else if (scale !== 1) {
                css.fontSize = `${scale}em`;
            }
        }
        // Handle text alignment with Tailwind classes
        if (textAlign) {
            if (textAlign === 'start') {
                classes.push(textDirection === TextDirection.RTL ? 'text-right' : 'text-left');
            }
            else if (textAlign === 'end') {
                classes.push(textDirection === TextDirection.RTL ? 'text-left' : 'text-right');
            }
            else if (textAlign === 'center') {
                classes.push('text-center');
            }
            else if (textAlign === 'justify') {
                classes.push('text-justify');
            }
        }
        // Handle line wrapping and clamping with Tailwind
        if (!softWrap) {
            classes.push('whitespace-nowrap');
            if (overflow === 'ellipsis') {
                classes.push('overflow-hidden', 'text-ellipsis');
            }
            else if (overflow === 'clip') {
                classes.push('overflow-hidden');
            }
            else if (overflow === 'fade') {
                classes.push('overflow-hidden');
                Object.assign(css, {
                    WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    maskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                });
            }
        }
        else {
            // Normal text wrapping behavior (default) - preserve line breaks with pre-wrap
            classes.push('whitespace-pre-wrap');
            if (maxLines && maxLines > 0) {
                // Use Tailwind line-clamp utilities
                if (maxLines <= 6) {
                    classes.push(`line-clamp-${maxLines}`);
                }
                else {
                    // For maxLines > 6, use custom line-clamp
                    classes.push('overflow-hidden');
                    Object.assign(css, {
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: maxLines,
                    });
                }
                // Handle overflow with line-clamp
                if (overflow === 'clip') {
                    // Remove ellipsis from line-clamp
                    Object.assign(css, {
                        textOverflow: 'clip',
                    });
                }
                else if (overflow === 'fade') {
                    Object.assign(css, {
                        WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    });
                }
                // overflow === 'ellipsis' is handled by default line-clamp behavior
            }
            else {
                // No line limit, normal wrapping
                if (overflow === 'fade') {
                    Object.assign(css, {
                        WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                    });
                }
            }
        }
        return {
            tailwindClasses: classes.join(' '),
            customStyle: css,
        };
    }, [style, textAlign, softWrap, overflow, maxLines, textScaleFactor, textScaler, textDirection]);
    // Generate unique class name for selection color
    const selectionClass = require$$0.useMemo(() => {
        if (!selectionColor)
            return undefined;
        // Use useId to generate collision-resistant class name
        return `text-selection-${id.replace(/[:]/g, '-')}`;
    }, [selectionColor, id]);
    // Dynamic style injection for selection color
    const selectionStyleTag = selectionColor && selectionClass ? (jsxRuntimeExports.jsx("style", { children: `
      .${selectionClass}::selection { background: ${selectionColor}; }
      .${selectionClass}::-moz-selection { background: ${selectionColor}; }
    ` })) : null;
    // Accessibility and semantic attributes
    const ariaLabel = semanticsLabel;
    const elemId = semanticsIdentifier || undefined;
    // Combine CSS classes
    const combinedClassName = [tailwindClasses, selectionClass, className].filter(Boolean).join(' ') || undefined;
    // Render the text component using div element to avoid baseline alignment issues
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [selectionStyleTag, jsxRuntimeExports.jsx("div", { id: elemId, className: combinedClassName, style: customStyle, lang: locale, dir: textDirection === TextDirection.AUTO ? 'auto' : textDirection.toLowerCase(), "aria-label": ariaLabel, children: children ?? data })] }));
};

class Gradient {
    constructor(options) {
        this.colors = options.colors;
        this.stops = options.stops;
    }
}
class LinearGradient extends Gradient {
    constructor(options) {
        super({ colors: options.colors, stops: options.stops });
        this.begin = options.begin || Alignment$1.centerLeft;
        this.end = options.end || Alignment$1.centerRight;
        this.tileMode = options.tileMode || 'clamp';
    }
    alignmentToAngle(begin, end) {
        const resolvedBegin = begin.resolve(null);
        const resolvedEnd = end.resolve(null);
        const dx = resolvedEnd.x - resolvedBegin.x;
        const dy = resolvedEnd.y - resolvedBegin.y;
        return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    }
    toCSS() {
        const angle = this.alignmentToAngle(this.begin, this.end);
        let colorStops;
        if (this.stops && this.stops.length === this.colors.length) {
            const stops = this.stops; // TypeScript narrowing
            colorStops = this.colors.map((color, index) => {
                const stop = stops[index] ?? 0;
                return `${color} ${stop * 100}%`;
            });
        }
        else {
            colorStops = this.colors.map((color, index) => {
                const percentage = this.colors.length === 1 ? 0 : (index / (this.colors.length - 1)) * 100;
                return `${color} ${percentage}%`;
            });
        }
        return `linear-gradient(${angle}deg, ${colorStops.join(', ')})`;
    }
}
class RadialGradient extends Gradient {
    constructor(options) {
        super({ colors: options.colors, stops: options.stops });
        this.center = options.center || Alignment$1.center;
        this.radius = options.radius || 0.5;
        this.focal = options.focal;
        this.focalRadius = options.focalRadius || 0;
        this.tileMode = options.tileMode || 'clamp';
    }
    alignmentToPercentage(alignment) {
        const resolved = alignment.resolve(null);
        const x = (((resolved.x + 1) / 2) * 100).toFixed(1);
        const y = (((resolved.y + 1) / 2) * 100).toFixed(1);
        return { x: `${x}%`, y: `${y}%` };
    }
    toCSS() {
        const centerPos = this.alignmentToPercentage(this.center);
        let colorStops;
        if (this.stops && this.stops.length === this.colors.length) {
            const stops = this.stops; // TypeScript narrowing
            colorStops = this.colors.map((color, index) => {
                const stop = stops[index] ?? 0;
                return `${color} ${stop * 100}%`;
            });
        }
        else {
            colorStops = this.colors.map((color, index) => {
                const percentage = this.colors.length === 1 ? 0 : (index / (this.colors.length - 1)) * 100;
                return `${color} ${percentage}%`;
            });
        }
        const radiusValue = `${this.radius * 100}%`;
        return `radial-gradient(circle ${radiusValue} at ${centerPos.x} ${centerPos.y}, ${colorStops.join(', ')})`;
    }
}
class SweepGradient extends Gradient {
    constructor(options) {
        super({ colors: options.colors, stops: options.stops });
        this.center = options.center || Alignment$1.center;
        this.startAngle = options.startAngle || 0;
        this.endAngle = options.endAngle || Math.PI * 2;
        this.tileMode = options.tileMode || 'clamp';
    }
    alignmentToPercentage(alignment) {
        const resolved = alignment.resolve(null);
        const x = (((resolved.x + 1) / 2) * 100).toFixed(1);
        const y = (((resolved.y + 1) / 2) * 100).toFixed(1);
        return { x: `${x}%`, y: `${y}%` };
    }
    toCSS() {
        const centerPos = this.alignmentToPercentage(this.center);
        const startAngleDeg = this.startAngle * (180 / Math.PI);
        let colorStops;
        if (this.stops && this.stops.length === this.colors.length) {
            const stops = this.stops; // TypeScript narrowing
            colorStops = this.colors.map((color, index) => {
                const stop = stops[index] ?? 0;
                const angle = startAngleDeg + stop * (this.endAngle - this.startAngle) * (180 / Math.PI);
                return `${color} ${angle}deg`;
            });
        }
        else {
            colorStops = this.colors.map((color, index) => {
                const progress = this.colors.length === 1 ? 0 : index / (this.colors.length - 1);
                const angle = startAngleDeg + progress * (this.endAngle - this.startAngle) * (180 / Math.PI);
                return `${color} ${angle}deg`;
            });
        }
        return `conic-gradient(from ${startAngleDeg}deg at ${centerPos.x} ${centerPos.y}, ${colorStops.join(', ')})`;
    }
}

class Radius {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static circular(radius) {
        return new Radius(radius, radius);
    }
    static elliptical(x, y) {
        return new Radius(x, y);
    }
    static get zero() {
        return new Radius(0, 0);
    }
    toString() {
        if (this.x === this.y) {
            return `${this.x}px`;
        }
        return `${this.x}px ${this.y}px`;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}
class BorderRadius {
    constructor(topLeft = Radius.zero, topRight = Radius.zero, bottomLeft = Radius.zero, bottomRight = Radius.zero) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
    static all(radius) {
        return new BorderRadius(radius, radius, radius, radius);
    }
    static circular(radius) {
        const r = Radius.circular(radius);
        return BorderRadius.all(r);
    }
    static horizontal({ left = Radius.zero, right = Radius.zero, } = {}) {
        return new BorderRadius(left, right, left, right);
    }
    static vertical({ top = Radius.zero, bottom = Radius.zero, } = {}) {
        return new BorderRadius(top, top, bottom, bottom);
    }
    static only({ topLeft = Radius.zero, topRight = Radius.zero, bottomLeft = Radius.zero, bottomRight = Radius.zero, } = {}) {
        return new BorderRadius(topLeft, topRight, bottomLeft, bottomRight);
    }
    static get zero() {
        return new BorderRadius();
    }
    copyWith({ topLeft, topRight, bottomLeft, bottomRight, } = {}) {
        return new BorderRadius(topLeft ?? this.topLeft, topRight ?? this.topRight, bottomLeft ?? this.bottomLeft, bottomRight ?? this.bottomRight);
    }
    add(other) {
        return new BorderRadius(new Radius(this.topLeft.x + other.topLeft.x, this.topLeft.y + other.topLeft.y), new Radius(this.topRight.x + other.topRight.x, this.topRight.y + other.topRight.y), new Radius(this.bottomLeft.x + other.bottomLeft.x, this.bottomLeft.y + other.bottomLeft.y), new Radius(this.bottomRight.x + other.bottomRight.x, this.bottomRight.y + other.bottomRight.y));
    }
    subtract(other) {
        return new BorderRadius(new Radius(this.topLeft.x - other.topLeft.x, this.topLeft.y - other.topLeft.y), new Radius(this.topRight.x - other.topRight.x, this.topRight.y - other.topRight.y), new Radius(this.bottomLeft.x - other.bottomLeft.x, this.bottomLeft.y - other.bottomLeft.y), new Radius(this.bottomRight.x - other.bottomRight.x, this.bottomRight.y - other.bottomRight.y));
    }
    multiply(factor) {
        return new BorderRadius(new Radius(this.topLeft.x * factor, this.topLeft.y * factor), new Radius(this.topRight.x * factor, this.topRight.y * factor), new Radius(this.bottomLeft.x * factor, this.bottomLeft.y * factor), new Radius(this.bottomRight.x * factor, this.bottomRight.y * factor));
    }
    divide(divisor) {
        return new BorderRadius(new Radius(this.topLeft.x / divisor, this.topLeft.y / divisor), new Radius(this.topRight.x / divisor, this.topRight.y / divisor), new Radius(this.bottomLeft.x / divisor, this.bottomLeft.y / divisor), new Radius(this.bottomRight.x / divisor, this.bottomRight.y / divisor));
    }
    remainder(divisor) {
        return new BorderRadius(new Radius(this.topLeft.x % divisor, this.topLeft.y % divisor), new Radius(this.topRight.x % divisor, this.topRight.y % divisor), new Radius(this.bottomLeft.x % divisor, this.bottomLeft.y % divisor), new Radius(this.bottomRight.x % divisor, this.bottomRight.y % divisor));
    }
    integerDivide(divisor) {
        return new BorderRadius(new Radius(Math.floor(this.topLeft.x / divisor), Math.floor(this.topLeft.y / divisor)), new Radius(Math.floor(this.topRight.x / divisor), Math.floor(this.topRight.y / divisor)), new Radius(Math.floor(this.bottomLeft.x / divisor), Math.floor(this.bottomLeft.y / divisor)), new Radius(Math.floor(this.bottomRight.x / divisor), Math.floor(this.bottomRight.y / divisor)));
    }
    negate() {
        return new BorderRadius(new Radius(-this.topLeft.x, -this.topLeft.y), new Radius(-this.topRight.x, -this.topRight.y), new Radius(-this.bottomLeft.x, -this.bottomLeft.y), new Radius(-this.bottomRight.x, -this.bottomRight.y));
    }
    static lerp(a, b, t) {
        if (a === null && b === null)
            return null;
        if (a === null)
            return b?.multiply(t) ?? null;
        if (b === null)
            return a.multiply(1.0 - t);
        return new BorderRadius(new Radius(a.topLeft.x + (b.topLeft.x - a.topLeft.x) * t, a.topLeft.y + (b.topLeft.y - a.topLeft.y) * t), new Radius(a.topRight.x + (b.topRight.x - a.topRight.x) * t, a.topRight.y + (b.topRight.y - a.topRight.y) * t), new Radius(a.bottomLeft.x + (b.bottomLeft.x - a.bottomLeft.x) * t, a.bottomLeft.y + (b.bottomLeft.y - a.bottomLeft.y) * t), new Radius(a.bottomRight.x + (b.bottomRight.x - a.bottomRight.x) * t, a.bottomRight.y + (b.bottomRight.y - a.bottomRight.y) * t));
    }
    resolve() {
        return this;
    }
    toCSS() {
        const tl = this.topLeft.toString();
        const tr = this.topRight.toString();
        const bl = this.bottomLeft.toString();
        const br = this.bottomRight.toString();
        if (tl === tr && tr === bl && bl === br) {
            return tl;
        }
        if (tl === br && tr === bl) {
            if (tl === tr) {
                return tl;
            }
            return `${tl} ${tr}`;
        }
        if (tr === bl) {
            return `${tl} ${tr} ${br}`;
        }
        return `${tl} ${tr} ${br} ${bl}`;
    }
    toString() {
        return `BorderRadius(${this.topLeft.toString()}, ${this.topRight.toString()}, ${this.bottomLeft.toString()}, ${this.bottomRight.toString()})`;
    }
    equals(other) {
        return (this.topLeft.equals(other.topLeft) &&
            this.topRight.equals(other.topRight) &&
            this.bottomLeft.equals(other.bottomLeft) &&
            this.bottomRight.equals(other.bottomRight));
    }
}

/**
 * Scroll physics utility classes for implementing various scrolling behaviors.
 * Inspired by Flutter's ScrollPhysics API to provide consistent behavior across platforms.
 * Uses CSS scroll-snap for optimal performance.
 */
/**
 * PageScrollPhysics implementation that provides page-like snapping behavior.
 * Equivalent to Flutter's PageScrollPhysics class.
 *
 * This physics causes the scroll view to snap to item boundaries,
 * making it ideal for implementing carousel-like behavior.
 * Uses CSS scroll-snap for optimal performance.
 *
 * @example
 * ```tsx
 * const physics = new PageScrollPhysics({
 *   snapAlign: 'start',
 *   snapType: 'mandatory'
 * })
 *
 * <ListView.builder
 *   scrollDirection={Axis.HORIZONTAL}
 *   physics={physics}
 *   itemCount={items.length}
 *   itemBuilder={(index) => <Card key={index} />}
 * />
 * ```
 */
class PageScrollPhysics {
    constructor(config = {}) {
        this.config = {
            snapAlign: 'start',
            snapType: 'mandatory',
            ...config,
        };
    }
    /**
     * Returns the CSS classes needed for scroll snapping behavior.
     * Uses CSS scroll-snap for optimal performance.
     *
     * @param direction - Scroll direction ('horizontal' or 'vertical')
     * @returns Array of CSS classes to apply
     */
    getClasses(direction = 'horizontal') {
        const classes = [];
        // Add scroll-snap-type based on direction and type
        if (direction === 'horizontal') {
            classes.push('snap-x');
        }
        else {
            classes.push('snap-y');
        }
        // Add snap strictness
        if (this.config.snapType === 'mandatory') {
            classes.push('snap-mandatory');
        }
        else {
            classes.push('snap-proximity');
        }
        return classes;
    }
    /**
     * Returns the CSS classes for scroll snap items.
     * Applied to each child item in the scroll container.
     *
     * @returns Array of CSS classes for items
     */
    getItemClasses() {
        const classes = [];
        // Add scroll-snap-align based on config
        switch (this.config.snapAlign) {
            case 'start':
                classes.push('snap-start');
                break;
            case 'center':
                classes.push('snap-center');
                break;
            case 'end':
                classes.push('snap-end');
                break;
        }
        return classes;
    }
    /**
     * Creates a PageScrollPhysics instance with default settings optimized for carousels
     */
    static carousel(config = {}) {
        return new PageScrollPhysics({
            snapAlign: 'start',
            snapType: 'mandatory',
            ...config,
        });
    }
    /**
     * Creates a PageScrollPhysics instance with settings optimized for full-page scrolling
     */
    static page(config = {}) {
        return new PageScrollPhysics({
            snapAlign: 'start',
            snapType: 'mandatory',
            ...config,
        });
    }
}
/**
 * Utility function to create PageScrollPhysics with common presets
 */
function createPageScrollPhysics(preset = 'carousel', config) {
    switch (preset) {
        case 'carousel':
            return PageScrollPhysics.carousel(config);
        case 'page':
            return PageScrollPhysics.page(config);
        default:
            return new PageScrollPhysics(config);
    }
}

exports.Align = Align;
exports.Alignment = Alignment$1;
exports.AlignmentDirectional = AlignmentDirectional;
exports.AnimatedContainer = AnimatedContainer;
exports.AnimatedOpacity = AnimatedOpacity;
exports.BorderRadius = BorderRadius;
exports.BoxConstraintsUtils = BoxConstraintsUtils;
exports.Column = Column;
exports.Container = Container;
exports.Divider = Divider;
exports.EdgeInsets = EdgeInsets;
exports.Flex = Flex;
exports.GestureDetector = GestureDetector;
exports.Gradient = Gradient;
exports.InkWell = InkWell;
exports.LayoutBuilder = LayoutBuilder;
exports.LinearGradient = LinearGradient;
exports.ListView = ListView$1;
exports.MediaQuery = MediaQuery;
exports.Opacity = Opacity;
exports.OrientationBuilder = OrientationBuilder;
exports.OrientationUtils = OrientationUtils;
exports.PageScrollPhysics = PageScrollPhysics;
exports.RadialGradient = RadialGradient;
exports.Radius = Radius;
exports.Row = Row;
exports.SizedBox = SizedBox;
exports.Spacer = Spacer;
exports.SweepGradient = SweepGradient;
exports.Text = Text;
exports.TextField = TextField;
exports.Transform = Transform;
exports.TransformUtils = TransformUtils;
exports.alignmentToCSS = alignmentToCSS;
exports.alignmentToFlexClasses = alignmentToFlexClasses;
exports.alignmentToTransformOrigin = alignmentToTransformOrigin;
exports.createBoxConstraints = createBoxConstraints;
exports.createExpandedConstraints = createExpandedConstraints;
exports.createLooseConstraints = createLooseConstraints;
exports.createPageScrollPhysics = createPageScrollPhysics;
exports.createTightConstraints = createTightConstraints;
exports.defaultBreakpoints = defaultBreakpoints;
exports.useBreakpoint = useBreakpoint;
exports.useBreakpointMatch = useBreakpointMatch;
exports.useMediaQuery = useMediaQuery;
exports.useOrientation = useOrientation;
exports.useOrientationMatch = useOrientationMatch;
exports.useOrientationValue = useOrientationValue;
//# sourceMappingURL=index.js.map
