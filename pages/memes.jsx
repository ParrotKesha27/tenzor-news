import { Blog } from './index'
import Layout from '../components/layout';

function Index({data, data2}) {
    return (
      <Layout header="Мемы">
        <Blog data={data} data2={data2} category='memes'/>
      </Layout>
    );
  }
  
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts/memes?limit=3&offset=0&sortOrder=viewsCount&sortDirection=desc`, {mode: 'cors'})
    const data = await res.json()
  
    const res2 = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts/memes?limit=5&offset=0&sortOrder=createdAt&sortDirection=desc`, {mode: 'cors'})
    const data2 = await res2.json()
    //throw new Error(data)
    // Pass data to the page via props
    return { props: { data, data2 } }
  }
  
  export default Index