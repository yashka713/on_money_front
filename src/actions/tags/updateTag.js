export default function updateTag(tag) {
  return {
    type: "UPDATE_TAG",
    payload: tag.data
  };
}
