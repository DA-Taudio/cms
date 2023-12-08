import { useMemo } from 'react';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { useGetVoucherQuery } from '@/graphql/generated';

interface IProps {
  _id: string;
}
const useGetVoucher = (props: IProps) => {
  const { data, isLoading } = useGetVoucherQuery(graphqlClientRequest(), {
    input: { ...props }
  });

  const result = useMemo(() => {
    return data?.getVoucher || {};
  }, [data]);

  return { result, isLoading };
};
export default useGetVoucher;
