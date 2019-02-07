import { IReadableChannel } from 'my-serial-encoding';
import { ChannelOptions } from './option';
export class ReceiverChannel implements IReadableChannel {
  private callback: ((bit: 0 | 1) => void) | null = null;
  private wakelock!: WakeLock;
  private currentActive: boolean = false;
  static async create(options: ChannelOptions): Promise<ReceiverChannel> {
    const obj = new ReceiverChannel(options);
    await obj.init();
    return obj;
  }
  private constructor(private options: ChannelOptions) {}
  private async init(): Promise<void> {
    this.wakelock = await navigator.getWakeLock(this.options.wakelockType);
    this.currentActive = this.wakelock.active;
    this.wakelock.addEventListener('activechange', () => {
      console.log('activechange', this.currentActive, this.wakelock.active);
      this.currentActive = this.wakelock.active;
    });
    document.addEventListener('visibilitychange', () => {
      // workaround for chromium bug 929229
      this.wakelock.createRequest().cancel();
    });
  }
  public registerTickCallback(f: (bit: 0 | 1) => void) {
    this.callback = f;
  }
  public unregisterTickCallback() {
    this.callback = null;
  }
  public frame() {
    // console.log('frame', this.currentActive, Date.now());
    if (this.callback != null) {
      this.callback(Number(!this.currentActive) as 0 | 1);
    }
  }
}
