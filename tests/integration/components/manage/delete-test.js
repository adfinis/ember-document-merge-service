import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, render, settled } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

module("Integration | Component | manage/delete", function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{manage-files/delete}}`);
    assert.ok(this.element);

    await settled();
    assert.dom(".uk-list li").exists({ count: 3 });
  });

  test("it shows a modal before deletion", async function(assert) {
    const ajax = this.owner.lookup("service:ajax");
    const count_before = (await ajax.request("/template/")).results.length;

    await render(hbs`{{manage-files/delete}}`);

    // Cancel deletion
    await click(".uk-list li:first-child button");
    assert.dom(".uk-modal.uk-open").exists();

    await click(".uk-modal .uk-button-default");
    assert.dom(".uk-modal:not(.uk-open)").exists();
    assert.dom(".uk-list li").exists({ count: count_before });

    // Confirm deletion
    await click(".uk-list li:first-child button");
    assert.dom(".uk-modal.uk-open").exists();

    await click(".uk-modal .uk-button-primary");
    assert.dom(".uk-modal:not(.uk-open)").exists();
    assert.dom(".uk-list li").exists({ count: count_before - 1 });

    const count_after = (await ajax.request("/template/")).results.length;
    assert.equal(
      count_after,
      count_before - 1,
      "Template should be removed from server."
    );
  });
});
