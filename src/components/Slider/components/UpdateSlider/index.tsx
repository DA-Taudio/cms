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
  }) as any;
  console.log(result);

  useEffect(() => {
    if (sliderId) {
      setImageUrl(`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}${result?.mediaId?.url}`);
      setImageId(result?.mediaId?._id);
    }
  }, [isLoading]);

  const initialValues = {
    redirectUrl: result.redirectUrl,
    type: result.type
  };

  const handleImageIdChange = (url: string) => {
    setImageId(url);
  };

  const handleSubmit = (values: any) => {
    if (imageId === '') {
      Notification.Info('Vui lòng tải lên hình ảnh!');
    } else {
      handleUpdateSlider({
        sliderId,
        updateInput: { ...values, mediaId: imageId }
      });
    }
  };

  const validateForm = (values: any) => {
    const errors: any = {};

    return errors;
  };
  return (
    <>
      {sliderId ? (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
            enableReinitialize={true}
          >
            <Form className="flex flex-col">
              <div className="pb-5">
                <label htmlFor="image" className="block text-lg font-medium text-black">
                  Hình ảnh / Video:
                </label>
                <ImageUploader onImageIdChange={handleImageIdChange} imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
              <div>
                <label htmlFor="redirectUrl" className="block text-lg font-medium text-black">
                  Link chuyển tiếp:
                </label>
                <Field
                  type="text"
                  id="redirectUrl"
                  name="redirectUrl"
                  className="w-1/3 mt-2  p-2 rounded-md border border-gray-500"
                />
                <ErrorMessage name="redirectUrl" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-[#FF0097] font-bold rounded-md hover:bg-blue-700 w-32 text-center hover:cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(238.04deg, rgba(0, 218, 255, 0.2) -32.33%, rgba(128, 43, 195, 0.2) 28.78%, rgba(255, 0, 151, 0.2) 67.37%, rgba(246, 160, 26, 0.2) 128.48%)'
                  }}
                >
                  {UpdateSliderLoading ? 'Đang cập nhật ...' : 'Cập Nhật'}
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
