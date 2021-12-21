const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dkmic8hid",
  api_key: "619173487943317",
  api_secret: "VWHo27u3UxclOTVLpTiAu9PDAZE",
});

module.exports = { cloudinary };
