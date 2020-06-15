import { fetchPost } from '../../components/utils'
import Layout from '../../components/layout'
import styles from '../../styles/post.module.css'
import Link from 'next/link'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Error from 'next/error'

export default function Post({data}) {
	if (data.message) {
		return <Error statusCode={404} />
	}
	const {title, author, category, createdAt, viewsCount, tags} = data;
	const content = decodeURI(data.content)

	const htmlContent = { __html: decodeURI(content) }
	const tagsList = tags.map(({name, slug}) => 
		<Link key={name} href={'/tags/'+slug}>
			<a className={styles.hashtag}>{name}</a>
		</Link>
	)

	return (
		<Layout>
			<div className={styles.header}>
				<div className={styles.info}>
					<span>{author}</span>
					<span>
						<Link href={'/' + category.slug}>
							<a className={styles.link}>{category.name}</a>
						</Link>
					</span>
					<span>{createdAt}</span>
					<span><VisibilityIcon style={{fontSize: 'large', marginRight: '8px'}}/>{viewsCount}</span>
				</div>
				<div className={styles.title}>{title}</div>
				<hr />
			</div>
			<div className={styles.content} 
				dangerouslySetInnerHTML={htmlContent}></div>
			<div className={styles.hashtags}>{tagsList}</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	const { category, id } = ctx.params
	
	const res = await fetchPost(category, id)
	const data = await res.json()
	return {
		props: {
		 	data
		}
	}
}