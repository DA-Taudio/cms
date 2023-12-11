import { Button, Modal, PaginationProps, Popconfirm, Space, Table } from 'antd';
import React, { useState } from 'react';
import { useListVoucher } from './hook/useListVoucher';
import moment from 'moment';
import { formatCurrency } from '@/utils/format-currency';
import { EyeOutlined } from '@ant-design/icons';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import useDeleteVoucher from './hook/useDeleteVoucher';
import { FormVoucher } from './components/formVoucher';
import useUpdateVoucher from './hook/useUpdateVoucher';
import DetailVoucher from './components/detailVoucher';

const Voucher = () => {
  const pagination: PaginationProps = {
    pageSize: 10
  };
  const { listVoucher, isLoading } = useListVoucher({
    pagination: {
      limit: 1000,
      page: 1
    }
  });
  const { handleDeleteVoucher } = useDeleteVoucher();
  const { handleUpdateVoucher } = useUpdateVoucher();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({});

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDetailOk = () => {
    setIsModalDetailOpen(false);
  };

  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Tổng Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Đã Sử Dụng',
      dataIndex: 'countHistory',
      key: 'countHistory'
    },
    {
      title: '% giảm giá',
      dataIndex: 'percent',
      key: 'percent'
    },
    {
      title: 'Số tiền giảm giá tối đa',
      dataIndex: 'maxDiscount',
      key: 'maxDiscount',
      render: (maxDiscount: any) => <span>{formatCurrency(maxDiscount)}</span>
    },
    {
      title: 'Số lượt áp dụng/Người',
      dataIndex: 'maxUserUse',
      key: 'maxUserUse'
    },
    {
      title: 'Số sản phẩm áp dụng',
      dataIndex: 'productIds',
      key: 'productIds',
      render: (productIds: any) => <span>{productIds.length}</span>
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime: any) => <span>{moment(startTime).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime: any) => <span>{moment(endTime).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: 'Tác vụ',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle" className="text-lg ">
          <Button
            className="flex items-center py-2 px-2"
            onClick={() => {
              setInitialValues(record);
              setIsModalDetailOpen(true);
            }}
          >
            <EyeOutlined className="text-green-500" />
          </Button>
          <Button
            className="flex items-center py-2 px-2"
            onClick={() => {
              setInitialValues(record);
              setIsModalOpen(true);
            }}
          >
            <AiFillEdit className="text-blue-500" />
          </Button>

          <Popconfirm
            className="confirm"
            title="Are you sure to delete this voucher?"
            onConfirm={() => handleDeleteVoucher({ _id: record._id.toString() })}
            okText="Yes"
            cancelText="No"
          >
            <Button className="flex items-center py-2 px-2">
              <AiFillDelete className=" text-red-500" />
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  return (
    <div>
      <Table dataSource={listVoucher} columns={columns} pagination={pagination} />
      <Modal title="CHỈNH SỬA MÃ GIẢM GIÁ" open={isModalOpen} width={700} footer={null} onCancel={handleCancel}>
        <FormVoucher
          onOk={handleOk}
          onCancel={handleCancel}
          initialValues={initialValues}
          handle={handleUpdateVoucher}
        />
      </Modal>

      <Modal
        title="CHI TIẾT MÃ GIẢM GIÁ"
        open={isModalDetailOpen}
        width={700}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
      >
        <DetailVoucher initialValues={initialValues} />
      </Modal>
    </div>
  );
};

export default Voucher;
