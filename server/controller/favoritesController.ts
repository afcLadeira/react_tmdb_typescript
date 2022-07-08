import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/errorHelper";

const Favorite = require("../models/favorites");

const getAllFavoritesFromUser = async (req : Request, res : Response) => {
  try {
    const { userId } = req.params;

    const userFavorites = await Favorite.findOne({ userId: userId }).exec();

    res
      .status(200)
      .json(
        userFavorites
          ? userFavorites
          : { userId: Number(userId), favoriteMovies: [] }
      );
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};

const addFavorite = async (req : Request, res : Response) => {
  const movie = req.body;
  const { id: userId } = req.params;

  let favorite = await Favorite.findOne({ userId: userId }).exec();

  if (!favorite) {
    //create
    const create = await Favorite.create({
      userId: userId,
      favoriteMovies: [movie],
    });

    return res.status(204).json({ message: `No favorites matches ID.` });
  }

  favorite.favoriteMovies = [...favorite.favoriteMovies, movie];

  const result = await favorite.save();
  res.json(result);
};

const deleteFavorite = async (req : Request, res : Response) => {
  const { userId, movieId } = req.params;

  let favorite = await Favorite.findOne({ userId: userId }).exec();

  if (!favorite) {
    return res.status(204).json({ message: `No favorites matches ID.` });
  }

  favorite.favoriteMovies = [
    ...favorite.favoriteMovies.filter((mov : any) => mov.id != movieId),
  ];

  const result = await favorite.save();
  res.json(result);
};

module.exports = { getAllFavoritesFromUser, addFavorite, deleteFavorite };
