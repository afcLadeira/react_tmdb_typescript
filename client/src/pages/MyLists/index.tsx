import { useDeleteList, useGetMyLists } from "../../api/lists";
import { MOVIE_ROUTE, POSTER_URL } from "../../constants";
import useAuth from "../../hooks/useAuth";
import Accordion from "react-bootstrap/Accordion";
import { Image } from "react-bootstrap";
import CreateListForm from "../../components/CreateListForm";
import MySpinner from "../../components/Spinner";
import CustomError from "../../components/CustomError";
import noImage from "../../assets/noImage.png";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Heading2 } from "../../styles";

export default function MyLists() {
  let navigate = useNavigate();

  const { auth } = useAuth();

  const userId = auth.id;

  //const onSuccess = () => console.log("fetch end");

  const { error, data, isLoading } = useGetMyLists(
    `/api/users/${userId}/lists`,
    userId
  );

  const { mutate: deleteList } = useDeleteList();

  const handleDelete = (idList : string) => {
    deleteList(`/api/users/${userId}/lists/${idList}`);
  };

  if (error) {

    const errorString = JSON.stringify(error)
    return <CustomError error={errorString}></CustomError>;
  }

  if (isLoading) {
    return <MySpinner></MySpinner>;
  }

  return (
    <div>
      <CreateListForm></CreateListForm>
      <div style={{ padding: 20 }}>
        <Heading2>My Lists:</Heading2>
        <Accordion defaultActiveKey="0">
          {data &&
            data.map((list) => (
              <Accordion.Item key={list._id} eventKey={list._id}>
                <Accordion.Header>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 18, fontWeight: "bold" }}>
                        {list.name}
                      </span>
                      <span style={{ margin: "0 30px" }}>
                        {list.movies.length} movies
                      </span>
                      <p style={{ color: "grey" }}>{list.description}</p>
                    </div>
                    <div style={{ paddingRight: 10 }}>
                      {/* <span>edit</span> */}
                      <span onMouseDown={() => handleDelete(list._id)}>
                        <RiDeleteBin6Line size={'2em'} ></RiDeleteBin6Line>
                      </span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                    {list.movies.map((movie) => (
                      <div
                        onClick={() => navigate(`${MOVIE_ROUTE}${movie.id}`)}
                        className="zoom"
                        style={{ maxWidth: 100 }}
                        key={movie.id}
                      >
                        <Image
                          width="100px"
                          src={
                            movie.poster_path
                              ? `${POSTER_URL}${movie.poster_path}`
                              : noImage
                          }
                        ></Image>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
