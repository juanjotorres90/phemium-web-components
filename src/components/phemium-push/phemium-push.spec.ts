import { newSpecPage } from '@stencil/core/testing';
import { PhemiumPush } from './phemium-push';

it('should render my component', async () => {
  const page = await newSpecPage({
    components: [PhemiumPush],
    html: `<phemium-push></phemium-push>`
  });
  expect(page.root).toEqualHtml(`
    <phemium-push>
      <mock:shadow-root>
        <div class="absolute bg-blue-600 cursor-pointer flex flex-col h-20 items-start justify-center pl-4 w-full" id="notificationBox">
          <span class="break-words text-white w-2/3"></span>
          <svg class="absolute pr-4 right-0 w-10" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" fill="white"></path>
          </svg>
        </div>
      </mock:shadow-root>
    </phemium-push>
  `);
});
