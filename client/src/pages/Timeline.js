import React, { Component } from 'react'
import Api from '../services/Api'
import Tweet from '../components/Tweet'
import './Timeline.css'

export default class Timeline extends Component{
  state = {
    tweet: '',
    msg: '',
    list: []
  }

  async componentDidMount(){
    const list = await Api.get('/')
    this.setState({ tweet: '', list: 
      await list.data })
  }

  handleChange = e => 
    this.setState({ tweet: e.target.value })

  handleSubmit = async e => {
    if(e.keyCode !== 13) return
    else{
      try{        
        const author = (JSON.parse(localStorage.getItem('@user'))).email
        const content = this.state.tweet
        const tweet = await Api.post('tweet', { author, content })
        this.setState({ 
          tweet: '',
          list: [tweet.data, ...this.state.list] 
        })
      }
      catch(error){ 
        this.setState({ msg: error.response.data.msg })
      }
    }
  }

  render () {
    return (
      <div className='timeline-wrapper'>
        <form>
          <textarea onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            value={this.state.tweet}
            placeholder='O que está acontecendo?'/>
        </form>
        {this.state.msg && <div>{this.state.msg}</div>}
        {this.state.list && <ul className='tweet-list'>{this.state.list.map(
          tweet => <Tweet key={tweet._id} tweet={tweet}/>
        )}
        </ul>}
      </div>
    )
  }
}