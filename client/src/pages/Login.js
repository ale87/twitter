import React, { Component } from 'react'
import Api from '../services/Api'
import twitter from '../assets/twitter.svg'
import './Login.css'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: ''
  }

  handleEmail = e =>
    this.setState({ email: e.target.value })

  handlePassword = e =>
    this.setState({ password: e.target.value })

  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state

    if (!email.length)
      return this.setState({ msg: 'Campo email é obrigatório' })

    if (!password.length)
      return this.setState({ msg: 'Campo senha é obrigatório' })

    try {
      const user = await Api.post('login', {
        email, password
      })

      if (user.msg) {
        this.setState({ msg: user.msg })
        return
      }
      else {
        this.setState({ msg: '' })
        localStorage.setItem('@user', JSON.stringify(user.data))
        this.props.history.push('/timeline')
      }
    }
    catch (error) {
      this.setState({ msg: error.response.data.msg })
    }
  }

  render() {
    return (
      <div className='login-wrapper'>
        <img src={twitter} alt='twitter'/>
        <form onSubmit={this.handleSubmit}>
          <input type='text'
            placeholder='Nome do usuário'
            onChange={this.handleEmail} />
          <input type='password'
            placeholder='Senha do usuário'
            onChange={this.handlePassword} />
          <button type='submit'>
            Entrar
          </button>
          {this.state.msg && <span>{this.state.msg}</span>}
        </form>
      </div>
    )
  }
}