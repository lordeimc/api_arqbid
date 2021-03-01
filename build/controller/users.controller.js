const pool = require('../database');

const productCtrl = {};

productCtrl.getUsers = async (req, res) => {
  const Users = await pool.query('SELECT * FROM veyron_arqbid.t_v_Users_active WHERE User_active = true;');
  res.send(Users);
  console.log(Users);
};

productCtrl.createUser = async (req, res) => {
  const {
    id_User_type,
    id_User_client,
    id_User_contractor,
    User_name,
    User_registration,
    User_start,
    User_end,
    User_code,
    User_manager,
    User_details,
    User_active,
    User_status,
    User_budget,
    client_name,
    User_location,
    advance_payment,
    contractor_name,
    User_area,
    User_type_d
  } = req.body;
  const newUser = {
    id_User: null,
    id_User_type,
    id_User_client,
    id_User_contractor,
    User_name,
    User_registration,
    User_start,
    User_end,
    User_code,
    User_manager,
    User_details,
    User_active,
    User_status,
    User_budget,
    client_name,
    User_location,
    advance_payment,
    contractor_name,
    User_area,
    User_type_d
  };
  await pool.query('INSERT INTO t_Users set ?', [newUser]).then(function (result) {
    sendResponse(res, "User inserted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
  res.send('message: User Created...'); //console.log(req.body);
};

productCtrl.getUser = async (req, res) => {
  const {
    id
  } = req.params;
  const Users = await pool.query('SELECT * FROM veyron_arqbid.t_v_Users_active WHERE User_active = true AND id_User = ?;', [id]);
  res.send(Users);
  console.log(Users);
};

productCtrl.editUser = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_User_type,
    id_User_client,
    id_User_contractor,
    User_name,
    User_registration,
    User_start,
    User_end,
    User_code,
    User_manager,
    User_details,
    User_active,
    User_status,
    User_budget,
    client_name,
    User_location,
    advance_payment,
    contractor_name,
    User_area,
    User_type_d
  } = req.body;
  const editedUser = {
    id_User_type,
    id_User_client,
    id_User_contractor,
    User_name,
    User_registration,
    User_start,
    User_end,
    User_code,
    User_manager,
    User_details,
    User_active,
    User_status,
    User_budget,
    client_name,
    User_location,
    advance_payment,
    contractor_name,
    User_area,
    User_type_d
  };
  await pool.query('UPDATE `veyron_arqbid`.`t_Users` SET ? WHERE `id_User` = ?;', [editedUser, id]).then(function (result) {
    sendResponse(res, "User Updated", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

productCtrl.deleteUser = async (req, res) => {
  const {
    id
  } = req.params; //DELETE FROM veyron_arqbid.t_Users WHERE id_User = ?;

  await pool.query("UPDATE `veyron_arqbid`.`t_Users` SET `User_active` = '0' WHERE `id_User` = ?;", [id]).then(function (result) {
    sendResponse(res, "User Deleted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

function sendResponse(res, action, tid, error) {
  if (action == "error") console.log(error);
  var result = {
    action: action
  };
  if (tid !== undefined && tid !== null) result.tid = tid;
  res.send(result);
}

module.exports = productCtrl;