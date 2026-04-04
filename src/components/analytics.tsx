"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsParams } from "../lib/analytics";

type TrackPageEventProps = {
  eventName: string;
  params?: AnalyticsParams;
};

export function TrackPageEvent({ eventName, params = {} }: TrackPageEventProps) {
  useEffect(() => {
    trackEvent(eventName, params);
  }, [eventName, params]);

  return null;
}

type TrackedAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: AnalyticsParams;
};

export function TrackedAnchor({ eventName, eventParams = {}, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}
