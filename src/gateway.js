class Gateway{
  constructor(){
    this.loadPolicies();
  }

  loadPolicies() {
    this.policies = {};

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
    let policy = new Policy(filename, content)

    this.policies[policy.name] = policy;
  }

  onPolicyLoadError(err){
    console.log(err)
  }


}

module.exports = Gateway;