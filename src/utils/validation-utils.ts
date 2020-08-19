export default class ValidationUtils {
  static validateLatLngString(input: string): boolean {
    return /[+-]?\d+(\.\d+)?\,[\s]?[+-]?\d+(\.\d+)?/i.test(input)
  }
}
