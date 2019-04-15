import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { A } from "@ember/array";

import layout from "../../templates/components/manage/delete";

export default Component.extend({
  layout,

  ajax: service(),

  error: null,
  templates: null,

  /**
   * The selected property holds the currently selected template
   * to be used in the modal dialog before deleting a template.
   * @property selected
   */
  selected: null,

  async init() {
    this._super(...arguments);

    try {
      const response = await this.ajax.request("/template/");
      this.set("templates", A(response.results));
    } catch (error) {
      this.set("error", error);
    }
  },

  actions: {
    requestDelete(template) {
      this.set("selected", template);
    },
    async submitDelete() {
      const template = this.selected;
      this.set("selected", null);
      this.set("error", null);

      try {
        await this.ajax.del(`/template/${template.slug}`);
        this.set("templates", this.templates.without(template));
      } catch (error) {
        this.set("error", error);
      }
    },
    cancelDelete() {
      this.set("selected", null);
    }
  }
});
