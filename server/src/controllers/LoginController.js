const User = require('../models/User')

module.exports = {
  async login(req, res){
    const { email, password } = req.body
    try{
      const user = await User.findOne({ email })
      if(user.email === email && user.password === password)    
        return res.status(200).json(user)
      else
        return res.status(403).json({ msg: 'Senha incorreta.' })
    }
    catch(e){
      return res.status(404).json({ msg: 'Email não cadastrado.' })
    }   
  },

  async store(req, res){
    try{
      const user = await User.create(req.body)
      return res.status(200).json(user)
    }
    catch(e){
      return res.status(500).json({ msg: 'Erro ao acessar o servidor. Não foi possível cadastrar o usuário.' })
    }    
  }
}