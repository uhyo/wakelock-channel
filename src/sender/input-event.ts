import { useState, useRef, useMemo } from 'react';
import { fromEventPattern, Observable } from 'rxjs';

/**
 * Subscribable input.
 */
export const useInputWithObserver = (
  initialValue: string,
): [string, (value: string) => void, Observable<string>] => {
  const [value, setValue] = useState(initialValue);
  const callbackRef = useRef<Array<(value: string) => void>>([]);
  const observable = useMemo(
    () =>
      fromEventPattern<string>(
        handler => {
          if (!callbackRef.current.includes(handler)) {
            callbackRef.current.push(handler);
          }
        },
        handler => callbackRef.current.filter(x => x !== handler),
      ),
    [],
  );
  const customSetValue = (value: string) => {
    for (const fn of callbackRef.current) {
      fn(value);
    }
    setValue(value);
  };

  return [value, customSetValue, observable];
};
