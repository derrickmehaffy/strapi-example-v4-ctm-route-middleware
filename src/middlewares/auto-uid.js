"use strict";

// Lodash kebabCase, requires no extra packages since we have lodash in Strapi already
const _kb = require("lodash/kebabCase");

/**
 * `auto-uid` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    // Some quick debugging
    // console.log("BODY: ", ctx.request.body);
    // console.log("QUERY: ", ctx.request.query);
    // console.log("PARAMS: ", ctx.request.params);

    const body = ctx.request.body;

    // This isn't required but useful if you want to apply the middleware to multiple content-types
    const models = ["api::test.test"];

    // Same here if you want to impact multiple components
    const components = ["test.test-uid"];

    // This is not the cleanest code ever but it's simple in that it checks the models and components but fields are hard coded which is not ideal
    // Ideally to make this more "reusable" you shouldn't hard code the dynamic zone and uid field names
    if (ctx.request.params && models.includes(ctx.request.params.model)) {
      for (const component in components) {
        if (body && body.dz) {
          for (let i = 0; i < body.dz.length; i++) {
            if (body.dz[i].__component === components[component]) {
              body.dz[i].fakeUID = _kb(body.dz[i].fakeUID);
            }
          }
        }
      }
    }

    await next();
  };
};
