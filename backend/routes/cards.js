const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { idValidation, createCardValidation } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', idValidation, deleteCard);
router.put('/:id/likes', idValidation, likeCard);
router.delete('/:id/likes', idValidation, dislikeCard);

module.exports = router;
