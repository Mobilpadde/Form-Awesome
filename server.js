var express = require("express"),
    bodyParser = require("body-parser"),
    datastore = require("nedb"),

    db = new datastore({ filename: __dirname + "/db/forms", autoload: true });
    creator = require("./controllers/creator.js")(db);
    front = require("./controllers/front.js")(db);

    app = express(),
    creatorRouter = express.Router(),
    frontRouter = express.Router();

app.use(
    express.static(__dirname + "/public"),
    bodyParser.urlencoded({ extended: true })
);

app.set("views", __dirname + "/views");

creatorRouter.get("/", creator.new);
creatorRouter.post("/", creator.create);
creatorRouter.get("/:mail", creator.me);
creatorRouter.get("/:mail/:id", creator.responses);
creatorRouter.get("/documentation", creator.documentation);
app.use("/create", creatorRouter);

frontRouter.get("/((home)?)", front.index);
frontRouter.get("/f/:id", front.form);
frontRouter.post("/f/:id", front.send);
frontRouter.get("/*", front.fourOhFour);
app.use("", frontRouter);

app.listen(3009, function(){
    console.log("Listening on", 3009);

    /*db.insert({
        mail: "Mobilpadde@gmail.com", // Lowercase this
        password: "test", // Encrypt this
        fields: [
            {
                info: "First thing first, what's ya name?",
                type: "text"
            },
            {
                info: "All right, {0}. How about your last name?",
                type: "text"
            },
            {
                info: "Well, Mr. {1}, where do you live?",
                type: "bigtext"
            },
            {
                info: "Do you know the answer?",
                type: "choice",
                choices: [
                    {
                        value: "Yes"
                    },
                    {
                        value: "No",
                        goto: 6
                    },
                    {
                        value: "Maybe"
                    }
                ]
            },
            {
                info: "Do you know the answer?",
                type: "choice",
                choices: [
                    {
                        value: "Yes"
                    },
                    {
                        value: "No"
                    }
                ]
            },
            {
                info: "So, {0}, how good are you at stuff?",
                type: "scale",
                steps: 11,
                zero: true
            },
            {
                info: "How would you rate yourself, {0}?",
                type: "rating.stars",
                steps: 5,
                zero: false
            }
        ]
    });*/
});
