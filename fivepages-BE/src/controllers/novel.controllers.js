import Novel from "../models/novel.models.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//done and tested
export const searchNovels = async (req, res) => {
  const { param } = req.params; // Get search query from frontend

  if (!param) {
    return res.status(400).json({ message: "Seach query is required!" });
  }

  let query = {
    $or: [
      { title: { $regex: param, $options: "i" } }, // Case-insensitive search
      { author: { $regex: param, $options: "i" } },
      { tags: { $in: [param] } },
    ],
  };

  const novels = await Novel.find(query); // Fetch novels based on search query

  return res.status(400).json({ data: novels });
};

export const getLatestNovels = async (req, res) => {
  const count = Number(req.query.count) || 10;

  try {
    const novels = await Novel.find()
      .select("_id title author thumbnail createdAt")
      .sort({ createdAt: -1 })
      .limit(count);
    // console.log(novels);
    res.status(200).json(novels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//done
export const 
getNovels = async (req, res) => {
  // NOTE: if the code doesn't work for optional field of count, use the commented code instead

  // const count = req?.boyd?.count ? parseInt(req.body.count): undefined;
  const count = req?.body?.count ? parseInt(req.body.count) : 0; // 0 means no limit

  try {
    // if(!count){
    //   const novels = await Novel.find();
    //   res.status(200).json(novels);
    // } else {
    //   const novels = await Novel.find().limit(count);
    //   res.status(200).json(novels);
    // }
    const novels = await Novel.find()
      .limit(count)
      .select("title author thumbnail");

    res.status(200).json(novels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//done
export const getRecommendedNovels = async (req, res) => {
  const count = req.query?.count ? parseInt(req.query.count) : undefined;
  const novelID = req.query?.id;

  if (
    !novelID ||
    typeof novelID !== "string" ||
    !novelID.trim() ||
    !mongoose.Types.ObjectId.isValid(novelID)
  ) {
    return res.status(400).json({ message: "Novel ID is required" });
  }

  if (!count) {
    return res.status(400).json({
      message: "count is required!",
    });
  }

  try {
    const currentNovel = await Novel.findById(novelID);
    const recommendedNovels = await Novel.aggregate([
      {
        $match: {
          _id: { $ne: currentNovel._id },
          tags: { $in: currentNovel.tags },
        },
      },
      {
        $addFields: {
          similarityScore: {
            $size: { $setIntersection: ["$tags", currentNovel.tags] },
          },
        },
      },
      { $sort: { similarityScore: -1 } }, // Higher similarity first
      { $limit: count },
      {
        $project: {
          title: 1,
          author: 1,
          thumbnail: 1,
        },
      },
    ]);

    res.status(200).json(recommendedNovels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//done and tested
export const getNovelByID = async (req, res) => {
  try {
    const novelID = req.params.id;

    if (
      !novelID ||
      typeof novelID !== "string" ||
      !novelID.trim() ||
      !mongoose.Types.ObjectId.isValid(novelID)
    ) {
      return res.status(400).json({ message: "Novel ID is required" });
    }

    const novel = await Novel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(novelID) } },
      {
      $lookup: {
        from: "chapters",
        localField: "_id",
        foreignField: "novel",
        as: "chapters",
      },
      },
      {
      $unwind: {
        path: "$chapters",
        preserveNullAndEmptyArrays: true,
      },
      },
      {
      $sort: {
        "chapters.chapterNumber": 1, // Sort chapters by chapter number in ascending order
      },
      },
      {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        author: { $first: "$author" },
        thumbnail: { $first: "$thumbnail" },
        publishedYear: { $first: "$publishedYear" },
        synopsis: { $first: "$synopsis" },
        rating: { $first: "$rating" },
        type: { $first: "$type" },
        language: { $first: "$language" },
        tags: { $first: "$tags" },
        chapters: { $push: "$chapters" },
      },
      },
      {
      $project: {
        _id: 1,
        title: 1,
        author: 1,
        thumbnail: 1,
        publishedYear: 1,
        synopsis: 1,
        rating: 1,
        type: 1,
        language: 1,
        tags: 1,
        chapters: { _id: 1, title: 1, chapterNumber: 1 },
      },
      },
    ]);

    if (!novel || novel.length === 0) {
      return res.status(404).json({ message: "Novel not found" });
    }
   
    
    res.status(200).json(novel[0]); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//done and tested
export const createNovel = async (req, res) => {
  const thumbnailLocalPath = req.file?.path;

  const {
    title,
    author,
    publishedYear,
    synopsis,
    rating,
    type,
    language,
    tags,
  } = req.body;

  // Validate request body
  if (
    !thumbnailLocalPath ||
    !req.body.title ||
    !req.body.author ||
    !req.body.publishedYear ||
    !req.body.synopsis ||
    !req.body.tags
  ) {
    return res.status(400).json({
      message:
        "Title, author, thumbnail file, tags and published year are required",
    });
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail?.url) {
    return res.status(400).json("Error while uploading on cloudinary!");
  }

  // Check if novel already exists
  const existingNovel = await Novel.findOne({
    title: req.body.title,
    author: req.body.author,
  });
  if (existingNovel) {
    return res.status(400).json({ message: "Novel already exists" });
  }

  try {
    const novel = await Novel.create({
      title,
      author,
      thumbnail: thumbnail.url,
      publishedYear,
      synopsis,
      rating: rating ? rating : 5,
      type: type ? type : "NA",
      language: language ? language : "NA",
      tags,
    });
    res.status(201).json(novel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//done
export const deleteNovel = async (req, res) => {
  const novelID = req.params.id;

  if (
    !novelID ||
    typeof novelID !== "string" ||
    !novelID.trim() ||
    !mongoose.Types.ObjectId.isValid(novelID)
  ) {
    return res.status(400).json({ message: "Novel ID is required" });
  }

  try {
    const novel = await Novel.findByIdAndDelete(novelID);

    if (!novel) return res.status(404).json({ message: "Novel not found" });

    res.status(200).json({ message: "Novel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
