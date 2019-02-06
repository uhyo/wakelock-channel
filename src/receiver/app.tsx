import * as React from 'react';
import ReceiverWorker from 'worker-loader!./timer.worker.ts';
import { Decoder, Receiver } from 'my-serial-encoding';
import { channelOptions, encoderOptions } from '../options';
import { ReceiverChannel } from './ReceiverChannel';

export const App = () => {
  React.useEffect(() => {
    const runner = new ReceiverWorker();
    ReceiverChannel.create(channelOptions).then(channel => {
      const decoder = new Decoder(encoderOptions);
      const receiver = new Receiver(channel, decoder);
      receiver.start();
      runner.postMessage('run');
      runner.addEventListener('message', ev => {
        if (ev.data === 'timer') {
          channel.frame();
        }
      });
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
