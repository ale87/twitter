const Tweet = require('../models/Tweet')

module.exports = {
  async index(req, res){
    try{
      const tweets = await Tweet.find().sort('-createdAt')
      return res.status(200).json(tweets)
    }
    catch(e){
      return res.status(404).json({ msg: 'Erro ao acessar o servidor. Não foi possível listar os tweets.' })
    }
  },

  async store(req, res){
    try{      
      const tweet = await Tweet.create(req.body)
      return res.status(200).json(tweet)
    }
    catch(e){
      return res.status(500).json({ msg: 'Erro ao acessar o servidor. Não foi possível registrar o tweet.' })
    }
  }
}