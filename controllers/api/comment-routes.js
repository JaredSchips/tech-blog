const router = require('express').Router()
const { Post, User, Comment } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({ 
      include: [
        { model: User, attributes: { exclude: 'password' } },
        { model: Post },
      ],
      order: [['date_created', 'DESC']],
      limit: 20
    })
    res.json(comments)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: 'password' } },
        { model: Post },
      ],
    })
    
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' })
      return
    }

    res.json(comment)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const result = await Comment.create({
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// UPDATE a comment
router.put('/:id', async (req, res) => {
  try {
    const result = await Comment.update({
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
    const result = await Comment.destroy(
      { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
