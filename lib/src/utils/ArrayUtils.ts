export class ArrayUtils {

  /**
   * Returns all variants of a key in an array of objects.
   * @param array Array of objects
   * @param key Key to extract
   */
  static allVariantsOfKeyArray<T>(array: T[], key: keyof T): Array<T[keyof T]> {
    return Array.from(new Set(array.map((item) => item[key])));
  }
}
