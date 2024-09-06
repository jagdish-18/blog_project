const express = require('express');
const { showBlogPage, addBlog ,editBlog ,deleteBlog, updateBlog} = require('../controller/blog.controller');
const { verifyToken } = require('../helpers/verifyToken');
const blogRoutes = express.Router();

blogRoutes.get("/", verifyToken, showBlogPage);
blogRoutes.post("/",verifyToken, addBlog);
blogRoutes.get("/:id/edit", editBlog);
blogRoutes.post("/:id/edit", updateBlog);
blogRoutes.post("/:id", deleteBlog);


module.exports = blogRoutes;