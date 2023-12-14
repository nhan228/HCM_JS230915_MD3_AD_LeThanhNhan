import { useEffect } from 'react';
import User from './user/User';
import { useDispatch } from 'react-redux'
import { userAction } from '@slices/user.slice'
import api from '@services/apis'

import './main.scss'

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      api.user.findMany()
        .then((res) => {
          dispatch(userAction.setData(res.data));
        })
        .catch((err) => {
          console.log("Err fetching users:", err);
        });
    } catch (err) {
      console.log("Err:", err);
    }
  }, [dispatch]);

  return (
    <>
      <User/>
    </>
  );
}

