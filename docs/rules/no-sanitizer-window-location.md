# Prevent window object based XSS attack (no-sanitizer-window-location)

Please describe the origin of the rule here.

## Rule Details

This rule aims to avoid Address DOM XSS attack. Using `window.location` improperly can cause javascript to trigger DOM based XSS attacks. Since `window.location` is readable and writable, it requires paying attention to what data is being assigned. Please find examples below as bad and best practices.

Examples of **incorrect** code for this rule:

```js
// Violation examples when reading values from a property of window.location without sanitizer
const windowLocationOrigin = window.location.origin;
const windowLocationHash = window.location.hash;
const windowLocationHost = window.location.host;
const windowLocationHostname = window.location.hostname;
const windowLocationPathname = window.location.pathname;
const windowLocationSearch = window.location.search;
const windowLocationHref = window.location.href;

// Violation examples when assigning values to a property of window.location without sanitizer
window.location.hash = 'unpurifiedString';
window.location.hash = unpurifiedVar;
window.location.assign('unpurifiedString');
window.location.assign(unpurifiedVar);
```

Examples of **correct** code for this rule:

```js
const windowLocationOrigin = sanitizer(window.location.origin);
const windowLocationHash = sanitizer(window.location.hash);
const windowLocationHost = sanitizer(window.location.host);
const windowLocationHostname = sanitizer(window.location.hostname);
const windowLocationPathname = sanitizer(window.location.pathname);
const windowLocationSearch = sanitizer(window.location.search);
const windowLocationHref = sanitizer(window.location.href);

window.location.hash = sanitizer('payload');
window.location.hash = sanitizer(payload);
window.location.pathname = sanitizer('payload');
window.location.pathname = sanitizer(payload);
window.location.search = sanitizer('payload');
window.location.search = sanitizer(payload);
window.location.assign(sanitizer('payload'));
window.location.assign(sanitizer(payload));
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
