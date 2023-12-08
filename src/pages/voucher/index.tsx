import Voucher from '@/components/Voucher';
import useUserStore, { UserStore } from '@/store/useUserStore';
import React from 'react';

const VoucherPage = () => {
  const { user } = useUserStore(store => store) as UserStore;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-10 pl-0 text-black font-bold">
        <h1>DANH SÁCH MÃ GIẢM GIÁ</h1>
      </div>
      {user ? <Voucher /> : <></>}
    </div>
  );
};

export default VoucherPage;
