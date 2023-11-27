import React from 'react';
import { useListSlider } from './services/hook/useListSlider';
import { LoadingCenter } from '../Loading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ListSlider = () => {
  const { listSlider, isLoading } = useListSlider({
    pagination: {
      limit: 1000,
      page: 1
    }
  });
  console.log(listSlider);
  return (
    <>
      {isLoading ? (
        <LoadingCenter />
      ) : (
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="droppableId" type="group1">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className=" mb-8    bg-[#a7a6a6] my-2">
                  <button
                    className="w-full p-2 text-xl font-bold hover:cursor-pointer  border-none shadow-md bg-[#b8b6b6]"
                    onClick={() => setVisibleCreateModal(true)}
                  >
                    <PlusOutlined />
                  </button>
                </div>
                {sliders?.map((item: any, index: any) => renderSliderItem(item, index))}

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
