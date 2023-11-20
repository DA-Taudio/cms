import ProductType from '@/components/Product/components/TypeProduct';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ProductTypePage = () => {
  const { user } = useUserStore(store => store) as UserStore;
  const router = useRouter();
  return (
    <div>
      <div className="pt-10 text-black font-bold flex justify-between">
        <h1>PHÂN LOẠI SẢN PHẨM</h1>
        <button className="bg-orange-400 p-2 text-white flex items-center" onClick={() => router.push('/product/add')}>
          <ArrowLeftOutlined className="pr-2" /> Quay trở lại
        </button>
      </div>
      {user ? <ProductType /> : <></>}
    </div>
  );
};

export default ProductTypePage;
