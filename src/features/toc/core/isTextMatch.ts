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
