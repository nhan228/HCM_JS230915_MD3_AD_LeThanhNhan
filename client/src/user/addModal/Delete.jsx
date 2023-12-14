import api from '@services/apis';
import { userAction } from "@slices/user.slice";
import { Modal } from 'antd';

export default function DeleteForm({ dispatch, userId, userName }) {
  // Delete
  async function handleDeleteUser() {
    try {
      await api.user.delete(userId);

      Modal.success({
        title: 'Thông Báo',
        content: `Xóa Student "${userName}" thành công`,
        onOk: () => {
          dispatch(userAction.deleteUser(userId));
          dispatch(userAction.updateForm());
        },
      });
    } catch (err) {
      Modal.error({
        title: 'Thông Báo',
        content: `Xóa Student "${userName}" không thành công`,
        onOk: () => {
          dispatch(userAction.updateForm());
        },
      });
      console.log('Lỗi không xóa được', err);
    }
  }

  return (
    <>
      <div className='create_form'>
        <form onSubmit={handleDeleteUser}>
          <div className='create_box'>
            <div className='btn_box'>
              <h2>Delete student "{userName}"</h2>
              <button onClick={() => { dispatch(userAction.deleteForm()) }} type='button' className='btn btn-danger'>X</button>
            </div>
            <p>Are you sure you want to delete student?</p>
            <button type="submit" className="btn btn-success">Delete</button>
          </div>
        </form>
      </div>
    </>
  );
}
