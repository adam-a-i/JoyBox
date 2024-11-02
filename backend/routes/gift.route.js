  const express = require("express");
  const router = express.Router();
  const {getAllUsers, getUser, getSingleGift, addGift, updateGiftStatus} = require('../controllers/gift.controller.js');

  router.get('/', getAllUsers)
  router.get('/:id', getUser);

  router.get('/:id/:giftId', getSingleGift);

  router.post('/', addGift);

  router.put('/:id/:giftId', updateGiftStatus);

  module.exports = router;