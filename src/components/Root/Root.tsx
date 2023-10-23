import { Layout } from '../Layout'
import { Menu } from '../Menu'

import { useGetTocQuery } from '../../features/toc'
import { DocPage } from '../DocPage'
import tocUrl from '/toc.json?url'

export function Root() {
    const query = useGetTocQuery(tocUrl)

    return (
        <Layout>
            <Layout.Sidebar>
                {query.isSuccess && (<Menu toc={query.data} />)}
            </Layout.Sidebar>
            <Layout.Main>
                {query.isSuccess && (<DocPage toc={query.data} />)}
            </Layout.Main>
        </Layout>
    )
}
