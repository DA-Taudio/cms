import React from 'react';
import { useListSlider } from './services/hook/useListSlider';
import { LoadingCenter } from '../Loading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  UpOutlined,
  DownOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import useSliderStore, { SliderStore } from '@/store/useSliderStore';
import { useRouter } from 'next/router';
const ListSlider = () => {
  const url = process.env.NEXT_PUBLIC_MEDIA_ENDPOINT;
  const { setSliderId } = useSliderStore(store => store as SliderStore);
  const router = useRouter();

  const { listSlider, isLoading } = useListSlider({
    pagination: {
      limit: 1000,
      page: 1
    }
  });

  const handleDragDrop = (results: any) => {
    const { source, destination, type, draggableId } = results;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
  };

  const renderSliderItem = (item: any, index: number) => {
    return (
      <Draggable draggableId={item._id} key={item._id} index={index}>
        {provided => (
          <div
            className="p-4 flex shadow-lg mb-6  bg-white"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="bg-black w-1/3 h-[150px] flex items-center justify-center">
              {item.type !== 'IMAGE' ? (
                <video
                  controls
                  className={'w-full h-full'}
                  // onPlay={handleVideoPlay}
                  // onPause={handleVideoPause}
                >
                  <source src={`${url}${item.mediaId.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className={'  '}>
                  <img
                    src={`${url}${item.mediaId.url}`}
                    alt={`Image ${index}`}
                    className={'h-[150px] object-cover w-full'}
                  />
                </div>
              )}
            </div>
            <div className="ml-7 w-1/3">
              {item.type === 'IMAGE' && (
                <div>
                  <div>
                    <span>Loại: {item.type === 'IMAGE' ? 'Hình ảnh' : 'Video'}</span>
                  </div>
                  {item.type === 'IMAGE' && (
                    <div>
                      <span>Đường dẫn: </span>
                      <span className="text-blue-600">{item.redirectUrl}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex  justify-end w-1/3">
              <Button
                className="mr-5"
                type="primary"
                ghost
                onClick={() => {
                  setSliderId(item._id);
                  router.push('/slider/update');
                }}
              >
                <EditOutlined />
              </Button>

              <Button
                type="primary"
                danger
                ghost
                onClick={async () => {
                  // setIdSlider(item._id);
                  // setIsOpen(true);
                  // setProp({
                  //   title: 'Xác nhận',
                  //   content: 'Bạn chắc chắn muốn xóa bản ghi này ?'
                  // });
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  return (
    <>
      {isLoading ? (
        <LoadingCenter />
      ) : (
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="droppableId" type="group1">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {listSlider?.sliders?.map((item: any, index: any) => renderSliderItem(item, index))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};

export default ListSlider;
