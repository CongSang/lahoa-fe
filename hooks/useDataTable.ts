/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useCallback } from "react";
import { useQuery, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { SortingState, PaginationState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DefaultValues, useForm } from "react-hook-form";
import { PageRequest, PageResponse } from "@/types/index";
import { isObjectChange, objectToQueryParams } from "@/lib/index";

type Options<TFilter> = {
  defaultFilter: TFilter;
  defaultPageSize?: number;
};

type QueryParams<TFilter> = PageRequest & TFilter;

type UpdateParams<TFilter> = Partial<PageRequest & TFilter>;

export function useDataTable<T, TFilter extends Record<string, any>>(
  queryKey: string,
  fetchFn: (params: QueryParams<TFilter>) => Promise<PageResponse<T>>,
  options: Options<TFilter>
) {
  const { defaultFilter, defaultPageSize = 10 } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // URL → state 
  const queryParams = useMemo<QueryParams<TFilter>>(() => {
    const page = Number(searchParams.get("page")) || 0;
    const size = Number(searchParams.get("size")) || defaultPageSize;
    const sortField = searchParams.get("sortField") || "id";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const extra: Record<string, any> = { ...defaultFilter };

    searchParams.forEach((value, key) => {
      if (!["page", "size", "sortField", "sortOrder"].includes(key)) {
        extra[key] = value;
      }
    });

    return {
      page,
      size,
      sortField,
      sortOrder,
      ...(extra as TFilter),
    };
  }, [searchParams, defaultPageSize, defaultFilter]);

  const form = useForm<TFilter>({
    defaultValues: defaultFilter as DefaultValues<TFilter>,
    values: queryParams,
  });


  const pagination = useMemo<PaginationState>(() => ({
    pageIndex: queryParams.page,
    pageSize: queryParams.size,
  }), [queryParams.page, queryParams.size]);

  const sorting = useMemo<SortingState>(() => {
    return queryParams.sortField
      ? [{ id: queryParams.sortField, desc: queryParams.sortOrder === "desc" }]
      : [];
  }, [queryParams.sortField, queryParams.sortOrder]);

  const isFiltering = useCallback(() => {
    return isObjectChange(queryParams, defaultFilter)
  }, [queryParams, defaultFilter])

  // Update URL helper
  const updateUrl = useCallback(
    (
      newParams: UpdateParams<TFilter>,
      options?: { history?: "push" | "replace" }
    ) => {
      const merged: QueryParams<TFilter> = {
        ...queryParams,
        ...newParams,
      };
      const nextQuery = objectToQueryParams(merged);
      const currentQuery = searchParams.toString();

      if (nextQuery === currentQuery) return;

      const method = options?.history || "push";

      if (method === "replace") {
        router.replace(`${pathname}?${nextQuery}`, { scroll: false });
      } else {
        router.push(`${pathname}?${nextQuery}`, { scroll: false });
      }
    },
    [queryParams, pathname, router, searchParams]
  );

  const setPagination = useCallback(
    (updater: PaginationState | ((prev: PaginationState) => PaginationState)) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;

      updateUrl(
        { 
          page: next.pageIndex, 
          size: next.pageSize 
        } as UpdateParams<TFilter>,
        { history: "push" }
      );
    },
    [pagination, updateUrl]
  );

  const setSorting = useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      const next =
        typeof updater === "function" ? updater(sorting) : updater;

      const sort = next[0];

      updateUrl(
        {
          sortField: sort?.id,
          sortOrder: sort ? (sort.desc ? "desc" : "asc") : undefined,
          page: 0,
        } as UpdateParams<TFilter>,
        { history: "replace" }
      );
    },
    [sorting, updateUrl]
  );

  const setExtraParams = useCallback(
    (params: Partial<TFilter>, options?: { replace?: boolean }) => {
      updateUrl(
        { ...params, page: 0 } as UpdateParams<TFilter>,
        { history: options?.replace ? "replace" : "push" }
      );
    },
    [updateUrl]
  );

  const onSubmit = (data: Partial<TFilter>) => {
    setExtraParams(
      data,
      { replace: false }
    );
  };

  const onReset = () => {
    form.reset(defaultFilter);
    router.push(pathname, { scroll: false });
  };

  const queryKeyStable = useMemo(
    () => [queryKey, objectToQueryParams(queryParams)],
    [queryKey, queryParams]
  );

  const query = useQuery({
    queryKey: queryKeyStable,
    queryFn: () => fetchFn(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    gcTime: 300_000,
  });

  const prefetchNextPage = useCallback(() => {
    const nextPage = queryParams.page + 1;

    const nextParams = {
      ...queryParams,
      page: nextPage,
    };

    const qs = objectToQueryParams(nextParams);

    queryClient.prefetchQuery({
      queryKey: [queryKey, qs],
      queryFn: () => fetchFn(nextParams),
    });
  }, [queryClient, queryKey, queryParams, fetchFn]);

  return {
    ...query,
    tableState: {
      pagination,
      setPagination,
      sorting,
      setSorting,
      extraParams: queryParams,
      setExtraParams,
      prefetchNextPage,
      isFiltering,
    },
    form: {
      ...form,
      onSubmit,
      onReset,
    },
    queryParams,
  };
}