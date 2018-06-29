# Restrict the use of methods (forbid-methods)

Please describe the origin of the rule here.


## Rule Details

By default, this rule aims to limit the use of React un-prefixed deprecated lifecycle methods including in `componentWillMount`,  `componentWillReceiveProps`, `componentWillUpdate`. Check out React Post at [here](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes)

Examples of **incorrect** code for this rule:

```js

class Hello extends React.Component {
  componentWillMount() { ... } // deprecated lifecycle 
  componentWillReceiveProps() { ... } // deprecated lifecycle 
  componentWillUpdate() { ... } // deprecated lifecycle
}

```

Examples of **correct** code for this rule:

```js

class Hello extends React.Component {
  UNSAFE_componentWillMount() { ... } 
  UNSAFE_componentWillReceiveProps() { ... } 
  UNSAFE_componentWillUpdate() { ... }
}

```

## Rule Options

This rule can take one argument to customize the components organization.

```js
...
"jam3/forbid-methods": <enabled>
...
```
or 
```js
...
"jam3/forbid-methods": [<enabled>, { forbiddenMethods: <forbiddenMethods>}]
...
```

* `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
* `forbiddenMethods`: optional array of forbidden method(s).

The default configuration is:

```js
{
  forbiddenMethods: [
  ]
}
```

You can override this configuration to match your needs.

For example, if you want to block additional methods:

```js
"jam3/forbid-methods": [2, {
  forbiddenMethods: [
    'additionalForbiddenMethods1',
    'additionalForbiddenMethods2'
  ]
}]
```


## Further Reading

* [React component lifecycle changes](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes)
