import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

import { QueryClient, QueryClientProvider } from "react-query";
import MovieCard from ".";
import { MyThemeProvider } from "../../context/ThemeProvider";
import { AuthProvider } from "../../context/AuthProvider";
import { MovieInterface } from "../../interfaces";
//import SearchResults from "../SearchResults";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

afterEach(cleanup);

jest.setTimeout(10000);

const movie: MovieInterface = {
  budget: 0,
  genres: [
    { id: 53, name: "Thriller" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
  ],
  homepage: "https://www.netflix.com/title/81393697",
  id: 975714,
  original_language: "en",
  original_title: "Collision",
  overview:
    "Over the course of one fateful day, a corrupt businessman and his socialite wife race to save their daughter from a notorious crime lord.",
  popularity: 2346.919,
  poster_path: "/4zsihgkxMZ7MrflNCjkD3ySFJtc.jpg",
  production_companies: [
    { id: 8464, logo_path: null, name: "Do Productions", origin_country: "" },
    {
      id: 90970,
      logo_path: null,
      name: "Citizen Skull Productions",
      origin_country: "US",
    },
    {
      id: 175325,
      logo_path: null,
      name: "Connect Channel",
      origin_country: "",
    },
    { id: 175326, logo_path: null, name: "Lucky Rhino", origin_country: "" },
    {
      id: 175327,
      logo_path: null,
      name: "The Milton Empire",
      origin_country: "",
    },
  ],
  //production_countries: [{ iso_3166_1: "ZA", name: "South Africa" }],
  release_date: "2022-06-16",
  revenue: 0,
  runtime: 99,
  // spoken_languages: [
  //   { english_name: "English", iso_639_1: "en", name: "English" },
  // ],
  status: "Released",
  tagline: "",
  title: "Collision",
  //video: false,
  vote_average: 6,
  vote_count: 58,
};

describe("Movie Card Component Tests", () => {
  function tree() {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <MyThemeProvider>
              <AuthProvider>
                <MovieCard movie={movie}></MovieCard>
              </AuthProvider>
            </MyThemeProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  test("add movie to favorites", async () => {
    tree();

    //  let favoritesButton = screen.getByText("+ Favorites")
    let favoritesButton = screen.getByRole("button", { name: "+ Favorites" });

    fireEvent.click(favoritesButton);

    await waitFor(async () => {
      expect(await screen.findByText("- Favorites")).toBeInTheDocument();
    });
  });

  test("send to dispatch", async () => {
    const removeFromFavorites = jest.fn();
    const mockOnClick = jest.fn();

    tree();

    let favoritesButton = screen.getByTestId("buttonremovefav");

    fireEvent.click(favoritesButton);

    await waitFor(async () => {
      expect(await screen.findByText("+ Favorites")).toBeInTheDocument();
    });
  });
});
