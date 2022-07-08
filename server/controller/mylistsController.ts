import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/errorHelper";

const List = require("../models/lists");

const getAllListsFromUser = async (req : Request, res : Response) => {
  try {
  

    const { userId } = req.params;

    const userLists = await List.find({ userId: userId }).exec();

    res.status(200).json(userLists);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};

const createList = async (req : Request, res : Response) => {
  const list = req.body;
 

  list.movies = [];

  try {
    // const result = await List.create({
    //     name: "test",
    //     description: "teste description",
    //     userId : 25,
    //     movies: []
    // });
    const result = await List.create(list);

    res.status(201).json(result);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const updateList = async (req : Request, res : Response) => {
  const { userId, id } = req.params;
  const updatedList = req.body;

  let list = await List.findOne({ _id: id }).exec();
  if (!list) {
    return res
      .status(204)
      .json({ message: `No list matches ID ${req.body.id}.` });
  }

  list.name = updatedList.name;
  list.description = updatedList.description;
  list.movies = updatedList.movies;

  const result = await list.save();
  res.json(result);
};

const updateListMovies = async (req : Request, res : Response) => {
  const { id } = req.params;
  const movie = req.body;

  let list = await List.findOne({ _id: id }).exec();

  if (!list) {
    return res.status(204).json({ message: `No list matches ID ${id}.` });
  }

  list.movies = [...list.movies, movie];

  const result = await list.save();
  res.json(result);
};

const deleteList = async (req : Request, res : Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "List ID required." });

  const listFromDB = await List.findOne({ _id: id }).exec();

  if (!listFromDB) {
    return res.status(204).json({ message: `No list matches ID ${id}.` });
  }
  const result = await listFromDB.deleteOne();
  res.json(result);
};

module.exports = {
  getAllListsFromUser,
  createList,
  updateList,
  deleteList,
  updateListMovies,
};
