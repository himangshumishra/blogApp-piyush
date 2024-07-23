const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./db/config');
const { checkAuth } = require('./middlewares/authentication');
const Blog = require('./models/blog');
const app = express()
const PORT = 8000;
connectDb("mongodb://127.0.0.1:27017/myblog")

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkAuth('token'))
app.use(express.static(path.resolve('./public')));
app.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.render('home', {
            user: req.user,
            blogs: allBlogs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the blogs.');
    }
});
app.use('/user', userRoute)
app.use('/blogs', blogRoute)


app.listen(PORT, () => console.log('Server is running on port 8000'))