import { Layout } from '../Layout'
import { Menu } from '../Menu'

import tocData from '../../test/fixtures/toc/idea.json'

export function Root() {
    return (
        <Layout>
            <Layout.Sidebar>
                <Menu toc={tocData} />
            </Layout.Sidebar>
            <Layout.Main>
                Hello world
            </Layout.Main>
        </Layout>
    )
}
