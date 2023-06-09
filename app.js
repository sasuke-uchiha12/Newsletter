const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static((__dirname, 'public')));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email =  req.body.email;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);

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
    }

    const jsonData = JSON.stringify(data);
    // console.log(jsonData)
    const url = " https://us21.api.mailchimp.com/3.0/lists/3fcf7ef15b";
const option = {
    method: "POST",
    auth: "sasuke:3263b00747d5b4475bf1d0130b01b6f1-us21"
}

const request = https.request(url,option,function(response){
    const status = response.statusCode;
    if(status == "200"){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
 

    response.on("data", function(data){
        // console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();


});


app.listen(3000, function(){
    console.log("server is running on port 3000");
});

//api Key
// 3263b00747d5b4475bf1d0130b01b6f1-us21

//list id
// 3fcf7ef15b