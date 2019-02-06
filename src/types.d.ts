// type definitions for Wake Lock API

type WakeLockType = 'screen' | 'system';

interface WakeLock extends EventTarget {
  type: WakeLockType;
  active: boolean;
  onactivechange: EventHandlerNonNull;
  createRequest(): WakeLockRequest;
}

interface WakeLockRequest {
  cancel(): void;
}

interface Navigator {
  getWakeLock(lock: WakeLockType): Promise<WakeLock>;
}

// workers
declare module 'worker-loader!*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
