import { Blog } from '../index'
import Layout from '../../components/layout';
import Error from 'next/error'

function Index({data, data2, tag}) {
    if (data.message) {
        return <Error statusCode={404} />
    }

    return (
      <Layout>
        <Blog data={data} data2={data2} category={'tags/' + tag}/>
      </Layout>
    );
  }
  
export async function getServerSideProps(context) {
// Fetch data from external API
const res = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts/tags/` + context.params.id + `?limit=3&offset=0&sortOrder=viewsCount&sortDirection=desc`, {mode: 'cors'})
const data = await res.json()

const res2 = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts/tags/` + context.params.id + `?limit=5&offset=0&sortOrder=createdAt&sortDirection=desc`, {mode: 'cors'})
const data2 = await res2.json()

const tag = context.params.id
// Pass data to the page via props
return { props: { data, data2, tag } }
}

export default Index