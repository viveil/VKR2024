const router = require('express').Router()
const userRouter = require('./User')
const kanjiRouter = require('./Kanji')

router.use('/user', userRouter)
router.use('/kanji', kanjiRouter)


module.exports = router
