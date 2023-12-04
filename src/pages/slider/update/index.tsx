import UpdateSlider from '@/components/Slider/components/UpdateSlider';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import React from 'react';

const SliderUpdatePage = () => {
  const { user } = useUserStore(store => store) as UserStore;
  const router = useRouter();
  return (
    <div className="h-screen">
      <div className="py-10 text-black font-bold flex justify-between">
        <h1>CẬP NHẬT SLIDER</h1>

        <button
          className="px-4 py-2 bg-blue-500 text-[#FF0097] rounded-md hover:bg-blue-700"
          style={{
            background:
              'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
          }}
          onClick={() => router.push('/slider')}
        >
          Quay trở lại
        </button>
      </div>
      {user ? <UpdateSlider /> : <></>}
    </div>
  );
};

export default SliderUpdatePage;
