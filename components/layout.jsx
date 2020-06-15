import styles from '../styles/layout.module.css'
import Container from '@material-ui/core/Container'
//import IvanGithub from '../images/vaxo.png'
import Link from 'next/link'
//import utilStyles from '../styles/utils.module.css'
import Head from 'next/head'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home, header }) {
  return (
  	<>
  	<Head>
  		<title>МИФ</title>
  	</Head>
    <div className={styles.container}>
			{header &&
				<div className={styles.Title}>
					{header}
				</div>
			}
      <main>{children}</main>
      <footer style={{marginTop: '50px'}}>
				<Container maxWidth="lg">
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<Link href="/">
              <a className={styles.Footer__logo}>МИФ</a>
            </Link>
					</div>
					<div className={styles.Footer__categories}>
						<Link href="/memes">
							<a className={styles.Footer__category}>Мемы</a>
						</Link>
						<Link href="/games">
							<a className={styles.Footer__category}>Игры</a>
						</Link>
						<Link href="/films">
							<a className={styles.Footer__category}>Фильмы</a>
						</Link>
					</div>
					<hr />
					<div className={styles.Footer__github}>
						<a href="https://github.com/ParrotKesha27"><img src="/ignait.png" /></a>
						<a href="https://github.com/ViktorKoshelev"><img src="/vitalik.png" /></a>
						<a href="https://github.com/vunyuya"><img src="/vaxo.png" /></a>
					</div>
					<div style={{textAlign: 'center', lineHeight: '1.5'}}>
						Razdolbai Team <br />
						© {new Date().getFullYear()}
					</div>
				</Container>
    	</footer>
    </div>
    </>
  )
}
