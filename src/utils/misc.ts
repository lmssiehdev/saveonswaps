import { paramsSchema, type Params } from "./schemas";

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

/**
 * Get parameters from a URLSearchParams object or return default values.
 *
 * @param - Optional URLSearchParams object containing the parameters.
 * @returns An object with the extracted parameters or default values.
 */
export function getParams(searchParams?: URLSearchParams): Params {
  if (!searchParams) {
    return {
      from: "btc",
      to: "xmr",
      amount: 0.1,
    };
  }

  // * find a better way to do this
  const params = paramsSchema.parse({
    from: searchParams.get("from") || "btc",
    to: searchParams.get("to") || "xmr",
    amount: Number(searchParams.get("amount")) || 0.1,
  });

  return params;
}
