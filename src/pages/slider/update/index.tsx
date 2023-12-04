import UpdateSlider from '@/components/Slider/components/UpdateSlider';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import React from 'react';

const SliderUpdatePage = () => {
  const { user } = useUserStore(store => store) as UserStore;
  const router = useRouter();
  return (
    <div>
      <div className="m-10 text-amber-600 font-bold flex justify-between">
        <h1>Cập Nhật SẢN PHẨM ĐỒ GIA DỤNG</h1>
        <button className="bg-orange-400 p-2 text-white" onClick={() => router.push('/slider')}>
          Quay trở lại
        </button>
      </div>
      {user ? <UpdateSlider /> : <></>}
    </div>
  );
};

export default SliderUpdatePage;
