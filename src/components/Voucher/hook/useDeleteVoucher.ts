import Notification from '@/components/Notification';
import { useDeleteVoucherMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteVoucher, isLoading } = useDeleteVoucherMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.deleteVoucher.success) {
        queryClient.invalidateQueries(['listVoucher']);
        Notification.Success('Xoá thành công!');
      }
    },
    onError: error => {
      showErrorMessage(error);
    }
  });
  const handleDeleteVoucher = useCallback(
    (values: any) => {
      return deleteVoucher({
        input: values
      });
    },
    [deleteVoucher]
  );

  return { handleDeleteVoucher, isLoading };
};
export default useDeleteVoucher;
