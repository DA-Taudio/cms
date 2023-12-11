import Voucher from '@/components/Voucher';
import { FormVoucher } from '@/components/Voucher/components/formVoucher';
import useCreateVoucher from '@/components/Voucher/hook/useCreateVoucher';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const VoucherPage = () => {
  const { user } = useUserStore(store => store) as UserStore;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleCreateVoucher, CreateVoucherLoading } = useCreateVoucher();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col min-h-screen text-black">
      <div className="flex justify-between pt-10 mb-7 font-bold">
        <h1>DANH SÁCH MÃ GIẢM GIÁ</h1>
        <button
          className=" px-4 py-2 bg-blue-500 text-[#FF0097] rounded-md hover:bg-blue-700"
          style={{
            background:
              'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
          }}
          onClick={showModal}
        >
          + Thêm Mới
        </button>
      </div>
      {user ? <Voucher /> : <></>}
      <Modal title="TẠO MỚI MÃ GIẢM GIÁ" open={isModalOpen} width={700} footer={null} onCancel={handleCancel}>
        <FormVoucher onOk={handleOk} onCancel={handleCancel} handle={handleCreateVoucher} />
      </Modal>
    </div>
  );
};

export default VoucherPage;
