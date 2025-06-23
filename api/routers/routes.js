
// const express = require('express');
// const route = express.Router();
// const User = require('../userModels/user');
// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv');
// const multer = require('multer');
// const path = require('path');
// const Post = require('../userModels/Posts');
// const fs = require('fs');

// // Configure multer for file uploads
// const uploadMiddleware = multer({ dest: path.join(__dirname, '..', 'uploads') });

// route.post('/register', async (req, res) => {
//   const { userName, passWord } = req.body;

//   if (!userName || !passWord) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }

//   try {
//     const userExists = await User.findOne({ userName });
//     if (userExists) {
//       return res.status(409).json({ message: "Username already exists" });
//     }
   
//     const hashedPassword = await bcrypt.hash(passWord, 10);
//     const newUser = await User.create({ userName, passWord: hashedPassword });
//     res.status(201).json({ message: "User registered successfully" });
//     console.log("✅ New user created:", newUser);
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// route.post('/login', async (req, res) => {
//   const { userName, passWord } = req.body;

//   if (!userName || !passWord) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }
  
//   try {
//     const userDoc = await User.findOne({ userName });
//     if (!userDoc) {
//       return res.status(400).json({ message: "User not found" });
//     }
    
//     const passOk = await bcrypt.compare(passWord, userDoc.passWord);
//     if (passOk) {
//       const token = jwt.sign(
//         { 
//           userId: userDoc._id,
//           userName: userDoc.userName
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
      
//       console.log("Generated Token:", token);
//       res.cookie('token', token).json({
//         id: userDoc._id,
//         userName,
//       });
//     } else {
//       res.status(400).json({ message: "Wrong credentials" });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// route.get('/profile', (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.status(401).json({ message: 'Not logged in' });

//   jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
//     if (err) return res.status(403).json({ message: 'Token invalid' });
//     res.json(info);
//   });
// });

// route.post('/logout', (req, res) => {
//   res.cookie('token', '').json('ok');
// });

// // FIXED: Create post with proper file handling
// route.post('/create', uploadMiddleware.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const { originalname, path: tempPath, filename } = req.file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     const newFileName = filename + '.' + ext;
//     const finalPath = path.join(__dirname, '..', 'uploads', newFileName);

//     // Rename file to include extension
//     fs.renameSync(tempPath, finalPath);

//     const { token } = req.cookies;
//     if (!token) {
//       return res.status(401).json({ message: 'Not logged in' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
//       if (err) return res.status(403).json({ message: 'Token invalid' });

//       const { title, summary, content } = req.body;

//       if (!title || !summary || !content) {
//         return res.status(400).json({ message: 'Title, summary, and content are required' });
//       }

//       const postDoc = await Post.create({
//         title,
//         summary,
//         content,
//         cover: newFileName, // Store just the filename
//         author: info.userId
//       });

//       res.json(postDoc);
//       console.log("✅ Post created:", postDoc);
//     });
//   } catch (error) {
//     console.error("Create post error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// route.get('/getposts', async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate('author', ['userName'])
//       .sort({ createdAt: -1 });
//     res.json(posts); 
//   } catch (err) {
//     console.error("Get posts error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ADDED: Get single post
// route.get('/post/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id).populate('author', ['userName']);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json(post);
//   } catch (err) {
//     console.error("Get post error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


// route.get('/post/:id',async (req,res)=>{
//   const {id}=req.params;
//   const postDoc=await Post.findById(id).populate('author',['userName']);
//   res.send(postDoc);

// })


// // Fixed edit route - replace your existing edit route with this:
// route.put('/edit/:id', uploadMiddleware.single('file'), async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       return res.status(401).json({ message: 'Not logged in' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
//       if (err) return res.status(403).json({ message: 'Token invalid' });

//       const { id } = req.params; // Get ID from URL params
//       const { title, summary, content } = req.body;

//       if (!title || !summary || !content) {
//         return res.status(400).json({ message: 'Title, summary, and content are required' });
//       }

//       try {
//         // Find the post to update
//         const postToUpdate = await Post.findById(id);
//         if (!postToUpdate) {
//           return res.status(404).json({ message: 'Post not found' });
//         }

//         // Check if user is the author
//         const isAuthor = postToUpdate.author.toString() === info.userId.toString();
//         if (!isAuthor) {
//           return res.status(403).json({ message: 'You are not the author of this post' });
//         }

//         // Prepare update data
//         const updateData = {
//           title,
//           summary,
//           content
//         };

//         // Handle file upload if provided
//         if (req.file) {
//           const { originalname, path: tempPath, filename } = req.file;
//           const parts = originalname.split('.');
//           const ext = parts[parts.length - 1];
//           const newFileName = filename + '.' + ext;
//           const finalPath = path.join(__dirname, '..', 'uploads', newFileName);

//           // Rename file to include extension
//           fs.renameSync(tempPath, finalPath);
//           updateData.cover = newFileName;
//         }

//         // Update the post
//         const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
        
//         res.json(updatedPost);
//         console.log("✅ Post updated:", updatedPost);
//       } catch (dbError) {
//         console.error("Database error:", dbError);
//         res.status(500).json({ message: "Database error" });
//       }
//     });
//   } catch (error) {
//     console.error("Edit post error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// route.delete('/delete/:id', async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       return res.status(401).json({ message: 'Not logged in' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
//       if (err) return res.status(403).json({ message: 'Token invalid' });

//       const { id } = req.params;

//       try {
//         const postToDelete = await Post.findById(id);
//         if (!postToDelete) {
//           return res.status(404).json({ message: 'Post not found' });
//         }

//         // Check if user is the author
//         const isAuthor = postToDelete.author.toString() === info.userId.toString();
//         if (!isAuthor) {
//           return res.status(403).json({ message: 'You are not the author of this post' });
//         }

//         // Delete associated image file if it exists
//         if (postToDelete.cover) {
//           const filePath = path.join(__dirname, '..', 'uploads', postToDelete.cover);
//           if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//             console.log("✅ Associated file deleted:", postToDelete.cover);
//           }
//         }

//         // Delete the post
//         const deletedPost = await Post.findByIdAndDelete(id);
        
//         res.status(200).json({ 
//           message: 'Post deleted successfully', 
//           deletedPost 
//         });
//         console.log("✅ Post deleted:", deletedPost.title);
        
//       } catch (dbError) {
//         console.error("Database error:", dbError);
//         res.status(500).json({ message: "Database error" });
//       }
//     });
//   } catch (error) {
//     console.error("Delete post error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// route.get('/myposts', async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.status(401).json({ message: 'Not logged in' });

//   jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
//     if (err) return res.status(403).json({ message: 'Token invalid' });

//      const posts = await Post.find({author:info.userId})
//       .populate('author', ['userName'])
//       .sort({ createdAt: -1 });
//     res.json(posts);
//   });
// });

// route.get('/author/:username', async (req, res) => {
//   try {
//     const user = await User.findOne({ userName: req.params.username });
//     if (!user) return res.status(404).json({ error: 'Author not found' });

//     const posts = await Post.find({ author: user._id })
//       .populate('author', 'userName')
//       .sort({ createdAt: -1 });

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// module.exports = route;



const express = require('express');
const route = express.Router();
const User = require('../userModels/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const Post = require('../userModels/Posts');
const fs = require('fs');

// Multer config for file uploads
const uploadMiddleware = multer({ dest: path.join(__dirname, '..', 'uploads') });

// Register Route
route.post('/register', async (req, res) => {
  const { userName, passWord } = req.body;

  if (!userName || !passWord) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const userExists = await User.findOne({ userName });
    if (userExists) return res.status(409).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(passWord, 10);
    const newUser = await User.create({ userName, passWord: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route with proper cookie settings
route.post('/login', async (req, res) => {
  const { userName, passWord } = req.body;

  if (!userName || !passWord) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const userDoc = await User.findOne({ userName });
    if (!userDoc) return res.status(400).json({ message: "User not found" });

    const passOk = await bcrypt.compare(passWord, userDoc.passWord);
    if (!passOk) return res.status(400).json({ message: "Wrong credentials" });

    const token = jwt.sign(
      { userId: userDoc._id, userName: userDoc.userName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    }).json({ id: userDoc._id, userName });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Profile Route
route.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Not logged in' });

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    res.json(info);
  });
});

// Logout Route
route.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  }).json('ok');
});

// Create Post
route.post('/create', uploadMiddleware.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const parts = req.file.originalname.split('.');
    const ext = parts.pop();
    const finalFile = req.file.filename + '.' + ext;
    const finalPath = path.join(__dirname, '..', 'uploads', finalFile);

    fs.renameSync(req.file.path, finalPath);

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) return res.status(403).json({ message: 'Token invalid' });

      const { title, summary, content } = req.body;
      if (!title || !summary || !content) return res.status(400).json({ message: 'All fields required' });

      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: finalFile,
        author: info.userId
      });

      res.json(postDoc);
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Posts
route.get('/getposts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', ['userName'])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Single Post
route.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', ['userName']);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error("Get post error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Edit Post
route.put('/edit/:id', uploadMiddleware.single('file'), async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) return res.status(403).json({ message: 'Token invalid' });

      const postToUpdate = await Post.findById(req.params.id);
      if (!postToUpdate) return res.status(404).json({ message: 'Post not found' });
      if (postToUpdate.author.toString() !== info.userId.toString())
        return res.status(403).json({ message: 'Unauthorized' });

      const updateData = { title: req.body.title, summary: req.body.summary, content: req.body.content };

      if (req.file) {
        const ext = req.file.originalname.split('.').pop();
        const finalFile = req.file.filename + '.' + ext;
        const finalPath = path.join(__dirname, '..', 'uploads', finalFile);
        fs.renameSync(req.file.path, finalPath);
        updateData.cover = finalFile;
      }

      const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(updatedPost);
    });
  } catch (error) {
    console.error("Edit post error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Post
route.delete('/delete/:id', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) return res.status(403).json({ message: 'Token invalid' });

      const postToDelete = await Post.findById(req.params.id);
      if (!postToDelete) return res.status(404).json({ message: 'Post not found' });
      if (postToDelete.author.toString() !== info.userId.toString())
        return res.status(403).json({ message: 'Unauthorized' });

      if (postToDelete.cover) {
        const filePath = path.join(__dirname, '..', 'uploads', postToDelete.cover);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post deleted' });
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// My Posts
route.get('/myposts', async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Not logged in' });

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });

    const posts = await Post.find({ author: info.userId })
      .populate('author', ['userName'])
      .sort({ createdAt: -1 });

    res.json(posts);
  });
});

// Get Posts by Author
route.get('/author/:username', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    if (!user) return res.status(404).json({ message: 'Author not found' });

    const posts = await Post.find({ author: user._id })
      .populate('author', ['userName'])
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Get author posts error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = route;

