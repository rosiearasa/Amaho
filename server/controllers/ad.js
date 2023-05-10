import * as config from "../config.js";

export const uploadImage = async (req, res) => {
  try {
    console.log(req.body);
    const { image } = req.body;
    const base6Image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
  } catch (err) {
    console.log(err);
    res.json({ error: "Upload failed, Try Again." });
  }
};
