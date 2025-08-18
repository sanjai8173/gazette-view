export declare const camelize: (str: any) => any;
import type { TooltipPlacement } from "antd/es/tooltip";
type DateTimeToolTipProps = {
    input: string | number;
    isVisibleDate?: boolean;
    outputFormat?: string | null;
    placement?: TooltipPlacement;
    textProps?: Record<string, any>;
    isAgo?: boolean;
    isTag?: boolean;
};
export declare const DateTimeToolTip: ({ input, isVisibleDate, outputFormat, placement, textProps, isAgo, isTag, }: DateTimeToolTipProps) => import("react/jsx-runtime").JSX.Element;
export declare function unixToReadableFormat(input: any, isAgo?: boolean, format?: string): any;
export declare const drawerWidth: number;
export declare const getQueryParams: (props?: Record<string, any>) => {
    secIds: string;
    version: string;
};
export declare const G_DATE_READABLE_FORMAT = "DD MMMM, YYYY";
export declare const momentToUnix: (momentDateTime: any) => number;
export declare const useIsMobile: () => boolean;
export declare const getIsMobile: () => boolean;
export {};
