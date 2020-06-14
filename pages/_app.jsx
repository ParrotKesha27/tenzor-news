import '../styles/reset.css'
import '../styles/global.css'
import Head from 'next/head'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#54426B',
      contrastText: '#E7DFC6',
    },
    secondary: {
      main: '#E7DFC6',
      contrastText: '#271F33',
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
   	<>
    <ThemeProvider theme={theme}>
    	<Head>
    		<link rel="preload" href="/fonts/Roboto-Bold.ttf" as="font"
            	crossOrigin=""
          	/>
          	<link rel="preload" href="/fonts/Roboto-Light.ttf" as="font"
            	crossOrigin=""
          	/>
          	<link rel="preload" href="/fonts/Roboto-Medium.ttf" as="font"
            	crossOrigin=""
          	/>
          	<link rel="preload" href="/fonts/Roboto-Regular.ttf" as="font"
            	crossOrigin=""
          	/>
    	</Head>
      <React.Fragment>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <div class="Menu__toolbar">
              <Link href="/">
                <a class="Menu__logo">МИФ</a>
              </Link>
              <div class="Menu__categories">
                <Link href="/memes">
                  <a class="Menu__category">Мемы</a>
                </Link>
                <Link href="/games">
                  <a class="Menu__category">Игры</a>
                </Link>
                <Link href="/cinema">
                  <a class="Menu__category">Фильмы</a>
                </Link>
              </div>
              <Link href="/new_post">
                <Button variant="contained" color="secondary">
                  Новый пост
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment> 
      <Component {...pageProps} />
    </ThemeProvider>
   	</>
   	)
}