const router = require('express').Router()
const { Post, User, Comment } = require('../models')

// Homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.loggedIn) res.redirect('/')

    res.render('dashboard', {
      loggedIn: req.session.loggedIn
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: 'password' } },
        { model: Comment },
      ],
    })

    if (!post) {
      res.redirect('/')
      return
    }

    if (!(req.session.loggedIn && req.session.user.id === post.user.id)) {
      res.redirect('/')
      return
    }

    res.render('editor', {
      loggedIn: req.session.loggedIn,
      post: post.dataValues
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get('/post/:id', (req, res) => {
  try {
    res.render('viewer', {
      loggedIn: req.session.loggedIn,
      user: req.session.user,
      postId: req.params.id
    })
  } catch (err) {
    console.log(err)
    res.status(err)
  }
})

router.get('/new-post', (req, res) => {
  try {
    if (!req.session.loggedIn) res.redirect('/')

    res.render('poster', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login', {
    loggedIn: req.session.loggedIn
  })
})

module.exports = router
