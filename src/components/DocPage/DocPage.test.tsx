import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type TableOfContent } from '../../features/toc'
import { renderInApp } from '../../test'
import tocFlat from '../../test/fixtures/toc/flat.json'
import { DocPage } from './DocPage'

describe('components/DocPage', () => {
    it('should render an article by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'

        renderInApp(<DocPage toc={toc} />, { url: currentUrl })

        expect(screen.getByRole('article')).toMatchSnapshot()
    })

    it('should set tab title based on the article title', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/baz.html'

        renderInApp(<DocPage toc={toc} />, { url: currentUrl })

        expect(document.title).toEqual('Baz')
    })
})
