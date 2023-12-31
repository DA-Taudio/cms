import useUserStore, { UserStore } from '@/store/useUserStore';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useLogin from './services/hooks/useLogin';
import { useRouter } from 'next/router';
import Notification from '../Notification';
const AuthModal = () => {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmitLogin, isLoading } = useLogin();

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSubmitLogin({ userName, password });
  };

  return (
    <div
      className="absolute w-full flex align-middle bg-black bg-opacity-80 z-50 top-0  left-0 right-0 bottom-0"
      style={{
        backgroundImage: '/images/logo2.png'
      }}
    >
      {' '}
      <div className="bg-white w-[500px] rounded-md  m-auto p-12 pt-14 flex flex-col">
        {/* <div>
          <button
            className="text-2xl mb-14 float-right "
            onClick={() => {
              router.push('/');
              Notification.Info('Vui lòng đăng nhập tài khoản !');
            }}
          >
            <FaTimes />
          </button>
        </div> */}
        <h1 className="text-2xl text-blue-600">Quản Trị Viên </h1>{' '}
        <form onSubmit={handleSubmit}>
          {' '}
          <div className="form-group mt-10 flex flex-col justify-between">
            <label className="p-2 pl-0 text-lg">Tài Khoản</label>
            <input
              type="text"
              className="rounded-md w-full p-2 border border-black form-control"
              value={userName}
              onChange={handleUserNameChange}
              required
              placeholder="Nhập tài khoản"
            />{' '}
          </div>{' '}
          <div className="form-group mt-5 flex flex-col justify-between">
            <label className="p-2 pl-0 text-lg">Mật Khẩu</label>{' '}
            <input
              type="password"
              className="rounded-md w-full border border-black p-2 form-control"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Nhập mật khẩu"
            />{' '}
          </div>{' '}
          <button
            className="  w-full mt-20  mb-0   text-white font-bold py-3 px-4 border  rounded-md"
            style={{
              background: 'linear-gradient(298deg,#00daff,#802bc3 38%,#ff0097 62%,#f6a01a)'
            }}
          >
            {isLoading ? 'Đang Đăng nhập...' : 'Đăng Nhập'}
          </button>{' '}
        </form>{' '}
      </div>
    </div>
  );
};
export default AuthModal;
