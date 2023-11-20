import React, { useState } from 'react';
import { useListType } from '../../services/hook/useListType';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useCreateType from '../../services/hook/useCreateType';
import useDeleteType from '../../services/hook/useDeleteType';

const ProductType = () => {
  const { listType } = useListType();
  const { handleCreateType, isLoading } = useCreateType();
  const [nameType, setNameType] = useState('');
  const { handleDeleteType } = useDeleteType();
  return (
    <div className="container mx-auto flex-col">
      <div className="my-4 ">
        <input
          type="text"
          className="px-4 py-2 w-80 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Nhập tên loại"
          value={nameType}
          onChange={e => setNameType(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-[#FF0097] rounded-md hover:bg-blue-700"
          onClick={() => {
            handleCreateType({ name: nameType.toUpperCase() }), setNameType('');
          }}
          style={{
            background:
              'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
          }}
        >
          {isLoading ? 'Đang Thêm...' : '+ Thêm Mới'}
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-black text-white">Danh Sách Loại Sản Phẩm</th>
            <th className="px-4 py-2 bg-black  text-white">Xoá</th>
          </tr>
        </thead>
        <tbody>
          {listType.map((item, index) => (
            <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-4 py-2 text-center">{item.name}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá bản ghi này?');
                    if (confirmDelete) {
                      handleDeleteType({ typeId: item._id });
                    }
                  }}
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductType;
