"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */

  // Must do this in register as bootstrap is too late and the middleware won't be used.
  async register({ strapi }) {
    // Shortcut to the proper API
    const ctmRoutes = strapi.plugins["content-manager"].routes.admin.routes;

    // Simple reference to the middleware
    const ctmMiddleware = "global::auto-uid";

    // Find the index of the route we want to modify
    const indexID = ctmRoutes.findIndex(
      (route) =>
        // You can modify this to search for a specific route or multiple
        route.method === "POST" && route.path === "/collection-types/:model"
    );

    // If the route exists lets inject the middleware
    if (indexID > -1) {
      ctmRoutes[indexID].config.middlewares.push(ctmMiddleware);
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
