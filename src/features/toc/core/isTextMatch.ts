/**
 * Rough fuzzy search that finds "omit" in "jOhn sMITh".
 *
 * @param value value to check, e.g. a page title "jOhn sMITh"
 * @param search string to search in the value, e.g. "omit"
 * @returns boolean if the value matches the search string
 */
export const isTextMatch = (value: string, search: string) => {
    const normalizedValue = value.toLowerCase()

    let valuePointer = 0
    let searchPointer = 0

    while (valuePointer < normalizedValue.length && searchPointer < search.length) {
        if (search[searchPointer] === ' ') {
            searchPointer++
            continue
        }

        if (normalizedValue[valuePointer] === search[searchPointer]) {
            searchPointer++
        }

        valuePointer++
    }

    return searchPointer === search.length
}
