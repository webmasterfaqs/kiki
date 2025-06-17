// config/middlewares.ts
export default [
  'strapi::logger',
  'strapi::errors',

  /* -------------------------------------------------
   * Security middleware — add CKEditor CSP directives
   * ------------------------------------------------- */
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          /* allow the CKEditor CDN script itself */
          'script-src': ["'self'", 'https://cdn.ckeditor.com'],

          /* allow the event-proxy endpoint CKEditor uses */
          'connect-src': ["'self'", 'https://proxy-event.ckeditor.com'],
        },
      },
    },
  },

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

