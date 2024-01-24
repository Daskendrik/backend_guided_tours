const pool = require('../settings/bd');

module.exports.getById = function (req, res) {
  const data = req.query;
  const seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.id = '${data.ID}' `;
  let reqData = [];
  console.log(data);
  console.log(seachSpek);
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
      reqData = [
        {
          Lable: 'Фамилия',
          Value: result.rows[0].last_name,
          Type: 'text',
          id: 'last_name',
        },
        {
          Lable: 'Имя',
          Value: result.rows[0].first_name,
          Type: 'text',
          id: 'first_name',
        },
        {
          Lable: 'Отчество',
          Value: result.rows[0].middle_name,
          Type: 'text',
          id: 'middle_name',
        },
        {
          Lable: 'Телефон',
          Value: result.rows[0].tel,
          Type: 'tel',
          id: 'tel',
        },
        {
          Lable: 'Почта',
          Value: result.rows[0].email,
          Type: 'email',
          id: 'email',
        },
        {
          Lable: 'Тип',
          Value: result.rows[0].name,
          Type: 'select',
          id: 'type_code',
          // arrSelect: lov,
        },
        {
          Lable: 'Комментарий',
          Value: result.rows[0].comment,
          Type: 'textarea',
          id: 'comment',
        },
      ];
      let seach = `Select * from tr_lov where lov_type = 'CONTACT'`;
      pool.query(seach, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            status: 'Error',
          });
        } else {
          console.log(result.rows);
          const arr = result.rows;
          console.log(arr);
          lov = result.rows;
          reqData.find((data) => data.id === 'type_code').arrSelect = lov;
          console.log(reqData);
          res.status(200).json({
            status: 'OK',
            req: reqData,
          });
        }
      });
    }
  });
};

module.exports.getAll = function (req, res) {
  const data = req.query;
  console.log(data);
  const brRows = [];
  const tableTitle = [
    //Заголовок таблиц
    { title: 'Id', id: 'Id' },
    { title: 'ФИО', id: 'name' },
    { title: 'Телефон', id: 'tel' },
    { title: 'Тип', id: 'type' },
  ];
  let seachSpek =
    'select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code order by id';
  if (data.phone && data.surname) {
    seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.tel = '${data.phone}' AND a.last_name = '${data.surname}' order by id`;
  } else if (data.phone) {
    seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.tel = '${data.phone}' order by id`;
  } else if (data.surname) {
    seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.last_name = '${data.surname}' order by id`;
  }
  console.log(seachSpek);
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        brRows.push([
          element.id,
          element.last_name +
            ' ' +
            element.first_name +
            ' ' +
            element.middle_name,
          element.tel,
          element.name,
        ]); //Тут меняем поля, последовательсть надо сохранять, как у загловка таблиц
      }
      console.log(brRows);
    }

    res.status(200).json({
      req: [
        {
          element: 'Header',
          nameColumn: tableTitle,
        },
        {
          element: 'Body',
          elements: brRows,
        },
      ],
    });
  });
};

module.exports.getLast = function (req, res) {
  let lastId;
  let lov;
  console.log(req);
  seachSpek = 'SELECT MAX(ID) FROM TR_CONTACT';
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else lastId = result.rows[0].max;
    console.log('getlov');
    const seach = `Select * from tr_lov where lov_type = 'CONTACT'`;
    pool.query(seach, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          status: 'Error',
        });
      } else {
        console.log(result.rows);
        const arr = result.rows;
        console.log(arr);
        lov = result.rows;
        res.status(200).json({
          status: 'OK',
          req: [lastId, lov],
        });
      }
    });
  });
};

module.exports.delete = function (req, res) {
  console.log('delete');
  const data = req.body;
  console.log(data);
  const del = `Delete FROM TR_CONTACT WHERE ID=${data.targetRow}`;
  pool.query(del, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.status(200).json({
      status: 'OK',
    });
  });
};

module.exports.create = function (req, res) {
  const data = req.body;
  console.log(data);
  const namecol = [];
  const valuecol = [];
  data.forEach((element) => {
    if (element.Value) {
      namecol.push(element.id);
      valuecol.push(`'${element.Value}'`);
    }
  });

  const insert = `INSERT INTO TR_CONTACT(${namecol}) values (${valuecol})`;
  console.log(insert);

  pool.query(insert, (err, result) => {
    if (err) {
      console.log(1);
      console.log(err);
      console.log(2);
      res.status(200).json({
        status: 'BAD',
        error: err,
        text: 'Привышена длина в поле каком либо поле',
      });
    } else {
      res.status(200).json({
        status: 'OK',
      });
    }
  });
};

module.exports.edit = function (req, res) {
  // console.log(req);
  res.status(200).json({
    status: 'OK',
  });
};
