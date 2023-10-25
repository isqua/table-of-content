import { describe, expect, it } from 'vitest'

import { isTextMatch } from './isTextMatch'

describe('toc/isTextMatch', () => {
    it('should return true if strings are equal', () => {
        const value = 'banana'
        const search = 'banana'

        expect(isTextMatch(value, search)).toEqual(true)
    })

    it('should find a substring in a string', () => {
        const value = 'banana'
        const search = 'ban'

        expect(isTextMatch(value, search)).toEqual(true)
    })

    it('should find a sparse sequence in a string', () => {
        const value = 'banana'
        const search = 'bnn'

        expect(isTextMatch(value, search)).toEqual(true)
    })

    it('should find a sparse sequence with spaces in a string', () => {
        const value = 'banana'
        const search = 'b n n'

        expect(isTextMatch(value, search)).toEqual(true)
    })

    it('should find a sparse sequence with spaces in a string with spaces', () => {
        const value = 'ab cd ef'
        const search = 'abc def'

        expect(isTextMatch(value, search)).toEqual(true)
    })

    it('should return false if the value does not contains the search text', () => {
        const value = 'banana'
        const search = 'bun'

        expect(isTextMatch(value, search)).toEqual(false)
    })

    it('should return false if search pattern is longer than value', () => {
        const value = 'banana'
        const search = 'bananas'

        expect(isTextMatch(value, search)).toEqual(false)
    })
})
