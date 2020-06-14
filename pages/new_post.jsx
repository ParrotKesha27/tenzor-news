import { TextField, Select, MenuItem, Button } from '@material-ui/core'
import Layout from '../components/layout'
import styles from '../styles/new_post.module.css'
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import Router from 'next/router'
import config from '../components/config'

export default class NewPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {content: '', category: 'memes'};
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleImageLoad = this.handleImageLoad.bind(this)
	}
	handleCategoryChange(event) {
		this.setState({ category: event.target.value })
	}
	async handleSubmit(event) {
		event.preventDefault();
	    const formElements = event.target.elements;
	    const body = {
	      author: formElements.name.value,
	      title: formElements.title.value,
	      tags: formElements.hashtags.value.split(', '),
	      image: this.state.image,
	      content: encodeURI(this.state.content),
	      category: this.state.category
	    }

	    if (!body.author || !body.title || !body.content ||
	      !formElements.hashtags.value) {
	      return;
	    }
    
		let response = await fetch(config.serverUrl + '/api/v1/posts/new', {
	      method: 'POST',
	      mode: 'no-cors',
	      headers: {
	        'Content-Type': 'application/json;charset=utf-8'
	      },
	      body: JSON.stringify(body)
	    });

	    Router.push('/')

	}
	handleImageLoad(event) {
		const reader = new FileReader()
		const self = this;
		reader.onloadend = () => {
			self.setState({ image: reader.result })
		}
		reader.readAsDataURL(event.target.files[0])
	}
	handleEditorChange(content, editor) {
		this.setState({ content });
	}
	render() {
	  return (
	  	<Layout>
	  		<form onSubmit={this.handleSubmit} className={styles['flex-container']} autoComplete="off">
		    	<div className={styles['flex-element']}>
		    		<div className={styles.title}>
		    			Заголовок
		    		</div>
		    		<TextField
		    			className={styles.field}
		    			name="title"
		    			label="Введите заголовок"
		    			variant="outlined"
		    			required/>
		    	</div>
		    	<div className={styles['flex-element']}>
		    		<div className={styles.title}>
		    			Автор
		    		</div>
		    		<TextField
		    			className={styles.field}
		    			name="name"
		    			label="Ваше имя"
		    			variant="outlined"
		    			required/>
		    	</div>
		    	<div className={styles['flex-element']}>
		    		<div className={styles.title}>
		    			Категория
		    		</div>
		    		<Select onChange={this.handleCategoryChange} className={styles.field} name="category" value={this.state.category}>
					  	<MenuItem value="memes">Мемы</MenuItem>
  						<MenuItem value="games">Игры</MenuItem>
  						<MenuItem value="films">Фильмы</MenuItem>
  					</Select>
		    	</div>
		    	<div className={styles['flex-element']}>
		    		<div className={styles.title}>
		    			Изображение
		    		</div>
		    		<div className={styles.field}>
	    			  <label htmlFor="contained-button-file">
				        <Button variant="contained"
				        	color="primary"
				        	component="span"
				        	size="large"
				        	>
				          Загрузить
				        </Button>
				      </label>
				      <input
				        accept="image/*"
				        id="contained-button-file"
				        type="file"
				        className={styles.input}
				        onChange={this.handleImageLoad}
				      />
				      {this.state.image && <img className={styles.image} height="150" width="200" src={this.state.image}/>}
				    </div>
		    	</div>
		    	<div className={styles['flex-element']}>
		    		<div className={styles.title}>
		    			Контент
		    		</div>
		    		<Editor
					  disabled={false}
					  id='uuid'
            apiKey="kcnoo6n13usxxgjwvgf7tsqmi6sdqs5e9p8uc6calt76xck6"
					  init={{ 
					  		height: 500,
					  		plugins: [
						     'lists link image paste help wordcount'
						    ],
						    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
					   }}
					  initialValue=''
					  inline={false}
					  plugins=''
					  tagName='div'
					  textareaName=''
					  toolbar=''
					  value={this.state.content}
        			  onEditorChange={this.handleEditorChange}
					/>
		    	</div>
		    	<div className={styles['flex-element']}>
		    		<div className={styles.title}>
		    			Хэштеги
		    		</div>
		    		<TextField
		    			className={styles.field}
		    			name="hashtags"
		    			label="Введите хэштеги через запятую"
		    			variant="outlined"
		    			required/>
		    	</div>
		    	<div className={styles['flex-element']}>
			    	<TextField
		    			className={styles.field}
		    			type="submit"
		    			variant="outlined"
		    			color="primary"
		    			value="Опубликовать пост"/>
		    	</div>
		    </form>
	    </Layout>
	  );
	}
}