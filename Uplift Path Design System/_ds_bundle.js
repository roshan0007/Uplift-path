/* @ds-bundle: {"format":4,"namespace":"UpliftPathDesignSystem_930664","components":[{"name":"Accordion","sourcePath":"components/core/Accordion.jsx"},{"name":"AccordionItem","sourcePath":"components/core/Accordion.jsx"},{"name":"AccordionTrigger","sourcePath":"components/core/Accordion.jsx"},{"name":"AccordionContent","sourcePath":"components/core/Accordion.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"BackgroundCard","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Carousel","sourcePath":"components/core/Carousel.jsx"},{"name":"CarouselContent","sourcePath":"components/core/Carousel.jsx"},{"name":"CarouselItem","sourcePath":"components/core/Carousel.jsx"},{"name":"CarouselPrevious","sourcePath":"components/core/Carousel.jsx"},{"name":"CarouselNext","sourcePath":"components/core/Carousel.jsx"},{"name":"CarouselDots","sourcePath":"components/core/Carousel.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogHeader","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogTitle","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogDescription","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogFooter","sourcePath":"components/core/Dialog.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsList","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsTrigger","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsContent","sourcePath":"components/core/Tabs.jsx"},{"name":"VideoIframe","sourcePath":"components/core/VideoIframe.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Label","sourcePath":"components/forms/Label.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"RadioGroupItem","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Layout564","sourcePath":"missing-components/layout-564.jsx"},{"name":"Layout613","sourcePath":"missing-components/layout-613.jsx"},{"name":"Layout615","sourcePath":"missing-components/layout-615.jsx"}],"sourceHashes":{"components/core/Accordion.jsx":"d07f5561e440","components/core/Card.jsx":"d741eb626c5a","components/core/Carousel.jsx":"36f8efd330dd","components/core/Dialog.jsx":"2398b0d22909","components/core/Icon.jsx":"9cc372dc22d5","components/core/Tabs.jsx":"7ac77c7a6b68","components/core/VideoIframe.jsx":"8fc19a842d28","components/forms/Button.jsx":"3a21c502a292","components/forms/Checkbox.jsx":"573491289570","components/forms/Input.jsx":"866723d8cf50","components/forms/Label.jsx":"1a553ccdf70a","components/forms/RadioGroup.jsx":"6fa8dd6ba540","components/forms/Select.jsx":"c493617e2b5d","components/forms/Textarea.jsx":"74ce9a7e4ff9","missing-components/layout-564.jsx":"d458d3b7c70a","missing-components/layout-613.jsx":"a70a705e6524","missing-components/layout-615.jsx":"447311b1a34e","ui_kits/website/BusinessScreen.jsx":"dec6bdfd0758","ui_kits/website/Chrome.jsx":"b49b1fca2c90","ui_kits/website/ContactScreen.jsx":"0b0ad69825d4","ui_kits/website/HomeScreen.jsx":"d6430f853b6f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UpliftPathDesignSystem_930664 = window.UpliftPathDesignSystem_930664 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = "default",
  style,
  children,
  ...props
}) {
  const variants = {
    default: {
      border: "var(--border-width-card) solid var(--color-scheme-border, var(--border-default))",
      background: "var(--color-scheme-foreground, var(--surface-card))",
      color: "var(--color-scheme-text, var(--text-body))"
    },
    transparent: {
      border: "1px solid var(--color-white)",
      background: "transparent",
      color: "var(--color-white)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card",
    style: {
      overflow: "hidden",
      borderRadius: "var(--radius-card)",
      ...variants[variant],
      ...style
    }
  }, props), children);
}
function BackgroundCard({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "bg-card",
    style: {
      overflow: "hidden",
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, props), children);
}
function CardHeader({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-header",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
      padding: "1.5rem",
      paddingBottom: 0,
      ...style
    }
  }, props), children);
}
function CardTitle({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-title",
    style: {
      lineHeight: 1,
      fontWeight: 600,
      ...style
    }
  }, props), children);
}
function CardDescription({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-description",
    style: {
      fontSize: "0.875rem",
      color: "var(--color-neutral)",
      ...style
    }
  }, props), children);
}
function CardContent({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-content",
    style: {
      padding: "1.5rem",
      paddingBottom: 0,
      ...style
    }
  }, props), children);
}
function CardFooter({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-footer",
    style: {
      display: "flex",
      alignItems: "center",
      padding: "1.5rem",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, BackgroundCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Material Symbols Rounded (weight 500) served from jsDelivr — the same source the
 * exported site pulls its inline nav/feature icons from. Rendered as a masked span so
 * the glyph takes `color` from the current scheme.
 */
function Icon({
  name,
  size = 24,
  color = "currentColor",
  style,
  ...props
}) {
  const url = `url("https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": name,
    "data-slot": "icon",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "none",
      backgroundColor: color,
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Accordion({
  type = "single",
  defaultValue = [],
  children,
  style,
  ...props
}) {
  const [open, setOpen] = React.useState(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  const toggle = value => {
    setOpen(prev => prev.includes(value) ? prev.filter(v => v !== value) : type === "multiple" ? [...prev, value] : [value]);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "accordion",
    style: style
  }, props), React.Children.map(children, (child, i) => React.isValidElement(child) ? React.cloneElement(child, {
    __open: open.includes(child.props.value),
    __toggle: () => toggle(child.props.value),
    __first: i === 0
  }) : child));
}
function AccordionItem({
  value,
  children,
  __open,
  __toggle,
  __first,
  style,
  ...props
}) {
  const rule = "1px solid var(--color-scheme-border, var(--border-default))";
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "accordion-item",
    style: {
      borderBottom: rule,
      borderTop: __first ? rule : undefined,
      ...style
    }
  }, props), React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, {
    __open,
    __toggle
  }) : child));
}
function AccordionTrigger({
  children,
  __open,
  __toggle,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "data-slot": "accordion-trigger",
    onClick: __toggle,
    "aria-expanded": !!__open,
    style: {
      display: "flex",
      width: "100%",
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      padding: "1rem 0",
      background: "none",
      border: "none",
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: "inherit",
      color: "inherit",
      textAlign: "left",
      ...style
    }
  }, props), children, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "keyboard_arrow_down",
    size: 28,
    style: {
      transform: __open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-base)"
    }
  }));
}
function AccordionContent({
  children,
  __open,
  __toggle,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-slot": "accordion-content",
    style: {
      overflow: "hidden",
      display: __open ? "block" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    style: {
      paddingBottom: "1.25rem",
      ...style
    }
  }, props), children));
}
Object.assign(__ds_scope, { Accordion, AccordionItem, AccordionTrigger, AccordionContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open,
  onOpenChange,
  closeIconPosition = "outside",
  children,
  style,
  ...props
}) {
  if (!open) return null;
  const close = () => onOpenChange && onOpenChange(false);
  return /*#__PURE__*/React.createElement("div", {
    "data-slot": "dialog",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-slot": "dialog-overlay",
    onClick: close,
    style: {
      position: "absolute",
      inset: 0,
      background: "color-mix(in srgb,var(--color-neutral-darkest),transparent 10%)"
    }
  }), closeIconPosition === "outside" && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: close,
    "data-slot": "dialog-close",
    style: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      zIndex: 51,
      background: "none",
      border: "none",
      opacity: 0.6,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 28,
    color: "var(--color-white)"
  })), /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-content",
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: 51,
      display: "grid",
      width: "100%",
      padding: "1.5rem",
      ...style
    }
  }, props), children, closeIconPosition === "inside" && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: close,
    style: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      background: "none",
      border: "none",
      opacity: 0.6,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 28,
    color: "var(--color-neutral-darkest)"
  }))));
}
function DialogHeader({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-header",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
      ...style
    }
  }, props), children);
}
function DialogTitle({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-title",
    style: {
      fontSize: "1.125rem",
      lineHeight: 1,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      ...style
    }
  }, props), children);
}
function DialogDescription({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-description",
    style: {
      fontSize: "0.875rem",
      color: "var(--color-neutral)",
      ...style
    }
  }, props), children);
}
function DialogFooter({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-footer",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "0.25rem",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Ctx = React.createContext({
  value: undefined,
  setValue: () => {}
});
function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  style,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const setValue = v => {
    if (value === undefined) setInternal(v);
    onValueChange && onValueChange(v);
  };
  return /*#__PURE__*/React.createElement(Ctx.Provider, {
    value: {
      value: current,
      setValue
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "tabs",
    style: style
  }, props), children));
}
function TabsList({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "tabs-list",
    role: "tablist",
    style: {
      display: "flex",
      gap: "0.5rem",
      ...style
    }
  }, props), children);
}
function TabsTrigger({
  value,
  children,
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  const active = ctx.value === value;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "tab",
    "aria-selected": active,
    "data-slot": "tabs-trigger",
    "data-state": active ? "active" : "inactive",
    onClick: () => ctx.setValue(value),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      padding: "0.625rem 1.5rem",
      borderRadius: "var(--radius-button)",
      border: "2px solid " + (active ? "var(--color-scheme-border, var(--border-default))" : "transparent"),
      background: "transparent",
      color: "inherit",
      fontFamily: "var(--font-body)",
      fontSize: "inherit",
      ...style
    }
  }, props), children);
}
function TabsContent({
  value,
  children,
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  if (ctx.value !== value) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "tabs-content",
    role: "tabpanel",
    style: {
      animation: "tabs var(--duration-slow) var(--ease-tabs) forwards",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Tabs, TabsList, TabsTrigger, TabsContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/VideoIframe.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function VideoIframe({
  video,
  style,
  ...props
}) {
  const [loaded, setLoaded] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !loaded && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "progress_activity",
    size: 64,
    color: "var(--color-white)",
    style: {
      margin: "0 auto",
      animation: "spin 1s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("iframe", _extends({
    src: video,
    allow: "autoplay; encrypted-media; picture-in-picture",
    allowFullScreen: true,
    onLoad: () => setLoaded(true),
    style: {
      margin: "0 auto",
      aspectRatio: "16 / 9",
      width: "100%",
      height: "100%",
      border: "none",
      visibility: loaded ? "visible" : "hidden",
      ...style
    }
  }, props)));
}
Object.assign(__ds_scope, { VideoIframe });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/VideoIframe.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  whiteSpace: "nowrap",
  borderRadius: "var(--radius-button)",
  borderStyle: "solid",
  borderWidth: "var(--border-width-button)",
  fontFamily: "var(--font-body)",
  fontSize: "inherit",
  transition: "all var(--duration-fast) var(--ease-standard)",
  textDecoration: "none"
};
const sizeStyles = {
  default: {
    padding: "0.375rem 0.75rem"
  },
  sm: {
    padding: "0.25rem 0.625rem"
  },
  link: {
    padding: 0
  },
  icon: {
    width: "2.5rem",
    height: "2.5rem",
    padding: 0
  },
  none: {}
};
function variantStyles(variant, hovered) {
  switch (variant) {
    case "alternate":
      return {
        borderColor: hovered ? "var(--color-neutral-lighter)" : "var(--color-white)",
        background: hovered ? "var(--color-neutral-lighter)" : "var(--color-white)",
        color: "var(--color-neutral-darkest)",
        fontWeight: 500
      };
    case "secondary":
      return {
        borderColor: "var(--color-scheme-border, var(--color-neutral-darkest))",
        background: hovered ? "var(--color-neutral-darkest-5)" : "transparent",
        color: "var(--color-scheme-text, var(--text-body))",
        fontWeight: 500,
        backdropFilter: "blur(10px)"
      };
    case "secondary-alt":
      return {
        borderColor: hovered ? "var(--color-white-20)" : "var(--color-white)",
        background: hovered ? "var(--color-white-10)" : "transparent",
        color: "var(--color-white)",
        fontWeight: 500
      };
    case "link":
      return {
        borderColor: "transparent",
        background: "transparent",
        color: "var(--color-scheme-text, var(--text-body))",
        gap: "0.5rem"
      };
    case "link-alt":
      return {
        borderColor: "transparent",
        background: "transparent",
        color: "var(--color-white)",
        gap: "0.5rem"
      };
    case "ghost":
      return {
        borderColor: "transparent",
        background: hovered ? "var(--color-neutral-darkest)" : "transparent",
        color: hovered ? "var(--color-white)" : "var(--color-scheme-text, var(--text-body))"
      };
    case "none":
      return {};
    default:
      return {
        borderColor: hovered ? "var(--color-caribbean-green-dark)" : "var(--color-caribbean-green)",
        background: hovered ? "var(--color-caribbean-green-dark)" : "var(--color-caribbean-green)",
        color: "var(--color-scheme-btn-text, var(--color-neutral-darkest))",
        fontWeight: 500
      };
  }
}
function Button({
  variant = "default",
  size = "default",
  iconLeft,
  iconRight,
  disabled,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "data-slot": "button",
    "data-variant": variant,
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      ...base,
      ...(sizeStyles[size] || sizeStyles.default),
      ...variantStyles(variant, hovered && !disabled),
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? "none" : undefined,
      ...style
    }
  }, props), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Carousel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Ctx = React.createContext(null);
function Carousel({
  loop = true,
  setApi,
  children,
  style,
  ...props
}) {
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const api = React.useMemo(() => ({
    scrollTo: setIndex,
    selectedScrollSnap: () => index,
    scrollPrev: () => setIndex(i => loop ? (i - 1 + count) % count : Math.max(0, i - 1)),
    scrollNext: () => setIndex(i => loop ? (i + 1) % count : Math.min(count - 1, i + 1)),
    on: () => {},
    off: () => {}
  }), [index, count, loop]);
  React.useEffect(() => {
    setApi && setApi(api);
  }, [api, setApi]);
  return /*#__PURE__*/React.createElement(Ctx.Provider, {
    value: {
      index,
      setIndex,
      count,
      setCount,
      loop
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "carousel",
    role: "region",
    "aria-roledescription": "carousel",
    style: {
      position: "relative",
      ...style
    }
  }, props), children));
}
function CarouselContent({
  children,
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  const items = React.Children.toArray(children);
  React.useEffect(() => {
    ctx.setCount(items.length);
  }, [items.length]);
  return /*#__PURE__*/React.createElement("div", {
    "data-slot": "carousel-content",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      transform: `translateX(-${ctx.index * 100}%)`,
      transition: "transform var(--duration-slow) var(--ease-standard)",
      ...style
    }
  }, props), children));
}
function CarouselItem({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    "aria-roledescription": "slide",
    "data-slot": "carousel-item",
    style: {
      minWidth: 0,
      flex: "0 0 100%",
      ...style
    }
  }, props), children);
}
function navStyle(side) {
  return {
    position: "absolute",
    [side]: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "3rem",
    height: "3rem",
    borderRadius: "var(--radius-carousel)",
    borderWidth: "1px",
    background: "var(--color-scheme-background, var(--surface-page))"
  };
}
function CarouselPrevious({
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  return /*#__PURE__*/React.createElement(__ds_scope.Button, _extends({
    variant: "secondary",
    size: "icon",
    "aria-label": "Previous slide",
    onClick: () => ctx.setIndex(i => ctx.loop ? (i - 1 + ctx.count) % ctx.count : Math.max(0, i - 1)),
    style: {
      ...navStyle("left"),
      ...style
    }
  }, props), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow_back",
    size: 24
  }));
}
function CarouselNext({
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  return /*#__PURE__*/React.createElement(__ds_scope.Button, _extends({
    variant: "secondary",
    size: "icon",
    "aria-label": "Next slide",
    onClick: () => ctx.setIndex(i => ctx.loop ? (i + 1) % ctx.count : Math.min(ctx.count - 1, i + 1)),
    style: {
      ...navStyle("right"),
      ...style
    }
  }, props), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow_forward",
    size: 24
  }));
}
function CarouselDots({
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "6px",
      ...style
    }
  }, props), Array.from({
    length: ctx.count
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => ctx.setIndex(i),
    "aria-label": `Slide ${i + 1}`,
    style: {
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: "9999px",
      border: "none",
      padding: 0,
      background: i === ctx.index ? "var(--color-scheme-text, var(--text-body))" : "color-mix(in srgb,var(--color-scheme-text, var(--text-body)),transparent 80%)"
    }
  })));
}
Object.assign(__ds_scope, { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  id,
  variant = "default",
  style,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const [hovered, setHovered] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;
  const alt = variant === "alternate";
  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (checked === undefined) setInternal(next);
    onCheckedChange && onCheckedChange(next);
  };
  const border = alt ? "var(--color-white)" : "var(--color-neutral-darkest)";
  const fill = isOn ? alt ? "var(--color-white)" : "var(--color-neutral-darkest)" : hovered && !disabled ? alt ? "var(--color-white-10)" : "var(--color-neutral-darkest-5)" : "transparent";
  const tick = alt ? "var(--color-neutral-darkest)" : "var(--color-white)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": isOn,
    id: id,
    "data-slot": "checkbox",
    "data-variant": variant,
    onClick: toggle,
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      width: "1.125rem",
      height: "1.125rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-checkbox)",
      border: "1px solid " + border,
      background: fill,
      color: tick,
      padding: 0,
      opacity: disabled ? 0.5 : 1,
      transition: "all var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, props), isOn && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    color: tick
  }));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  icon,
  iconPosition = "left",
  prefix,
  prefixPosition = "left",
  variant = "primary",
  style,
  ...props
}) {
  const affix = {
    minHeight: "2.75rem",
    flexShrink: 0,
    padding: "0.5rem 0.75rem",
    border: "1px solid var(--color-scheme-border, var(--border-default))"
  };
  const field = {
    display: "flex",
    width: "100%",
    minHeight: "2rem",
    padding: "0.5rem 0",
    background: "transparent",
    border: "none",
    borderBottom: variant === "secondary" ? "2px solid var(--color-white-10)" : "2px solid var(--color-neutral-darkest-15)",
    color: variant === "secondary" ? "var(--color-white)" : "var(--color-scheme-text, var(--text-body))",
    fontFamily: "var(--font-body)",
    fontSize: "inherit",
    outline: "none",
    transition: "all var(--duration-fast) var(--ease-standard)",
    paddingLeft: icon && iconPosition === "left" ? "2.75rem" : undefined,
    paddingRight: icon && iconPosition === "right" ? "2.75rem" : undefined,
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      width: "100%",
      alignItems: "center"
    }
  }, icon && iconPosition === "left" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "0.75rem",
      display: "flex"
    }
  }, icon), prefix && prefixPosition === "left" && /*#__PURE__*/React.createElement("div", {
    style: {
      ...affix,
      borderRight: "none"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    "data-slot": "input",
    style: field
  }, props)), icon && iconPosition === "right" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "0.75rem",
      display: "flex"
    }
  }, icon), prefix && prefixPosition === "right" && /*#__PURE__*/React.createElement("div", {
    style: {
      ...affix,
      borderLeft: "none"
    }
  }, prefix));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Label({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    "data-slot": "label",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      userSelect: "none",
      fontFamily: "var(--font-body)",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Label.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Ctx = React.createContext({
  value: undefined,
  setValue: () => {},
  variant: "default"
});
function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  variant = "default",
  children,
  style,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const setValue = v => {
    if (value === undefined) setInternal(v);
    onValueChange && onValueChange(v);
  };
  return /*#__PURE__*/React.createElement(Ctx.Provider, {
    value: {
      value: current,
      setValue,
      variant
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    "data-slot": "radio-group",
    style: {
      display: "grid",
      gap: "0.5rem",
      ...style
    }
  }, props), children));
}
function RadioGroupItem({
  value,
  id,
  shape = "dot",
  variant,
  disabled,
  style,
  ...props
}) {
  const ctx = React.useContext(Ctx);
  const [hovered, setHovered] = React.useState(false);
  const isOn = ctx.value === value;
  const alt = (variant || ctx.variant) === "alternate";
  const border = alt ? "var(--color-white)" : "var(--color-neutral-darkest)";
  const fill = isOn ? alt ? "var(--color-white)" : "var(--color-neutral-darkest)" : hovered && !disabled ? alt ? "var(--color-white-10)" : "var(--color-neutral-darkest-5)" : "transparent";
  const mark = alt ? "var(--color-neutral-darkest)" : "var(--color-white)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "radio",
    "aria-checked": isOn,
    id: id,
    "data-slot": "radio-group-item",
    "data-variant": alt ? "alternate" : "default",
    onClick: () => !disabled && ctx.setValue(value),
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      width: "1.125rem",
      height: "1.125rem",
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9999px",
      border: "none",
      borderBottom: "2px solid " + border,
      boxShadow: "inset 0 0 0 1px " + border,
      background: fill,
      color: mark,
      padding: 0,
      opacity: disabled ? 0.5 : 1,
      transition: "all var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, props), isOn && (shape === "check" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    color: mark
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: "9999px",
      background: mark
    }
  })));
}
Object.assign(__ds_scope, { RadioGroup, RadioGroupItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select one...",
  options = [],
  variant = "primary",
  style,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const selected = options.find(o => o.value === current);
  const pick = v => {
    if (value === undefined) setInternal(v);
    onValueChange && onValueChange(v);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      width: "100%",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-slot": "select-trigger",
    onClick: () => setOpen(!open),
    style: {
      display: "flex",
      width: "100%",
      minHeight: "2rem",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.25rem",
      padding: "0.5rem 0",
      background: "transparent",
      border: "none",
      borderBottom: variant === "secondary" ? "2px solid var(--color-white-10)" : "2px solid var(--color-neutral-darkest-15)",
      borderRadius: "var(--radius-form)",
      fontFamily: "var(--font-body)",
      fontSize: "inherit",
      color: selected ? "var(--color-scheme-text, var(--text-body))" : "var(--color-neutral-darkest-60)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "keyboard_arrow_down",
    size: 20,
    style: {
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-base)"
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    "data-slot": "select-content",
    style: {
      position: "absolute",
      zIndex: 50,
      top: "calc(100% + 0.25rem)",
      left: 0,
      minWidth: "100%",
      maxHeight: "24rem",
      overflow: "auto",
      padding: "0.25rem",
      border: "1px solid var(--color-scheme-border, var(--border-default))",
      background: "var(--color-scheme-background, var(--surface-card))",
      color: "var(--color-scheme-text, var(--text-body))"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.value,
    "data-slot": "select-item",
    onClick: () => pick(o.value),
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem 0.75rem",
      cursor: "default"
    }
  }, o.label, o.value === current && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "0.5rem",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 20
  }))))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  variant = "primary",
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    "data-slot": "textarea",
    style: {
      display: "flex",
      width: "100%",
      minHeight: "2rem",
      padding: "0.5rem 0",
      background: "transparent",
      border: "none",
      borderBottom: variant === "secondary" ? "2px solid var(--color-white-10)" : "2px solid var(--color-neutral-darkest-15)",
      borderRadius: "var(--radius-form)",
      color: variant === "secondary" ? "var(--color-white)" : "var(--color-scheme-text, var(--text-body))",
      fontFamily: "var(--font-body)",
      fontSize: "inherit",
      outline: "none",
      resize: "vertical",
      transition: "all var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// missing-components/layout-564.jsx
try { (() => {
"use client";

function Layout564() {
  return /*#__PURE__*/React.createElement("section", {
    className: "grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 scheme-2 badge-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative order-last size-full overflow-hidden lg:order-first lg:min-h-[80vh]"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/a7663ed2-b2a8-4c91-5d0e-c8aef848af01/2560?exp=1788307200&sig=0ada8c3261a3b53f87685f2c9dcce9900859162a89a486599a51ed52302933d6",
    alt: "Relume placeholder image",
    className: "static size-full object-cover lg:absolute lg:inset-0"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mx-[5%] sm:max-w-md md:justify-self-start lg:mr-[5vw] lg:ml-20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-3 font-semibold md:mb-4"
  }, "Truth"), /*#__PURE__*/React.createElement("h1", {
    className: "mb-5 text-h2 font-bold md:mb-6"
  }, "What we do"), /*#__PURE__*/React.createElement("p", {
    className: "mb-6 text-medium md:mb-8"
  }, "Map and automate \u2014 We document how work really flows, then remove the duplicate entry and manual handoffs."), /*#__PURE__*/React.createElement("ul", {
    className: "my-4 list-disc pl-5"
  }, /*#__PURE__*/React.createElement("li", {
    className: "my-1 self-start pl-2"
  }, /*#__PURE__*/React.createElement("p", null, "Select and implement \u2014 Independent help choosing your core platform. We are not resellers, so the recommendation follows your requirements.")), /*#__PURE__*/React.createElement("li", {
    className: "my-1 self-start pl-2"
  }, /*#__PURE__*/React.createElement("p", null, "Report and measure \u2014 Define the metrics that matter and build the dashboard behind them.")), /*#__PURE__*/React.createElement("li", {
    className: "my-1 self-start pl-2"
  }, /*#__PURE__*/React.createElement("p", null, "Train and hand over \u2014 Implementations fail on adoption, not technology. Your team owns it when we step back.")))));
}
Object.assign(__ds_scope, { Layout564 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "missing-components/layout-564.jsx", error: String((e && e.message) || e) }); }

// missing-components/layout-613.jsx
try { (() => {
"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Recovered from the design export. The Relume source wrapped each placeholder
// <img> in another <img> — invalid markup, replaced with <div> in all four cards.
// This is almost certainly why the React exporter excluded this component.
const SERVICES = [{
  title: "Program Development Consulting",
  body: "Design and refine evidence-based programs that align with your mission, meet community needs, and drive measurable impact to business."
}, {
  title: "Business Structuring Consulting",
  body: "Build a robust operational foundation with workflows, standard operating procedures, and compliance frameworks for your business needs."
}, {
  title: "Accreditation Consulting Service",
  body: "Get expert guidance to prepare and navigate accreditation processes, ensuring your organization meets high industry standards."
}, {
  title: "Business Growth Consultation",
  body: "Identify opportunities, optimize operations, and implement strategies to sustainably scale your services and expand your reach."
}];
function ServiceCard({
  title,
  body
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex w-full flex-col items-start justify-start gap-6 border-t border-scheme-border py-6 md:flex-row md:gap-8 md:border-none md:py-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full shrink-0 grow-1 basis-1/4 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "",
    className: "aspect-square size-full rounded-image object-cover"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mb-3 md:mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-h4 font-bold"
  }, title)), /*#__PURE__*/React.createElement("p", null, body)));
}
function Layout613() {
  return /*#__PURE__*/React.createElement("section", {
    className: "px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-12 max-w-lg md:mb-18 lg:mb-20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-3 font-semibold md:mb-4"
  }, "Align"), /*#__PURE__*/React.createElement("h2", {
    className: "mb-5 text-h2 font-bold md:mb-6"
  }, "Our Business Consulting Services"), /*#__PURE__*/React.createElement("p", {
    className: "text-medium"
  }, "Helping you build, structure, and grow your business.")), /*#__PURE__*/React.createElement("div", {
    className: "grid auto-cols-fr grid-cols-1 md:grid-cols-2 md:gap-16 md:border-t md:border-scheme-border md:py-8 lg:py-12"
  }, SERVICES.slice(0, 2).map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "grid auto-cols-fr grid-cols-1 md:grid-cols-2 md:gap-16 md:border-t md:border-scheme-border md:py-8 lg:py-12"
  }, SERVICES.slice(2).map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12"
  })));
}
Object.assign(__ds_scope, { Layout613 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "missing-components/layout-613.jsx", error: String((e && e.message) || e) }); }

// missing-components/layout-615.jsx
try { (() => {
"use client";

const {
  Fragment
} = React;
function Layout615() {
  return /*#__PURE__*/React.createElement("section", {
    className: "px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-12 max-w-lg md:mb-18 lg:mb-20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-3 font-semibold md:mb-4"
  }, "Included"), /*#__PURE__*/React.createElement("h2", {
    className: "mb-5 text-h2 font-bold md:mb-6"
  }, "Led by")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 border-t border-scheme-border md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12"
  }, /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8 lg:py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 w-full overflow-hidden md:mb-8"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Julia Gilliam, LSW",
    className: "aspect-video size-full rounded-image object-cover"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "mb-5 text-h3 font-bold md:mb-6"
  }, "Julia Gilliam, LSW"), /*#__PURE__*/React.createElement("p", null, "Chief Compliance Officer, Clinical. Nine years across behavioral health, addiction recovery and mental health services.")), /*#__PURE__*/React.createElement("div", {
    className: "hidden h-full w-px bg-scheme-border md:block"
  })), /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8 lg:py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 w-full overflow-hidden md:mb-8"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Martha Matthews",
    className: "aspect-video size-full rounded-image object-cover"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "mb-5 text-h3 font-bold md:mb-6"
  }, "Martha Matthews"), /*#__PURE__*/React.createElement("p", null, "Chief Risk Officer. 20+ years in enterprise risk across healthcare and financial institutions.")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12"
  })));
}
Object.assign(__ds_scope, { Layout615 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "missing-components/layout-615.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BusinessScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Card,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} = window.UpliftPathDesignSystem_930664;

// layout-237 — "Business Consultation That Fuels Your Growth"
const SERVICES = [["handshake", "Expert Advice", "Gain expert advice and proven strategies tailored to business objectives."], ["bar_chart", "Process To Improve", "Streamline processes to improve efficiency and productivity."], ["category_search", "Access Tools", "Access specialized tools, industry trends, and benchmarking resources."]];

// layout-237_1 — "Our Simple 3-Step Consultation Process"
const STEPS = [["refresh", "Submit Request", "The client completes a short form on the website or through their organization to get started."], ["communication", "Discovery Call", "The team reviews info and contacts the client to discuss needs."], ["person", "Expert Guidance", "The client meets with a consultation expert who offers tailored business strategies and solutions."]];

// layout-419 — "Empowering Success Across Industries"
const INDUSTRIES = [["../../assets/images/home-who-we-help-0.jpg", "Behavioral Health Consulting", "Strategic consultation for behavioral health organizations to improve care quality, operational efficiency, and compliance. We help practices develop sustainable business models, optimize team processes, and navigate industry changes."], ["../../assets/images/home-who-we-help-1.jpg", "Educational Institutions", "Strategic advisory for education leaders to enhance operational performance, boost faculty engagement, and achieve academic excellence."], ["../../assets/images/home-who-we-help-2.jpg", "Startups & Entrepreneurs", "Startup coaching to address business model challenges, tailor solutions for market positioning, and connect Founders with relevant networks to accelerate growth."], ["../../assets/images/how-we-work-team-section-new.jpg", "Nonprofit Organizations", "Expert guidance to help nonprofits clarify their mission, develop sustainable funding models, and maximize their community impact through targeted advisory."]];

// layout-613 — "Our Business Consulting Services"
const CONSULTING = [["../../assets/images/for-business-page-feature-section-0.jpg", "Program Development Consulting", "Design and refine evidence-based programs that align with your mission, meet community needs, and drive measurable impact to business."], ["../../assets/images/advisory-services-about-section-new.jpg", "Business Structuring Consulting", "Build a robust operational foundation with workflows, standard operating procedures, and compliance frameworks for your business needs."], ["../../assets/images/ai-consultation-about-section.jpg", "Accreditation Consulting Service", "Get expert guidance to prepare and navigate accreditation processes, ensuring your organization meets high industry standards."], ["../../assets/images/resource-assistance-feature-section.jpg", "Business Growth Consultation", "Identify opportunities, optimize operations, and implement strategies to sustainably scale your services and expand your reach."]];

// faq-01 (shared across pages)
const FAQS = [["What is business consulting?", "Business consulting involves providing expert advice, actionable strategies, and hands-on support to help organizations solve complex challenges, improve operations, and achieve measurable growth."], ["Which industries do you specialize in?", "Our business consulting approach serves Founders and Leaders primarily in the behavioural health services sectors, from early-stage startups navigating accreditation to established agencies seeking operational transformation and growth."], ["Why should we work with a business consultant?", "Business consultants offer an objective perspective, proven methodologies, and deep industry insights that accelerate problem-solving, streamline workflows, and drive innovation—resulting in sustainable business outcomes."], ["How do your consulting services create value for clients?", "We help clients address complex business challenges through collaborative coaching, process optimisation, technology integration, and growth strategy—delivering disciplined improvements and actionable outcomes that directly impact your bottom line."]];
function IconThreeUp({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "3rem"
    }
  }, items.map(([icon, title, body]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 48
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h4)",
      marginBottom: "1.5rem"
    }
  }, title), /*#__PURE__*/React.createElement("p", null, body))));
}
function BusinessScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "scheme-8 logo-alt",
    style: {
      padding: "7rem 5%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-xxl)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "5rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-small)",
      marginBottom: "1.5rem",
      opacity: 0.85
    }
  }, "Home \u203A For Businesses"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "1rem",
      fontWeight: 600
    }
  }, "Uplift Solutions \xB7 For Businesses"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-h2)",
      marginBottom: "1.5rem"
    }
  }, "Consulting that turns plans into progress"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)"
    }
  }, "Expert guidance for founders and leaders Transform challenges into opportunities with focused business consulting."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate("contact")
  }, "Book a discovery call"))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/for-business-page-feature-section-0.jpg",
    alt: "",
    style: {
      width: "100%",
      height: "26rem",
      objectFit: "cover",
      borderRadius: "var(--radius-image)"
    }
  }))), /*#__PURE__*/React.createElement(Section, {
    scheme: 5
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Operations",
    title: "Business Consultation That Fuels Your Growth",
    body: "We help businesses to set clear goals, streamline workflows, and stay compliant so your practice can grow while staying true to its mission."
  }), /*#__PURE__*/React.createElement(IconThreeUp, {
    items: SERVICES
  })), /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Our Simple 3-Step Consultation Process",
    body: "Get started in just three simple steps"
  }), /*#__PURE__*/React.createElement(IconThreeUp, {
    items: STEPS
  })), /*#__PURE__*/React.createElement("section", {
    className: "scheme-4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: "4.5rem",
      display: "flex",
      height: "calc(100vh - 4.5rem)",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "35rem",
      marginLeft: "5vw",
      marginRight: "5rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      marginBottom: "1.5rem"
    }
  }, "Empowering Success Across Industries"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)"
    }
  }, "We co-create clear, sustainable pathways so progress is understandable, supported, and measurable across Industries.")))), /*#__PURE__*/React.createElement("div", null, INDUSTRIES.map(([img, title, body]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      position: "sticky",
      top: "4.5rem",
      display: "flex",
      height: "calc(100vh - 4.5rem)",
      flexDirection: "column",
      justifyContent: "center",
      borderTop: "1px solid var(--color-scheme-border)",
      background: "var(--color-scheme-foreground)",
      padding: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "35rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      width: "100%",
      height: "14rem",
      objectFit: "cover",
      borderRadius: "var(--radius-image)"
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h5)",
      marginBottom: "1rem"
    }
  }, title), /*#__PURE__*/React.createElement("p", null, body))))))), /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "48rem",
      marginBottom: "5rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "1rem",
      fontWeight: 600
    }
  }, "Align"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      marginBottom: "1.5rem"
    }
  }, "Our Business Consulting Services"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)"
    }
  }, "Helping you build, structure, and grow your business.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      borderTop: "1px solid var(--color-scheme-border)",
      padding: "3rem 0"
    }
  }, CONSULTING.slice(0, 2).map(([img, title, body]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      gap: "2rem",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      flex: "1 0 25%",
      aspectRatio: "1",
      objectFit: "cover",
      borderRadius: "var(--radius-image)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h4)",
      marginBottom: "1rem"
    }
  }, title), /*#__PURE__*/React.createElement("p", null, body))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      borderTop: "1px solid var(--color-scheme-border)",
      padding: "3rem 0"
    }
  }, CONSULTING.slice(2).map(([img, title, body]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      gap: "2rem",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      flex: "1 0 25%",
      aspectRatio: "1",
      objectFit: "cover",
      borderRadius: "var(--radius-image)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h4)",
      marginBottom: "1rem"
    }
  }, title), /*#__PURE__*/React.createElement("p", null, body)))))), /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-lg)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Frequently Asked Questions",
    body: "Find answers to your questions about us."
  }), /*#__PURE__*/React.createElement(Accordion, {
    type: "multiple",
    defaultValue: ["q0"]
  }, FAQS.map(([q, a], i) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: i,
    value: "q" + i
  }, /*#__PURE__*/React.createElement(AccordionTrigger, {
    style: {
      fontSize: "var(--text-medium)",
      padding: "1.25rem 0"
    }
  }, q), /*#__PURE__*/React.createElement(AccordionContent, {
    style: {
      paddingBottom: "1.5rem"
    }
  }, a)))))), /*#__PURE__*/React.createElement(Section, {
    scheme: 2,
    className: "logo-alt"
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "5rem 3rem",
      gap: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      maxWidth: "40rem"
    }
  }, "Let's Build More Effective Systems Together"), /*#__PURE__*/React.createElement(Button, {
    variant: "alternate",
    onClick: () => onNavigate("contact")
  }, "Schedule a Consultation"))));
}
Object.assign(window, {
  BusinessScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BusinessScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  Button,
  Icon,
  Card,
  Input
} = window.UpliftPathDesignSystem_930664;
const NAV = [{
  label: "About us"
}, {
  label: "Uplift Solutions",
  menu: "solutions"
}, {
  label: "Resources",
  menu: "resources"
}, {
  label: "How we work"
}];
const SOLUTIONS = [["work", "Business Consulatation", "Improve workflows, operational clarity, and long-term organizational growth."], ["star_shine", "Ai Consultation", "Assisting organizations in obtaining tools, systems, and operational support resources."], ["stars", "Advisory Services", "Strategic guidance tailored for behavioral health, nonprofit, education, and growing organizations."], ["computer", "Systems & Technology", "Build scalable systems, streamline operations, and improve organizational efficiency."], ["support_agent", "Compliance Support", "Support operational readiness and compliance processes."], ["science", "Resource Assistance", "Sustain operational readiness and compliance procedures."]];
const RESOURCES = [["enterprise", "Overview", "Solutions for your enterprise"], ["design_services", "Consultation", "Business consultation services"], ["api", "AI", "AI consultation and integration"], ["strategy", "Advisory", "Expert advisory services"], ["computer", "Systems", "Systems and technology support"], ["support", "Compliance", "Compliance support and guidance"]];
const INDUSTRIES = [["../../assets/images/home-who-we-help-0.jpg", "Behavioral Health Consulting", "Helping behavioral health organizations improve operations, care coordination, and sustainable growth."], ["../../assets/images/home-who-we-help-1.jpg", "Educational Institutions", "Supporting educational organizations with stronger systems, communication, and operational structure."], ["../../assets/images/home-who-we-help-2.jpg", "Startups & Entrepreneurs", "Strategic guidance and scalable systems designed to help growing businesses move forward confidently."], ["../../assets/images/how-we-work-team-section-new.jpg", "Nonprofit Organizations", "Helping mission-driven organizations strengthen operations, collaboration, and long-term impact."]];
function MegaColumn({
  title,
  items,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "1rem",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-small)",
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, title), items.map(([icon, name, desc]) => /*#__PURE__*/React.createElement("a", {
    key: name,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate();
    },
    style: {
      display: "grid",
      gridTemplateColumns: "max-content 1fr",
      columnGap: "0.75rem",
      alignItems: "start",
      padding: "0.5rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "1.5rem",
      height: "1.5rem",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-small)"
    }
  }, desc)))));
}
function MegaFeature({
  title,
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      maxWidth: "28rem",
      padding: "2rem 0 2rem 2rem",
      background: "var(--color-scheme-foreground)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-small)",
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "0.5rem"
    }
  }, items.map(([img, name, desc]) => /*#__PURE__*/React.createElement("a", {
    key: name,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "grid",
      gridTemplateColumns: "0.6fr 1fr",
      columnGap: "1.5rem",
      padding: "0.5rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      paddingTop: "66.66%"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "var(--radius-image)"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "0.25rem",
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-small)"
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.375rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "link",
    style: {
      fontSize: "var(--text-small)",
      textDecoration: "underline"
    }
  }, "About"))))))));
}
function Navbar({
  page,
  onNavigate
}) {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("section", {
    className: "scheme-4",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 999,
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "4.5rem",
      padding: "0 5%"
    },
    onMouseLeave: () => setOpen(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/logo-light.png",
    alt: "Uplift Path logo",
    style: {
      height: "2.25rem"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginLeft: "1.5rem"
    }
  }, NAV.map(item => item.menu ? /*#__PURE__*/React.createElement("div", {
    key: item.label,
    onMouseEnter: () => setOpen(item.menu)
  }, /*#__PURE__*/React.createElement("p", {
    role: "button",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1.5rem 1rem",
      fontSize: "1rem"
    }
  }, item.label, /*#__PURE__*/React.createElement(Icon, {
    name: "keyboard_arrow_down",
    size: 20,
    style: {
      transform: open === item.menu ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-base)"
    }
  }))) : /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    onMouseEnter: () => setOpen(null),
    style: {
      display: "block",
      padding: "1.5rem 1rem",
      fontSize: "1rem"
    }
  }, item.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => onNavigate("contact")
  }, "Contact"))), open && /*#__PURE__*/React.createElement("div", {
    className: "scheme-4",
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      width: "100%",
      borderBottom: "1px solid var(--color-scheme-border)",
      padding: "0 5%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "100%",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      flex: 1,
      gridTemplateColumns: "1fr 1fr",
      columnGap: "2rem",
      rowGap: "1.5rem",
      padding: "2rem 2rem 2rem 0"
    }
  }, open === "solutions" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MegaColumn, {
    title: "For Businesses",
    items: SOLUTIONS,
    onNavigate: () => {
      setOpen(null);
      onNavigate("business");
    }
  }), /*#__PURE__*/React.createElement(MegaColumn, {
    title: "For Individuals",
    items: [["support", "Peer Coaching Support (Telehealth)", "Help navigating difficulties of life."]],
    onNavigate: () => setOpen(null)
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MegaColumn, {
    title: "For businesses",
    items: RESOURCES,
    onNavigate: () => setOpen(null)
  }), /*#__PURE__*/React.createElement(MegaColumn, {
    title: "For individuals",
    items: [["overview", "Overview", "Personal solutions and support"]],
    onNavigate: () => setOpen(null)
  }))), /*#__PURE__*/React.createElement(MegaFeature, {
    title: open === "solutions" ? "Industries we Support" : "From the blog",
    items: INDUSTRIES.slice(0, open === "solutions" ? 4 : 2)
  }))));
}
const FOOTER_COLS = [["About us", ["Home", "Services", "Industries", "Contact"]], ["Quick links", ["Home", "About", "Services", "Contact", "Industries"]]];
const SOCIALS = [["facebook", "Facebook"], ["instagram", "Instagram"], ["x", "Twitter"], ["linkedin", "Linkedin"]];
function Footer({
  onNavigate
}) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("footer", {
    className: "scheme-4",
    style: {
      padding: "5rem 5%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-xxl)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: "grid",
      gridTemplateColumns: "0.75fr 1fr",
      columnGap: "8vw",
      rowGap: "1rem",
      padding: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      marginBottom: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/logo-light.png",
    alt: "Uplift Path logo",
    style: {
      height: "2.25rem"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "1.5rem"
    }
  }, "Unlock growth with expert advice and clear strategies tailored to your business goals. Partner with experienced consultants dedicated to your strategic success."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "35rem"
    }
  }, /*#__PURE__*/React.createElement("form", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr max-content",
      gap: "1rem",
      marginBottom: "0.75rem"
    },
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "Your email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    type: "submit"
  }, sent ? "Subscribed" : "Subscribe")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-tiny)"
    }
  }, "We respect your privacy and only send valuable content to help your organization thrive."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      columnGap: "2rem",
      rowGap: "1rem",
      alignItems: "start"
    }
  }, FOOTER_COLS.map(([title, links]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "1rem",
      fontWeight: 600,
      marginBottom: "1rem"
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      fontSize: "var(--text-small)",
      padding: "0.5rem 0"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "1rem",
      fontWeight: 600,
      marginBottom: "1rem"
    }
  }, "Connect"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, SOCIALS.map(([icon, label]) => /*#__PURE__*/React.createElement("li", {
    key: label,
    style: {
      fontSize: "var(--text-small)",
      padding: "0.5rem 0"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon === "x" ? "close" : "public",
    size: 24
  }), /*#__PURE__*/React.createElement("span", null, label)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "2rem",
      fontSize: "var(--text-small)"
    }
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 2026 Uplift Path Inc. All rights reserved."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      display: "flex",
      gap: "1.5rem",
      margin: 0,
      padding: 0
    }
  }, ["Accessibility", "Privacy policy", "Terms of service", "Grievance"].map(l => /*#__PURE__*/React.createElement("li", {
    key: l,
    style: {
      textDecoration: "underline"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, l)))))));
}
function SectionHeader({
  eyebrow,
  title,
  body,
  align = "center",
  maxWidth = "48rem"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth,
      margin: align === "center" ? "0 auto 5rem" : "0 0 5rem",
      textAlign: align,
      width: "100%"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "1rem",
      fontWeight: 600
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginBottom: "1.5rem",
      fontSize: "var(--text-h2)"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)"
    }
  }, body));
}
function Section({
  scheme = 4,
  children,
  style,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "scheme-" + scheme + " " + className,
    style: {
      padding: "7rem 5%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-xxl)",
      margin: "0 auto"
    }
  }, children));
}
Object.assign(window, {
  Navbar,
  Footer,
  SectionHeader,
  Section
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Label
} = window.UpliftPathDesignSystem_930664;
const TOPICS = [{
  value: "first-choice",
  label: "First Choice"
}, {
  value: "second-choice",
  label: "Second Choice"
}, {
  value: "third-choice",
  label: "Third Choice"
}];
const ROLES = ["Business owner", "Individual", "Startup founder", "Student", "Consultant", "Other"];
function ContactScreen() {
  const [started, setStarted] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "5rem",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/contact-us-header-section.jpg",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      minHeight: "32rem",
      objectFit: "cover",
      borderRadius: "var(--radius-image)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "1rem",
      fontWeight: 600
    }
  }, "Contact"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-h2)",
      marginBottom: "1.5rem"
    }
  }, "Start here"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)"
    }
  }, "Connect with a business advisor Who's ready to help you scale, simplify and succeed.")), /*#__PURE__*/React.createElement("form", {
    style: {
      display: "grid",
      gap: "1.5rem"
    },
    onSubmit: e => {
      e.preventDefault();
      setStarted(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "c9name",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Name"), /*#__PURE__*/React.createElement(Input, {
    id: "c9name"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "c9email",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Email"), /*#__PURE__*/React.createElement(Input, {
    type: "email",
    id: "c9email"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "c9message",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Message"), /*#__PURE__*/React.createElement(Textarea, {
    id: "c9message",
    placeholder: "Tell us everything",
    style: {
      minHeight: "11.25rem"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "var(--text-small)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "c9terms"
  }), /*#__PURE__*/React.createElement(Label, {
    htmlFor: "c9terms"
  }, "I accept the terms")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "submit"
  }, started ? "Sent" : "Get Started")))))), /*#__PURE__*/React.createElement("section", {
    className: "scheme-2 logo-alt",
    style: {
      padding: "7rem 5%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-xxl)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "5rem",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "1rem",
      fontWeight: 600
    }
  }, "Contact"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      marginBottom: "1.5rem"
    }
  }, "Send us a note"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)",
      marginBottom: "2rem"
    }
  }, "Fill out the form below and we'll be in touch"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 24
  }), /*#__PURE__*/React.createElement("p", null, "hello@demositedesign.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "call",
    size: 24
  }), /*#__PURE__*/React.createElement("p", null, "+1 (555) 000-0000")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "location_on",
    size: 24
  }), /*#__PURE__*/React.createElement("p", null, "123 Sample St, Sydney NSW 2000 AU")))), /*#__PURE__*/React.createElement("form", {
    style: {
      display: "grid",
      maxWidth: "48rem",
      gap: "1.5rem"
    },
    onSubmit: e => {
      e.preventDefault();
      setSubmitted(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "firstName",
    style: {
      marginBottom: "0.5rem"
    }
  }, "First name"), /*#__PURE__*/React.createElement(Input, {
    variant: "secondary",
    id: "firstName"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "lastName",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Last name"), /*#__PURE__*/React.createElement(Input, {
    variant: "secondary",
    id: "lastName"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Email"), /*#__PURE__*/React.createElement(Input, {
    variant: "secondary",
    type: "email",
    id: "email"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "phone",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Phone number"), /*#__PURE__*/React.createElement(Input, {
    variant: "secondary",
    id: "phone"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: "0.5rem"
    }
  }, "Choose a topic"), /*#__PURE__*/React.createElement(Select, {
    variant: "secondary",
    options: TOPICS
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      padding: "1rem 0"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: "1rem"
    }
  }, "Which best describes you?"), /*#__PURE__*/React.createElement(RadioGroup, {
    variant: "alternate",
    defaultValue: ROLES[0],
    style: {
      gridTemplateColumns: "1fr 1fr",
      gap: "0.875rem 1.5rem"
    }
  }, ROLES.map(r => /*#__PURE__*/React.createElement(Label, {
    key: r,
    htmlFor: r
  }, /*#__PURE__*/React.createElement(RadioGroupItem, {
    value: r,
    id: r
  }), r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "message",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Message"), /*#__PURE__*/React.createElement(Textarea, {
    variant: "secondary",
    id: "message",
    placeholder: "Type your message...",
    style: {
      minHeight: "11.25rem"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "var(--text-small)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "terms",
    variant: "alternate"
  }), /*#__PURE__*/React.createElement(Label, {
    htmlFor: "terms"
  }, "I accept the terms")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "submit"
  }, submitted ? "Sent" : "Submit"))))));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Card,
  BackgroundCard,
  Input,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots
} = window.UpliftPathDesignSystem_930664;
const HERO_CARDS = [["../../assets/images/home-hero-section-0.jpg", "For businesses", "Build a foundation that holds steady under pressure", "You carry weight that deserves a steady hand"], ["../../assets/images/home-hero-section-1.jpg", "For individuals", "Find a clear path through the fog of uncertainty", "Ambition is there but the path is unclear"]];
const HELP_CARDS = [["../../assets/images/home-who-we-help-0.jpg", "Operational consulting", "Discovery & Listening", "Let's start with a quick conversation to understand your goals, strengths, and any barriers you face."], ["../../assets/images/home-who-we-help-1.jpg", "Process optimization", "Your Pathway Plan", "A clear plan with transparent milestones and support, so you always know your path forward."], ["../../assets/images/home-who-we-help-2.jpg", "Leadership and strategy", "Measurable Progress", "Ongoing support to execute, track results, and adjust the pathway for sustainable growth."]];
const COMPARISON = [["Strategic clarity and direction", "Yes", "No"], ["Operational systems that scale", true, true], ["Measurable milestones and tracking", true, true], ["Dedicated experienced guidance", true, false], ["Sustainable long-term impact", true, false]];
const FAQS = [["What is business consulting?", "Business consulting involves providing expert advice, actionable strategies, and hands-on support to help organizations solve complex challenges, improve operations, and achieve measurable growth."], ["Which industries do you specialize in?", "Our business consulting approach serves Founders and Leaders primarily in the behavioural health services sectors, from early-stage startups navigating accreditation to established agencies seeking operational transformation and growth."], ["Why should we work with a business consultant?", "Business consultants offer an objective perspective, proven methodologies, and deep industry insights that accelerate problem-solving, streamline workflows, and drive innovation—resulting in sustainable business outcomes."], ["How do your consulting services create value for clients?", "We help clients address complex business challenges through collaborative coaching, process optimisation, technology integration, and growth strategy—delivering disciplined improvements and actionable outcomes that directly impact your bottom line."]];
const TESTIMONIALS = [['"The fog lifted. For the first time in years I could see the next step and the one after that."', "Sarah Mitchell", "Executive Director, Behavioral Health"], ['"They gave us structure we could actually keep using after the engagement ended."', "Denise Aku", "Founder, Community Care Partners"]];
function ImageCard({
  img,
  eyebrow,
  title,
  body,
  minHeight,
  hovered,
  onHover,
  showLink,
  index,
  activeIndex
}) {
  const isActive = activeIndex === index;
  return /*#__PURE__*/React.createElement(BackgroundCard, {
    onMouseEnter: () => onHover(index),
    onMouseLeave: () => onHover(null),
    style: {
      position: "relative",
      flex: isActive ? "1 1 70%" : "1 1 0",
      overflow: "hidden",
      transition: "flex var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "block",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minHeight,
      padding: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "0.5rem",
      fontWeight: 600,
      color: "var(--color-white)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h3)",
      color: "var(--color-white)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      maxHeight: isActive ? "12rem" : 0,
      opacity: isActive ? 1 : 0,
      transition: "all var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "1.5rem",
      color: "var(--color-white)",
      maxWidth: "33rem"
    }
  }, body), showLink && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "link-alt",
    size: "link",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "chevron_right",
      size: 20,
      color: "var(--color-white)"
    })
  }, "Explore")))))));
}
function HomeScreen({
  onNavigate
}) {
  const [heroHover, setHeroHover] = React.useState(null);
  const [helpHover, setHelpHover] = React.useState(null);
  const [slide, setSlide] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [signedUp, setSignedUp] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "For individuals",
    title: "Carry less alone",
    body: "Whether you're seeking compassionate mental-health support or building a business that can scale, Uplift Path pairs you with experienced guidance and a clear, practical path ahead."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "2rem"
    }
  }, HERO_CARDS.map(([img, eyebrow, title, body], i) => /*#__PURE__*/React.createElement(ImageCard, {
    key: i,
    img: img,
    eyebrow: eyebrow,
    title: title,
    body: body,
    minHeight: "34rem",
    showLink: true,
    index: i,
    activeIndex: heroHover,
    onHover: setHeroHover
  })))), /*#__PURE__*/React.createElement(Section, {
    scheme: 5
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "How we help organizations thrive",
    title: "Create Clear, Sustainable Pathways to Meaningful Growth",
    body: "We turn complexity into clear, sustainable pathways co-created so every step is supported and success is measurable."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "2rem"
    }
  }, HELP_CARDS.map(([img, eyebrow, title, body], i) => /*#__PURE__*/React.createElement(ImageCard, {
    key: i,
    img: img,
    eyebrow: eyebrow,
    title: title,
    body: body,
    minHeight: "30rem",
    index: i,
    activeIndex: helpHover,
    onHover: setHelpHover
  })))), /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "The difference is clear",
    body: "See how structured partnership compares to going it alone"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-xl)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr 1fr",
      borderBottom: "1px solid var(--color-scheme-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      padding: "1.5rem 1.5rem 1.5rem 0"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h6)",
      fontFamily: "var(--font-body)",
      fontWeight: 700
    }
  }, "Our approach")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/logo-light.png",
    alt: "Uplift Path logo",
    style: {
      maxHeight: "2rem"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1.5rem",
      fontWeight: 600,
      opacity: 0.6
    }
  }, "Going it alone")), COMPARISON.map(([label, a, b], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr 1fr",
      borderBottom: "1px solid var(--color-scheme-border)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      padding: "1rem 1.5rem 1rem 0"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem 1.5rem",
      fontWeight: 600
    }
  }, a === true ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 24
  }) : a === false ? /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 24
  }) : /*#__PURE__*/React.createElement("span", null, a)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem 1.5rem",
      fontWeight: 600
    }
  }, b === true ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 24
  }) : b === false ? /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 24
  }) : /*#__PURE__*/React.createElement("span", null, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate("business")
  }, "Get Started")))), /*#__PURE__*/React.createElement(Section, {
    scheme: 4,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Carousel, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "0 2rem 3rem"
    }
  }, /*#__PURE__*/React.createElement(CarouselContent, null, TESTIMONIALS.map(([quote, name, role], i) => /*#__PURE__*/React.createElement(CarouselItem, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: "48rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.25rem",
      marginBottom: "2rem"
    }
  }, [0, 1, 2, 3, 4].map(s => /*#__PURE__*/React.createElement(Icon, {
    key: s,
    name: "star",
    size: 24
  }))), /*#__PURE__*/React.createElement("h5", {
    style: {
      fontSize: "var(--text-h5)"
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "3.5rem",
      height: "3.5rem",
      borderRadius: "9999px",
      overflow: "hidden",
      background: "var(--color-neutral-lightest)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/how-we-work-team-section-new.jpg",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("p", null, role))))))), /*#__PURE__*/React.createElement(CarouselPrevious, null), /*#__PURE__*/React.createElement(CarouselNext, null), /*#__PURE__*/React.createElement(CarouselDots, {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0
    }
  })))), /*#__PURE__*/React.createElement(Section, {
    scheme: 4
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-lg)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Frequently Asked Questions",
    body: "Find answers to your questions about us."
  }), /*#__PURE__*/React.createElement(Accordion, {
    type: "multiple",
    defaultValue: FAQS.map((_, i) => "q" + i)
  }, FAQS.map(([q, a], i) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: i,
    value: "q" + i
  }, /*#__PURE__*/React.createElement(AccordionTrigger, {
    style: {
      fontSize: "var(--text-medium)",
      padding: "1.25rem 0"
    }
  }, q), /*#__PURE__*/React.createElement(AccordionContent, {
    style: {
      paddingBottom: "1.5rem"
    }
  }, a)))))), /*#__PURE__*/React.createElement(Section, {
    scheme: 2,
    className: "logo-alt"
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "3rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      marginBottom: "1.5rem",
      fontSize: "var(--text-h2)"
    }
  }, "Ready to unlock Your growth plan"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-medium)"
    }
  }, "Book your discovery call for personalized, actionable strategies tailored to your business goals."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "2rem",
      width: "100%",
      maxWidth: "30rem"
    }
  }, /*#__PURE__*/React.createElement("form", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr max-content",
      gap: "1rem",
      marginBottom: "1rem"
    },
    onSubmit: e => {
      e.preventDefault();
      setSignedUp(true);
    }
  }, /*#__PURE__*/React.createElement(Input, {
    variant: "secondary",
    type: "email",
    placeholder: "Enter your email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    type: "submit",
    style: {
      padding: "0.75rem 1.5rem"
    }
  }, signedUp ? "Thanks" : "Sign up")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-tiny)"
    }
  }, "By clicking Sign Up you're confirming that you agree with our Terms and Conditions."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/career-take-away-new.jpg",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.AccordionItem = __ds_scope.AccordionItem;

__ds_ns.AccordionTrigger = __ds_scope.AccordionTrigger;

__ds_ns.AccordionContent = __ds_scope.AccordionContent;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.BackgroundCard = __ds_scope.BackgroundCard;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.CarouselContent = __ds_scope.CarouselContent;

__ds_ns.CarouselItem = __ds_scope.CarouselItem;

__ds_ns.CarouselPrevious = __ds_scope.CarouselPrevious;

__ds_ns.CarouselNext = __ds_scope.CarouselNext;

__ds_ns.CarouselDots = __ds_scope.CarouselDots;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.DialogHeader = __ds_scope.DialogHeader;

__ds_ns.DialogTitle = __ds_scope.DialogTitle;

__ds_ns.DialogDescription = __ds_scope.DialogDescription;

__ds_ns.DialogFooter = __ds_scope.DialogFooter;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TabsList = __ds_scope.TabsList;

__ds_ns.TabsTrigger = __ds_scope.TabsTrigger;

__ds_ns.TabsContent = __ds_scope.TabsContent;

__ds_ns.VideoIframe = __ds_scope.VideoIframe;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.RadioGroupItem = __ds_scope.RadioGroupItem;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Layout564 = __ds_scope.Layout564;

__ds_ns.Layout613 = __ds_scope.Layout613;

__ds_ns.Layout615 = __ds_scope.Layout615;

})();
