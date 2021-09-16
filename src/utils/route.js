import CONSTANTS from "./constants";

const routeUtils = {
  buildAbsoluteUrl: function (path) {
    const host =
      process.env.NODE_ENV !== "production"
        ? CONSTANTS.server.dev
        : CONSTANTS.server.prod;

    return host + path;
  },
};

export default routeUtils;
