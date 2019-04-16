import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, fillIn, render, settled } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";
import { A } from "@ember/array";

module("Integration | Component | merge", function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.set("templates", A());
    this.set("onFetch", templates => this.set("templates", A(templates)));
  });

  test("it renders", async function(assert) {
    await render(hbs`{{merge-files}}`);
    assert.ok(this.element);
  });

  test("it list uploaded templates", async function(assert) {
    const ajax = this.owner.lookup("service:ajax");
    const count_db = (await ajax.request("/template/")).results.length;

    await render(hbs`
      {{merge-files
        templates=templates
        on-fetch=onFetch
      }}
    `);
    await settled();

    // The additional <option> is the "Choose" option.
    assert.dom("option").exists({ count: count_db + 1 });
  });

  test("it merges data with templates", async function(assert) {
    this.set("filename", "test-merge");
    this.set("data", { test: "Hello World" });

    await render(hbs`
      {{merge-files
        data=data
        filename=filename
        templates=templates
        on-fetch=onFetch
      }}
    `);
    await settled();

    const ajax = this.owner.lookup("service:ajax");
    const slug = (await ajax.request("/template/")).results[0].slug;

    // Choose first of the templates
    await fillIn("[name=template]", slug);
    assert.dom("[name=template]").hasValue(slug);

    // Submit form
    await click(".uk-button");
  });
});
