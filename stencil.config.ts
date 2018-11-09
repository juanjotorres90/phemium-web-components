import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'phemium-card',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
