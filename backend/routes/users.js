const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');
const { idValidation, patchUserValidation, patchUserAvatarValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idValidation, getUserById);
router.patch('/me', patchUserValidation, patchUser);
router.patch('/me/avatar', patchUserAvatarValidation, patchUserAvatar);

module.exports = router;
