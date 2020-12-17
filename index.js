const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()
app.use(express.static("public"))
app.listen(process.env.PORT)
app.use(bodyParser.urlencoded({
  extended:true
}))

app.get("/", function(req, res ){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/failure", function(req, res ){
  res.redirect("/")
})


app.post("/", function(req,res) {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.eMail

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData =JSON.stringify(data)

  const url ="https://us7.api.mailchimp.com/3.0/lists/6e0d39cb06"
  const options = {
    method: "POST",
    auth: "deepak1:92bdc8488170a77aa8ee357b96e5ee14-us7"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data))
    })

  })
  request.write(jsonData);
  request.end();
})





// api key
// 92bdc8488170a77aa8ee357b96e5ee14-us7
// list id 6e0d39cb06
