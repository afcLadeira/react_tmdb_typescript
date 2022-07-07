import { useParams } from "react-router-dom";
import { useGetAllPersonInfo } from "../../api/person";
import PersonCredits from "../../components/PersonCredits";
import PersonDetails from "../../components/PersonDetails";
import MySpinner from "../../components/Spinner";
import {
  getPersonDetailsEndpoint,
  getPersonMovieCreditsEnpoint,
  getPersonTVCreditsEnpoint,
} from "../../constants";

export default function Person() {
  let { id } = useParams();

  const [{ isLoading, data }, { data: tv_credits }, { data: movie_credits }] =
    useGetAllPersonInfo(
      id,
      getPersonDetailsEndpoint(id),
      getPersonTVCreditsEnpoint(id),
      getPersonMovieCreditsEnpoint(id)
    );

  if (isLoading) {
    return <MySpinner></MySpinner>;
  }

  return (
    <>
      {data && <PersonDetails data={data}></PersonDetails>}
      {movie_credits && (
        <PersonCredits credits={movie_credits} type="movie"></PersonCredits>
      )}
      {tv_credits && (
        <PersonCredits credits={tv_credits} type="tv"></PersonCredits>
      )}
    </>
  );
}
