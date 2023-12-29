import { useMemo } from 'react';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { useAnalyticQuery } from '@/graphql/generated';

const useAnalytic = (props: any) => {
  const { data, isLoading } = useAnalyticQuery(graphqlClientRequest(), {
    input: { ...props }
  });

  const result = useMemo(() => {
    return data?.analytic || {};
  }, [data]);

  return { result, isLoading };
};
export default useAnalytic;
