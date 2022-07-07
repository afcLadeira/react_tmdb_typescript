import MovieCard from "../MovieCard";
import MySpinner from "../Spinner";
import Badge from "react-bootstrap/Badge";
import { getSearchEndpoint } from "../../constants";
import { useSearchInfo } from "../../api/search";
import { Heading2 } from "../../styles";
import { MovieInterface } from "../../interfaces";

interface SearchResultsProps {
  searchString: string | null;
  multi: boolean | undefined | null;
}

export default function SearchResults({
  searchString,
  multi,
}: SearchResultsProps) {
  const search_url =
    multi === null || !searchString
      ? ""
      : getSearchEndpoint(multi, searchString);

  const { isLoading, error, data } = useSearchInfo(
    search_url,
    searchString,
    multi
  );

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (isLoading) {
    <MySpinner></MySpinner>;
  }

  if (!searchString) return null;

  return (
    <div data-testid="childComponent">
      <h1 data-testid="displaySearchOtherComponent">{searchString}</h1>
      {data ? (
        <div style={{ textAlign: "center" }}>
          <Heading2>Search Results</Heading2>
          <h5>
            {data.total_results} results for{" "}
            <Badge bg="primary">{searchString}</Badge>
          </h5>
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
          data.results.map((item: MovieInterface) => (
            <MovieCard key={item.id} movie={item}></MovieCard>
          ))}
      </div>
    </div>
  );
}
