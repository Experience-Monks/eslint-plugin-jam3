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

## Rule Options

This rule can take one argument to customize the components organization.

```js
...
"jam3/no-sanitizer-with-danger": [<enabled>, { wrapperName: <wrapperName>}]
...
```

* `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
* `wrapperName`: optional array of methods to validate.

The default configuration is:

```js
{
  wrapperName: [
    'sanitizer'
  ]
}
```

You can override this configuration to match your needs.

For example, if you want to allow other key words:

```js
"jam3/no-sanitizer-with-danger": [2, {
  wrapperName: [
    'xss',
    'purify'
  ]
}]
```

## Further Reading

- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Cross-site Scripting(XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))
