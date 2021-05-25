var Validator = exports,
               init

const { pathToRegexp, match, parse, compile } = require("path-to-regexp");


Validator.init = function(){
  console.log( haveMethod("api.bots.business/bots/4454?ddddff") )
}

function haveMethod(url){
  
  if(!url){ return }
  if(url==""){ return }

  var fn = match("api.bots.business/bots/:id");

  // "api.bots.business/bots/22?any_query=true"
  url = url.split('?')[0]

  test = fn(url)
  if(test){
    return true
  }
  return false
}