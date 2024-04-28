export class ArrayUtils {

  /**
   * Returns all variants of a key in an array of objects.
   * @param array Array of objects
   * @param key Key to extract
   */
  static allVariantsOfKeyArray<T>(array: T[], key: keyof T): Array<T[keyof T]> {
    return Array.from(new Set(array.map((item) => item[key])));
  }

  /**
   * Removes duplicates from an array of objects.
   * @param array Array of objects
   * @param key Key to compare
   */
  static removeDuplicates<T>(array: T[], key?: keyof T): T[] {
    if (!key) {
      return Array.from(new Set(array));
    }

    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
}
