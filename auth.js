function auth(req, res, next){
    if(!req.session.user){
        var authHeader = req.headers.authorization;
        if(!authHeader){
        var err = new Error("Your are not authenticated");

        res.setHeader("WWW-Authenticate", 'Basic');
        err.status = 401
        next(err)
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');
    var username = auth[0]
    var password = auth[1]

    if(username == 'admin' && password == 'p@ssword'){
        req.session.user = 'admin'
        next();
    }else{
        var err = new Error('Your are not authenticated')
        
        res.setHeader('WWW-Authenticate', 'Basic')
        err.status = 401
        next(err)
    }
  }else{
      if(req.session.user == 'admin'){
          next();
      }else{
          var err = new Error("You are not authenticated");
          err.status = 401;
          next(err);
      }
  }

}

module.exports = auth;