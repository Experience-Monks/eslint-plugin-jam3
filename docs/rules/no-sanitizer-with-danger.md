# Prevent usage of dangerous JSX props without sanitizer (no-sanitizer-with-danger)

This rule aims to prevent Cross-Site Scripting (XSS) attacks from hackers.


## Rule Details

When trying to inject string format DOM into `dangerouslySetInnerHTML`, all inject must be wrapped with xss sanitizer. Please use `sanitizer` in util folder. If not existing, create sanitizer util for your project.

Examples of **incorrect** code for this rule:

```js
<div dangerouslySetInnerHTML={{ __html: "" }} /> // no xss wrapper
<div dangerouslySetInnerHTML={{ __html: "Hello World" }} /> // no xss wrapper
<div dangerouslySetInnerHTML={{ __html: "<p>without sanitizing wrapper</p>" }} /> // no xss wrapper
<div dangerouslySetInnerHTML={{ __html: randomName("<p>with sanitizer</p>") }} /> // any random function call is prohibited.
<div dangerouslySetInnerHTML={{ __html: sanitize("<p>with sanitizer</p>") }} /> // ^
<div dangerouslySetInnerHTML={{ __html: DomPurify.sanitize("<p>with sanitizer</p>") }} /> // Direct use of library is prohibited.
```

Examples of **correct** code for this rule:

```js
<div dangerouslySetInnerHTML={{ __html: sanitizer("<p>with sanitizer</p>") }} />
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## Further Reading

- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Cross-site Scripting(XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))
