import React from 'react';
import { Descriptions } from 'antd';
import moment from 'moment';
import Image from 'next/image';

const DetailVoucher = ({ initialValues }: any) => {
  console.log(initialValues);

  return (
    <div className="text-[16px]">
      <div className="mt-3">
        <span>Mã giảm giá: </span>
        <span className="text-blue-500">{initialValues.code}</span>
      </div>
      <div className="mt-3 ">
        <span>Số tiền giảm tối đa: </span>
        <span className="text-blue-500">{initialValues.maxDiscount}</span>
      </div>
      <div className="mt-3">
        <span>% giảm giá: </span>
        <span className="text-blue-500">{initialValues.percent}</span>
      </div>
      <div className=" mt-3">
        <span>Tổng số lượng: </span>
        <span className="text-blue-500">{initialValues.quantity}</span>
      </div>
      <div className="mt-3">
        <span>Đã dùng: </span>
        <span className="text-blue-500">{initialValues.countHistory}</span>
      </div>
      <div className="mt-3 ">
        <span>Số lượt áp dụng/Người: </span>
        <span className="text-blue-500">{initialValues.maxUserUse}</span>
      </div>
      <div className="mt-3">
        <span>Thời gian bắt đầu: </span>
        <span className="text-blue-500">{moment(initialValues.startTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
      <div className="mt-3">
        <span>Thời gian kết thúc: </span>
        <span className="text-blue-500">{moment(initialValues.endTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>

      <div className="mt-3">
        <span>Danh sách sản phẩm áp dụng: </span>
        {initialValues?.products?.map((item: any) => (
          <div className="my-5 flex items-center">
            <Image src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}${item.image.url}`} alt="" width={50} height={50} />
            <span className="ml-3 text-blue-500">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailVoucher;
