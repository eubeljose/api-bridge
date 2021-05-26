class Policy{
  constructor(filename, content){

    let PolicyParser = require("./policy_parser");
    let parsedPolicy = new PolicyParser(filename, content);

    this.name = parsedPolicy.name;
    this.api_url = parsedPolicy.api_url
    this.safe_params = parsedPolicy.safe_params;
    this.methods = parsedPolicy.methods;
  }

  _findMethod(path){
    // "/bots/22?any_query=true"
    path = path.split("?")[0]

    let { pathToRegexp, match, parse, compile } = require("path-to-regexp");

    let fn = match("api.bots.business/bots/:id");


    let method;
    let test;
    for(let ind in this.methods){
      method = this.methods[ind];
      fn = match(method.path)

      test = fn(path)
      if(test){ return method }
    }
    return false;
  }

  haveMethod(path){
    if(!path){ return }
    if(path==""){ return }

    return this._findMethod(path)
  }

}

module.exports = Policy;