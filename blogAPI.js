import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://davy_the_guy:davy_the_guy@cluster0.brgoaii.mongodb.net/blogDB", {useNewUrlParser: true});

const app = express();
const port = 4000;

const blogSchema = new mongoose.Schema({
	_id: Number,
	title: {
		type: String,
		required:[true, "Why, don't have a title or what?"]
	},
	content: {
		type: String
		
	},
	author: String,
	date: String
});

const Blog = mongoose.model("Blog", blogSchema);

var newId = 0;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
	Blog.find({}).then((posts) => {
		// mongoose.connection.close();	
		if(posts.length>5){
			posts = getFirstFiveItems(posts);
			res.json(posts);
		}else{
			res.json(posts);
		}
		   
	      })
	      .catch((error) => {
		mongoose.connection.close();
		console.error('Error querying documents:', error);
	      }); 

	      function getFirstFiveItems(arr) {				
		return arr.slice(0, 5);
	      }
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
	async function getPost() {
		try{	
			var idIn = parseInt(req.params.id);
			const post = await Blog.findOne({_id: idIn});

		  	res.json(post);
		
	      }
	      catch(error){
		console.error('Error querying documents:', error);
	      };
	}

	getPost();
  
});

// POST a new post
app.post("/posts", (req, res) => {
		
	async function giveId(){
		try{
			const lastDocument = await Blog.findOne({}, {}, { sort: { _id: -1 } });
			newId = lastDocument._id + 1;
			const post = new Blog ({
				id: newId,
				title: req.body.title,
				content: req.body.content,
				author: req.body.author,
				date: new Date(),
			      });
			      post.save();
			    
			      res.status(201).json(post);
		}catch(error){
			console.error(error);
		}
	}
  giveId();
  
});


// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {	      
	async function updateBlog() {
		var blogId = parseInt(req.params.id);
		try {
			
			const updatedBlog = await Blog.findByIdAndUpdate(blogId, {	
				title: req.body.title ,					
				content: req.body.content ,
				author: req.body.author,
				date: post.date}, {new: true});
			if (updatedBlog) {
				console.log('Blog updated successfully:', updatedBlog);
				res.json(updatedBlog);
			} else {
				console.log('Blog not found');
			}
		} catch (error) {
			console.error('Error updating blog:', error);
	  	}
	}
			updateBlog();
}); 	      
		     
	       
 



// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
	async function deleteBlog(){
		try{
			var id = parseInt(req.params.id);
			const post = await Blog.findById(id).exec();
			await Blog.findByIdAndDelete(id);
			console.log('Successfully Deleted: ', post)
		}catch(error){
			console.error(error);
		}
	}
	deleteBlog();
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

