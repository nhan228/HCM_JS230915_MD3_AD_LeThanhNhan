import { useState } from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "@slices/user.slice";
import CreateForm from "./addModal/Create";
import UpdateForm from "./addModal/Update";
import DeleteForm from "./addModal/Delete";

import "./user.scss";

export default function User() {
  const dispatch = useDispatch();
  const userStore = useSelector(store => store.userStore);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const randomId = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  const handleSortById = () => {
    const sortedData = [...userStore.data].sort((a, b) => {
      if (sortDirection == "asc") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
    dispatch(userAction.setData(sortedData));
    setSortDirection(sortDirection == "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="ModalForm">
        {userStore.addCreateForm && <CreateForm dispatch={dispatch} />}
        {userStore.addUpdateForm && selectedUserId && (
          <UpdateForm
            dispatch={dispatch}
            userId={selectedUserId}
            initValues={{
              name: userStore.data.find(user => user.id == selectedUserId)?.name || '',
              des: userStore.data.find(user => user.id == selectedUserId)?.des || '',
            }}
          />
        )}
        {userStore.addDeleteForm && selectedUserId && <DeleteForm dispatch={dispatch} userId={selectedUserId} userName={userStore.data.find(user => user.id == selectedUserId)?.name} />}

      </div>
      <div className="TableForm">
        <div className="Button-create">
          <button onClick={() => { dispatch(userAction.createForm()) }} className="btn btn-success">Create Student</button>
        </div>

        <h2>Student List</h2>

        <Table>
          <thead>
            <tr>
              <th onClick={handleSortById} style={{ cursor: 'pointer' }}>ID {sortDirection == "asc" ? "▲" : "▼"}</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userStore.data?.map((student) => (
              <tr key={randomId()}>
                <td style={{ textAlign: 'center' }}>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.des}</td>
                <td style={{ display: 'flex', justifyContent: "center" }}>
                  <button onClick={() => { setSelectedUserId(student.id); dispatch(userAction.updateForm()) }} className='btn btn-primary' style={{ marginRight: '20px' }}>Update</button>
                  <button onClick={() => { setSelectedUserId(student.id); dispatch(userAction.deleteForm()) }} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}