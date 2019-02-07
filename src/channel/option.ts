/**
 * Options of channel.
 */
export interface ChannelOptions {
  /**
   * Type of WakeLock to use.
   */
  wakelockType: WakeLockType;
  /**
   * interval between frames (in ms).
   */
  interval: number;
}
