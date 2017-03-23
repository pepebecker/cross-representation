src="https://wzrd.in/standalone/minixhr"

var button = document.querySelector(".submit")
  button.addEventListener("click", function (e) {
      var key = "invite-codes"
      var val = document.querySelector(".codeentry").value
      var request    = 'https://cross-representation-4a98e.firebaseio.com/'+key+'.json'
      minixhr(request, responseHandler)
        function responseHandler (data) {
          data = JSON.parse(data)
          var keys = Object.keys(data)
          console.log("search for=", val)
          keys = keys.filter(function (key) {
              return data[key].value === val
          })
          if (keys.length)         console.log(data[keys[0]].value)
          else console.log("wrong key")
        }
    })
