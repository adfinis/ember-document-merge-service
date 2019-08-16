import Component from "@ember/component";
import { inject as service } from "@ember/service";
import naturalSort from "javascript-natural-sort";

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
      const onFetch = this.get("on-fetch");
      const response = await this.ajax.request("/template/");
      const templates = response.results.sort((a, b) =>
        naturalSort(a.description, b.description)
      );

      if (onFetch) {
        onFetch(templates);
      }
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
        const onDelete = this.get("on-delete");
        await this.ajax.del(`/template/${template.slug}`);

        if (onDelete) {
          onDelete(template);
        }
      } catch (error) {
        this.set("error", error);
      }
    },
    cancelDelete() {
      this.set("selected", null);
    }
  }
});
