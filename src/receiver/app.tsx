import * as React from 'react';
import TimerWorker from 'worker-loader!../timer-worker/index.worker.ts';
import { Decoder, Receiver } from 'my-serial-encoding';
import { channelOptions, encoderOptions } from '../options';
import { ReceiverChannel } from '../channel/ReceiverChannel';

export const App = () => {
  React.useEffect(() => {
    const runner = new TimerWorker();
    ReceiverChannel.create(channelOptions).then(async channel => {
      const decoder = new Decoder(encoderOptions);
      const receiver = new Receiver(channel, decoder);
      receiver.start();
      runner.postMessage({
        type: 'run',
        interval: channelOptions.interval,
        offset: Math.floor(channelOptions.interval / 2),
      });
      runner.addEventListener('message', ev => {
        if (ev.data === 'timer') {
          channel.frame();
        }
      });
      for await (const data of receiver.iterateData()) {
        console.log('received', data);
      }
    });
    return () => runner.terminate();
  }, []);
  return (
    <>
      <h1>メッセージ受信側</h1>
    </>
  );
};

export const makeApp = () => <App />;
