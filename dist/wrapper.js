import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
const EndMessageComponent = (props) => {
    return (_jsx("p", { style: { textAlign: "center" }, children: _jsx("b", { children: "You have seen it all" }) }));
};
const InfiniteScrollWrapper = ({ visibleLength, totalLength, items, functionNext, children, height = "calc(100vh - 70px)", }) => {
    const containerRef = useRef(null);
    const isFetchingRef = useRef(false);
    const [hasMore, setHasMore] = useState(true);
    const handleScroll = () => {
        const container = containerRef.current;
        if (!container || !hasMore || isFetchingRef.current)
            return;
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
        if (!container)
            return;
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [visibleLength, hasMore]);
    useEffect(() => {
        setHasMore(visibleLength < totalLength);
    }, [totalLength, visibleLength]);
    return (_jsx(_Fragment, { children: _jsxs("div", { ref: containerRef, style: {
                overflowY: "scroll",
                height,
            }, children: [children, hasMore ? (_jsx("div", { style: { width: "100%", display: "grid", placeItems: "center" }, children: _jsx(Spin, {}) })) : (_jsx(EndMessageComponent, {}))] }) }));
};
export default InfiniteScrollWrapper;
