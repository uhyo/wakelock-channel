import * as React from 'react';
import TimerWorker from 'worker-loader!../timer-worker/index.worker.ts';
import { useInputWithObserver } from './input-event';
import { debounceTime, tap } from 'rxjs/operators';
import { channelOptions, encoderOptions } from '../options';
import { SenderChannel } from '../channel/SenderChannel';
import { Subscription } from 'rxjs';
import { Encoder, Sender } from 'my-serial-encoding';

const { useState, useEffect, useRef, useCallback } = React;

export const App = () => {
  const [message, setMessage, messageObserver] = useInputWithObserver('');
  useEffect(() => {
    const timer = new TimerWorker();
    let subscription: Subscription | undefined;
    SenderChannel.create(channelOptions).then(channel => {
      const encoder = new Encoder(encoderOptions);
      const sender = new Sender(channel, encoder);
      sender.start();
      timer.postMessage({
        type: 'run',
        interval: channelOptions.interval,
        offset: 0,
      });
      timer.addEventListener('message', ev => {
        if (ev.data === 'timer') {
          channel.frame();
        }
      });
      subscription = messageObserver
        .pipe(debounceTime(300))
        .subscribe(value => {
          console.log(value);
          sender.addData(Uint8Array.of(value.length));
        });
    });

    // subscribe to input change.
    return () => {
      timer.terminate();
      if (subscription != null) {
        subscription.unsubscribe();
      }
    };
  }, []);
  const onChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  }, []);
  return (
    <>
      <h1>メッセージ送信側</h1>
      <p>
        <input
          type="text"
          autoComplete="off"
          value={message}
          onChange={onChange}
        />
      </p>
      <ol>
        <li>
          <a href="./receiver.html" target="receiver">
            受信側ページ
          </a>
          を開きます。
        </li>
        <li>上の入力欄に適当な文字列を入力します。</li>
        <li>受信側ページに移動すると、入力した文字列が表示されます。</li>
      </ol>
      <p>
        <small>
          <strong>
            注意：パスワードなどの重要な情報は入力しないでください。
          </strong>
        </small>
      </p>
    </>
  );
};

export const makeApp = () => <App />;
