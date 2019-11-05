# eslint-plugin-jam3

Jam3 eslint plugin for react

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-jam3`:

```
$ npm install eslint-plugin-jam3 --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-jam3` globally.

## Usage

Add `jam3` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["jam3"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "jam3/rule-name": 2
  }
}
```

## Supported Rules

- [jam3/no-sanitizer-with-danger](docs/rules/no-sanitizer-with-danger.md): Enforces use of xss sanitizer with danger
- [jam3/no-sanitizer-window-location](docs/rules/no-sanitizer-window-location.md): Enforces use of xss sanitizer with window.location
- [jam3/forbid-methods](docs/rules/forbid-methods.md): Forbid use of method

## Useful resources

- [Eslint developer guide](https://eslint.org/docs/developer-guide/)
- [Creating an ESLint Plugin](https://medium.com/@btegelund/creating-an-eslint-plugin-87f1cb42767f)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [ast explorer](https://astexplorer.net/)
