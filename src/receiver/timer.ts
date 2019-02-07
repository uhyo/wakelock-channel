export async function* timer(
  interval: number,
  offset: number,
): AsyncIterableIterator<null> {
  let nextTime = initialTarget(interval, offset);
  while (true) {
    const now = Date.now();
    yield await sleep(nextTime - now);
    nextTime += interval;
  }
}

function initialTarget(interval: number, offset: number): number {
  const now = Date.now();
  const currentOffset = now % interval;
  if (currentOffset < offset - 4) {
    return now + offset - currentOffset;
  } else {
    return now + offset + interval - currentOffset;
  }
}

function sleep(interval: number): Promise<null> {
  return new Promise(resolve => setTimeout(resolve, interval));
}
