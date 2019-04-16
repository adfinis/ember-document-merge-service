import Component from "@ember/component";
import { A } from "@ember/array";

import layout from "../templates/components/manage";

export default Component.extend({
  layout,

  templates: null,

  actions: {
    setTemplates(templates) {
      this.set("templates", A(templates));
    },
    addTemplate(template) {
      this.set("templates", A([...this.templates, template]));
    },
    removeTemplate(template) {
      this.set("templates", A(this.templates.without(template)));
    }
  }
});
