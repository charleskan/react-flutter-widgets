import require$$0, { forwardRef, useRef, useImperativeHandle, useMemo, useState, useEffect, useCallback, createContext, useContext, useId } from 'react';

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
 * Main axis alignment controls how children are positioned along the main axis
 */
var MainAxisAlignment;
(function (MainAxisAlignment) {
    MainAxisAlignment["START"] = "flex-start";
    MainAxisAlignment["CENTER"] = "center";
    MainAxisAlignment["END"] = "flex-end";
    MainAxisAlignment["SPACE_BETWEEN"] = "space-between";
    MainAxisAlignment["SPACE_AROUND"] = "space-around";
    MainAxisAlignment["SPACE_EVENLY"] = "space-evenly";
})(MainAxisAlignment || (MainAxisAlignment = {}));
/**
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
var CrossAxisAlignment;
(function (CrossAxisAlignment) {
    CrossAxisAlignment["START"] = "flex-start";
    CrossAxisAlignment["CENTER"] = "center";
    CrossAxisAlignment["END"] = "flex-end";
    CrossAxisAlignment["STRETCH"] = "stretch";
    CrossAxisAlignment["BASELINE"] = "baseline";
})(CrossAxisAlignment || (CrossAxisAlignment = {}));
/**
 * Main axis size controls how much space the flex container should occupy
 */
var MainAxisSize;
(function (MainAxisSize) {
    MainAxisSize["MIN"] = "min-content";
    MainAxisSize["MAX"] = "max-content";
})(MainAxisSize || (MainAxisSize = {}));
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
 * Vertical direction for column layout
 */
var VerticalDirection;
(function (VerticalDirection) {
    VerticalDirection["UP"] = "column-reverse";
    VerticalDirection["DOWN"] = "column";
})(VerticalDirection || (VerticalDirection = {}));
/**
 * Text baseline for alignment
 */
var TextBaseline;
(function (TextBaseline) {
    TextBaseline["ALPHABETIC"] = "alphabetic";
    TextBaseline["IDEOGRAPHIC"] = "ideographic";
})(TextBaseline || (TextBaseline = {}));
/**
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
 */
const EdgeInsets = {
    /**
     * Creates uniform spacing for all sides
     * @param value - The spacing value (number will be converted to px)
     */
    all(value) {
        const spacingValue = typeof value === 'number' ? `${value}px` : value;
        return spacingValue;
    },
    /**
     * Creates symmetric spacing for horizontal and/or vertical sides
     * @param options - Object containing horizontal and/or vertical spacing values
     */
    symmetric(options) {
        const horizontal = options.horizontal
            ? typeof options.horizontal === 'number'
                ? `${options.horizontal}px`
                : options.horizontal
            : '0';
        const vertical = options.vertical
            ? typeof options.vertical === 'number'
                ? `${options.vertical}px`
                : options.vertical
            : '0';
        return `${vertical} ${horizontal}`;
    },
    /**
     * Creates spacing with individual control for each side
     * @param options - Object containing left, top, right, and/or bottom spacing values
     */
    only(options) {
        const top = options.top
            ? typeof options.top === 'number'
                ? `${options.top}px`
                : options.top
            : '0';
        const right = options.right
            ? typeof options.right === 'number'
                ? `${options.right}px`
                : options.right
            : '0';
        const bottom = options.bottom
            ? typeof options.bottom === 'number'
                ? `${options.bottom}px`
                : options.bottom
            : '0';
        const left = options.left
            ? typeof options.left === 'number'
                ? `${options.left}px`
                : options.left
            : '0';
        return `${top} ${right} ${bottom} ${left}`;
    },
    /**
     * Creates zero spacing for all sides
     */
    zero() {
        return '0';
    },
};
var Flex$1;
(function (Flex) {
    /**
     * Builds flex-related CSS styles based on Flutter flex properties
     * @param options - Flutter flex configuration
     * @returns CSS style object
     */
    function buildFlexStyles(options) {
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
    Flex.buildFlexStyles = buildFlexStyles;
    /**
     * Gets CSS classes for main axis alignment
     * @param alignment - Main axis alignment value
     * @returns CSS class string
     */
    function getMainAxisAlignmentClass(alignment) {
        switch (alignment) {
            case MainAxisAlignment.START:
                return 'justify-start';
            case MainAxisAlignment.CENTER:
                return 'justify-center';
            case MainAxisAlignment.END:
                return 'justify-end';
            case MainAxisAlignment.SPACE_BETWEEN:
                return 'justify-between';
            case MainAxisAlignment.SPACE_AROUND:
                return 'justify-around';
            case MainAxisAlignment.SPACE_EVENLY:
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
            case CrossAxisAlignment.START:
                return 'items-start';
            case CrossAxisAlignment.CENTER:
                return 'items-center';
            case CrossAxisAlignment.END:
                return 'items-end';
            case CrossAxisAlignment.STRETCH:
                return 'items-stretch';
            case CrossAxisAlignment.BASELINE:
                return 'items-baseline';
            default:
                return 'items-start';
        }
    }
    Flex.getCrossAxisAlignmentClass = getCrossAxisAlignmentClass;
    /**
     * Gets CSS classes for main axis size
     * @param size - Main axis size value
     * @returns CSS class string
     */
    function getMainAxisSizeClass(size) {
        switch (size) {
            case MainAxisSize.MIN:
                return 'w-min h-min';
            case MainAxisSize.MAX:
                return 'w-max h-max';
            default:
                return '';
        }
    }
    Flex.getMainAxisSizeClass = getMainAxisSizeClass;
})(Flex$1 || (Flex$1 = {}));

/**
 * Container component equivalent to Flutter's Container widget.
 * Provides a convenient way to create a widget with common painting, positioning, and sizing properties.
 *
 * @example
 * ```tsx
 * <Container
 *   padding={EdgeInsets.all(16)}
 *   margin={EdgeInsets.symmetric({ horizontal: 8 })}
 *   width="100%"
 *   backgroundColor="#f5f5f5"
 *   borderRadius={8}
 * >
 *   <div>Content goes here</div>
 * </Container>
 * ```
 *
 * EdgeInsets methods:
 * - EdgeInsets.all(16) - uniform spacing on all sides
 * - EdgeInsets.symmetric({ horizontal: 8, vertical: 16 }) - symmetric spacing
 * - EdgeInsets.only({ left: 8, top: 16 }) - individual side control
 * - EdgeInsets.zero() - no spacing
 */
function Container(props) {
    const { children, width, height, padding, margin, backgroundColor, borderRadius, borderWidth = 0, borderColor, borderStyle = 'solid', flex, expanded, flexible, flexShrink, alignSelf, className = '', style = {}, } = props;
    // Build flex styles
    const flexStyles = Flex$1.buildFlexStyles({
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
    // Container styles combining all properties
    const containerStyle = {
        ...flexStyles,
        padding,
        margin,
        backgroundColor,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        borderWidth: borderWidth > 0 ? `${borderWidth}px` : undefined,
        borderColor: borderWidth > 0 ? borderColor : undefined,
        borderStyle: borderWidth > 0 ? borderStyle : undefined,
        alignSelf,
        ...style,
    };
    return (jsxRuntimeExports.jsx("div", { className: className, style: containerStyle, children: children }));
}

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
    const { children, mainAxisAlignment = MainAxisAlignment.START, crossAxisAlignment = CrossAxisAlignment.CENTER, mainAxisSize, textDirection = TextDirection.LTR, textBaseline, padding, margin, flex, expanded, flexible, width, height, } = props;
    const flexStyles = Flex$1.buildFlexStyles({
        flex,
        expanded,
        flexible,
        width,
        height,
    });
    const mainAxisClass = Flex$1.getMainAxisAlignmentClass(mainAxisAlignment);
    const crossAxisClass = Flex$1.getCrossAxisAlignmentClass(crossAxisAlignment);
    const sizeClass = mainAxisSize ? Flex$1.getMainAxisSizeClass(mainAxisSize) : '';
    const containerClasses = ['flex', 'flex-row', mainAxisClass, crossAxisClass, sizeClass]
        .filter(Boolean)
        .join(' ');
    // Convert TextDirection enum to CSS direction value
    const cssDirection = textDirection === TextDirection.AUTO ? undefined : textDirection?.toLowerCase();
    const containerStyle = {
        ...flexStyles,
        padding,
        margin,
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
    const { children, mainAxisAlignment = MainAxisAlignment.START, crossAxisAlignment = CrossAxisAlignment.CENTER, mainAxisSize, verticalDirection = VerticalDirection.DOWN, textBaseline, padding, margin, flex, expanded, flexible, width, height, } = props;
    const flexStyles = Flex$1.buildFlexStyles({
        flex,
        expanded,
        flexible,
        width,
        height,
    });
    const mainAxisClass = Flex$1.getMainAxisAlignmentClass(mainAxisAlignment);
    const crossAxisClass = Flex$1.getCrossAxisAlignmentClass(crossAxisAlignment);
    const sizeClass = mainAxisSize ? Flex$1.getMainAxisSizeClass(mainAxisSize) : '';
    const containerClasses = ['flex', 'flex-col', mainAxisClass, crossAxisClass, sizeClass]
        .filter(Boolean)
        .join(' ');
    const containerStyle = {
        ...flexStyles,
        padding,
        margin,
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
    const { children, direction, mainAxisAlignment = MainAxisAlignment.START, crossAxisAlignment = CrossAxisAlignment.CENTER, mainAxisSize, textDirection, textBaseline, padding, margin, flex, expanded, flexible, width, height, } = props;
    const flexStyles = Flex$1.buildFlexStyles({
        flex,
        expanded,
        flexible,
        width,
        height,
    });
    const mainAxisClass = Flex$1.getMainAxisAlignmentClass(mainAxisAlignment);
    const crossAxisClass = Flex$1.getCrossAxisAlignmentClass(crossAxisAlignment);
    const sizeClass = mainAxisSize ? Flex$1.getMainAxisSizeClass(mainAxisSize) : '';
    const directionClass = direction === 'column' ? 'flex-col' : 'flex-row';
    const containerClasses = ['flex', directionClass, mainAxisClass, crossAxisClass, sizeClass]
        .filter(Boolean)
        .join(' ');
    // Convert TextDirection enum to CSS direction value
    const cssDirection = textDirection === TextDirection.AUTO ? undefined : textDirection?.toLowerCase();
    const containerStyle = {
        ...flexStyles,
        padding,
        margin,
        direction: cssDirection,
        alignItems: textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
    };
    return (jsxRuntimeExports.jsx("div", { className: containerClasses, style: containerStyle, children: children }));
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

/**
 * Defines the scroll direction for ListView components.
 * @enum {string}
 */
var Axis;
(function (Axis) {
    /** Vertical scrolling (default) */
    Axis["VERTICAL"] = "vertical";
    /** Horizontal scrolling */
    Axis["HORIZONTAL"] = "horizontal";
})(Axis || (Axis = {}));
/**
 * Defines the scroll physics behavior for ListView components.
 * @enum {string}
 */
var ScrollPhysics;
(function (ScrollPhysics) {
    /** Default scrolling behavior (allows scrolling) */
    ScrollPhysics["DEFAULT"] = "default";
    /** Disables user scrolling (equivalent to NeverScrollableScrollPhysics) */
    ScrollPhysics["NEVER"] = "never";
    /** iOS-style bouncing scrolling (Safari supports; other browsers ignore) */
    ScrollPhysics["BOUNCING"] = "bouncing";
    /** Android/desktop-style clamping scrolling (Web roughly equivalent to default) */
    ScrollPhysics["CLAMPING"] = "clamping";
})(ScrollPhysics || (ScrollPhysics = {}));
/**
 * Converts EdgeInsets to CSS padding properties.
 * @param p - EdgeInsets value (number or object with top/right/bottom/left)
 * @returns CSS padding properties or undefined if no padding specified
 */
function toPadding(p) {
    if (p == null)
        return undefined;
    if (typeof p === 'number')
        return { padding: p };
    const { top = 0, right = 0, bottom = 0, left = 0 } = p;
    return { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left };
}
/**
 * Generates container styles for ListView - determines scrolling behavior and layout.
 * This is where the core scrolling logic is implemented.
 * @param axis - Scroll direction (vertical or horizontal)
 * @param reverse - Whether to reverse item order
 * @param shrinkWrap - Whether to size to content instead of filling space
 * @param physics - Scroll physics behavior
 * @param clip - Clipping behavior for overflow
 * @param paddingStyle - Processed padding styles
 * @param userStyle - User-provided custom styles
 * @param itemExtent - Fixed item size for uniform items
 * @returns Complete CSS properties for the container
 */
function buildContainerStyle(axis, reverse, shrinkWrap, physics, clip, paddingStyle, userStyle, itemExtent) {
    const isVertical = axis === Axis.VERTICAL;
    const enableScroll = physics !== ScrollPhysics.NEVER && !shrinkWrap;
    const overflow = enableScroll
        ? isVertical
            ? { overflowY: 'auto', overflowX: 'hidden' }
            : { overflowX: 'auto', overflowY: 'hidden' }
        : { overflow: 'hidden' };
    const direction = reverse
        ? isVertical
            ? 'column-reverse'
            : 'row-reverse'
        : isVertical
            ? 'column'
            : 'row';
    const clipStyle = clip === 'hidden' ? { overflowClipMargin: 'content-box' } : {};
    const momentum = physics === ScrollPhysics.BOUNCING
        ? { WebkitOverflowScrolling: 'touch' }
        : {};
    const extentStyle = itemExtent ? (isVertical ? { rowGap: 0 } : { columnGap: 0 }) : undefined;
    return {
        display: 'flex',
        flexDirection: direction,
        margin: 0,
        listStyle: 'none',
        ...(paddingStyle ? {} : { padding: 0 }),
        ...overflow,
        ...(shrinkWrap ? { flex: '0 0 auto', maxHeight: 'none' } : { flex: '1 1 auto' }),
        ...(clip === 'hidden' ? { overflow: enableScroll ? 'auto' : 'hidden' } : {}),
        ...clipStyle,
        ...momentum,
        ...extentStyle,
        ...paddingStyle,
        ...userStyle,
    };
}
/**
 * Wrapper component for ListView items.
 * Handles itemExtent (fixed item sizing) and provides semantic listitem role.
 * @param axis - Scroll direction to determine which dimension to fix
 * @param itemExtent - Fixed size for the item in the main axis
 * @param children - Child content to wrap
 */
const ItemWrap = ({ axis, itemExtent, children, }) => {
    const style = itemExtent
        ? axis === Axis.VERTICAL
            ? { height: itemExtent }
            : { width: itemExtent }
        : undefined;
    return jsxRuntimeExports.jsx("li", { style: style, children: children });
};
/**
 * Base ListView component implementation.
 * Handles the core functionality for children-based ListView (equivalent to Flutter's ListView(...)).
 * @param props - ListView properties
 * @param ref - Forward ref for imperative operations
 */
const ListViewBase = forwardRef(function ListView({ children = [], scrollDirection = Axis.VERTICAL, reverse = false, shrinkWrap = false, primary, physics = ScrollPhysics.DEFAULT, padding, itemExtent, prototypeItem, clipBehavior = 'visible', className, style, semanticChildCount, ...aria }, ref) {
    const elRef = useRef(null);
    useImperativeHandle(ref, () => ({
        scrollTo: (opts) => elRef.current?.scrollTo(opts),
        getScrollElement: () => elRef.current,
    }), []);
    const paddingStyle = useMemo(() => toPadding(padding), [padding]);
    const containerStyle = useMemo(() => buildContainerStyle(scrollDirection, reverse, shrinkWrap, physics, clipBehavior, paddingStyle, style, itemExtent), [scrollDirection, reverse, shrinkWrap, physics, clipBehavior, paddingStyle, style, itemExtent]);
    return (jsxRuntimeExports.jsx("ul", { ref: elRef, className: className, style: containerStyle, "aria-orientation": scrollDirection === Axis.VERTICAL ? 'vertical' : 'horizontal', ...aria, "data-primary": primary ? 'true' : undefined, children: children?.map((child, i) => (jsxRuntimeExports.jsx(ItemWrap, { axis: scrollDirection, itemExtent: itemExtent, children: child }, child?.key ?? i))) }));
});
/**
 * Builder function for dynamic ListView variants (builder and separated).
 * Creates items on-demand using provided builder functions.
 * @template T - Type parameter for future extensibility
 * @param props - Builder props including itemCount and builder functions
 * @param ref - Forward ref for imperative operations
 */
function Builder({ itemCount, itemBuilder, separatorBuilder, ...rest }, ref) {
    const items = useMemo(() => {
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
    builder: forwardRef((p, ref) => Builder(p, ref)),
    separated: forwardRef((p, ref) => Builder(p, ref)),
});

/**
 * Scroll direction for ListView
 */
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection["VERTICAL"] = "vertical";
    ScrollDirection["HORIZONTAL"] = "horizontal";
})(ScrollDirection || (ScrollDirection = {}));
// MainAxisAlignment and CrossAxisAlignment are imported from Flex.type.ts to avoid duplication
/**
 * Padding direction options for convenience methods
 */
var PaddingDirection;
(function (PaddingDirection) {
    PaddingDirection["ALL"] = "all";
    PaddingDirection["HORIZONTAL"] = "horizontal";
    PaddingDirection["VERTICAL"] = "vertical";
    PaddingDirection["NONE"] = "none";
})(PaddingDirection || (PaddingDirection = {}));
var ListView;
(function (ListView) {
    function getPhysicsClassName(physics) {
        switch (physics) {
            case ScrollPhysics.BOUNCING:
                return 'scroll-smooth';
            case ScrollPhysics.CLAMPING:
                return 'scroll-auto';
            case ScrollPhysics.NEVER:
                return 'overflow-hidden';
            case ScrollPhysics.DEFAULT:
                return 'overflow-scroll';
            default:
                return 'scroll-auto';
        }
    }
    ListView.getPhysicsClassName = getPhysicsClassName;
    function getScrollDirectionClasses(direction) {
        return direction === ScrollDirection.VERTICAL
            ? 'flex-col overflow-y-auto overflow-x-hidden'
            : 'flex-row overflow-x-auto overflow-y-hidden';
    }
    ListView.getScrollDirectionClasses = getScrollDirectionClasses;
    function getCrossAxisAlignmentClass(alignment, direction) {
        const isVertical = direction === ScrollDirection.VERTICAL;
        switch (alignment) {
            case CrossAxisAlignment.START:
                return isVertical ? 'items-start' : 'justify-start';
            case CrossAxisAlignment.CENTER:
                return isVertical ? 'items-center' : 'justify-center';
            case CrossAxisAlignment.END:
                return isVertical ? 'items-end' : 'justify-end';
            case CrossAxisAlignment.STRETCH:
                return isVertical ? 'items-stretch' : 'justify-stretch';
            default:
                return isVertical ? 'items-stretch' : 'justify-start';
        }
    }
    ListView.getCrossAxisAlignmentClass = getCrossAxisAlignmentClass;
    function getMainAxisAlignmentClass(alignment, direction) {
        const isVertical = direction === ScrollDirection.VERTICAL;
        switch (alignment) {
            case MainAxisAlignment.START:
                return isVertical ? 'justify-start' : 'items-start';
            case MainAxisAlignment.CENTER:
                return isVertical ? 'justify-center' : 'items-center';
            case MainAxisAlignment.END:
                return isVertical ? 'justify-end' : 'items-end';
            case MainAxisAlignment.SPACE_BETWEEN:
                return isVertical ? 'justify-between' : 'items-between';
            case MainAxisAlignment.SPACE_AROUND:
                return isVertical ? 'justify-around' : 'items-around';
            case MainAxisAlignment.SPACE_EVENLY:
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
            return EdgeInsets.all(paddingAll);
        }
        if (paddingHorizontal !== undefined || paddingVertical !== undefined) {
            return EdgeInsets.symmetric({
                horizontal: paddingHorizontal,
                vertical: paddingVertical,
            });
        }
        return padding;
    }
    ListView.calculatePadding = calculatePadding;
})(ListView || (ListView = {}));

function InkWell(props) {
    const { children, onTap, onDoubleTap, onLongPress, onHover, onFocusChange, splashColor = 'rgba(0, 0, 0, 0.12)', hoverColor = 'rgba(0, 0, 0, 0.04)', focusColor = 'rgba(0, 0, 0, 0.12)', highlightColor = 'rgba(0, 0, 0, 0.08)', borderRadius = 0, enabled = true, excludeFromSemantics = false, splashDuration = 300, hoverDuration = 200, className = '', style = {}, role = 'button', tabIndex = 0, } = props;
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState([]);
    const containerRef = useRef(null);
    const longPressTimerRef = useRef();
    const doubleTapTimerRef = useRef();
    const lastTapRef = useRef(0);
    // Clean up timers on unmount
    useEffect(() => {
        return () => {
            if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
            }
            if (doubleTapTimerRef.current) {
                clearTimeout(doubleTapTimerRef.current);
            }
        };
    }, []);
    const createRipple = useCallback((event) => {
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
    const handleMouseEnter = useCallback(() => {
        if (!enabled)
            return;
        setIsHovered(true);
        onHover?.(true);
    }, [enabled, onHover]);
    const handleMouseLeave = useCallback(() => {
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
    const handleMouseDown = useCallback((event) => {
        if (!enabled)
            return;
        setIsPressed(true);
        createRipple(event);
        // Start long press timer
        longPressTimerRef.current = setTimeout(() => {
            onLongPress?.();
        }, 500); // 500ms for long press
    }, [enabled, createRipple, onLongPress]);
    const handleMouseUp = useCallback(() => {
        if (!enabled)
            return;
        setIsPressed(false);
        // Clear long press timer
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    }, [enabled]);
    const handleClick = useCallback(() => {
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
    const handleFocus = useCallback(() => {
        if (!enabled)
            return;
        setIsFocused(true);
        onFocusChange?.(true);
    }, [enabled, onFocusChange]);
    const handleBlur = useCallback(() => {
        if (!enabled)
            return;
        setIsFocused(false);
        onFocusChange?.(false);
    }, [enabled, onFocusChange]);
    const handleKeyDown = useCallback((event) => {
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

var HitTestBehavior;
(function (HitTestBehavior) {
    /** Only hit test if the widget has content */
    HitTestBehavior["deferToChild"] = "deferToChild";
    /** Always hit test, even if no visible content */
    HitTestBehavior["opaque"] = "opaque";
    /** Never hit test */
    HitTestBehavior["translucent"] = "translucent";
})(HitTestBehavior || (HitTestBehavior = {}));
function GestureDetector(props) {
    const { children, onTap, onTapDown, onTapUp, onTapCancel, onDoubleTap, onLongPress, onLongPressStart, onLongPressMoveUpdate, onLongPressEnd, onPanStart, onPanUpdate, onPanEnd, excludeFromSemantics = false, behavior = HitTestBehavior.deferToChild, className = '', style = {}, } = props;
    const [gestureState, setGestureState] = useState({
        isPressed: false,
        startTime: 0,
        lastTapTime: 0,
        tapCount: 0,
    });
    const containerRef = useRef(null);
    const longPressTimerRef = useRef();
    const tapTimerRef = useRef();
    const isLongPressRef = useRef(false);
    const isPanningRef = useRef(false);
    // Constants
    const LONG_PRESS_TIMEOUT = 500; // ms
    const DOUBLE_TAP_TIMEOUT = 300; // ms
    const PAN_THRESHOLD = 10; // pixels
    const TAP_THRESHOLD = 10; // pixels
    const getLocalPosition = useCallback((globalX, globalY) => {
        if (!containerRef.current)
            return { dx: globalX, dy: globalY };
        const rect = containerRef.current.getBoundingClientRect();
        return {
            dx: globalX - rect.left,
            dy: globalY - rect.top,
        };
    }, []);
    const getDistance = useCallback((pos1, pos2) => {
        const dx = pos1.dx - pos2.dx;
        const dy = pos1.dy - pos2.dy;
        return Math.sqrt(dx * dx + dy * dy);
    }, []);
    const clearTimers = useCallback(() => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = undefined;
        }
        if (tapTimerRef.current) {
            clearTimeout(tapTimerRef.current);
            tapTimerRef.current = undefined;
        }
    }, []);
    const handlePointerDown = useCallback((globalX, globalY) => {
        const now = Date.now();
        const globalPosition = { dx: globalX, dy: globalY };
        const localPosition = getLocalPosition(globalX, globalY);
        clearTimers();
        isLongPressRef.current = false;
        isPanningRef.current = false;
        setGestureState((prev) => ({
            ...prev,
            isPressed: true,
            startPosition: globalPosition,
            lastPosition: globalPosition,
            startTime: now,
        }));
        onTapDown?.({ globalPosition, localPosition });
        // Start long press timer
        if (onLongPress || onLongPressStart) {
            longPressTimerRef.current = setTimeout(() => {
                isLongPressRef.current = true;
                if (onLongPress) {
                    onLongPress();
                }
                if (onLongPressStart) {
                    onLongPressStart({ globalPosition, localPosition });
                }
            }, LONG_PRESS_TIMEOUT);
        }
    }, [getLocalPosition, onTapDown, onLongPress, onLongPressStart, clearTimers]);
    const handlePointerMove = useCallback((globalX, globalY) => {
        if (!gestureState.isPressed || !gestureState.startPosition)
            return;
        const globalPosition = { dx: globalX, dy: globalY };
        const localPosition = getLocalPosition(globalX, globalY);
        const distance = getDistance(gestureState.startPosition, globalPosition);
        // Check if we should start panning
        if (!isPanningRef.current && distance > PAN_THRESHOLD) {
            isPanningRef.current = true;
            clearTimers(); // Cancel long press
            if (onPanStart) {
                onPanStart({
                    globalPosition: gestureState.startPosition,
                    localPosition: getLocalPosition(gestureState.startPosition.dx, gestureState.startPosition.dy),
                });
            }
        }
        // Handle panning
        if (isPanningRef.current && onPanUpdate && gestureState.lastPosition) {
            const delta = {
                dx: globalPosition.dx - gestureState.lastPosition.dx,
                dy: globalPosition.dy - gestureState.lastPosition.dy,
            };
            onPanUpdate({ globalPosition, localPosition, delta });
        }
        // Handle long press move
        if (isLongPressRef.current && onLongPressMoveUpdate && gestureState.startPosition) {
            const offsetFromOrigin = {
                dx: globalPosition.dx - gestureState.startPosition.dx,
                dy: globalPosition.dy - gestureState.startPosition.dy,
            };
            onLongPressMoveUpdate({ globalPosition, localPosition, offsetFromOrigin });
        }
        setGestureState((prev) => ({
            ...prev,
            lastPosition: globalPosition,
        }));
    }, [
        gestureState,
        getLocalPosition,
        getDistance,
        onPanStart,
        onPanUpdate,
        onLongPressMoveUpdate,
        clearTimers,
    ]);
    const handlePointerUp = useCallback((globalX, globalY) => {
        const now = Date.now();
        const globalPosition = { dx: globalX, dy: globalY };
        const localPosition = getLocalPosition(globalX, globalY);
        clearTimers();
        if (!gestureState.isPressed)
            return;
        // Handle long press end
        if (isLongPressRef.current && onLongPressEnd) {
            onLongPressEnd({ globalPosition, localPosition });
        }
        // Handle pan end
        if (isPanningRef.current && onPanEnd) {
            // Calculate velocity (simplified)
            const timeDelta = now - gestureState.startTime;
            const velocity = gestureState.lastPosition && timeDelta > 0
                ? {
                    dx: ((globalPosition.dx - gestureState.lastPosition.dx) / timeDelta) * 1000,
                    dy: ((globalPosition.dy - gestureState.lastPosition.dy) / timeDelta) * 1000,
                }
                : { dx: 0, dy: 0 };
            onPanEnd({ velocity });
        }
        // Handle tap
        if (!isPanningRef.current && !isLongPressRef.current && gestureState.startPosition) {
            const distance = getDistance(gestureState.startPosition, globalPosition);
            if (distance <= TAP_THRESHOLD) {
                onTapUp?.({ globalPosition, localPosition });
                // Handle double tap detection
                const timeSinceLastTap = now - gestureState.lastTapTime;
                if (timeSinceLastTap < DOUBLE_TAP_TIMEOUT && gestureState.tapCount === 1) {
                    // Double tap
                    if (tapTimerRef.current) {
                        clearTimeout(tapTimerRef.current);
                        tapTimerRef.current = undefined;
                    }
                    onDoubleTap?.();
                    setGestureState((prev) => ({
                        ...prev,
                        isPressed: false,
                        tapCount: 0,
                        lastTapTime: 0,
                    }));
                }
                else {
                    // Single tap (potentially)
                    setGestureState((prev) => ({
                        ...prev,
                        isPressed: false,
                        tapCount: 1,
                        lastTapTime: now,
                    }));
                    if (onDoubleTap) {
                        // Wait to see if there's a double tap
                        tapTimerRef.current = setTimeout(() => {
                            onTap?.();
                            setGestureState((prev) => ({ ...prev, tapCount: 0 }));
                        }, DOUBLE_TAP_TIMEOUT);
                    }
                    else {
                        // No double tap expected, fire immediately
                        onTap?.();
                    }
                }
            }
            else {
                onTapCancel?.();
            }
        }
        if (!onDoubleTap || isPanningRef.current || isLongPressRef.current) {
            setGestureState((prev) => ({
                ...prev,
                isPressed: false,
                startPosition: undefined,
                lastPosition: undefined,
            }));
        }
        isLongPressRef.current = false;
        isPanningRef.current = false;
    }, [
        gestureState,
        getLocalPosition,
        getDistance,
        onTapUp,
        onTapCancel,
        onTap,
        onDoubleTap,
        onLongPressEnd,
        onPanEnd,
        clearTimers,
    ]);
    const handlePointerCancel = useCallback(() => {
        clearTimers();
        if (gestureState.isPressed) {
            onTapCancel?.();
        }
        setGestureState((prev) => ({
            ...prev,
            isPressed: false,
            startPosition: undefined,
            lastPosition: undefined,
        }));
        isLongPressRef.current = false;
        isPanningRef.current = false;
    }, [gestureState.isPressed, onTapCancel, clearTimers]);
    // Mouse event handlers
    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
        handlePointerDown(event.clientX, event.clientY);
    }, [handlePointerDown]);
    const handleMouseMove = useCallback((event) => {
        handlePointerMove(event.clientX, event.clientY);
    }, [handlePointerMove]);
    const handleMouseUp = useCallback((event) => {
        handlePointerUp(event.clientX, event.clientY);
    }, [handlePointerUp]);
    // Touch event handlers
    const handleTouchStart = useCallback((event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            if (touch) {
                handlePointerDown(touch.clientX, touch.clientY);
            }
        }
    }, [handlePointerDown]);
    const handleTouchMove = useCallback((event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            if (touch) {
                handlePointerMove(touch.clientX, touch.clientY);
            }
        }
    }, [handlePointerMove]);
    const handleTouchEnd = useCallback((event) => {
        if (event.changedTouches.length === 1) {
            const touch = event.changedTouches[0];
            if (touch) {
                handlePointerUp(touch.clientX, touch.clientY);
            }
        }
    }, [handlePointerUp]);
    // Determine container style based on behavior
    const getContainerStyle = () => {
        const baseStyle = {
            ...style,
        };
        switch (behavior) {
            case HitTestBehavior.opaque:
                return {
                    ...baseStyle,
                    display: 'block',
                    width: '100%',
                    height: '100%',
                };
            case HitTestBehavior.translucent:
                return {
                    ...baseStyle,
                    pointerEvents: 'none',
                };
            case HitTestBehavior.deferToChild:
            default:
                return baseStyle;
        }
    };
    return (jsxRuntimeExports.jsx("div", { ref: containerRef, className: className, style: getContainerStyle(), onMouseDown: handleMouseDown, onMouseMove: gestureState.isPressed ? handleMouseMove : undefined, onMouseUp: gestureState.isPressed ? handleMouseUp : undefined, onMouseLeave: gestureState.isPressed ? handlePointerCancel : undefined, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onTouchCancel: handlePointerCancel, role: excludeFromSemantics ? undefined : 'button', tabIndex: excludeFromSemantics ? undefined : -1, children: children }));
}

var AnimationCurve;
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
})(AnimationCurve || (AnimationCurve = {}));
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
    const { children, duration, curve = AnimationCurve.ease, delay = 0, onStart, onEnd, style = {}, 
    // Container props
    width, height, padding, margin, backgroundColor, borderRadius, borderWidth = 0, borderColor, borderStyle = 'solid', flex, expanded, flexible, flexShrink, alignSelf, className = '', } = props;
    const [currentStyles, setCurrentStyles] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const previousPropsRef = useRef(props);
    const containerRef = useRef(null);
    const animationTimeoutRef = useRef();
    // Helper function to normalize values for comparison and animation
    const normalizeValue = (value) => {
        if (value === undefined)
            return '';
        if (typeof value === 'number')
            return `${value}px`;
        return value;
    };
    // Padding is now directly provided as EdgeInsets result
    const calculateEffectivePadding = () => {
        return padding || '0';
    };
    // Calculate animated styles based on current props
    const calculateTargetStyles = () => {
        const effectivePadding = calculateEffectivePadding();
        return {
            width: normalizeValue(width),
            height: normalizeValue(height),
            padding: effectivePadding,
            margin: normalizeValue(margin),
            backgroundColor: backgroundColor || 'transparent',
            borderRadius: normalizeValue(borderRadius),
            borderWidth: borderWidth || 0,
            borderColor: borderColor || 'transparent',
            borderStyle: borderStyle || 'solid',
        };
    };
    // Check if props have changed and need animation
    const hasStyleChanged = () => {
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
    };
    // Apply animation
    useEffect(() => {
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
        duration,
        delay,
        onStart,
        onEnd,
    ]);
    // Initialize styles on mount
    useEffect(() => {
        setCurrentStyles(calculateTargetStyles());
    }, []);
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
    const { children, opacity, duration, curve = AnimationCurve.ease, delay = 0, onStart, onEnd, alwaysIncludeSemantics = false, className = '', style = {}, } = props;
    const [currentOpacity, setCurrentOpacity] = useState(opacity);
    const [isAnimating, setIsAnimating] = useState(false);
    const previousOpacityRef = useRef(opacity);
    const animationTimeoutRef = useRef();
    const startTimeoutRef = useRef();
    // Clamp opacity value between 0 and 1
    const clampedOpacity = Math.max(0, Math.min(1, opacity));
    // Check if opacity has changed
    const hasOpacityChanged = () => {
        return Math.abs(clampedOpacity - previousOpacityRef.current) > 0.001;
    };
    // Apply opacity animation
    useEffect(() => {
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
    }, [clampedOpacity, duration, delay, onStart, onEnd]);
    // Initialize opacity on mount
    useEffect(() => {
        setCurrentOpacity(clampedOpacity);
        previousOpacityRef.current = clampedOpacity;
    }, []);
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

var Orientation;
(function (Orientation) {
    Orientation["portrait"] = "portrait";
    Orientation["landscape"] = "landscape";
})(Orientation || (Orientation = {}));
var Brightness;
(function (Brightness) {
    Brightness["light"] = "light";
    Brightness["dark"] = "dark";
})(Brightness || (Brightness = {}));
const defaultBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
const MediaQueryContext = createContext(undefined);
const isBrowser = typeof window !== 'undefined';
const DEFAULT_DATA = {
    size: { width: 0, height: 0 },
    devicePixelRatio: 1,
    orientation: Orientation.portrait,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    viewInsets: { top: 0, right: 0, bottom: 0, left: 0 },
    textScaleFactor: 1,
    platformBrightness: Brightness.light,
    disableAnimations: false,
    highContrast: false,
    supportsTouch: false,
};
function MediaQuery({ children, breakpoints = defaultBreakpoints, data, }) {
    const [mediaQueryData, setMediaQueryData] = useState(() => data ?? DEFAULT_DATA);
    useEffect(() => {
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
    const contextValue = useMemo(() => ({ ...mediaQueryData, breakpoints }), [mediaQueryData, breakpoints]);
    return jsxRuntimeExports.jsx(MediaQueryContext.Provider, { value: contextValue, children: children });
}
function useMediaQuery() {
    const ctx = useContext(MediaQueryContext);
    if (!ctx)
        throw new Error('useMediaQuery must be used within a <MediaQuery> provider');
    return ctx;
}
function useBreakpoint(breakpoints) {
    const { size, breakpoints: ctxBp } = useMediaQuery();
    const bp = breakpoints || ctxBp;
    return useMemo(() => {
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
    return useMemo(() => {
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
    const orientation = width > height ? Orientation.landscape : Orientation.portrait;
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
        platformBrightness: dark ? Brightness.dark : Brightness.light,
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
    const [constraints, setConstraints] = useState(() => createDefaultConstraints());
    const containerRef = useRef(null);
    const resizeObserverRef = useRef();
    // Calculate constraints from element
    const calculateConstraints = (element) => {
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
    };
    // Set up resize observer
    useEffect(() => {
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
    }, []);
    // Memoize the built content
    const content = useMemo(() => {
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
    const [orientation, setOrientation] = useState(() => getCurrentOrientation());
    useEffect(() => {
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
    const [orientation, setOrientation] = useState(() => getCurrentOrientation());
    useEffect(() => {
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
    return orientation === Orientation.portrait ? portraitValue : landscapeValue;
}
// Helper functions
function getCurrentOrientation() {
    // First try to use the Screen Orientation API if available
    if (typeof window !== 'undefined' &&
        'screen' in window &&
        window.screen &&
        'orientation' in window.screen) {
        const screenOrientation = window.screen.orientation;
        if (screenOrientation && typeof screenOrientation.angle === 'number') {
            // The Screen Orientation API provides more detailed orientation info
            return screenOrientation.angle === 0 || screenOrientation.angle === 180
                ? Orientation.portrait
                : Orientation.landscape;
        }
    }
    // Fallback to checking window dimensions
    return typeof window !== 'undefined' && window.innerHeight >= window.innerWidth
        ? Orientation.portrait
        : Orientation.landscape;
}
/**
 * Utility functions for working with orientation
 */
const OrientationUtils = {
    /**
     * Check if the current orientation is portrait
     */
    isPortrait() {
        return getCurrentOrientation() === Orientation.portrait;
    },
    /**
     * Check if the current orientation is landscape
     */
    isLandscape() {
        return getCurrentOrientation() === Orientation.landscape;
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
            return window.orientation || 0;
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
        return (typeof window !== 'undefined' &&
            ('orientation' in window ||
                ('screen' in window && window.screen && 'orientation' in window.screen)));
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
var FilterQuality;
(function (FilterQuality) {
    /** Use browser default */
    FilterQuality["none"] = "auto";
    /** Low quality, fast */
    FilterQuality["low"] = "crisp-edges";
    /** Medium quality */
    FilterQuality["medium"] = "auto";
    /** High quality, slower */
    FilterQuality["high"] = "smooth";
})(FilterQuality || (FilterQuality = {}));
function Transform({ children, transform, alignment = Alignment.center, transformOrigin, filterQuality = FilterQuality.medium, className = '', style = {}, }) {
    const transformStyle = useMemo(() => {
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
        case 'text':
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
const TextField = forwardRef(function TextField(props, ref) {
    const { value, defaultValue, onChangeText, onChanged, onEditingComplete, onSubmitted, onFocus, onBlur, onTap, style, textAlign = 'start', textDirection, textCapitalization = 'none', maxLength, maxLines = 1, minLines, expands = false, obscureText = false, obscuringCharacter: _, // not used directly; browser uses own mask
    enabled = true, readOnly = false, autoFocus = false, canRequestFocus: __ = true, keyboardType = 'text', textInputAction = 'none', inputMode, decoration = {}, id, name, placeholder, forwardedRef, className, containerStyle, } = props;
    const [inner, setInner] = useState(defaultValue ?? '');
    const controlled = value !== undefined;
    const currentValue = controlled ? value : inner;
    const inputRef = useRef(null);
    // expose imperative API
    useImperativeHandle(ref ?? forwardedRef, () => ({
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
    const { htmlType, inputMode: autoInputMode } = useMemo(() => mapKeyboard(obscureText ? 'password' : keyboardType), [keyboardType, obscureText]);
    // compute props
    const dir = textDirection;
    const ta = textAlign === 'start' ? undefined : textAlign === 'end' ? undefined : textAlign;
    // enterKeyHint mapping removed as it's not used in the implementation
    const handleChange = useCallback((e) => {
        let text = e.target.value;
        if (textCapitalization && textCapitalization !== 'none') {
            const cursor = e.target.selectionStart;
            text = applyCapitalization(text, textCapitalization);
            // try to restore caret if capitalization changed length (best-effort)
            if (cursor != null) {
                requestAnimationFrame(() => {
                    try {
                        ;
                        e.target.setSelectionRange(cursor, cursor);
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
    const handleKeyDown = useCallback((e) => {
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
    const handleBlur = useCallback(() => {
        onEditingComplete?.();
        onBlur?.();
    }, [onEditingComplete, onBlur]);
    const disabled = !enabled;
    const showTextarea = expands || maxLines == null || maxLines > 1 || (minLines != null && minLines > 1);
    const { labelText, hintText, helperText, errorText, prefixIcon, suffixIcon, counterText, filled, fillColor, border, } = decoration;
    const baseField = showTextarea ? (jsxRuntimeExports.jsx("textarea", { ref: inputRef, id: id, name: name, value: currentValue, onChange: handleChange, onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: handleBlur, onClick: onTap, placeholder: placeholder ?? hintText, maxLength: maxLength, readOnly: readOnly, disabled: disabled, autoFocus: autoFocus, dir: dir, rows: minLines ?? 1, style: {
            width: '100%',
            resize: expands ? 'none' : 'vertical',
            flex: expands ? 1 : undefined,
            minHeight: expands ? 0 : undefined,
            textAlign: ta,
            ...style,
        }, className: "rtf-input" })) : (jsxRuntimeExports.jsx("input", { ref: inputRef, id: id, name: name, type: obscureText ? 'password' : htmlType, inputMode: inputMode ?? autoInputMode, value: currentValue, onChange: handleChange, onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: handleBlur, onClick: onTap, placeholder: placeholder ?? hintText, maxLength: maxLength, readOnly: readOnly, disabled: disabled, autoFocus: autoFocus, dir: dir, style: {
            width: '100%',
            textAlign: ta,
            ...style,
        }, className: "rtf-input" }));
    const showCounter = maxLength != null || counterText;
    const computedCounterText = counterText ?? (maxLength != null ? `${currentValue.length} / ${maxLength}` : undefined);
    return (jsxRuntimeExports.jsxs("label", { className: 'rtf-container ' + (className ?? ''), style: { display: 'block', ...containerStyle }, children: [labelText && jsxRuntimeExports.jsx("span", { className: "rtf-label", children: labelText }), jsxRuntimeExports.jsxs("div", { className: 'rtf-wrapper ' +
                    (errorText ? 'rtf-error ' : '') +
                    (filled ? 'rtf-filled ' : '') +
                    (border ? `rtf-border-${border} ` : 'rtf-border-outline '), style: { background: filled ? (fillColor ?? '#f6f6f6') : undefined }, children: [prefixIcon && jsxRuntimeExports.jsx("span", { className: "rtf-prefix", children: prefixIcon }), baseField, suffixIcon && jsxRuntimeExports.jsx("span", { className: "rtf-suffix", children: suffixIcon })] }), helperText && !errorText && jsxRuntimeExports.jsx("div", { className: "rtf-helper", children: helperText }), errorText && jsxRuntimeExports.jsx("div", { className: "rtf-error-text", children: errorText }), showCounter && jsxRuntimeExports.jsx("div", { className: "rtf-counter", children: computedCounterText }), jsxRuntimeExports.jsx("style", { children: `
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
const Text = ({ data, children, style, textAlign, softWrap = true, overflow = 'clip', maxLines, textScaleFactor, textScaler, locale, textDirection = TextDirection.AUTO, semanticsLabel, semanticsIdentifier, selectionColor, textWidthBasis = 'parent', className, }) => {
    const id = useId(); // Used for selectionColor class generation
    // Calculate scaled style with font-size scaling
    const scaledStyle = useMemo(() => {
        const css = {};
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
                // Flutter's height is a line-height multiplier
                css.lineHeight = height;
            }
            // Text scaling: textScaler takes precedence over textScaleFactor
            const scale = textScaler ?? textScaleFactor ?? 1;
            if (fontSize !== undefined) {
                css.fontSize = Math.max(0, fontSize * scale);
            }
            else if (scale !== 1) {
                // Use relative scaling (em) when no explicit fontSize
                css.fontSize = `${scale}em`;
            }
        }
        // textAlign: map start/end based on text direction
        if (textAlign) {
            if (textAlign === 'start')
                css.textAlign = textDirection === TextDirection.RTL ? 'right' : 'left';
            else if (textAlign === 'end')
                css.textAlign = textDirection === TextDirection.RTL ? 'left' : 'right';
            else
                css.textAlign = textAlign;
        }
        // softWrap and white-space control
        // - softWrap=true: normal line wrapping
        // - softWrap=false: single line, no wrapping (or with maxLines=1)
        if (!softWrap) {
            css.whiteSpace = 'nowrap';
        }
        else {
            // Allow text to wrap at whitespace and within words, closer to Flutter behavior
            css.whiteSpace = 'pre-wrap';
            css.overflowWrap = 'anywhere';
        }
        // overflow and maxLines handling
        if (maxLines && maxLines > 0) {
            // Multi-line clamp using webkit-line-clamp
            css.display = '-webkit-box';
            Object.assign(css, {
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: maxLines,
            });
            css.overflow = 'hidden';
            if (overflow === 'ellipsis') ;
            else if (overflow === 'clip') ;
            else if (overflow === 'fade') {
                // Use mask-image for bottom fade effect
                // Note: Some browsers may not support line-clamp + mask combination well
                Object.assign(css, {
                    WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                });
            }
        }
        else {
            // Single line or unlimited lines scenario
            if (!softWrap || maxLines === 1) {
                css.whiteSpace = 'nowrap';
                if (overflow === 'ellipsis') {
                    css.overflow = 'hidden';
                    css.textOverflow = 'ellipsis';
                }
                else if (overflow === 'clip') {
                    css.overflow = 'hidden';
                }
                else if (overflow === 'fade') {
                    // Right-side fade effect
                    css.overflow = 'hidden';
                    Object.assign(css, {
                        WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    });
                }
            }
            else {
                // Multi-line without line limit
                if (overflow === 'clip') ;
                else if (overflow === 'ellipsis') ;
                else if (overflow === 'fade') {
                    // Multi-line fade effect without clamp (visual only)
                    Object.assign(css, {
                        WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                    });
                }
            }
        }
        return css;
    }, [
        style,
        textAlign,
        softWrap,
        overflow,
        maxLines,
        textScaleFactor,
        textScaler,
        textDirection,
        textWidthBasis,
    ]);
    // Generate unique class name for selection color
    const selectionClass = useMemo(() => {
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
    const combinedClassName = [selectionClass, className].filter(Boolean).join(' ') || undefined;
    // Render the text component using span element
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [selectionStyleTag, jsxRuntimeExports.jsx("span", { id: elemId, className: combinedClassName, style: scaledStyle, lang: locale, dir: textDirection === TextDirection.AUTO ? 'auto' : textDirection.toLowerCase(), "aria-label": ariaLabel, children: children ?? data })] }));
};

export { Alignment, AnimatedContainer, AnimatedOpacity, AnimationCurve, Axis, BoxConstraintsUtils, Brightness, Column, Container, CrossAxisAlignment, EdgeInsets, FilterQuality, Flex, GestureDetector, HitTestBehavior, InkWell, LayoutBuilder, ListView$1 as ListView, MainAxisAlignment, MainAxisSize, Matrix4, MediaQuery, Opacity, Orientation, OrientationBuilder, OrientationUtils, PaddingDirection, Row, ScrollDirection, ScrollPhysics, SizedBox, Spacer, Text, TextBaseline, TextDirection, TextField, Transform, TransformUtils, VerticalDirection, createBoxConstraints, createExpandedConstraints, createLooseConstraints, createTightConstraints, defaultBreakpoints, useBreakpoint, useBreakpointMatch, useMediaQuery, useOrientation, useOrientationMatch, useOrientationValue };
//# sourceMappingURL=index.esm.js.map
