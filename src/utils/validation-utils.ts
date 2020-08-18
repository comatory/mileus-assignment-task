const RE = /(?<latValue>[+-]?\d+(\.\d+)?),\s?(?<lngValue>[+-]?\d+(\.\d+)?)/

export default class ValidationUtils {
  static validateLatLngString(input: string): boolean {
    const match = input.match(RE)

    if (!match) {
      return false
    }

    const { latValue, lngValue } = match.groups || {}
    const lat = parseFloat(latValue)
    const lng = parseFloat(lngValue)

    return ((lat <= 90 && lat >= -90) && (lng <= 180 && lng >= -180))
  }
}
