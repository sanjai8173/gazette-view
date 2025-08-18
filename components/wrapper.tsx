import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

const EndMessageComponent = (props) => {
  return (
    <p style={{ textAlign: 'center' }}>
      <b>You have seen it all</b>
    </p>
  );
};

const InfiniteScrollWrapper = ({
  visibleLength,
  totalLength,
  items,
  functionNext,
  children,
  height = 'calc(100vh - 70px)',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || !hasMore || isFetchingRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      isFetchingRef.current = true;
      Promise.resolve(functionNext(items)).finally(() => {
        isFetchingRef.current = false;
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [visibleLength, hasMore]);

  useEffect(() => {
    setHasMore(visibleLength < totalLength);
  }, [totalLength, visibleLength]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          overflowY: 'scroll',
          height,
        }}
      >
        {children}
        {hasMore ? <Spin /> : <EndMessageComponent />}
      </div>
    </>
  );
};

export default InfiniteScrollWrapper;
