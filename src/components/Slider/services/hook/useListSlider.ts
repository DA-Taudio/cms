import { useMemo } from 'react';
import { FilterSliderInput, PaginationBaseInput, useListSliderQuery } from '@/graphql/generated';
import { graphqlClientRequest } from '@/graphql/services/graphql-client';

interface ISliders {
  filter?: FilterSliderInput;
  pagination: PaginationBaseInput;
}
export const useListSlider = (props: ISliders) => {
  const { data, isLoading } = useListSliderQuery(graphqlClientRequest(true), {
    input: { ...props }
  });

  const listSlider = useMemo(() => {
    return data?.listSlider.sliders || [];
  }, [data]);

  return { listSlider, isLoading };
};
