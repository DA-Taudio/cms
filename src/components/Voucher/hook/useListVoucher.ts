import { useMemo } from 'react';
import { FilterVoucherInput, PaginationBaseInput, useListVoucherQuery } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';

interface IVouchers {
  filter?: FilterVoucherInput;
  pagination: PaginationBaseInput;
}
export const useListVoucher = (props: IVouchers) => {
  const { data, isLoading } = useListVoucherQuery(graphqlClientRequest(true), {
    input: { ...props }
  });

  const listVoucher = useMemo(() => {
    return data?.listVoucher.vouchers || [];
  }, [data]);

  return { listVoucher, isLoading };
};
