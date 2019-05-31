export default function checkTag(tag) {
  return {
    type: "CHECK_TAG",
    payload: tag.data
  };
}
