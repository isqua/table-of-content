import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Article } from './Article'

describe('components/Article', () => {
    it('should render an article', () => {
        const page = {
            id: 'foo',
            parentId: '',
            title: 'Foo Article'
        }

        render(<Article breadcrumbs={[page]} page={page} />)

        expect(screen.getByRole('article')).toMatchSnapshot()
    })
})
