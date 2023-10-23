import { Layout } from '../../components/Layout'
import { Menu } from '../../components/Menu'

import { useGetTocQuery } from '../../features/toc'
import { DocPage } from '../../components/DocPage'
import { Error } from '../../components/Error'
import tocUrl from '/toc.json?url'

export function Root() {
    const query = useGetTocQuery(tocUrl)

    return (
        <Layout>
            <Layout.Sidebar>
                {!query.isError && (<Menu toc={query.data} isLoading={query.isLoading} />)}
            </Layout.Sidebar>
            <Layout.Main>
                {query.isSuccess && (<DocPage toc={query.data} />)}
                {query.isError && <Error />}
            </Layout.Main>
        </Layout>
    )
}
