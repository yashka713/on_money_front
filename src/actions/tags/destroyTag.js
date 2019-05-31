export default function destroyTag(tagId) {
  return {
    type: "DESTROY_TAG",
    payload: tagId
  };
}
