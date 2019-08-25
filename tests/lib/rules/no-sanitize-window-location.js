/**
 * @fileoverview Prevent window object based XSS attack
 * @author Donghyuk (Jacob) Jang
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-sanitize-window-location');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-sanitize-window-location', rule, {
  // valid example codes
  valid: [
    {
      code: 'window.location = sanitizer("/path#unpurifiedString");'
    },
    {
      code: 'window.location = sanitizer(unpurifiedVar);'
    },
    {
      code: 'window.location.hash = sanitizer("unpurifiedString");'
    },
    {
      code: 'window.location.hash = sanitizer(unpurifiedVar);'
    },
    {
      code: 'window.location.assign(sanitizer("/path#unpurifiedString"));'
    },
    {
      code: 'window.location.assign(sanitizer(unpurifiedVar));'
    }
  ],
  // invalid example codes
  invalid: [
    {
      code: 'window.location = "unpurifiedString";',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location = unpurifiedVar;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location.hash = "unpurifiedString";',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location.hash = unpurifiedVar;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location.assign("unpurifiedString");',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location.assign(unpurifiedVar);',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    }
  ]
});
