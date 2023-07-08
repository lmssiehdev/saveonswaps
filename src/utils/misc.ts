/**
  Retrieves the error message from an error object or any other value.
  
  @param {unknown} error - The error object.
  @returns {string} The error message.
*/
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function getFromMap(map: URLSearchParams) {
  return new Proxy(map, {
    get(obj, prop) {
      return obj.get(prop);
    },
  });
}
