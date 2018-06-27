/**
 * @fileoverview Restrict the use of methods
 * @author Donghyuk Jang
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/forbid-methods');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

require('babel-eslint');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run('forbid-methods', rule, {
  valid: [
    {
      code: `
        class Hello extends Component {
          constructor() {}
          componentDidMount() {}
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          shouldComponentUpdate() {}
          UNSAFE_componentWillUpdate() {}
          componentDidUpdate() {}
          componentWillUnmount() {}
          render() {}
        }
      `
    },
    {
      code: `
        class Hello extends React.Component {
          constructor() {}
          componentDidMount() {}
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          shouldComponentUpdate() {}
          UNSAFE_componentWillUpdate() {}
          componentDidUpdate() {}
          componentWillUnmount() {}
          render() {}
        }
      `
    },
    {
      code: `
        class Hello extends PureComponent {
          constructor() {}
          componentDidMount() {}
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          shouldComponentUpdate() {}
          UNSAFE_componentWillUpdate() {}
          componentDidUpdate() {}
          componentWillUnmount() {}
          render() {}
        }
      `
    },
    {
      code: `
        class Hello extends React.PureComponent {
          constructor() {}
          componentDidMount() {}
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          shouldComponentUpdate() {}
          UNSAFE_componentWillUpdate() {}
          componentDidUpdate() {}
          componentWillUnmount() {}
          render() {}
        }
      `
    },
    {
      code: `
        class Hello extends React.PureComponent {
          constructor() {}
          componentDidMount() {}
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          shouldComponentUpdate() {}
          componentWillUpdate() {}
          UNSAFE_componentWillUpdate() {}
          componentDidUpdate() {}
          componentWillUnmount() {}
          render() {}
        }
      `,
      options: [{ forbiddenMethods: ['componentWillMount', 'componentWillReceiveProps'] }]
    }
  ],

  invalid: [
    {
      code: `
        class Hello extends React.Component {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
          render() {}
        }
      `,
      errors: [
        {
          message: 'Component includes forbidden method(s).'
        }
      ]
    },
    {
      code: `
        class Hello extends React.Component {
          componentWillMount() {}
          render() {}
        }
      `,
      errors: [
        {
          message: 'Component includes forbidden method(s).'
        }
      ]
    },
    {
      code: `
        class Hello extends React.Component {
          componentWillReceiveProps() {}
          render() {}
        }
      `,
      errors: [
        {
          message: 'Component includes forbidden method(s).'
        }
      ]
    },
    {
      code: `
        class Hello extends React.Component {
          componentWillUpdate() {}
          render() {}
        }
      `,
      errors: [
        {
          message: 'Component includes forbidden method(s).'
        }
      ]
    },
    {
      code: `
        class Hello extends React.PureComponent {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
          render() {}
        }
      `,
      errors: [
        {
          message: 'Component includes forbidden method(s).'
        }
      ]
    }
  ]
});
