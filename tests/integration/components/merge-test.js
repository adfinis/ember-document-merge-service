import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, fillIn, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

module("Integration | Component | merge", function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test("it renders", async function(assert) {
    const ajax = this.owner.lookup("service:ajax");
    const templates = (await ajax.request("/template/")).results;

    await render(hbs`{{merge-files}}`);
    assert.ok(this.element);

    assert.dom("option").exists({ count: templates.length + 1 });
  });

  test("it merges data with templates", async function(assert) {
    this.set("filename", "test-merge");
    this.set("data", { test: "Hello World" });

    await render(hbs`{{merge-files data=data filename=filename}}`);
    assert.ok(this.element);

    const ajax = this.owner.lookup("service:ajax");
    const slug = (await ajax.request("/template/")).results[0].slug;
    fillIn("select", slug);
    await click(".uk-button");
  });
});
