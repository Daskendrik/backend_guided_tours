const express = require('express');

const router = express.Router();

router.get('/getAllbus', (req, res) => {
  res.status(200).json({
    list: [
      {
        element: 'Header',
        nameColumn: [
          { title: 'Номер ТС', id: 'numTC' },
          { title: 'Фирма', id: 'firm' },
          { title: 'Телефон фирмы', id: 'firmTel' },
        ],
      },
      {
        element: 'Body',
        elements: [['1234', '123', '123']],
      },
    ],
  });
});

module.exports = router;
