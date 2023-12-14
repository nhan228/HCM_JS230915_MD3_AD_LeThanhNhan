import api from '@services/apis';
import { userAction } from "@slices/user.slice";
import { Modal } from 'antd';

export default function CreateForm({ dispatch }) {
  // Create
  async function handleCreateUser(e) {
    e.preventDefault();
    try {
      let newUser = {
        name: e.target.name.value,
        des: e.target.des.value,
      };

      let result = await api.user.create(newUser);

      Modal.success({
        title: 'Thông Báo',
        content: `Tạo Student "${result.data.name}" thành công`,
        onOk: () => {
          dispatch(userAction.addUser(result.data));
          dispatch(userAction.createForm());
        },
      });
    } catch (err) {
      Modal.error({
        title: 'Thông Báo',
        content: `Tạo mới Student không thành công`,
        onOk: () => {
          dispatch(userAction.createForm());
        },
      });
      console.log('Lỗi không tạo được', err);
    }
  }

  return (
    <>
      <div className='create_form'> 
        <form onSubmit={handleCreateUser}>
          <div className='create_box'> 
            <div className='btn_box'> 
              <h2>Create a new Student</h2>
              <button onClick={() => {dispatch(userAction.createForm())}} type='button' className='btn btn-danger'>X</button>
            </div>

            <label>Name:</label>
            <input type="text" name="name" />

            <label>Description:</label>
            <textarea type="text" name="des" />

            <button type="submit" className="btn btn-success">Create</button>
          </div>
        </form>
      </div>
    </>
  );
}
