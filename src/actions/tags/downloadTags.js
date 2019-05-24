export default function downloadTags(tags) {
  return {
    type: "DOWNLOAD_TAGS",
    payload: tags
  };
}
