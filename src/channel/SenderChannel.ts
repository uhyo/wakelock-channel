import { IWritableChannel } from 'my-serial-encoding';
import { ChannelOptions } from './option';

export class SenderChannel implements IWritableChannel {
  private callback: (() => 0 | 1) | null = null;
  private wakelock!: WakeLock;
  private request: WakeLockRequest | null = null;
  static async create(options: ChannelOptions) {
    const obj = new SenderChannel(options);
    await obj.init();
    return obj;
  }
  private constructor(private options: ChannelOptions) {}
  private async init() {
    this.wakelock = await navigator.getWakeLock(this.options.wakelockType);
  }
  public registerTickCallback(f: () => 0 | 1) {
    this.callback = f;
  }
  public unregisterTickCallback() {
    this.callback = null;
  }
  public frame() {
    const bit = this.callback ? this.callback() : 1;
    console.log(bit);
    if (bit === 0 && !this.request) {
      this.request = this.wakelock.createRequest();
    } else if (bit === 1 && this.request) {
      this.request.cancel();
      this.request = null;
    }
  }
}
