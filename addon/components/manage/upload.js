import Component from "@ember/component";
import { inject as service } from "@ember/service";

import layout from "../../templates/components/manage/upload";

export default Component.extend({
  layout,

  ajax: service(),

  error: null,
  templates: null,

  actions: {
    async uploadTemplate(event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);

      // Append data with values that should not be set by the user.
      data.append("engine", "docx-template");

      const options = {
        data,
        // https://stackoverflow.com/a/5976031
        contentType: false,
        processData: false
      };

      try {
        const response = await this.ajax.post("/template/", options);
        this.templates.pushObject(response);

        // Clear the form on success.
        form.reset();
      } catch (error) {
        this.set("error", error.payload);
      }
    }
  }
});
