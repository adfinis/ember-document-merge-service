"use strict";

module.exports = function(environment) {
  const ENV = {
    modulePrefix: "ember-document-merge-service",
    environment,

    "ember-validated-form": {
      theme: "uikit"
    }
  };

  return ENV;
};
