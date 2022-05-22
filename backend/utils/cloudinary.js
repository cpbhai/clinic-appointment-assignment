async function saveImg(file) {
  const cloudinary = require("cloudinary");
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({}, (err, res) => {
        if (err) {
          // console.log(err);
          reject(err);
        } else {
          // console.log(`Upload succeed: ${res}`);
          // filteredBody.photo = result.url;
          resolve(res);
        }
      })
      .end(file.data);
  });
}
module.exports = { saveImg };
