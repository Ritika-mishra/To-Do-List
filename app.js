const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

let items = [];
let workItems = [];

app.get("/", function (req, res) {

    let day = date.getDate();
    res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", function (req, res) {

    let item = req.body.listItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item)
        res.redirect("/");
    }

});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItem: workItems });
});


app.listen(3000, function () {
    console.log("server is running on port 3000")
})
