import { IWritableChannel } from 'my-serial-encoding';
import { ChannelOptions } from '../channel/option';
export class ReceiverChannel implements IWritableChannel {
  private callback: ((bit: 0 | 1) => void) | null = null;
  private wakelock!: WakeLock;
  static async create(options: ChannelOptions): Promise<ReceiverChannel> {
    const obj = new ReceiverChannel(options);
    await obj.init();
    return obj;
  }
  private constructor(private options: ChannelOptions) {}
  private async init(): Promise<void> {
    this.wakelock = await navigator.getWakeLock('screen');
  }
  public registerTickCallback(f: (bit: 0 | 1) => void) {
    this.callback = f;
  }
  public unregisterTickCallback() {
    this.callback = null;
  }
  public frame() {
    console.log('frame', this.wakelock.active, Date.now());
    if (this.callback != null) {
      this.callback(1);
    }
  }
}
