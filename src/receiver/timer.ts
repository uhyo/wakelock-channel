export async function* timer(interval: number): AsyncIterableIterator<null> {
  while (true) {
    yield await sleep(interval);
  }
}

function sleep(interval: number): Promise<null> {
  return new Promise(resolve => setTimeout(resolve, interval));
}
