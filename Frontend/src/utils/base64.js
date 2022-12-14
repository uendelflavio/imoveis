import isBase64 from "is-base64";

const Base64MimeType = (stringBase64) => {
  let type = "";
  if (isBase64Image(stringBase64)) type = Base64toFile(stringBase64).type;
  return type;
};

const Base64Size = (stringBase64) => {
  let size = 0;
  if (isBase64Image(stringBase64)) size = Base64toFile(stringBase64).size;
  return size;
};

const generateID = (stringLength = 20) => {
  let randomStr = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZqeytrpolkadjsghfgmnbzxcvnQPOWEYRKASJHDGFMNBCVX--___-_jsfhrlg-_124903564576986483658fgh4sdfh687e4h897WETHJ68F7G4688471877GFHJFFGJ87469857468746hfghwrtiyj4598yhdjkhgnk";
  for (let index = 0; index < stringLength; index++) {
    randomStr += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomStr;
};

const isBase64Image = (stringBase64) => {
  return isBase64(stringBase64, {
    mimeRequired: true,
  });
};

const FiletoBase64 = async (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

const Base64toFile = (fileBase64 = "") => {
  const index = generateID(20);
  let newFile;
  let fileType = fileBase64
    .toString()
    .substring(
      fileBase64.toString().indexOf(":") + 1,
      fileBase64.toString().lastIndexOf(";"),
    );
  let fileExtension = fileType.split("/");
  newFile = new File([fileBase64], `file${index}.${fileExtension[1]}`, {
    type: fileType,
  });
  return newFile;
};

const Base64 = {
  FiletoBase64,
  isBase64Image,
  Base64toFile,
  Base64MimeType,
  Base64Size,
};

export default Base64;
