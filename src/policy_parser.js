class PolicyParser{
  
  constructor(fileName, content){
    console.log("Read policy: " + fileName + "...");
    if(this._isBlank(content)){
      throw new Error("Seems policy is blank: " + fileName)
    }

    this.name = fileName;
    this.api_url = null;
    this.safe_params = [];
    this.methods = [];
    this._parseContent(content);
  }

  _parseContent(content){
    let lines = content.split("\n");
    let line;
    this.curLine = 0;
    for(this.curLine in lines){
      line = lines[this.curLine];
      if(this._isComment(line)){ continue }
      if(this._parseApiUrl(line)){ continue }
      if(this._parseSafeParam(line)){ continue }

      this._parseMethod(line)
    }
  }

  _isBlank(text){
    if(typeof(text)=="undefined"){ return true }
    if(!text){ return true }
    if(text == ""){ return true }
  }

  _throwError(title){
    let lineIndex = parseInt(this.curLine) + 1;
    let err = title + " Policy: " + this.name + ". Line: " + lineIndex;
    throw new Error(err);
  }

  _isComment(line){
    return (line.split(" ").join("")[0] == "#")
  }

  _parseApiUrl(line){
    let arr = line.split(' ');
    if(arr[0] != "API"){
      return
    }

    if(this.api_url){
      this._throwError("Can not set Api url twice.")
    }

    let url = arr[1];

    if(this._isBlank(url)){
      this._throwError("No API url.")
    }

    if(url.split('http')[0]!=''){
      url = 'http://' + url
    }

    this.api_url = url;
    return true;
  }


  _isSafeParam(arr){
    return ((arr[0] == "SAFE")&&((arr[1] == "PARAM")))
  }

  _parseSafeParam(line){
    let arr = line.split(' ');
    if(!this._isSafeParam(arr)){ return }

    let keys = arr[2];

    if(this._isBlank(keys)){
      this._throwError("No safe param. Need key_name=ENV.")
    }
      
    let arr_params = arr[2].split("=");
    if(!arr_params[0]){
      this._throwError("Invalid safe param. Need key_name like key_name=ENV.")
    }

    if(!arr_params[1]){
      this._throwError("Invalid safe param. Need ENV like key_name=ENV.")
    }

    let envValue = process.env[arr_params[1]];

    if(!envValue){
      this._throwError("Need set ENV value for " + arr_params[1])
    }

    this.safe_params.push({
      key: arr_params[0],
      value: process.env[arr_params[1]]
    })
  }

  _isMethod(arr){
    return (arr[0]=="ALWAYS")||(arr[0]=="ASK")
  }

  isHttpMethodExist(method){
    return [ "OPTIONS", "GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "TRACE", "CONNECT"].
      includes(method)
  }

  _parseMethod(line){
    let arr = line.split(' ');
    if(!this._isMethod(arr)){ return }

    let needAsk = ( arr[0] == "ASK" )

    let httpMethod = arr[1]
    if(!this.isHttpMethodExist(httpMethod)){
      this._throwError("Http Method do not exist: " + httpMethod) 
    }

    let path = arr[2]

    this.methods.push({
      method: httpMethod,
      path: path,
      needAsk: needAsk
    })
  }

}
module.exports = PolicyParser;