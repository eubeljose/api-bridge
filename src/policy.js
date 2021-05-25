class Policy{
  
  constructor(fileName, content){
    console.log("Read policy: " + fileName + "...");
    if(this._isBlank(content)){
      throw new Error("Seems policy is blank: " + fileName)
    }

    this.name = fileName;
    this._parseContent(content);
  }

  _parseContent(content){
    let lines = content.split("\n");
    let line;
    for(let ind in lines){
      line = lines[ind];
      if(this._isComment(line)){ continue }
      if(this._parseApiUrl(line)){ continue }
    }
  }

  _isBlank(text){
    if(typeof(text)=="undefined"){ return true }
    if(!text){ return true }
    if(text == ""){ return true }
  }

  _isComment(line){
    return (line.split(" ").join("")[0] == "#")  // it is comment
  }

  _parseApiUrl(line){
    let arr = line.split(' ');
    if(arr[0] != "API"){
      return
    }

    if(this.api_url){
      throw new Error("Can not set Api url twice. Policy: " + this.name)
    }

    if(this._isBlank(arr[1])){
      throw new Error("Syntax error in policy. No API url. Policy: " + this.name)
    }

    this.api_url = arr[1];
    return true;
  }

}

module.exports = Policy;