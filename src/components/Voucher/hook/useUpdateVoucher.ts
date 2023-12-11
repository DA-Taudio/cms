import Notification from '@/components/Notification';
import { useUpdateVoucherMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useCallback } from 'react';

const useUpdateVoucher = () => {
  const { mutate: updateVoucher, isLoading: UpdateVoucherLoading } = useUpdateVoucherMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.updateVoucher.success) {
        Notification.Success('Cập nhật mã giảm giá thành công!');
      }
    },
    onError: error => {
      showErrorMessage(error);
    }
  });
  const handleUpdateVoucher = useCallback(
    (values: any) => {
      return updateVoucher({
        input: values
      });
    },
    [updateVoucher]
  );

  return { handleUpdateVoucher, UpdateVoucherLoading };
};
export default useUpdateVoucher;
