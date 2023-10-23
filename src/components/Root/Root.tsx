import { Layout } from '../Layout'
import { Menu } from '../Menu'

import { useGetTocQuery } from '../../features/toc'
import { DocPage } from '../DocPage'
import { Error } from '../Error'
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
