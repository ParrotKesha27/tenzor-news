import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Link from 'next/link';

const useMainStyles = makeStyles({
  card: {
    display: 'flex',
    backgroundColor: '#54426B',
    marginTop: '30px',
    color: '#ffffff',
  },
  cardDetails: {
    flex: 1,
    marginTop: '40px',
    marginLeft: '50px',
    marginRight: '50px',
  },
  cardMedia: {
    width: 400,
    height: 400,
  },
  postInfoSpan: {
    marginRight: '10px',
  },
  postTitle: {
    marginTop: '30px',
    marginRight: '50px',
    height: '240px',
  },
  postLink: {
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      color: '#E7DFC6',
    }
  }
});
const useStyles = makeStyles({
  card: {
    display: 'flex',
    backgroundColor: '#ffffff',
    marginTop: '30px',
  },
  cardDetails: {
    flex: 1,
    marginTop: '40px',
    marginLeft: '50px',
    marginRight: '50px',
  },
  cardMedia: {
    width: 400,
    height: 400,
  },
  postInfoSpan: {
    marginRight: '10px',
  },
  postTitle: {
    marginTop: '30px',
    marginRight: '50px',
    height: '240px',
  },
  postLink: {
    color: '#000000',
    textDecoration: 'none',
    '&:hover': {
      color: '#54426B',
    }
  }
});

export default function MainPost(props) {
  const classes = props.main ? useMainStyles() : useStyles();
  const { post } = props;

  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
      </Hidden>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography variant="subtitle2">
            <span className={classes.postInfoSpan}>{post.author}</span>
            <span className={classes.postInfoSpan}>&#183;</span>
            <Link href={"/" + post.category.slug} color="inherit">
              <a className={classes.postLink}>
                <span className={classes.postInfoSpan}>{post.category.name}</span>
              </a>
            </Link>
            <span className={classes.postInfoSpan}>&#183;</span>
            <span className={classes.postInfoSpan}>{post.createdAt}</span>
            <span className={classes.postInfoSpan}>&#183;</span>
            <span className={classes.postInfoSpan}><VisibilityIcon style={{fontSize: 'medium', verticalAlign: 'middle'}}/> {post.viewsCount}</span>
          </Typography>
          <Typography className={classes.postTitle} component="h1" variant="h3">
            <Link href={"/" + post.category.slug + "/" + post.slug}>
              <a className={classes.postLink}>{post.title}</a>
            </Link>
          </Typography>
          <Typography variant="body2">
            {post.tags.map(({name, slug}) => (
              <Link href={"/tags/" + slug}>
                <a className={classes.postLink} style={{marginRight: '10px', display: 'inline-block'}}>{name} </a>
              </Link>
            ))}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

MainPost.propTypes = {
  post: PropTypes.object,
  main: PropTypes.bool,
};
MainPost.defaultProps = {main: false };