import React, { ReactElement, ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import Layout from 'src/components/Layout'
import store from 'src/redux/store'
import 'src/styles/globals.scss'

type Props = {
  Component: React.FC<ReactNode>
  pageProps: React.PropsWithChildren<ReactElement>
}

const App = ({ Component, pageProps }: Props) => {
  return (
    <StoreProvider store={store}>
      <Layout title="Reviewly">
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default App
