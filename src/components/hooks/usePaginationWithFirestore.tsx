import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { cloneDeep, isEmpty, isEqual } from 'lodash-es';
import { isLoaded, ReduxFirestoreQuerySetting, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

export type Props = {
  itemLimitPerQuery: number;
  collection: string;
  initialQuery: ReduxFirestoreQuerySetting;
};

export type UsePaginationWithFirestoreType = {
  fetchNextPage: () => void;
  fetchPrevPage: () => Promise<void>;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoadingTx: boolean;
  queryFirestore: ReduxFirestoreQuerySetting;
  queryResult: any[];
  setFirstItemCreatedAt: Dispatch<SetStateAction<string>>;
  setQueryFirestore: Dispatch<SetStateAction<ReduxFirestoreQuerySetting>>;
};

const usePaginationWithFirestore = ({
  itemLimitPerQuery,
  collection,
  initialQuery,
}: Props): UsePaginationWithFirestoreType => {
  const [queryFirestore, setQueryFirestore] = useState(initialQuery);
  const [firstTxCreatedAt, setFirstItemCreatedAt] = useState('');
  const [paginationSettings, setPaginationSettings] = useState({
    isFirstPage: true,
    isLastPage: true,
  });
  const [prevPage, setPrevPage] = useState([]);

  const { queryResult } = useSelector((state: RootState) => ({
    queryResult: state.firestore.ordered[collection],
  }));

  useFirestoreConnect([queryFirestore]);

  const { isFirstPage, isLastPage } = paginationSettings;
  const isLoadingTx = !isLoaded(queryResult);

  const fetchNextPage = () => {
    if (queryResult.length === itemLimitPerQuery && !isLoadingTx) {
      const lastItemCreatedAt = queryResult[queryResult.length - 1].createdAt;
      const currentQuery = cloneDeep(queryFirestore);
      setPrevPage(prevPage.concat(queryResult[0] ? queryResult[0].createdAt : ''));

      setQueryFirestore({
        ...initialQuery,
        startAfter: lastItemCreatedAt,
        where: currentQuery.where,
      });
    }
  };

  const fetchPrevPage = async () => {
    if (!isFirstPage && !isLoadingTx) {
      const currentQuery = cloneDeep(queryFirestore);
      const prevTarget = prevPage.length - 1;
      setQueryFirestore({
        ...initialQuery,
        startAt: prevPage[prevTarget],
        where: currentQuery.where,
      });
      setPrevPage(prevPage.slice(0, prevTarget));
    }
  };

  useEffect(() => {
    if ((isLoaded(queryResult) && !isEmpty(queryResult)) || !isEmpty(prevPage)) {
      setPaginationSettings({
        isFirstPage:
          isEqual(initialQuery, queryFirestore) ||
          firstTxCreatedAt === '' ||
          (queryResult[0] &&
            queryResult[0].createdAt === firstTxCreatedAt &&
            queryResult.length === itemLimitPerQuery),
        isLastPage: queryResult.length < itemLimitPerQuery,
      });
      if (firstTxCreatedAt === '') {
        setFirstItemCreatedAt(queryResult[0] ? queryResult[0].createdAt : '');
      }
    } else {
      setPaginationSettings({
        isFirstPage: true,
        isLastPage: true,
      });
      setFirstItemCreatedAt('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResult]);

  return {
    fetchNextPage,
    fetchPrevPage,
    isFirstPage,
    isLastPage,
    isLoadingTx,
    queryFirestore,
    queryResult,
    setFirstItemCreatedAt,
    setQueryFirestore,
  };
};

export default usePaginationWithFirestore;
