import { Layout } from '../Layout'
import { Menu } from '../Menu'

import tocData from '../../test/fixtures/toc/idea.json'
import { DocPage } from '../DocPage'

export function Root() {
    return (
        <Layout>
            <Layout.Sidebar>
                <Menu toc={tocData} />
            </Layout.Sidebar>
            <Layout.Main>
                <DocPage toc={tocData} />
            </Layout.Main>
        </Layout>
    )
}
