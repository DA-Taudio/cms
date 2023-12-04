import ImageUploader from '@/components/Upload';
import Notification from '@/components/Notification';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { IoMdAddCircle, IoMdAddCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import useGetSlider from '../../services/hook/useGetSlider';
import useUpdateSlider from '../../services/hook/useUpdateSlider';
import useSliderStore, { SliderStore } from '@/store/useSliderStore';

const UpdateSlider = () => {
  const [imageId, setImageId] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>();

  const { handleUpdateSlider, UpdateSliderLoading } = useUpdateSlider();
  const router = useRouter();
  const { sliderId } = useSliderStore(store => store as SliderStore);
  const { result, isLoading } = useGetSlider({
    sliderId
  });

  //   useEffect(() => {
  //     if (SliderId) {
  //       setImageUrl(`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}${result?.Slider?.image?.url}`);
  //       setImageId(result?.Slider?.image?._id);
  //     }
  //   }, [isLoading]);

  const initialValues = {
    name: result.slider?.name,
    type: result.slider?.type,
    description: result.slider?.description,
    price: result.slider?.price,
    countInStock: result.slider?.countInStock,
    manufacturer: result.slider?.manufacturer,
    modelNumber: result.slider?.modelNumber,
    dimensions: result.slider?.dimensions,
    weight: result.slider?.weight,
    connectivity: result.slider?.connectivity,
    powerSource: result.slider?.powerSource,
    compatibility: result.slider?.compatibility,
    warranty: result.slider?.warranty
  };

  const handleImageIdChange = (url: string) => {
    setImageId(url);
  };

  const handleSubmit = (values: any) => {
    if (imageId === '') {
      Notification.Info('Vui lòng tải lên hình ảnh!');
    } else {
      handleUpdateSlider({
        SliderId,
        updateInput: { ...values, image: imageId }
      });
    }
  };

  const validateForm = (values: any) => {
    const errors: any = {};

    // Kiểm tra các trường bắt buộc
    if (!values.name) {
      errors.name = 'Tên sản phẩm là bắt buộc';
    }
    if (!values.type) {
      errors.type = 'Loại sản phẩm là bắt buộc';
    }

    if (!values.description) {
      errors.description = 'Mô tả là bắt buộc';
    }
    // Thêm các kiểm tra khác cho các trường khác

    return errors;
  };
  return (
    <>
      {SliderId ? (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
            enableReinitialize={true}
          >
            <Form className="flex flex-wrap bg-slate-400">
              <div className="mb-4 w-4/12 p-5">
                <label htmlFor="name" className="block text-xl font-medium text-black">
                  Tên sản phẩm:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 bg-white"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div className="mb-4 w-4/12 p-5">
                <label htmlFor="type" className="block text-xl font-medium text-black">
                  Loại sản phẩm:
                </label>
                <div className="flex">
                  <ComboBox
                    id="type"
                    name="type"
                    options={listType}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 bg-white"
                  />
                  <button onClick={() => router.push('/Slider/type')}>
                    <IoMdAddCircle className="text-4xl mx-3" />
                  </button>
                </div>
                <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div className="mb-4 w-4/12 p-5">
                <label htmlFor="description" className="block text-xl font-medium text-black">
                  Mô tả:
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 bg-white"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div className="mb-4 w-4/12 p-5">
                <label htmlFor="price" className="block text-xl font-medium text-black">
                  Giá:
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 bg-white"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4 w-4/12 p-5">
                <label htmlFor="countInStock" className="block text-xl font-medium text-black">
                  Số lượng trong kho:
                </label>
                <Field
                  type="number"
                  id="countInStock"
                  name="countInStock"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 bg-white"
                />
                <ErrorMessage name="countInStock" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4 w-4/12 p-5">
                <label htmlFor="image" className="block text-xl font-medium text-black">
                  Hình ảnh:
                </label>
                <ImageUploader onImageIdChange={handleImageIdChange} imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>

              <div className="w-4/12 p-10">
                <button
                  type="submit"
                  className="inline-flex float-right p-7 py-5 mr-20 mb-10 justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {UpdateSliderLoading ? 'Đang cập nhật ...' : 'Cập Nhật sản phẩm'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      ) : (
        <div>Vui lòng chọn slider để cập nhật...</div>
      )}
    </>
  );
};

export default UpdateSlider;
