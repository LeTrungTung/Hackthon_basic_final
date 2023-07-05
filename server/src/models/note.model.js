const sql = require("../db/db.connect");

const modelGetAllNote = (res) => {
  let query = `SELECT * FROM noteApp`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};
const modelGetNoteById = (id, res) => {
  let query = `SELECT * FROM noteApp WHERE id=${id}`;

  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};

const modelPostNote = (newNote, res) => {
  // Kiểm tra note đã tồn tại trong CSDL chưa
  const checkNoteQuery = `SELECT * FROM noteApp WHERE noteContent = ?`;
  sql.query(checkNoteQuery, [newNote.noteContent], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({ message: "Note already exists" });
      return;
    }
    // nếu chưa có note thì cho thêm mới
    const insertData = `INSERT INTO noteApp SET ?`;
    sql.query(insertData, newNote, (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      res.status(200).json({ msg: "Thêm mới Note thành công" });
    });
  });
};

const modelDeleteNote = (id, res) => {
  // Kiểm tra id đã tồn tại trong CSDL chưa
  const checkIdNote = `SELECT * FROM noteApp WHERE id= ?`;
  sql.query(checkIdNote, [id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "Note not found" });
      return;
    }
    // nếu tìm thấy id thì tiến hành xoá dữ liệu trong noteApp
    const deleteNote = `DELETE FROM noteApp WHERE id = ?;`;
    sql.query(deleteNote, [id], (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      res.status(200).json({ message: "Note deleted successfully" });
    });
  });
};

module.exports = {
  modelGetAllNote,
  modelGetNoteById,
  modelPostNote,
  modelDeleteNote,
};
