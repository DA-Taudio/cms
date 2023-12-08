import { PaginationProps, Table } from 'antd';
import React from 'react';
import { useListVoucher } from './hook/useListVoucher';

const Voucher = () => {
  const pagination: PaginationProps = {
    pageSize: 1
  };
  const { listVoucher, isLoading } = useListVoucher({
    pagination: {
      limit: 1000,
      page: 1
    }
  });

  const dataSource = [
    {
      key: '1',
      code: 'VOUCHER123',
      percent: 10,
      maxDiscount: 100,
      maxUserUse: 50,
      startTime: '2023-01-01',
      endTime: '2023-12-31'
    },
    {
      key: '2',
      code: 'DISCOUNT50',
      percent: 50,
      maxDiscount: 200,
      maxUserUse: 100,
      startTime: '2023-03-01',
      endTime: '2023-06-30'
    }
    // Add more voucher objects as needed
  ];

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Phần trăm giảm giá',
      dataIndex: 'percent',
      key: 'percent'
    },
    {
      title: 'Số tiền giảm giá tối đa',
      dataIndex: 'maxDiscount',
      key: 'maxDiscount'
    },
    {
      title: 'Số lượt áp dụng/Người',
      dataIndex: 'maxUserUse',
      key: 'maxUserUse'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime'
      //   render:(endTime, record, index)=>{
      //     return <></>
      //   }
    }
  ];
  return (
    <div>
      <Table dataSource={listVoucher} columns={columns} pagination={pagination} />
    </div>
  );
};

export default Voucher;
