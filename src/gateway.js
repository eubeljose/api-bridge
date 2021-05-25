class Gateway{
  constructor(){
    this.loadPolicies();
  }

  loadPolicies() {
    this.policies = [];

    const fs = require("fs");
    const policyDir = "policies/"

    let gateway = this;

    fs.readdir(policyDir, function(err, filenames) {
      if (err) {
        gateway.onPolicyLoadError(err);
        return;
      }
      filenames.forEach(function(filename) {
        fs.readFile(policyDir + filename, "utf-8", function(err, content) {
          if (err) {
            gateway.onPolicyLoadError(err);
            return;
          }

          gateway.addPolicy(filename, content);
        });
      });
    });
  }

  addPolicy(filename, content){
    let Policy = require("./policy");
    let policy = new Policy(filename, content);

    this.policies.push(policy);
  }

  onPolicyLoadError(err){
    console.log(err)
  }

  haveMethod(url){
    if(!url){ return }
    if(url==""){ return }

    let { pathToRegexp, match, parse, compile } = require("path-to-regexp");

    var fn = match("api.bots.business/bots/:id");

    // "api.bots.business/bots/22?any_query=true"
    url = url.split("?")[0]

    let test = fn(url)
    if(test){
      return true
    }
    return false
  }

}

module.exports = Gateway;