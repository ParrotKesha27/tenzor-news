import { fetchPost } from '../../components/utils'
import Layout from '../../components/layout'
import styles from '../../styles/post.module.css'
import Link from 'next/link'

export default function Post({data}) {
	/*const {title, author, category, createdAt, viewsCount, tags} = data;
	const content = decodeURI(data.content)
	*/
	const title = 'AJ:LGH:SDLJFL:SDjf'
	const author = 'Vector'
	const date = '12 июня 2020 17:45'
	const viewsCount = '1240'
	const tags = [{ name: 'tag1', slug: 'tag1' }]
	const category = {name: 'Фильмы', slug: 'films'}
	const content = encodeURI('<p>Hello!</p>')
	const htmlContent = { __html: decodeURI(content) }
	const tagsList = tags.map(({name, slug}) => 
		<Link href={'/tag/'+slug}>
			<a className={styles.hashtag}>{name}</a>
		</Link>
	)
	return (
		<Layout>
			<div className={styles.header}>
				<div className={styles.info}>
					<span>{author}</span>
					<span>{category.name}</span>
					<span>{date}</span>
					<span>{viewsCount}</span>
				</div>
				<div className={styles.title}>{title}</div>
			</div>
			<div className={styles.content} 
				dangerouslySetInnerHTML={htmlContent}></div>
			<div className={styles.hashtags}>{tagsList}</div>
		</Layout>
	)
}
/*
export async function getStaticPaths() {
	return {
	    paths: [],
	    fallback: true
  }
}

export async function getStaticProps({id}) {
  
  const data = await fetchPost('memes', id)

  return {
    props: {
      data
    }
  }
}*/