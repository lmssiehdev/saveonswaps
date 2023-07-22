/**
  Retrieves the error message from an error object or any other value.
  
  @param error - The error object.
  @returns The error message.
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
      // @ts-expect-error
      return obj.get(prop);
    },
  });
}

/**
 * Sorts an array of objects based on the value of a specified key in descending order.
 * @param array - The array of objects to be sorted.
 * @param key - The key based on which the array will be sorted.
 * @returns The sorted array in descending order.
 */
export function sortByKey(array: any[], key: string) {
  return array.sort(function (a, b) {
    const x = a[key];
    const y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}
