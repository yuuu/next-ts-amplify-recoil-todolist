import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from '../src/component/Header'
import Footer from '../src/component/Footer'
import { RecoilRoot } from 'recoil'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((_theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const classes = useStyles()

  return (
    <>
      <RecoilRoot>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <Header />
            <Container>
              <Component {...pageProps} />
            </Container>
            <Footer />
          </div>
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
