const Tweet = require('../models/Tweet')

module.exports = {
  async store(req, res){
    try{
      const tweet = await Tweet.findById(req.body.id)
      tweet.set({ likes: tweet.likes+1 })
      await tweet.save()
      return res.status(200).json(tweet)
    }
    catch(e){
      return res.status(500).json({ msg: 'Erro ao acessar o servidor. Não foi possível registrar o like.' })
    }
  }
}