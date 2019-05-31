import React from "react";

export const Tag = ({ tag }) => {
  return <div className="tag-item cursor-pointer">{tag.attributes.name}</div>;
};
