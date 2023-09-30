const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/toDoListDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const itemsSchema = mongoose.Schema(
    { name: String }
);

const Item = mongoose.model("Item", itemsSchema);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


const goShop = new Item({ name: "Go Shopping" })
const buyBook = new Item({ name: "Buy Books" })
const defaultItems = [goShop, buyBook]

app.get("/", function (req, res) {
    Item.find({})
        .then(function (foundItems) {

            if (foundItems.length == 0) {
                Item.insertMany(defaultItems)
                    .then(result => {
                        console.log(result)
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                res.redirect("/");

            }

            else {
                let day = date.getDate();
                res.render("list", { listTitle: day, newItems: foundItems });
            }

        })
        .catch(function (err) {
            console.log(err);
        });

});

// });
app.post("/", async function (req, res) {
    await Item.create({ name: item })
    res.redirect("/");
    
});



app.listen(3000, function () {
    console.log("server is running on port 3000")
})
