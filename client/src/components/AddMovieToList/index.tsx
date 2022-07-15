import { Button } from "react-bootstrap";

import { useAddMovieToList } from "../../api/lists";
import { useModal } from "../../hooks/useModal";
import { MovieInterface } from "../../interfaces";
import CustomModal from "../CustomModal";

export interface AddMovieToListProps {
  movie: MovieInterface;
}

const AddMovieToList = ({ movie }: AddMovieToListProps) => {
  let [modalOpen, setModalOpen, toggle] = useModal();

  const { mutate: addMovieToList } = useAddMovieToList();

  const handleClick = () => {
    toggle();
  };

  const onSelect = (idList: string) => {
    addMovieToList(
      { url: `/api/lists/${idList}`, movie },
      {
        onSuccess: async (data, context) => {
          setModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <CustomModal
        modalOpen={modalOpen}
        toggle={toggle}
        onSelect={onSelect}
      ></CustomModal>
      <Button variant="outline-warning" onClick={() => handleClick()}>
        + List
      </Button>
    </>
  );
}


export default AddMovieToList;
