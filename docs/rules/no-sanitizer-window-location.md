# Prevent window object based XSS attack (no-sanitizer-window-location)

Please describe the origin of the rule here.

## Rule Details

This rule aims to avoid Address DOM XSS attack. Using `window.location` improperly can cause javascript to trigger DOM based XSS attacks. Since `window.location` is readable and writable, it requires paying attention to what data is being assigned. Please find examples below as bad and best practices.

Examples of **incorrect** code for this rule:

```js
const payload = window.location.hash.substr(1);
window.location = payload;
window.location.assign(payload);
```

Examples of **correct** code for this rule:

```js
const payload = window.location.hash.substr(1);
window.location = sanitizer(payload);
window.location.assign(sanitizer(payload));
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
