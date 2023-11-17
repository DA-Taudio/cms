import AddProduct from '@/components/Product/components/AddProduct';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import React from 'react';

const ProductAddPage = () => {
  const { user } = useUserStore(store => store) as UserStore;
  const router = useRouter();
  return (
    <div>
      <div className="m-10 text-amber-600 font-bold flex justify-between">
        <h1>THÊM SẢN PHẨM ĐỒ GIA DỤNG</h1>
        <button className="bg-orange-400 p-2 text-white" onClick={() => router.push('/product')}>
          Quay trở lại
        </button>
      </div>
      {user ? <AddProduct /> : <></>}
    </div>
  );
};

export default ProductAddPage;
