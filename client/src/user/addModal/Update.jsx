import { useState } from 'react';
import api from '@services/apis';
import { userAction } from "@slices/user.slice";
import { Modal } from 'antd';

export default function UpdateForm({ dispatch, userId, initValues }) {
  const [name, setName] = useState(initValues.name || ''); 
  const [des, setDes] = useState(initValues.des || ''); 

  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    if (field == 'name') {
      setName(newValue);
    } else if (field == 'des') {
      setDes(newValue);
    }
  };
  // Update
  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      let updatedUser = {
        name,
        des
      };

      let result = await api.user.update(userId, updatedUser);
      Modal.success({
        title: 'Thông Báo',
        content: `Cập nhật Student thành công`,
        onOk: () => {
          dispatch(userAction.updatedUser({ id: userId, data: result.data.updatedUser }));
          dispatch(userAction.updateForm());
        },
      });
    } catch (err) {
      Modal.error({
        title: 'Thông Báo',
        content: `Cập nhật Student không thành công`,
        onOk: () => {
          dispatch(userAction.updateForm());
        },
      });
      console.log('Lỗi không cập nhật được', err);
    }
  }

  return (
    <>
      <div className='update_form'>
        <form onSubmit={handleUpdateUser}>
          <div className='update_box'>
            <div className='btn_box'>
              <h2>Update Student</h2>
              <button onClick={() => { dispatch(userAction.updateForm())}} type='button' className='btn btn-danger'>X</button>
            </div>

            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={(e) => handleInputChange(e, 'name')} />

            <label>Description:</label>
            <textarea type="text" name="des" value={des} onChange={(e) => handleInputChange(e, 'des')} />

            <button type="submit" className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}