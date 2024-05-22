const User = require('../models/User');
const jwt = require('jsonwebtoken');
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
    User.create({
      name,
      email,
      password,
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      res.status(500).send({message : 'Не удалось создать пользователя', err})
      next(err)
    });
};


  module.exports.deleteUser = (req, res, next) => {
    const {_id} = req.user;
    return User.findByIdAndDelete({_id: _id})
      .then((user) => {
        res.clearCookie('jwt')
        res.status(200).send({message : 'Вы вышли'})
      })
      .catch((err) => {
        res.status(500).send({message : 'НЕ удалось удалить', err})
        next(err)
      })
  }


  module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => res.send(user))
      .catch(next);
  };

  module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          'dev-secret',
          { expiresIn: '7d' },
        );
        res.cookie('jwt', token, { httpOnly: false, secure: true, sameSite: 'none' });
        return res.status(200).send({token});
      })
      .catch(next);
  };

  module.exports.updateProfile = (req, res, next) => {
    const { name } = req.body
    console.log(req.user._id);
    User.findByIdAndUpdate(req.user._id, {name})
      .then((user) =>{
        user.name = name
        user.save()
        res.send(user)
      })
      .catch((err) => next(err));
  };

  module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) =>{
      user.avatar = avatar
      user.save()
      res.send(user)
    }
   )
    .catch((err) => next(err));
  }

  module.exports.logout = (req, res, next) => {
    res.clearCookie('jwt')
    res.status(200).send({message : 'Вы вышли'})
  }

  module.exports.completeLesson = (req, res, next) => {
    const id = req.user._id
    const {levelNumber, lessonNumber} = req.body
    User.findById(id)
      .then((user) => {

        user.JLPTLevels = user.JLPTLevels.map(item => {
          return  item.level ===  levelNumber ? {level: item.level, lessonsCompleted: item.lessonsCompleted.includes(lessonNumber) ? [...item.lessonsCompleted] : [...item.lessonsCompleted, lessonNumber]} : {...item}
        })
        user.save()
        res.send(user)
      }).catch((err) => next(err));
  }