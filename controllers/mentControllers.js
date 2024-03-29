import * as mongoose from "mongoose";
import Ment from "../models/Ment.js";
import paginate from "../utils/paginate.js";
const cooldown = new Set();

export const createMent = async (req, res) => {
  try {
    const { title, content, userId, projectTags, tags, type } = req.body;
    console.log(req.body);
    if (!(title && content)) {
      throw new Error("All input required");
    }

    if (cooldown.has(userId)) {
      throw new Error(
        "You are menting too frequently. Please try again shortly."
      );
    }
    cooldown.add(userId);
    setTimeout(() => {
      cooldown.delete(userId);
    }, 30000);

    const ment = await Ment.create({
      title,
      content,
      author: userId,
      projectTags: projectTags,
      tags: tags,
      type: type
    });

    res.json(ment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getMent = async (req, res) => {
  try {
    const mentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mentId)) {
      throw new Error("Ment does not exist");
    }

    const ment = await Ment.findById(mentId)
      .populate("author", "-password")
      .lean();

    if (!ment) {
      throw new Error("Ment does not exist");
    }

    return res.json(ment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateMent = async (req, res) => {
  try {
    const mentId = req.params.id;
    const { content, userId, isAdmin, tags, projectTags } = req.body;

    const ment = await Ment.findById(mentId);

    if (!ment) {
      throw new Error("Ment does not exist");
    }

    if (ment.author != userId && !isAdmin) {
      throw new Error("Not authorized to update ment");
    }

    ment.content = content;
    ment.edited = true;

    await ment.save();

    return res.json(ment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteMent = async (req, res) => {
  try {
    const mentId = req.params.id;
    const { userId, isAdmin } = req.body;

    const ment = await Ment.findById(mentId);

    if (!ment) {
      throw new Error("Ment does not exist");
    }

    if (ment.author != userId && !isAdmin) {
      throw new Error("Not authorized to delete ment");
    }

    await ment.deleteOne();

    return res.json(ment);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

export const getMents = async (req, res) => {
  try {
    const { userId } = req.body;

    let { page, sortBy, author, search } = req.query;

    if (!sortBy) sortBy = "-createdAt";
    if (!page) page = 1;
    let ments;
    if (search) {
      ments = await Ment.find({$text: {$search: search}})
        .populate("author", "-password")
        .sort(sortBy)
        .lean();
    }
    else{
      ments = await Ment.find()
        .populate("author", "-password")
        .sort(sortBy)
        .lean();
    }

    if (author) {
      ments = ments.filter((ment) => ment.author?ment.author.username == author:false);
    }

    
    const count = ments? ments.length:0;

    ments = paginate(ments, 10, page);

    return res.json({ data: ments, count, search: search? true: false });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};