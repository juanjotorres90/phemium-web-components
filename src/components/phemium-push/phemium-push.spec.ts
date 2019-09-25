import { TestWindow } from '@stencil/core/testing';
import { PhemiumPush } from './phemium-push';

describe('phemium-push', () => {
  it('should build', () => {
    expect(new PhemiumPush()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLPhemiumPushElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [PhemiumPush],
        html: '<phemium-push></phemium-push>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
