//Import Modal

const noteModel = require("../models/note.model");

const getAllNote = (req, res) => {
  // do something
  noteModel.modelGetAllNote(res);
};
const getNoteById = (req, res) => {
  // do something
  const id = req.params.id;
  noteModel.modelGetNoteById(id, res);
};

const postNote = (req, res) => {
  if (!req.body) return;
  const newNote = ({ noteContent } = req.body);
  noteModel.modelPostNote(newNote, res);
};

const deleteNote = (req, res) => {
  // do something
  const id = req.params.id;
  noteModel.modelDeleteNote(id, res);
};

module.exports = {
  getAllNote,
  getNoteById,
  postNote,
  deleteNote,
};
