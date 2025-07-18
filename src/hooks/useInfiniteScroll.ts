import { useRef, useCallback } from "react";

type Options = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export const useInfiniteScroll = ({
  hasMore,
  loading,
  onLoadMore,
}: Options) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return lastElementRef;
};
