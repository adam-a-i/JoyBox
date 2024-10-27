  const express = require("express");
  const router = express.Router();
  const {getGifts, getSingleGift, addGift, updateGiftStatus} = require('../controllers/gift.controller.js');

  router.get('/', getGifts);

  router.get('/:id', getSingleGift);

  router.post('/', addGift);

  router.put('/:id', updateGiftStatus);

  module.exports = router;