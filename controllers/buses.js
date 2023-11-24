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
        elements: [
          ['r458ww', 'Автобусы МСК', '879-9548-88'],
          ['r458ww', 'Автобусы МСК', '879-9548-88'],
        ],
      },
    ],
  });
};
