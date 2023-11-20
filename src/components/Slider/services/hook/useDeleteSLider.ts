import Notification from '@/components/Notification';
import { useDeleteSliderMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteSlider, isLoading } = useDeleteSliderMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.deleteSlider.success) {
        queryClient.invalidateQueries(['getListSlider']);
        Notification.Success('Xoá thành công!');
      }
    },
    onError: error => {
      showErrorMessage(error);
    }
  });
  const handleDeleteSlider = useCallback(
    (values: any) => {
      return deleteSlider({
        input: values
      });
    },
    [deleteSlider]
  );

  return { handleDeleteSlider, isLoading };
};
export default useDeleteSlider;
