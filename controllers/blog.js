const Blog = require("../models/blog");
const { Comment } = require("../models/comment");

function handleAddNewBlogPage(req,res){
    return res.render('addblog',{
        user:req.user,
    })
}  

async function handleAddNewBlog(req, res) {
    const { title, body } = req.body;
    // console.log(req.body);
    console.log(req.file);
    const blog=await Blog.create({
        title,
        body,
        featuredImageUrl: req.file ? `/uploads/${req.file.filename}` : "",
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${blog._id}`);
}



async function handleGetBlogWithId(req, res) {
    const blog=await Blog.findById(req.params.id).populate('createdBy');
    const comments=await Comment.find({blogId:req.params.id}).populate('createdBy');
    return res.render('blog',{
        user:req.user,
        blog,
        comments,
    });
}


async function dropComment(req,res){
  try {
      await Comment.create({
          content:req.body.content,
          blogId:req.params.blogid,
          createdBy: req.user._id,
          
      })
      return res.redirect(`/blogs/${req.params.blogid}`)
  } catch (error) {
    console.log(error);
  }
}
module.exports={
    handleAddNewBlogPage,handleAddNewBlog,handleGetBlogWithId,dropComment
}