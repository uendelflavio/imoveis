const ConvertBase64 = file => {
  return new Promise(resolve => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

const File2Base64 = file => {
  ConvertBase64(file)
    .then(response => {
      return response;
    })
    .catch(() => {
      return "";
    });
};

const Base64 = {
  File2Base64
};

export default Base64;
