import require$$0, { useMemo } from 'react';

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
 * EdgeInsets provides methods for creating padding values in different configurations
 */
const EdgeInsets = {
    /**
     * Creates uniform padding for all sides
     * @param value - The padding value (number will be converted to px)
     */
    all(value) {
        const paddingValue = typeof value === 'number' ? `${value}px` : value;
        return paddingValue;
    },
    /**
     * Creates symmetric padding for horizontal and/or vertical sides
     * @param options - Object containing horizontal and/or vertical padding values
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
     * Creates padding with individual control for each side
     * @param options - Object containing left, top, right, and/or bottom padding values
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
     * Creates zero padding for all sides
     */
    zero() {
        return '0';
    },
};
var Flex$1;
(function (Flex) {
    /**
     * Calculates the effective padding from various padding options
     * @param options - Padding configuration options
     * @returns Computed CSS padding value
     */
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
    Flex.calculatePadding = calculatePadding;
    /**
     * Calculates the effective margin from margin prop
     * @param margin - Margin value
     * @returns Computed CSS margin value
     */
    function calculateMargin(margin) {
        return margin;
    }
    Flex.calculateMargin = calculateMargin;
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

function Container(props) {
    const { children, width, height, padding, margin, paddingAll, paddingHorizontal, paddingVertical, backgroundColor, borderRadius, borderWidth = 0, borderColor, borderStyle = 'solid', flex, expanded, flexible, flexShrink, alignSelf, className = '', style = {}, } = props;
    // Calculate effective padding using EdgeInsets
    const effectivePadding = Flex$1.calculatePadding({
        paddingAll,
        paddingHorizontal,
        paddingVertical,
        padding,
    });
    // Calculate effective margin
    const effectiveMargin = Flex$1.calculateMargin(margin);
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
        padding: effectivePadding,
        margin: effectiveMargin,
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
 *   paddingHorizontal={16}
 * >
 *   <div>Left Item</div>
 *   <div>Center Item</div>
 *   <div>Right Item</div>
 * </Row>
 * ```
 */
function Row(props) {
    const { children, mainAxisAlignment = MainAxisAlignment.START, crossAxisAlignment = CrossAxisAlignment.CENTER, mainAxisSize, textDirection = TextDirection.LTR, textBaseline, padding, margin, paddingAll, paddingHorizontal, paddingVertical, flex, expanded, flexible, width, height, } = props;
    const effectivePadding = Flex$1.calculatePadding({
        paddingAll,
        paddingHorizontal,
        paddingVertical,
        padding,
    });
    const effectiveMargin = Flex$1.calculateMargin(margin);
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
    const containerStyle = {
        ...flexStyles,
        padding: effectivePadding,
        margin: effectiveMargin,
        direction: textDirection,
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
 *   paddingAll={16}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Column>
 * ```
 */
function Column(props) {
    const { children, mainAxisAlignment = MainAxisAlignment.START, crossAxisAlignment = CrossAxisAlignment.CENTER, mainAxisSize, verticalDirection = VerticalDirection.DOWN, textBaseline, padding, margin, paddingAll, paddingHorizontal, paddingVertical, flex, expanded, flexible, width, height, } = props;
    const effectivePadding = Flex$1.calculatePadding({
        paddingAll,
        paddingHorizontal,
        paddingVertical,
        padding,
    });
    const effectiveMargin = Flex$1.calculateMargin(margin);
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
        padding: effectivePadding,
        margin: effectiveMargin,
        flexDirection: verticalDirection,
        alignItems: textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
    };
    return (jsxRuntimeExports.jsx("div", { className: containerClasses, style: containerStyle, children: children }));
}

function Flex(props) {
    const { children, direction, mainAxisAlignment = MainAxisAlignment.START, crossAxisAlignment = CrossAxisAlignment.CENTER, mainAxisSize, textDirection, textBaseline, padding, margin, paddingAll, paddingHorizontal, paddingVertical, flex, expanded, flexible, width, height, } = props;
    const effectivePadding = Flex$1.calculatePadding({
        paddingAll,
        paddingHorizontal,
        paddingVertical,
        padding,
    });
    const effectiveMargin = Flex$1.calculateMargin(margin);
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
    const containerStyle = {
        ...flexStyles,
        padding: effectivePadding,
        margin: effectiveMargin,
        direction: textDirection,
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
 * Scroll direction for ListView
 */
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection["VERTICAL"] = "vertical";
    ScrollDirection["HORIZONTAL"] = "horizontal";
})(ScrollDirection || (ScrollDirection = {}));
/**
 * Scroll physics behavior controls how the list responds to user scroll gestures
 */
var ScrollPhysics;
(function (ScrollPhysics) {
    ScrollPhysics["BOUNCING"] = "bouncing";
    ScrollPhysics["CLAMPING"] = "clamping";
    ScrollPhysics["NEVER_SCROLLABLE"] = "never_scrollable";
    ScrollPhysics["ALWAYS_SCROLLABLE"] = "always_scrollable";
})(ScrollPhysics || (ScrollPhysics = {}));
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
var ListView$1;
(function (ListView) {
    function getPhysicsClassName(physics) {
        switch (physics) {
            case ScrollPhysics.BOUNCING:
                return 'scroll-smooth';
            case ScrollPhysics.CLAMPING:
                return 'scroll-auto';
            case ScrollPhysics.NEVER_SCROLLABLE:
                return 'overflow-hidden';
            case ScrollPhysics.ALWAYS_SCROLLABLE:
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
})(ListView$1 || (ListView$1 = {}));

function useListViewHook({ items = [], itemCount, itemBuilder, separatorBuilder, keyExtractor, }) {
    const effectiveItemCount = itemCount ?? items.length;
    const effectiveItems = items.length > 0 ? items : Array(effectiveItemCount).fill(null);
    const rendered = useMemo(() => {
        const out = [];
        for (let index = 0; index < effectiveItemCount; index++) {
            const item = effectiveItems[index] || null;
            const itemKey = keyExtractor ? keyExtractor(item, index) : `item-${index}`;
            out.push({
                key: itemKey,
                element: itemBuilder(item, index),
            });
            if (index < effectiveItemCount - 1 && separatorBuilder) {
                out.push({
                    key: `separator-${index}`,
                    element: separatorBuilder(index),
                });
            }
        }
        return out;
    }, [effectiveItems, effectiveItemCount, itemBuilder, separatorBuilder, keyExtractor]);
    return {
        rendered,
        itemCount: effectiveItemCount,
    };
}
function ListView(props) {
    const { items, itemCount, itemBuilder, separatorBuilder, keyExtractor, scrollDirection = ScrollDirection.VERTICAL, reverse = false, shrinkWrap = false, physics = ScrollPhysics.BOUNCING, crossAxisAlignment = CrossAxisAlignment.STRETCH, mainAxisAlignment = MainAxisAlignment.START, padding, paddingAll, paddingHorizontal, paddingVertical, flexible, expanded, flex, clipBehavior = 'visible', } = props;
    const { rendered } = useListViewHook({
        items,
        itemCount,
        itemBuilder,
        separatorBuilder,
        keyExtractor,
    });
    const effectivePadding = ListView$1.calculatePadding({
        paddingAll,
        paddingHorizontal,
        paddingVertical,
        padding,
    });
    const flexStyles = Flex$1.buildFlexStyles({
        flex,
        expanded,
        flexible,
    });
    const scrollDirectionClasses = ListView$1.getScrollDirectionClasses(scrollDirection);
    const physicsClassName = ListView$1.getPhysicsClassName(physics);
    const crossAxisClass = ListView$1.getCrossAxisAlignmentClass(crossAxisAlignment, scrollDirection);
    const mainAxisClass = ListView$1.getMainAxisAlignmentClass(mainAxisAlignment, scrollDirection);
    const containerClasses = [
        'flex',
        scrollDirectionClasses,
        physicsClassName,
        crossAxisClass,
        mainAxisClass,
        shrinkWrap ? 'flex-shrink' : '',
        clipBehavior === 'hidden' ? 'overflow-hidden' : '',
    ]
        .filter(Boolean)
        .join(' ');
    const containerStyle = {
        ...flexStyles,
        padding: effectivePadding,
        ...(reverse && {
            flexDirection: (scrollDirection === ScrollDirection.VERTICAL
                ? 'column-reverse'
                : 'row-reverse'),
        }),
    };
    return (jsxRuntimeExports.jsx("div", { className: containerClasses, style: containerStyle, children: rendered.map(({ key, element }) => (jsxRuntimeExports.jsx("div", { children: element }, key))) }));
}
ListView.builder = (props) => ListView(props);
ListView.separated = (props) => ListView(props);

export { Column, Container, CrossAxisAlignment, EdgeInsets, Flex, ListView, MainAxisAlignment, MainAxisSize, PaddingDirection, Row, ScrollDirection, ScrollPhysics, SizedBox, Spacer, TextBaseline, TextDirection, VerticalDirection };
//# sourceMappingURL=index.esm.js.map
