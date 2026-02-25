type Handler = (event: string, seq: number) => void;

let sequence = 0;
const listeners = new Set<Handler>();

export function subscribe(handler: Handler): () => void {
  listeners.add(handler);
  return () => {
    listeners.delete(handler);
  };
}

export function emit(event: string): void {
  sequence += 1;
  const seq = sequence;
  for (const handler of listeners) {
    handler(event, seq);
  }
}
