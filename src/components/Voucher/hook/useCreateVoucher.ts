import Notification from '@/components/Notification';
import { useCreateVoucherMutation } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { showErrorMessage } from '@/utils/error';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useCreateVoucher = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createVoucher, isLoading: CreateVoucherLoading } = useCreateVoucherMutation(graphqlClientRequest(), {
    onSuccess: data => {
      if (data.createVoucher._id) {
        Notification.Success('Thêm mã giảm giá thành công');
        queryClient.invalidateQueries(['listVoucher']);
        router.push('/Voucher');
      }
    },
    onError: error => {
      showErrorMessage(error);
    }
  });
  const handleCreateVoucher = useCallback(
    (values: any) => {
      return createVoucher({
        input: values
      });
    },
    [createVoucher]
  );

  return { handleCreateVoucher, CreateVoucherLoading };
};
export default useCreateVoucher;
