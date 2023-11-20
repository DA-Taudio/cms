import ListSlider from '@/components/Slider';
import React from 'react';

const Slider = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-between pt-10">
        <h1 className="font-bold">TRÌNH CHIẾU</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-[#FF0097] rounded-md hover:bg-blue-700"
          style={{
            background:
              'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
          }}
        >
          + Thêm Mới
        </button>
      </div>
      <ListSlider />
    </div>
  );
};

export default Slider;
