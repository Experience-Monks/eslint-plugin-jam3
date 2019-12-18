/**
 * @fileoverview Prevent window object based XSS attack
 * @author Donghyuk (Jacob) Jang
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-sanitizer-window-location');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-sanitizer-window-location', rule, {
  // valid example codes
  valid: [
    // assigning
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
    },
    // reading
    {
      code: 'var windowLocation = sanitizer(window.location);'
    },
    {
      code: 'var windowLocation = sanitizer(window.location.origin);'
    },
    {
      code: 'var windowLocation = sanitizer(window.location.hash);'
    },
    {
      code: 'var windowLocation = sanitizer(window.location.host);'
    },
    {
      code: 'var windowLocation = sanitizer(window.location.hostname);'
    },
    {
      code: 'var windowLocation = sanitizer(window.location.pathname);'
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
    },
    // reading
    {
      code: 'var windowLocation = window.location;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    }
  ]
});
