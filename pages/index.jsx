import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainPost from '../components/main_post';
import SmallPost from '../components/small_post';
import Typography from '@material-ui/core/Typography';

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

function Blog() {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Популярные материалы
          </Typography>
          <MainPost post={mainFeaturedPost} main />
          <Grid container spacing={4} style={{marginTop: '30px'}}>
            {featuredPosts.map((post) => (
              <SmallPost key={post.title} post={post} />
            ))}
          </Grid>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Новые материалы
          </Typography>
          <MainPost post={mainFeaturedPost} />
          <Button variant="outlined" style={{width: '100%', marginTop: '30px'}}>
            Загрузить еще
          </Button>
        </main>
      </Container>
    </React.Fragment>
  );
}

function Index() {
  return (
    <Layout>
      <Blog />
    </Layout>
  );
}

export default Index