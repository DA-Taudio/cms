import Notification from '@/components/Notification';
import { useCreateSliderMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useCreateSlider = () => {
  const queryClient = useQueryClient();

  const { mutate: createSlider, isLoading: CreateSliderLoading } = useCreateSliderMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.createSlider._id) {
        Notification.Success('Them trình chiếu thành công');
      }
    },
    onError: error => {
      showErrorMessage(error);
    }
  });
  const handleCreateSlider = useCallback(
    (values: any) => {
      return createSlider({
        input: values
      });
    },
    [createSlider]
  );

  return { handleCreateSlider, CreateSliderLoading };
};
export default useCreateSlider;
