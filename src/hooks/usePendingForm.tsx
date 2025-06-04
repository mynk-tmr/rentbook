import { useState } from "react";

type IFormEvent = React.FormEvent<HTMLFormElement>;

/**
 *
 * @description This hook handles form submission and with pending state. Takes a handler to run that recieves event and data parsed from form
 */
export function usePendingForm<T extends Record<string, unknown>>(
  callback: (e: IFormEvent, data: T) => unknown | Promise<unknown>
) {
  const [pending, setPending] = useState(false);
  async function onSubmit(e: IFormEvent) {
    e.preventDefault();
    setPending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as T;
    await callback(e, data);
    setPending(false);
  }
  return { pending, onSubmit };
}
