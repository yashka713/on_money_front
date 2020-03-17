function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Array)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else if (data instanceof Array) {
    for (var i = 0; i < data.length; i++) {
      formData.append(`${parentKey}[]`, data[i]);
    }
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

export default function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}
