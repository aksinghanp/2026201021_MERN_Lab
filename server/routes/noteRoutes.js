const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/Note');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
    });

    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create note.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch notes.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    return res.status(200).json({ message: 'Note deleted successfully.', note });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete note.' });
  }
});

module.exports = router;

