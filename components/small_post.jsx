import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  featuredPost: {
    position: 'relative',
    backgroundColor: 'rgba(0, 120, 201, 0.7);',
    color: '#000000',
    marginBottom: theme.spacing(4),
    background: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,.4)',
  },
  featuredPostContent: {
    position: 'relative',
    marginTop: '30px',
    marginLeft: '30px',
    marginBottom: '30px',
  },
  postInfoSpan: {
    marginRight: '10px',
  },
  postTitle: {
    marginRight: '50px',
    height: '180px',
  },
  postLink: {
    color: '#000000',
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none',
      color: '#54426B',
    }
  },
}));

export default function SmallPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.featuredPost} style={{ backgroundImage: `url(${post.image})` }}>
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item>
            <div className={classes.featuredPostContent}>
              <Typography variant="subtitle2">
                <span className={classes.postInfoSpan}>{post.author} </span>
                <span className={classes.postInfoSpan}>&#183;</span>
                <Link href="#" color="inherit">
                  <a className={classes.postLink}>
                    <span className={classes.postInfoSpan}>{post.category.name}</span>
                  </a>
                </Link>
                <span className={classes.postInfoSpan}>&#183;</span>
                <span className={classes.postInfoSpan}>{post.createdAt}</span>
                <span className={classes.postInfoSpan}>&#183;</span>
                <span className={classes.postInfoSpan}><VisibilityIcon style={{fontSize: 'medium', verticalAlign: 'middle'}}/> {post.viewsCount}</span>
              </Typography>
              <Typography className={classes.postTitle} variant="h4">
                <Link href="#">
                  <a className={classes.postLink}>{post.title}</a>
                </Link>
              </Typography>
              <Typography variant="body2">
                {post.tags.map(({name, slug}) => (
                  <Link href={"/tags/" + slug}>
                    <a className={classes.postLink} style={{marginRight: '10px'}}>{name} </a>
                  </Link>
                ))}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

SmallPost.propTypes = {
  post: PropTypes.object,
};