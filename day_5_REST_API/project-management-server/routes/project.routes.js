// const express = require('express')
// counst router = express.Router()
const router = require("express").Router();
const Project = require("../models/Project.model");

router.post("/projects", async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newProject = await Project.create({
      title,
      description,
      tasks: [],
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET all projects

router.get("/projects", async (req, res, next) => {
  try {
    const allProjects = await Project.find();

    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error);
  }
});

// Get by id

router.get("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const singleProject = await Project.findById(projectId).populate("tasks");

    res.status(200).json(singleProject);
  } catch (error) {
    console.error(error);
  }
});

router.put("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        title,
        description,
      },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;

    await Project.findOneAndDelete(projectId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
