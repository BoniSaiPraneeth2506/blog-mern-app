const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
   title:String,
   summary:String,
   content:String,
   cover:String,
   author:{type:mongoose.SchemaTypes.ObjectId, ref:'User'}},
    {
  timestamps: true,       
});

module.exports = mongoose.model('Post', PostsSchema);
