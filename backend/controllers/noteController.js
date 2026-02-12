import bcrypt from "bcryptjs";
import Note from "../models/Note.js";
import { generatePassword } from "../utils/generatePassword.js";
import { summarizeNote } from "../utils/summarizeNote.js";

export const createNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Note cannot be empty" });
    }

    if (text.length > 500) {
      return res
        .status(400)
        .json({ error: "Note exceeds 500 character limit" });
    }

    const rawPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const note = await Note.create({
      text,
      password: hashedPassword,
    });

    res.status(201).json({
      url: `${frontendUrl}/note/${note._id}`,
      password: rawPassword,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const unlockNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const isMatch = await bcrypt.compare(password, note.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ text: note.text });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const summarize = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const summary = await summarizeNote(note.text);

    if (!summary) {
      return res
        .status(500)
        .json({ error: "Failed to generate summary" });
    }

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
};
