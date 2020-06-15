import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import styles from '../styles/small_post.module.css'

export default function SmallPost(props) {
  const classes = styles;
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
                <span className={classes.postInfoSpan}>
                  <Link href={"/" + post.category.slug}>
                    <a className={classes.postLink}>
                      {post.category.name}
                    </a>
                  </Link>
                </span>
                <span className={classes.postInfoSpan}>&#183;</span>
                <span className={classes.postInfoSpan}>{post.createdAt}</span>
                <span className={classes.postInfoSpan}>&#183;</span>
                <span className={classes.postInfoSpan}><VisibilityIcon style={{fontSize: 'medium', verticalAlign: 'middle'}}/> {post.viewsCount}</span>
              </Typography>
              <Typography className={classes.postTitle} variant="h4">
                <Link href={"/" + post.category.slug + "/" + post.slug}>
                  <a className={classes.postLink}>{post.title}</a>
                </Link>
              </Typography>
              <Typography variant="body2">
                {post.tags.map(({name, slug}) => (
                  <Link key={name} href={"/tags/" + slug}>
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