const router = require('express').Router()
const { User, Post } = require('../../models')

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user = dbUserData

      res.status(200).json(dbUserData)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { email: req.body.email }
    })

    if (!dbUserData) {
      res.status(400)
        .json({ message: 'Incorrect email or password. Please try again!' })
      return
    }

    const validPassword = await dbUserData.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400)
        .json({ message: 'Incorrect email or password. Please try again!' })
      return
    }

    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user = dbUserData

      res.status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

// GET all posts by a user
router.get('/:id/posts', async (req, res) => {
  try {
    if (req.params.id == 0 && !req.session.loggedIn) {
      res.status(400).json({ message: 'Not logged in' })
      return
    }

    const id = (req.params.id == 0) ? req.session.user.id : req.params.id
    const posts = await Post.findAll({
      where: { user_id: id },
      order: [['date_created', 'DESC']],
      limit: 15
    })

    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
