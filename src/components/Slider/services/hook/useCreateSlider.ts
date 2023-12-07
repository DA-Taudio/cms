import Notification from '@/components/Notification';
import { useCreateSliderMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useCreateSlider = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createSlider, isLoading: CreateSliderLoading } = useCreateSliderMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.createSlider._id) {
        Notification.Success('Thêm trình chiếu thành công');
        queryClient.invalidateQueries(['listSlider']);
        router.push('/slider');
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
