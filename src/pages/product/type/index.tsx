import ProductType from '@/components/Product/components/TypeProduct';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ProductTypePage = () => {
  const { user } = useUserStore(store => store) as UserStore;
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <div className="pt-10 text-black  flex justify-between ">
        <h1 className="font-bold">PHÂN LOẠI SẢN PHẨM</h1>

        <button
          className="px-4 py-2 bg-blue-500 text-[#FF0097] rounded-md hover:bg-blue-700"
          onClick={() => router.push('/product/add')}
          style={{
            background:
              'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
          }}
        >
          Quay trở lại
        </button>
      </div>
      {user ? <ProductType /> : <></>}
    </div>
  );
};

export default ProductTypePage;
