import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useListProduct } from './services/hook/useListProduct';
import Link from 'next/link';
import { RiAddLine } from 'react-icons/ri';
import Image from 'next/image';
import { LoadingCenter } from '../Loading';
import useProductStore, { ProductStore } from '@/store/useProductStore';
import { useRouter } from 'next/router';
import useDeleteProduct from './services/hook/useDeleteProduct';
import { MdVisibility } from 'react-icons/md';
import ModalConfirm from '../ModalConfirm';
const customStyles = {
  cells: {
    style: {
      fontSize: '16px',
      padding: '4px 15px'
    }
  },
  headRow: {
    style: {
      backgroundColor: '#E2E8F0',
      color: '#777E90',
      fontWeight: 'bold'
    }
  },
  headCells: {
    style: {
      fontSize: '16px'
    }
  }
};
const Product = () => {
  const { listProduct, isLoading } = useListProduct({
    pagination: {
      limit: 1000,
      page: 1
    }
  });
  const { handleDeleteProduct } = useDeleteProduct();
  const { setProductId } = useProductStore(store => store as ProductStore);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [prop, setProp] = useState<any>({});
  const [id, setId] = useState<any>();
  const router = useRouter();
  const columns = [
    // { name: 'Id', selector: (row: any) => row._id },
    {
      name: 'Hình ảnh',
      cell: (row: any) => (
        <Image src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}${row.image.url}`} alt="" width={70} height={90} />
      )
    },
    { name: 'Tên Sản Phẩm', selector: (row: any) => row.name, sortable: true },
    {
      name: 'Ngày Cập Nhật',
      selector: (row: any) => {
        const updatedAt = new Date(row.updatedAt);
        const options = { timeZone: 'UTC' };
        updatedAt.setUTCHours(updatedAt.getUTCHours() + 7); // Thêm 7 giờ để chuyển đổi múi giờ
        const localDateTime = updatedAt.toLocaleString('en-US', options);
        return localDateTime;
      },
      sortable: true
    },
    // {
    //   name: 'Ngày Tạo',
    //   selector: (row: any) => {
    //     const createdAt = new Date(row.createdAt);
    //     const options = { timeZone: 'UTC' };
    //     createdAt.setUTCHours(createdAt.getUTCHours() + 7); // Thêm 7 giờ để chuyển đổi múi giờ
    //     const localDateTime = createdAt.toLocaleString('en-US', options);
    //     return localDateTime;
    //   },
    //   sortable: true
    // },
    {
      name: 'Tác Vụ',
      cell: (row: any) => (
        <div className="flex">
          <Link href={`/product/${row._id}`} className="text-2xl mr-3 edit-icon">
            <MdVisibility />
          </Link>
          <button className="mr-5" onClick={() => handleEdit(row)}>
            <AiFillEdit className="edit-icon" />
          </button>
          <button
            onClick={() => {
              setId(row._id);
              setIsOpen(true);
              setProp({
                title: 'XÁC NHẬN',
                content: 'Bạn có chắc chắn xoá sản phẩm này?'
              });
            }}
          >
            <AiFillDelete className="edit-icon" />
          </button>
        </div>
      )
    }
  ];

  const [records, setRecords] = useState(listProduct.products);
  useEffect(() => {
    setRecords(listProduct.products);
  }, [isLoading, listProduct]);
  const handleFilter = (e: any) => {
    const newData = listProduct?.products?.filter(row =>
      row.name?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const handleEdit = (row: any) => {
    setProductId(row._id);
    router.push('/product/update');
  };

  const handleDelete = () => {
    handleDeleteProduct({ productId: id });
    setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-10">
        <input
          className="pl-5 w-2/4 rounded-md outline-none border border-gray-500"
          type="text"
          placeholder="Tìm kiếm..."
          onChange={handleFilter}
        />
        <Link
          href="/product/add"
          className=" flex px-2 py-3   text-[#FF0097] font-bold rounded"
          style={{
            background:
              'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
          }}
        >
          <RiAddLine className="mr-2 m-auto" />
          <span>Thêm sản phẩm</span>
        </Link>
      </div>
      {isLoading ? (
        <LoadingCenter />
      ) : (
        <DataTable
          columns={columns}
          data={records || []}
          pagination
          striped
          customStyles={customStyles}
          responsive
          highlightOnHover
        />
      )}
      <ModalConfirm isOpen={isOpen} onOk={handleDelete} onCancel={handleClose} prop={prop} />
    </div>
  );
};

export default Product;
