const Router = require('express');
const { handleAddNewBlogPage, handleAddNewBlog, handleGetBlogWithId, dropComment } = require('../controllers/blog');
const upload = require('../middlewares/multer');


const router = Router();

router.route('/addblog')
    .post(upload.single('featureImage')
    , handleAddNewBlog)
    .get(handleAddNewBlogPage);
    router.route('/:id').get(handleGetBlogWithId);

    router.route('/comment/:blogid').post(dropComment)
module.exports = router;