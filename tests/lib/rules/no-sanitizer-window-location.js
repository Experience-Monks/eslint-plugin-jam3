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
      code: 'window.location.href = sanitizer(unpurifiedVar);'
    },
    {
      code: 'window.location.pathname = sanitizer(unpurifiedVar);'
    },
    {
      code: 'window.location.search = sanitizer(unpurifiedVar);'
    },
    {
      code: 'window.location.hash = sanitizer("unpurifiedString");'
    },
    {
      code: 'window.location.origin = sanitizer("unpurifiedString");'
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
      code: 'var windowLocationOrigin = sanitizer(window.location.origin);'
    },
    {
      code: 'var windowLocationHash = sanitizer(window.location.hash);'
    },
    {
      code: 'var windowLocationHost = sanitizer(window.location.host);'
    },
    {
      code: 'var windowLocationHostname = sanitizer(window.location.hostname);'
    },
    {
      code: 'var windowLocationPathname = sanitizer(window.location.pathname);'
    },
    {
      code: 'var windowLocationSearch = sanitizer(window.location.search);'
    },
    {
      code: 'var windowLocationOrigin = sanitizer(window.location.origin);'
    },
    {
      code: 'var windowLocationHref = sanitizer(window.location.href);'
    }
  ],
  // invalid example codes
  invalid: [
    {
      code: 'window.location = "/path#unpurifiedString";',
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
      code: 'window.location.href = unpurifiedVar;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location.pathname = unpurifiedVar;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'window.location.search = unpurifiedVar;',
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
      code: 'window.location.origin = "unpurifiedString";',
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
      code: 'window.location.assign("/path#unpurifiedString");',
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
    },
    {
      code: 'var windowLocationOrigin = window.location.origin;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationHash = window.location.hash;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationHost = window.location.host;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationHostname = window.location.hostname;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationPathname = window.location.pathname;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationSearch = window.location.search;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationOrigin = window.location.origin;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    },
    {
      code: 'var windowLocationHref = window.location.href;',
      errors: [
        {
          message: 'File contains violation code(s) of XSS attack',
          type: 'Cross Site Scripting (XSS)'
        }
      ]
    }
  ]
});
