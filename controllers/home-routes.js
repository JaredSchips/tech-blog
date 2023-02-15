const router = require('express').Router()

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
