import { Tooltip, Typography, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

const { Text } = Typography;

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("en-US");

export const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

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

export const DateTimeToolTip = ({
  input,
  isVisibleDate = false,
  outputFormat = null,
  placement = "top",
  textProps = {},
  isAgo = true,
  isTag = true,
}: DateTimeToolTipProps) => {
  if (!input || input === "-")
    return <Text type="danger">Datetime does not exists</Text>;

  const readableDateTime = "DD MMM, YYYY hh:mm:ss A Z";
  let m = null;
  if (typeof input === "number" && Number.isInteger(input)) {
    m = dayjs.unix(input).utcOffset("+05:30");
  } else {
    m = dayjs.utc(input).utcOffset("+05:30");
  }

  outputFormat = outputFormat ? outputFormat : readableDateTime;
  const tt = unixToReadableFormat(m, false, readableDateTime);
  const d = unixToReadableFormat(m, false, outputFormat);

  return (
    <Tooltip title={tt} placement={placement}>
      <Text {...textProps}>
        {isAgo && unixToReadableFormat(m, true)}{" "}
        {isVisibleDate ? isTag ? <Tag>{d}</Tag> : d : ""}
      </Text>
    </Tooltip>
  );
};

export function unixToReadableFormat(
  input,
  isAgo = false,
  format = "DD/MM/YYYY"
) {
  let m = input;
  if (!(input instanceof dayjs)) m = dayjs(input * 1000);
  return isAgo ? m.fromNow() : m.format(format);
}

export const drawerWidth = (window?.innerWidth * 60) / 100;

export const getQueryParams = (props: Record<string, any> = {}) => {
  const query = new URLSearchParams(window.location.search);
  return {
    secIds: query.get("secIds") || "",
    version: query.get("version") || "latest",
    ...props,
  };
};

export const G_DATE_READABLE_FORMAT = "DD MMMM, YYYY";

export const momentToUnix = (momentDateTime) => {
  const now = moment(momentDateTime);
  const unixTimestamp = now.unix();
  return unixTimestamp;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
};

export const getIsMobile = () => window.innerWidth <= 768;
