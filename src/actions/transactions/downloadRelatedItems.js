export default function downloadRelatedItems(items) {
  return {
    type: "DOWNLOAD_RELATED_FIELDS",
    payload: items
  };
}
