import { Button, Form } from "react-bootstrap";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useCreateList } from "../../api/lists";
import useAuth from "../../hooks/useAuth";

type ListFormValues = {
  name: string;
  description: string;
};

export default function CreateListForm() {
  const { auth } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListFormValues>();

  const { mutate: createList } = useCreateList();

  const onFormSubmit: SubmitHandler<ListFormValues> = (data) => {
    let newList = {
      name: data.name,
      description: data.description,
      userId: auth.id,
      movies: [],
    };

    createList({ url: `/api/users/${auth.id}/lists`, list: newList });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form style={{ width: 500 }} onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                isInvalid={!!errors.name}
                as="input"
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "This is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Group className="mb-3" controlId="description">
              <Form.Control
                isInvalid={!!errors.description}
                as="textarea"
                rows={3}
                type="text"
                placeholder="Description"
                {...register("description", {
                  required: "This is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        />
        <Button variant="primary" size="sm" type="submit">
          {" "}
          Create List
        </Button>
      </Form>
    </div>
  );
}
