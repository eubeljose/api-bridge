class Gateway{
  constructor(){
  }

  haveMethod(url){
    if(!url){ return }
    if(url==""){ return }

    let { pathToRegexp, match, parse, compile } = require("path-to-regexp");

    var fn = match("api.bots.business/bots/:id");

    // "api.bots.business/bots/22?any_query=true"
    url = url.split('?')[0]

    let test = fn(url)
    if(test){
      return true
    }
    return false
  }

}

module.exports = Gateway;