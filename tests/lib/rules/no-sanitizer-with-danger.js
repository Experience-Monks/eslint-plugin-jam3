/**
 * @fileoverview Prevent usage of dangerous JSX props without sanitizer
 * @author Donghyuk Jang
 */
'use strict';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------
const NO_SANITIZER_PATTERN = /Dangerous property '\s+' without sanitizer found./;
const BAD_WRAPPER_PATTERN = /Wrapper name is not one of '\[.*\]'\./;
const XSS_LIBRARY_MESSAGE = 'Direct use of xss library found.';

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
      errors: [NO_SANITIZER_PATTERN]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: '' }}></div>;",
      errors: [NO_SANITIZER_PATTERN]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: '<p>with sanitizer</p>' }} />;",
      errors: [NO_SANITIZER_PATTERN]
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: title }} />;',
      errors: [NO_SANITIZER_PATTERN]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: invalidSanitizer('<p>with sanitizer</p>') }} />;",
      errors: [BAD_WRAPPER_PATTERN]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: Dompurify.sanitizer('<p>with sanitizer</p>') }} />;",
      errors: [{ message: XSS_LIBRARY_MESSAGE }]
    },
    {
      code: "<div dangerouslySetInnerHTML={{ __html: sanitize('<p>with sanitizer</p>') }} />;",
      options: [{ wrapperName: ['xss', 'purify'] }],
      errors: [BAD_WRAPPER_PATTERN]
    }
  ]
});
