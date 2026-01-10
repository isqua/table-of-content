import tocUrl from '/toc.json?url'
import { Alert } from '../../components/Alert'
import { DocPage } from '../../components/DocPage'
import { Layout } from '../../components/Layout'
import { Menu, useGetTocQuery } from '../../features/toc'
import { useCurrentPageUrl } from '../../hooks/useCurrentPageUrl'

export function Root() {
    const query = useGetTocQuery(tocUrl)
    const currentUrl = useCurrentPageUrl()

    return (
        <Layout>
            <Layout.Sidebar>
                {!query.isError && (
                    <Menu
                        activeUrl={currentUrl}
                        toc={query.data}
                        isLoading={query.isLoading}
                    />
                )}
            </Layout.Sidebar>
            <Layout.Main>
                {query.isSuccess && <DocPage toc={query.data} />}
                {query.isError && <Alert />}
            </Layout.Main>
        </Layout>
    )
}
