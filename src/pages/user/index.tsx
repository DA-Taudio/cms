import User from '@/components/User';
import useUserStore, { UserStore } from '@/store/useUserStore';
import React from 'react';

const UserPage = () => {
  const { user } = useUserStore(store => store) as UserStore;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-10 pl-0 text-black font-bold">
        <h1>DANH SÁCH KHÁCH HÀNG</h1>
      </div>
      {user ? <User /> : <></>}
    </div>
  );
};

export default UserPage;
