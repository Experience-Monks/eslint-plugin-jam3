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
        class Valid1 extends Component {
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
        class Valid2 extends React.Component {
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
        class Valid3 extends PureComponent {
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
        class Valid4 extends React.PureComponent {
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
        class Valid5 extends React.PureComponent {
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
      `,
      options: [{ forbiddenMethods: ['componentWillMount', 'componentWillReceiveProps'] }]
    },
    {
      code: `
        var Valid6 = createReactClass({
          UNSAFE_componentWillMount: function() {},
          componentDidMount: function() {},
          UNSAFE_componentWillReceiveProps: function() {},
          shouldComponentUpdate: function() {},
          UNSAFE_componentWillUpdate: function() {},
          getSnapshotBeforeUpdate: function() {},
          componentDidUpdate: function() {},
          componentDidCatch: function() {},
          componentWillUnmount: function() {},
          render: function() {
            return <div>Hello</div>;
          }
        });
      `
    }
  ],

  invalid: [
    {
      code: `
        class Invalid1 extends React.Component {
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
        class Invalid2 extends React.Component {
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
        class Invalid3 extends React.Component {
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
        class Invalid4 extends React.Component {
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
        class Invalid5 extends React.PureComponent {
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
        var Invalid6 = createReactClass({
          componentWillMount: function() {},
          UNSAFE_componentWillMount: function() {},
          componentDidMount: function() {},
          UNSAFE_componentWillReceiveProps: function() {},
          shouldComponentUpdate: function() {},
          UNSAFE_componentWillUpdate: function() {},
          getSnapshotBeforeUpdate: function() {},
          componentDidUpdate: function() {},
          componentDidCatch: function() {},
          componentWillUnmount: function() {},
          render: function() {
            return <div>Hello</div>;
          }
        });
      `,
      errors: [
        {
          message: 'Component includes forbidden method(s).'
        }
      ]
    }
  ]
});
