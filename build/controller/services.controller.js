const pool = require('../database');

const serviceCtrl = {};

serviceCtrl.getServices = async (req, res) => {
  const Services = await pool.query('SELECT * FROM veyron_arqbid.t_v_services_active WHERE active = true;');
  res.send(Services);
  console.log(Services);
};

serviceCtrl.createService = async (req, res) => {
  const {
    id,
    name,
    switch_no,
    img_url,
    active
  } = req.body;
  const newService = {
    id: null,
    name,
    switch_no,
    img_url,
    active
  };
  await pool.query('INSERT INTO veyron_arqbid.t_services SET ?', [newService]).then(function (result) {
    sendResponse(res, "Service inserted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
  res.send('message: Service Created...'); //console.log(req.body);
};

serviceCtrl.getService = async (req, res) => {
  const {
    id
  } = req.params;
  const Services = await pool.query('SELECT * FROM veyron_arqbid.t_v_services_active WHERE active = true AND id = ?;', [id]);
  res.send(Services);
  console.log(Services);
};

serviceCtrl.editService = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    switch_no,
    img_url,
    active
  } = req.body;
  const editedService = {
    name,
    switch_no,
    img_url,
    active
  };
  await pool.query('UPDATE veyron_arqbid.t_services SET ? WHERE `id` = ?;', [editedService, id]).then(function (result) {
    sendResponse(res, "Service Updated", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

serviceCtrl.deleteService = async (req, res) => {
  const {
    id
  } = req.params; //DELETE FROM veyron_arqbid.t_Services WHERE id_Service = ?;

  await pool.query("UPDATE `veyron_arqbid`.`t_Services` SET `Service_active` = '0' WHERE `id_Service` = ?;", [id]).then(function (result) {
    sendResponse(res, "Service Deleted", result.insertId);
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

module.exports = serviceCtrl;