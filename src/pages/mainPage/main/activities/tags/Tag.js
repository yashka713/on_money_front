import React from "react";

export const Tag = ({ tag, updateClick }) => {
  return (
    <div
      className="tag-item cursor-pointer"
      draggable
      onDragStart={e => e.dataTransfer.setData("tagId", tag.id)}
      onClick={() => updateClick(tag.id)}
    >
      {tag.attributes.name}
    </div>
  );
};
