import { newSpecPage } from '@stencil/core/testing';
import { phemiumPush } from './phemium-push';

it('should render my component', async () => {
  const page = await newSpecPage({
    components: [phemiumPush],
    html: `<my-cmp></my-cmp>`
  });
  expect(page.root).toEqualHtml(`
    <my-cmp>Success!</my-cmp>
  `);
});
