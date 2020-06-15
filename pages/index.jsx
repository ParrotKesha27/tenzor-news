import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainPost from '../components/main_post';
import SmallPost from '../components/small_post';
import Typography from '@material-ui/core/Typography';

export class Blog extends React.Component {
  async MorePosts() {
    const res3 = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts` + (this.state.category ? `/` + this.state.category : ``) + `?limit=5&offset=` + this.state.items.length + `&sortOrder=createdAt&sortDirection=desc`, {mode: 'cors'})
    const data3 = await res3.json()

    this.setState({items: this.state.items.concat(data3.items), hasMore: data3.hasMore})
  }

  constructor(props) {
    super(props)
    const {data, data2, category} = props
    this.state = {items: data2.items, hasMore: data2.hasMore, data, category}
    this.MorePosts = this.MorePosts.bind(this)
  }
  render() {
    return (
      
      <Container maxWidth="lg">
        <main>
          <Typography component="h2" variant="h4" color="inherit" gutterBottom>
            Популярные материалы
          </Typography>
          <MainPost post={this.state.data.items[0]} main />
          <Grid container spacing={4} style={{marginTop: '30px'}}>
            {this.state.data.items.slice(1).map((post) => (
              <SmallPost key={post.title} post={post} />
            ))}
          </Grid>
          <Typography component="h2" variant="h4" color="inherit" gutterBottom>
            Новые материалы
          </Typography>
          {this.state.items.map((post) => (
              <MainPost key={post.title} post={post} />
          ))}
          {this.state.hasMore &&
            <Button variant="outlined" style={{width: '100%', marginTop: '30px'}} onClick={this.MorePosts}>
              Загрузить еще
            </Button>
          }
        </main>
      </Container>
      
    );
  }
}

function Index({data, data2}) {
  return (
    <Layout>
      <Blog data={data} data2={data2}/>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts?limit=3&offset=0&sortOrder=viewsCount&sortDirection=desc`, {mode: 'cors'})
  const data = await res.json()

  const res2 = await fetch(`https://tenzor-news-back.herokuapp.com/api/v1/posts?limit=5&offset=0&sortOrder=createdAt&sortDirection=desc`, {mode: 'cors'})
  const data2 = await res2.json()
  //throw new Error(data)
  // Pass data to the page via props
  return { props: { data, data2 } }
}

export default Index