import Button from "react-bootstrap/Button";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Credits from "../../components/Credits";
import MySpinner from "../../components/Spinner";
import TVShowDetails from "../../components/TVShowDetails";
import { getTVCreditsEndpoint, getTVDetailsEndpoint } from "../../constants";
import { useGetTvDetailsAndCredits } from "../../api/tvshow";
import { axiosFetch } from "../../api/fetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function TVShow() {
  let { id } = useParams();
  const queryClient = useQueryClient();

  const axiosPrivate = useAxiosPrivate();

  const [
    { isLoading, error, data, refetch },
    {
      isLoading: isLoadingCredits,
      error: errorCredits,
      data: credits,
      refetch: refetchCredits,
    },
  ] = useGetTvDetailsAndCredits(
    id,
    getTVDetailsEndpoint(id),
    getTVCreditsEndpoint(id)
  );

  const runQuery = () => {
    queryClient.fetchQuery(["tvshow", id], async () =>
      axiosFetch(getTVDetailsEndpoint(id), axiosPrivate)
    );
    queryClient.fetchQuery(["tvshow_credits", id], async () =>
      axiosFetch(getTVCreditsEndpoint(id), axiosPrivate)
    );
  };

  const refreshTv = () => {
    refetch();
    refetchCredits();
  };

  if (isLoading || isLoadingCredits) {
    return <MySpinner></MySpinner>;
  }

  if (error || errorCredits) {
    return <p>ERROR: {JSON.stringify(error)}</p>;
  }

  return (
    <>
      <h6>Not fetching on mount for testing purposes.</h6>
      <Button onClick={() => runQuery()}>Fetch using queryClient</Button>
      <Button style={{ marginLeft: 50 }} onClick={() => refreshTv()}>
        Fetch using refresh
      </Button>
      {data && <TVShowDetails data={data}></TVShowDetails>}
      {credits && <Credits credits={credits}></Credits>}
    </>
  );
}
