import React from "react";
import "react-day-picker/lib/style.css";

export default function CustomOverlay({
  classNames,
  selectedDay,
  children,
  ...props
}) {
  return (
    <div className={classNames.overlayWrapper} {...props}>
      <div className={classNames.overlay}>{children}</div>
    </div>
  );
}
