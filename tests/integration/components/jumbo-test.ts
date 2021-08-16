import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | jumbo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content inside a jumbo header with a tomster', async function (assert) {
    // Template block usage:
    await render(hbs`
			<Jumbo>
				Hello World
			</Jumbo>
    `);

    assert.equal(this.element.textContent?.trim(), 'Hello World');
    assert.dom('.jumbo').exists().hasText('Hello World');
    assert.dom('.jumbo .tomster').exists();
  });
});
