class Policy{
  constructor(filename, content){

    let PolicyParser = require("./policy_parser");
    let parsedPolicy = new PolicyParser(filename, content);

    this.name = parsedPolicy.name;
    this.api_url = parsedPolicy.api_url
    this.safe_params = parsedPolicy.safe_params;
    this.methods = parsedPolicy.methods;
  }

  _findMethod(options){
    // "/bots/22?any_query=true"
    let path = options.path.split("?")[0]

    let { pathToRegexp, match, parse, compile } = require("path-to-regexp");

    let fn = match("api.bots.business/bots/:id");


    let method;
    let test;
    for(let ind in this.methods){
      method = this.methods[ind];

      if(method.http_method!=options.http_method){ continue }

      fn = match(method.path)

      test = fn(path)
      if(test){ return method }
    }
    return false;
  }

  _throwErrorIfNeed(options){
    // TODO: need error throwing
    if(!options){ return }
    if(!options.http_method){ return }

    if(!options.path){ return }
    if(options.path==""){ return }

    return true
  }

  haveMethod(options){
    if(!this._throwErrorIfNeed(options)){
      throw new Error("need error handling: " + JSON.stringify(options))
    }

    return this._findMethod(options)
  }

}

module.exports = Policy;