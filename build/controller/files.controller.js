const pool = require('../database');

const FileCtrl = {};

FileCtrl.getAllFiles = async (req, res) => {
  const Files = await pool.query('SELECT * FROM veyron_arqbid.t_trs_files_project;'); // 

  res.send(Files);
  console.log(Files);
};

FileCtrl.createFile = async (req, res) => {
  const {
    id_file,
    id_project,
    id_task,
    id_userUploaded,
    active,
    deleted_by,
    name,
    file_path,
    mime,
    size,
    md5_file
  } = req.body;
  const newFile = {
    id_file: null,
    id_project,
    id_task,
    id_userUploaded,
    active,
    deleted_by,
    name,
    file_path,
    mime,
    size,
    md5_file
  };
  await pool.query('INSERT INTO `veyron_arqbid`.`t_trs_files_project` set ?', [newFile]).then(function (result) {
    sendResponse(res, "File inserted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
  res.send('message: File Created...'); //console.log(req.body);
};

FileCtrl.getFile = async (req, res) => {
  const {
    id_file
  } = req.params;
  const Files = await pool.query('SELECT * FROM `veyron_arqbid`.`t_trs_files_project` WHERE id_file = ?;', [id_file]);
  res.send(Files);
  console.log(Files);
};

FileCtrl.editFile = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_project,
    id_task,
    id_userUploaded,
    active,
    deleted_by,
    name,
    file_path,
    mime,
    size,
    md5_file
  } = req.body;
  const editedFile = {
    id_project,
    id_task,
    id_userUploaded,
    active,
    deleted_by,
    name,
    file_path,
    mime,
    size,
    md5_file
  };
  await pool.query('UPDATE `veyron_arqbid`.`t_trs_files_project` SET ? WHERE `id_file` = ?;', [editedFile, id]).then(function (result) {
    sendResponse(res, "File Updated", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

FileCtrl.deleteFile = async (req, res) => {
  const {
    id
  } = req.params; //DELETE FROM veyron_arqbid.t_Files WHERE id_File = ?;

  await pool.query("UPDATE `veyron_arqbid`.`t_trs_files_project` SET `active` = '0' WHERE `id_file` = ?;", [id]).then(function (result) {
    sendResponse(res, "File Deleted", result.insertId);
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

module.exports = FileCtrl;