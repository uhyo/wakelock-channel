import { timer } from './timer';

self.addEventListener('message', async ev => {
  if (ev.data && ev.data.type === 'run') {
    const { interval, offset } = ev.data;
    for await (const _ of timer(interval, offset)) {
      (self as any).postMessage('timer');
    }
  }
});
