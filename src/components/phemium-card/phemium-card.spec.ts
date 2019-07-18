import { TestWindow } from '@stencil/core/testing';
import { PhemiumCard } from './phemium-card';

describe('phemium-card', () => {
  it('should build', () => {
    expect(new PhemiumCard()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLPhemiumCardElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [PhemiumCard],
        html: '<phemium-card></phemium-card>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
