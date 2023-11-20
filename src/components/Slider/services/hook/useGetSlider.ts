import { useMemo } from 'react';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';
import { useGetSliderQuery } from '@/graphql/generated';

interface IProps {
  sliderId: string;
}
const useGetSlider = (props: IProps) => {
  const { data, isLoading } = useGetSliderQuery(graphqlClientRequest(), {
    input: { ...props }
  });

  const result = useMemo(() => {
    return data?.getSlider || {};
  }, [data]);

  return { result, isLoading };
};
export default useGetSlider;
