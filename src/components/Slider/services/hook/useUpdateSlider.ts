import Notification from '@/components/Notification';
import { useUpdateSliderMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useCallback } from 'react';

const useUpdateSlider = () => {
  const { mutate: updateSlider, isLoading: UpdateSliderLoading } = useUpdateSliderMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.updateSlider.success) {
        Notification.Success('Cập nhật trình chiếu thành công!');
      }
    },
    onError: error => {
      showErrorMessage(error);
    }
  });
  const handleUpdateSlider = useCallback(
    (values: any) => {
      return updateSlider({
        input: values
      });
    },
    [updateSlider]
  );

  return { handleUpdateSlider, UpdateSliderLoading };
};
export default useUpdateSlider;
