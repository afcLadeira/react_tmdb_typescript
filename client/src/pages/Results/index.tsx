import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import MySpinner from "../../components/Spinner";
import Badge from "react-bootstrap/Badge";
import { getSearchEndpoint } from "../../constants";
import { useSearchInfo } from "../../api/search";

interface LocationState {
  multi: boolean;
}

export default function Results() {
  let navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const searchString = searchParams.get("search");

  const location = useLocation();
  const params = location.state as LocationState;

  //const { state: params } = useLocation();

  useEffect(() => {
    if (!searchString || !params) {
      navigate("/");
    }
  }, [searchString, navigate, params]);

  const search_url =
    !params || params.multi === undefined
      ? null
      : getSearchEndpoint(params.multi, searchString!);

  const { isLoading, error, data } = useSearchInfo(
    search_url!,
    searchString,
    params.multi
  );

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (isLoading) {
    <MySpinner></MySpinner>;
  }

  return (
    <div>
      {data ? (
        <div style={{ textAlign: "center" }}>
          <h3>
            Total results for <Badge bg="primary">{searchString}</Badge>:{" "}
            {data.total_results}
          </h3>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {data &&
          data.results.map((item) => (
            <MovieCard key={item.id} movie={item}></MovieCard>
          ))}
      </div>
    </div>
  );
}
