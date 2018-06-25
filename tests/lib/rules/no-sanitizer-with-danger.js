/**
 * @fileoverview Prevent usage of dangerous JSX props without sanitizer
 * @author Donghyuk Jang
 */
"use strict";

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------
const MESSAGE = "Use xss sanitizer with dangerouslySetInnerHTML";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/no-sanitizer-with-danger");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("no-sanitizer-with-danger", rule, {
  valid: [
    {
      code: "<App />;"
    },
    {
      code:
        "<App dangerouslySetInnerHTML={{ __html: sanitizer('<p>with sanitizer</p>') }} />;"
    },
    {
      code:
        "<div dangerouslySetInnerHTML={{ __html: sanitizer('<p>with sanitizer</p>') }} />;"
    }
  ],
  invalid: [
    {
      code: "<div dangerouslySetInnerHTML={{ __html: '' }}></div>;",
      errors: [{ message: MESSAGE }]
    },
    {
      code:
        "<div dangerouslySetInnerHTML={{ __html: '<p>with sanitizer</p>' }} />;",
      errors: [{ message: MESSAGE }]
    },
    {
      code:
        "<div dangerouslySetInnerHTML={{ __html: sanitize('<p>with sanitizer</p>') }} />;",
      errors: [{ message: MESSAGE }]
    },
    {
      code:
        "<div dangerouslySetInnerHTML={{ __html: xss('<p>with sanitizer</p>') }} />;",
      errors: [{ message: MESSAGE }]
    },
    {
      code:
        "<div dangerouslySetInnerHTML={{ __html: Dompurify.sanitizer('<p>with sanitizer</p>') }} />;",
      errors: [{ message: MESSAGE }]
    }
  ]
});
