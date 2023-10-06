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

// // In-memory data store
// let posts = [
//   {
//     id: 1,
//     title: "The Rise of Decentralized Finance",
//     content:
//       "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
//     author: "Alex Thompson",
//     date: "2023-08-01T10:00:00Z",
//   },
//   {
//     id: 2,
//     title: "The Impact of Artificial Intelligence on Modern Businesses",
//     content:
//       "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
//     author: "Mia Williams",
//     date: "2023-08-05T14:30:00Z",
//   },
//   {
//     id: 3,
//     title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
//     content:
//       "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
//     author: "Samuel Green",
//     date: "2023-08-10T09:15:00Z",
//   },
// ];


var newId = 0;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
	Blog.find({}).then((posts) => {
		mongoose.connection.close();	
		
		  console.log(posts); // Assuming 'name' is the field you want to retrieve
		  res.json(posts);	
		// console.log('Names:', names);
		// console.log('Query result:', fruits);
	      })
	      .catch((error) => {
		mongoose.connnection.close();
		console.error('Error querying documents:', error);
	      });  
  
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
	Blog.find({}).then((posts) => {
		mongoose.connection.close();

		  const post = posts.find((p) => p.id === parseInt(req.params.id));
		  if (!post) return res.status(404).json({ message: "Post not found" });
		  res.json(post);
		// console.log('Names:', names);
		// console.log('Query result:', fruits);
	      })
	      .catch((error) => {
		mongoose.connnection.close();
		console.error('Error querying documents:', error);
	      });
  
});

// POST a new post
app.post("/posts", (req, res) => {
	
	Fruit.count({}, (err, count) => {
		if (err) {
		  console.error(err);
		} else {
			newId = count + 1;
		}
	      });
  
  const post = new Blog ({
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  });
  post.save();
//   const blog = new Blog ({
// 	_id: 1,
// 	title:"The Rise of Decentralized Finance",
// 	content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
// 	author: "Mwalimu",
// 	date: new Date()
// });
// blog.save();
  res.status(201).json(post);
});


// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {

	Blog.find({}).then((posts) => {
		mongoose.connection.close();	
		const post = posts.find((p) => p.id === parseInt(req.params.id));
		if (!post) return res.status(404).json({ message: "Post not found" });
	      
		async function updateBlog() {
			try {
				await Blog.updateOne({ _id: post.id }, {	
					 title: req.body.title,						
					 content: req.body.content,
					 author: req.body.author	 
		
					});
			  console.log('Blog updated successfully');
			} catch (error) {
			  console.error('Error updating the blog:', error);
			}
		      }		      
		      updateBlog();		
		 
	      })
	      .catch((error) => {
		mongoose.connnection.close();
		console.error('Error querying documents:', error);
	      });  
  res.json(post);
});


// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
	Blog.find({}).then((posts) => {
		mongoose.connection.close();		
		
		const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
		if (index === -1) return res.status(404).json({ message: "Post not found" });

		async function deleteBlog() {
			try {
			  await Blog.deleteOne({ _id: index });
			  console.log('Blog deleted successfully');
			} catch (error) {
			  console.error('Error deleting blog:', error);
			}
		      }		      
		      deleteBlog();

		res.json({ message: "Post deleted" });
		
	      })
	      .catch((error) => {
		mongoose.connnection.close();
		console.error('Error querying documents:', error);
	      });


});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

