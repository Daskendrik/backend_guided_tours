module.exports.getAllbus = function (req, res) {
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
        elements: [['123sad4', '123', '123']],
      },
    ],
  });
};
