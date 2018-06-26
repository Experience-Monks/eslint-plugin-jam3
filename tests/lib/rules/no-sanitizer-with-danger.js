/**
 * @fileoverview Prevent usage of dangerous JSX props without sanitizer
 * @author Donghyuk Jang
 */
'use strict';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------
const MESSAGE = 'Use xss sanitizer with dangerouslySetInnerHTML';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-sanitizer-with-danger');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-sanitizer-with-danger', rule, {
  valid: [
    {
      code: '<App />;',
      options: [{ wrapperName: ['sanitizer'] }]
    },
    {
      code: "<App dangerouslySetInnerHTML={{ __html: sanitizer('<p>with sanitizer</p>') }} />;",
      options: [{ wrapperName: ['sanitizer'] }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: sanitizer('<p>with sanitizer</p>') }} />;"
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: sanitizer(title) }} />;'
    }
  ],
  invalid: [
    {
      code: "<App dangerouslySetInnerHTML={{ __html: '<p>with sanitizer</p>' }} />;",
      errors: [{ message: MESSAGE }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: '' }}></div>;",
      errors: [{ message: MESSAGE }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: '<p>with sanitizer</p>' }} />;",
      errors: [{ message: MESSAGE }]
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: title }} />;',
      errors: [{ message: MESSAGE }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: sanitize('<p>with sanitizer</p>') }} />;",
      errors: [{ message: 'Use sanitizer as name of wrapper' }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: Dompurify.sanitizer('<p>with sanitizer</p>') }} />;",
      errors: [{ message: 'Use sanitizer in util folder. Create sanitizer util if no exist.' }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: sanitizer('<p>with sanitizer</p>') }} />;",
      options: [{ wrapperName: ['xss', 'purify'] }],
      errors: [{ message: 'Use sanitizer in util folder. Create sanitizer util if no exist.' }]
    }
  ]
});
