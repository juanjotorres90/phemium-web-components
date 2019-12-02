import { newSpecPage } from '@stencil/core/testing';
import { PhemiumPush } from './phemium-push';
import * as firebase from '../../utils/firebase';

it('should render phemium-push', async () => {
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

it('should be hidden', () => {
  const push = new PhemiumPush();
  expect(push.active).toBe(false);
});

it('should initialize firebase', async () => {
  firebase.app.initializeApp = jest.fn();
  const page = await newSpecPage({
    components: [PhemiumPush],
    html: `<div></div>`
  });
  const component = page.doc.createElement('phemium-push');
  (component as any).firebaseConfig = {
    apiKey: 'AIzaSyAVCs15Up66CZCqyOG9XcWf0albXleFFgU',
    authDomain: 'phemium-enduser-mobile.firebaseapp.com',
    databaseURL: 'https://phemium-enduser-mobile.firebaseio.com',
    projectId: 'phemium-enduser-mobile',
    storageBucket: 'phemium-enduser-mobile.appspot.com',
    messagingSenderId: '949680591977',
    appId: '1:949680591977:web:83d05094f2cf1cec'
  };
  page.root.appendChild(component);
  await page.waitForChanges();
  expect((component as any).firebaseConfig).toBeTruthy();
  expect(firebase.app.initializeApp).toHaveBeenCalledWith(page.rootInstance.firebaseConfig);
});
