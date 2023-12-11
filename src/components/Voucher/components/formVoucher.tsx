import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { useListProduct } from '@/components/Product/services/hook/useListProduct';
import Image from 'next/image';
const { RangePicker } = DatePicker;

interface FormVoucherProps {
  onOk: () => void;
  onCancel: () => void;
  initialValues?: any;
  handle: (values: any) => void;
}

export const FormVoucher: React.FC<FormVoucherProps> = ({ onOk, onCancel, initialValues, handle }) => {
  const { listProduct, isLoading } = useListProduct({
    pagination: {
      limit: 1000,
      page: 1
    }
  });
  const [form] = Form.useForm();
  const { Option } = Select;
  const validateTime = (_: any, value: any) => {
    const currentTime = new Date();

    if (value && new Date(value[0]) < currentTime) {
      return Promise.reject(new Error('Thời gian bắt đầu phải lớn hơn thời gian hiện tại'));
    }

    if (value && new Date(value[1]) <= new Date(value[0])) {
      return Promise.reject(new Error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu'));
    }
    return Promise.resolve();
  };

  const validateCode = (_: any, value: any) => {
    const codeRegex = /^[A-Za-z0-9]{6,8}$/;
    if (value && !codeRegex.test(value)) {
      return Promise.reject(
        new Error(
          'Mã giảm giá có 6 đến 8 ký tự, chỉ bao gồm chữ cái (viết hoa hoặc viết thường) và chữ số, không được chứa ký tự đặc biệt!'
        )
      );
    }
    return Promise.resolve();
  };

  const handleSubmit = (values: any) => {
    const { timeRange, ...input } = values;
    handle({
      ...input,
      ...(initialValues?._id && { _id: initialValues._id }),
      startTime: new Date(timeRange[0]).toISOString(),
      endTime: new Date(timeRange[1]).toISOString()
    });
    form.resetFields();
    onOk();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const filterOption = (input: any, option: any) => {
    const name = option?.props?.children?.props?.children[1]?.props?.children;
    return name.toLowerCase().includes(input.toLowerCase());
  };

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    return (
      <div className="ant-select-tag text-xs flex">
        {label}
        {closable && (
          <span onClick={onClose} className="ant-select-tag-close-icon text-xl text-blue-500 hover:cursor-pointer">
            ×
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{
          ...initialValues,
          ...(initialValues && { timeRange: [moment(initialValues?.startTime), moment(initialValues?.endTime)] })
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        className="mt-5"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Mã giảm giá:"
          name="code"
          rules={[{ type: 'string', required: true, message: 'Vui lòng không bỏ trống!' }, { validator: validateCode }]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          label="Thời gian diễn ra"
          name="timeRange"
          rules={[{ type: 'array', required: true, message: 'Vui lòng không bỏ trống!' }, { validator: validateTime }]}
        >
          <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" className="w-full" />
        </Form.Item>
        <Form.Item
          label="% giảm giá"
          name="percent"
          rules={[{ type: 'number', required: true, message: 'Vui lòng không bỏ trống!' }]}
        >
          <InputNumber className="w-full" min={1} max={100} />
        </Form.Item>
        <Form.Item
          label="Số tiền giảm tối đa"
          name="maxDiscount"
          rules={[{ type: 'number', required: true, message: 'Vui lòng không bỏ trống!' }]}
        >
          <InputNumber className="w-full" min={1} />
        </Form.Item>
        <Form.Item
          label="Số lượng mã giảm giá"
          name="quantity"
          rules={[{ type: 'number', required: true, message: 'Vui lòng không bỏ trống!' }]}
        >
          <InputNumber className="w-full" min={1} />
        </Form.Item>

        <Form.Item
          label="Số lượt sử dụng/Người"
          name="maxUserUse"
          rules={[{ type: 'number', required: true, message: 'Vui lòng không bỏ trống!' }]}
        >
          <InputNumber className="w-full" min={1} />
        </Form.Item>
        <Form.Item
          label="Danh sách sản phẩm"
          name="productIds"
          rules={[{ required: true, message: 'Vui lòng chọn ít nhất một sản phẩm' }]}
        >
          <Select mode="multiple" placeholder="Chọn sản phẩm..." filterOption={filterOption} tagRender={tagRender}>
            {listProduct?.products?.map(item => (
              <Option value={item._id}>
                <div className="flex items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}${item?.image?.url}`}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <span>{item?.name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className=" flex mt-8">
            <Button
              type="primary"
              htmlType="submit"
              className=" px-4 py-2 bg-blue-500 text-[#FF0097] rounded-md hover:bg-blue-700 flex items-center"
              style={{
                background:
                  'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
              }}
            >
              Đồng ý
            </Button>

            <Button className="text-[#FF0097] ml-5 bg-slate-100" onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
