import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { TableOfContent } from '../../features/toc'
import tocFlat from '../../features/toc/core/test/fixtures/flat.json'
import tocTwoLevels from '../../features/toc/core/test/fixtures/two-levels.json'
import { Menu } from './Menu'

describe('components/Menu', () => {
    it('should build a menu and highlight current page', async () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'

        render(<Menu toc={toc} url={currentUrl} />)

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should build a two-levels menu', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        render(<Menu toc={toc} url={currentUrl} />)

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })
})
