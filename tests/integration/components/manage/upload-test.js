import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { fillIn, click, render, settled } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { A } from "@ember/array";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

module("Integration | Component | manage/upload", function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.set("templates", A());
    this.set("onFetch", templates => this.set("templates", A(templates)));
    this.set("onAdd", template =>
      this.set("templates", A([...this.templates, template]))
    );
  });

  test("it renders", async function(assert) {
    await render(hbs`{{manage-files/upload}}`);
    assert.ok(this.element);
  });

  test("it adds uploaded files to the list", async function(assert) {
    const ajax = this.owner.lookup("service:ajax");
    const count_before = (await ajax.request("/template/")).results.length;

    await render(hbs`
      {{manage-files/upload 
        templates=templates
        on-fetch=onFetch
        on-upload=onAdd
      }}
    `);
    await settled();

    await fillIn("[name=slug]", "t1");
    await fillIn("[name=description]", "Template 1");
    //await fillIn("[name=template]", "template1.docx");
    await click(".uk-button");

    const count_after = (await ajax.request("/template/")).results.length;
    assert.equal(
      count_after,
      count_before + 1,
      "Upload should save template to the database."
    );
  });
});
