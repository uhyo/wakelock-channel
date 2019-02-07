import { EncodingOptions } from 'my-serial-encoding';
import { ChannelOptions } from './channel/option';

/**
 * Options for use in encoding/decoding.
 */
export const encoderOptions: EncodingOptions = {
  bits: 8,
  order: 'LtM',
  parity: 0,
};

/**
 * Options for channel.
 */
export const channelOptions: ChannelOptions = {
  wakelockType: 'system',
  interval: 100,
};
