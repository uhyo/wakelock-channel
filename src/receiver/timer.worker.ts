import { channelOptions } from '../options';
import { timer } from './timer';

self.addEventListener('message', async ev => {
  if (ev.data === 'run') {
    for await (const _ of timer(channelOptions.interval)) {
      (self as any).postMessage('timer');
    }
  }
});
