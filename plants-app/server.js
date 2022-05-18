const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const Pusher = require('pusher')
    
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    
    const port = process.env.PORT || 8080
    
    const pusher = new Pusher({
      appId: 'appId',
      key: 'appKey',
      secret: 'appSecret',
      cluster: 'cluster',
      encrypted: true
    })
    app.post('/add-review', function (req, res) {
      pusher.trigger('rotten-pepper', 'new-movie-review', req.body)
      res.sendStatus(200)
    })
    
    app.listen(port, function () {
      console.log('Node app is running at localhost:' + port)
    })