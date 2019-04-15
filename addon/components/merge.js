import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { saveAs } from "file-saver";
import { task } from "ember-concurrency";

import layout from "../templates/components/merge";

export default Component.extend({
  layout,

  ajax: service(),

  error: null,
  templates: null,
  filename: "download1",
  data: null,
  template: null,

  init() {
    this._super(...arguments);
    this.fetchTemplates.perform();
  },

  fetchTemplates: task(function*() {
    try {
      const response = yield this.ajax.request("/template/");
      this.set("templates", response.results);
    } catch (error) {
      this.set("templates", []);
    }
  }),

  actions: {
    mergeTemplate(event) {
      event.preventDefault();
      const form = event.target;
      const slug = form.elements.template.value;

      if (!slug) {
        return;
      }

      // https://stackoverflow.com/a/23797348
      const filename = `${this.get("filename")}.docx`;
      const payload = JSON.stringify({ data: this.data });
      const request = new XMLHttpRequest();

      request.open(
        "POST",
        `${this.ajax.host}${this.ajax.namespace}/template/${slug}/merge/`
      );

      request.setRequestHeader("Content-Type", this.ajax.contentType);

      request.responseType = "blob";

      request.addEventListener("load", function(event) {
        //{ target: { response } }
        const response = event.target.response;
        saveAs(response, filename);
      });

      request.addEventListener("error", error => {
        this.set("error", error.message);
      });

      request.send(payload);
    }
  }
});
