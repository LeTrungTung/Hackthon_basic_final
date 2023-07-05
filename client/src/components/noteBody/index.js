import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosCreate";
import { Button, Container, Table } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./index.css";

const NoteBody = () => {
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState("");
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("api/v1/notes");
      console.log(2222, response);
      setNotes(response.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/v1/notes", {
        noteContent: data,
      });
      setData("");
      fetchData();
      // console.log(2222, response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`api/v1/notes/${id}`);
      // Xoá thành công, tiến hành tải lại danh sách blog
      fetchData();
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label id="title" htmlFor="">
          Title
        </label>
        <br />
        <input
          id="ip-value"
          value={data}
          type="text"
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <button type="submit" id="id-add">
          +
        </button>
      </form>
      <br />
      {notes.length > 0 &&
        notes?.map((note, index) => (
          <span key={index} className="cls-note">
            <span>{note.noteContent}</span>
            {/* <button>Delete</button> */}
            <Button
              id="btn-delete"
              onClick={() => handleDelete(note.id)}
            >
              <RiDeleteBin5Line />
            </Button>
          </span>
        ))}
    </div>
  );
};

export default NoteBody;
