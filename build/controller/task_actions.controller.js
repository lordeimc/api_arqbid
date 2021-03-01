const pool = require('../database');

const {
  app
} = require('../app');

const ActionActionsCtrl = {};

ActionActionsCtrl.getAllActions = async (req, res) => {
  const Actions = await pool.query('SELECT * FROM veyron_arqbid.t_project_tasks_action;'); // 

  res.send(Actions);
  console.log(Actions);
};

ActionActionsCtrl.createAction = async (req, res) => {
  const {
    id_action,
    id_task,
    description,
    serviced_at,
    created_at,
    updated_at
  } = req.body;
  const newAction = {
    id_action: null,
    id_task,
    description,
    serviced_at,
    created_at,
    updated_at
  };
  await pool.query('INSERT INTO `veyron_arqbid`.`t_project_tasks_action` SET ?', [newAction]).then(function (result) {
    sendResponse(res, "Action inserted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

ActionActionsCtrl.getAction = async (req, res) => {
  const {
    id
  } = req.params;
  const Actions = await pool.query('SELECT * FROM `veyron_arqbid`.`t_project_tasks_action` WHERE id_action = ?;', [id]);
  res.send(Actions);
  console.log(Actions);
};

ActionActionsCtrl.editAction = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_task,
    description,
    serviced_at,
    created_at,
    updated_at
  } = req.body;
  const editedAction = {
    id_task,
    description,
    serviced_at,
    created_at,
    updated_at
  };
  await pool.query('UPDATE `veyron_arqbid`.`t_project_tasks_action` SET ? WHERE `id_action` = ?;', [editedAction, id]).then(function (result) {
    sendResponse(res, "Action Updated", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

ActionActionsCtrl.deleteAction = async (req, res) => {
  const {
    id
  } = req.params;
  await pool.query("DELETE FROM `veyron_arqbid`.`t_project_tasks_action` WHERE (`id_action` = '?');", [id]).then(function (result) {
    sendResponse(res, "Action Deleted", result.insertId);
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

module.exports = ActionActionsCtrl;