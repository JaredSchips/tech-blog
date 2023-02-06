const router = require('express').Router()
const { Post, User, Comment } = require('../../models')

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: { exclude: 'password' } },
        { model: Comment },
      ],
      order: [['date_created', 'DESC']],
      limit: 10
    })
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// GET one post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: 'password' } },
        { model: Comment, include: { model: User, attributes: { exclude: 'password' } } },
      ],
      order: [[Comment, 'date_created', 'DESC']],
    })

    if (!post) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// POST a post
router.post('/', async (req, res) => {
  try {
    const result = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// UPDATE a post
router.put('/:id', async (req, res) => {
  try {
    const result = await Post.update({
        title: req.body.title,
        content: req.body.content
      },
      { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.destroy(
      { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
