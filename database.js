import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://davy_the_guy:davy_the_guy@cluster0.brgoaii.mongodb.net/blogDB", {useNewUrlParser: true});

// const fruitSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required:[true, "Why, don't know the name or what?"]
// 	},
// 	rating: {
// 		type: Number,
// 		min: 1,
// 		max: 10
// 	},
// 	review: String
// });

// const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit ({
// 	name:"",
// 	rating: 8,
// 	review: "Just amazing"
// });
// fruit.save();

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


// Fruit.count({}, (err, count) => {
// 	if (err) {
// 	  console.error(err);
// 	} else {
// 	  console.log(`Total count: ${count}`);
// 	}
//       });


const blog = new Blog ({
	_id: 1,
	title:"The Rise of Decentralized Finance",
	content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
	author: "Mwalimu",
	date: new Date()
});
// blog.save();

const blog1 = new Blog ({
	_id: 4,
	title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
	date: new Date()
});
const blog2 = new Blog ({
	_id: 5,
	title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
	content:
	  "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
	author: "Samuel Green",
	date: new Date()
});


// Blog.insertMany([blog1, blog2]).then((blogs) => {
// 	console.log('Successfully saved all the blogs to blogDB:');
//       })
//       .catch((error) => {
// 	console.error('Error inserting documents:', error);
//       });


//       Blog.find({}).then((blogs) => {
// 	mongoose.connection.close();	
// 	blogs.forEach((blog) => {
// 	  console.log(blog); // Assuming 'name' is the field you want to retrieve
// 	});	
// 	// console.log('Names:', names);
// 	// console.log('Query result:', fruits);
//       })
//       .catch((error) => {
// 	mongoose.connnection.close();
// 	console.error('Error querying documents:', error);
//       });


// Blog.find({}).then((posts) => {
// 	mongoose.connection.close();	
	
// 	  console.log(posts); // Assuming 'name' is the field you want to retrieve
		
// 	// console.log('Names:', names);
// 	// console.log('Query result:', fruits);
//       })
//       .catch((error) => {
// 	mongoose.connnection.close();
// 	console.error('Error querying documents:', error);
//       });
    
// Blog.findByIdAndRemove(4, (err, removedDocument) => {
// 	if (err) {
// 	  console.error(err);
// 	} else {
// 	  if (removedDocument) {
// 	    console.log('Removed document:', removedDocument);
// 	  } else {
// 	    console.log('Document not found.');
// 	  }
// 	}
//       });

// async function deleteBlog() {
// 	try {
// 	  await Blog.deleteOne({ _id: 5 });
// 	  console.log('Blog deleted successfully');
// 	} catch (error) {
// 	  console.error('Error deleting blog:', error);
// 	}
//       }
      
//       deleteBlog();

      async function updateBlog() {
	try {
		await Blog.updateOne({ _id: 1 }, {	
			 title: 'The Rise of Decentralized Finance',						
			 content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
			 author: "Alex Thompson"	 

			});
	  console.log('Blog updated successfully');
	} catch (error) {
	  console.error('Error updating the blog:', error);
	}
      }		      
      updateBlog();