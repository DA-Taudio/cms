import Messager from '@/components/Messager';
import React from 'react';

const MessagerPage = () => {
  return (
    <div>
      <div className="p-10 pl-0 text-black font-bold">
        <h1>TIN NHẮN CỦA KHÁCH HÀNG</h1>
        <Messager />
      </div>
    </div>
  );
};

export default MessagerPage;
