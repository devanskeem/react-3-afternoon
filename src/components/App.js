import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchFilter = this.searchFilter.bind(this)
  }
  
  componentDidMount() {
    axios.get(`${this.state.baseUrl}/posts`).then((res) => this.setState({posts: res.data})).catch((err) => console.log(err))
  }

  updatePost(id, text) {
    axios.put(`${this.state.baseUrl}/posts?id=${id}`, {text}).then(res => this.setState({posts: res.data}))
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then(res => this.setState({posts: res.data}))
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, {text}).then(res => this.setState({posts: res.data}))
  }

  searchFilter(text, posts){
    let filtered = posts.filter((element) => element.text.includes(text))
    this.setState({
      posts: filtered
    })
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header posts={this.state.posts} filterFn={this.searchFilter}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => <Post deletePostFn={this.deletePost} updatePostFn={this.updatePost} text={post.text} date={post.date} key={post.id} id={post.id}/>)
          }
          
        </section>
      </div>
    );
  }
}

export default App;
