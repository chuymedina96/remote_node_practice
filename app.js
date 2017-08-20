var express 	= require("express"),
	app			= express(),
	mongoose	= require("mongoose"),
	request		= require("request"),
	bodyParser	= require("body-parser"),
	faker		= require("faker");

// Using `mongoose.connect`...
var promise = mongoose.connect('mongodb://localhost/firstexprss', {
  useMongoClient: true,
  /* other options */
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var postSchema = new mongoose.Schema({
	title: String,
	text:  String
});
var Post = mongoose.model("Post", postSchema);

Post.create({
	title: "Hello world",
	text:  "Hello world again"
}, function(err, post){
	if(err){
		console.log(err);
	}else{
		post.save();
		console.log(post);
	}
});


app.get("/", function(req,res){
	res.render("landing");
});
app.get("/posts", function(req, res){
	res.render("show");
})


app.listen(3000, function(){
	console.log("Server has started!!!");
});
