// Build form data
export const setFormData = form => {
  const fd = new FormData();
  const keys = Object.keys(form);

  for (let key of keys) {
    fd.append(key, form[key]);
  }

  return fd;
}

// Get size of the file in Mb (input file)
// Max size allowed from API is 5Mb
export const getSizeInMb = (file) => {
  const sizeInMb = file.size / (1024 * 1024);

  return sizeInMb;
}

// export const formatArticle = (article) => {
//   const formattedArticle = {
//     articleID: article.id
//   }

//   return formattedArticle;
// }
