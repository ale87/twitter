import React, { Component } from 'react'
import Api from '../services/Api'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tweetActions from '../actions/TweetActions'
import like from '../assets/like.svg'
import './Tweet.css'

class Tweet extends Component {
  state = {}

  componentDidMount() {
    const { tweet } = this.props
    this.setState({ [tweet._id]: tweet.likes })
  }

  handleButton = async () => {
    const { _id } = this.props.tweet
    const likes = (await Api.post('tweet/likes', { id: _id })).data.likes
    this.setState({ [_id]: await this.props.addLike(likes).payload })
  }

  render() {
    const { tweet } = this.props
    return (
      <li className='tweet'>
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type='button' onClick={this.handleButton}>
          <img src={like} alt='like' />
          {this.state[tweet._id]}
        </button>
      </li>
    )
  }
}

const mapStateToProps = state => ({
  data: state.TweetReducer
})

const mapDispatchToProps = dispatch => 
  bindActionCreators(tweetActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)