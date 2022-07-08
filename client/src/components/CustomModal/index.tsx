import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGetMyLists } from "../../api/lists";
import useAuth from "../../hooks/useAuth";
import MySpinner from "../Spinner";

export interface CustomModalProps {
  modalOpen: boolean;
  toggle: () => void;
  onSelect: (idList: string) => void;
}

export default function CustomModal({
  modalOpen,
  toggle,
  onSelect,
}: CustomModalProps) {
  const [selected, setSelected] = useState<string>("");

  const { auth } = useAuth();
  const [userId] = useState<number | undefined>(auth?.id ? auth.id : undefined);

  const {
    error,
    data: lists,
    isLoading,
  } = useGetMyLists(`/api/users/${userId}/lists`, userId);

  const handleToggle = () => toggle();

  const handleSelect = (e: React.FormEvent) => {
    let idList = (e.target as HTMLSelectElement).value;
    setSelected(idList);
  };

  if (error) return <div>{JSON.stringify(error)}</div>;

  if (isLoading) return <MySpinner></MySpinner>;

  return (
    <>
      <Modal show={modalOpen} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Select list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {isLoading && <MySpinner></MySpinner>}

            {lists && (
              <Form.Select onChange={handleSelect}>
                <option>Select a list</option>
                {lists.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onSelect(selected)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}