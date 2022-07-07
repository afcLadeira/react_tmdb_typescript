import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export type RegisterFormValues = {
  userName: string;
  password: string;
  password_confirm: string;
};

export interface RegisterFormProps {
  onFormSubmit: (data: RegisterFormValues) => void;
}

export default function RegisterForm({ onFormSubmit }: RegisterFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const watchAllFields = watch();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) =>
    onFormSubmit(data);

  return (
    <div style={{ maxWidth: 400 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="userName"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Group className="mb-3" controlId="userName">
              <Form.Control
                isInvalid={!!errors.userName}
                as="input"
                type="text"
                //ref={ref}
                placeholder="user name"
                {...register("userName", {
                  required: "This is required",
                })}
                //feedback="Error"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName && errors.userName.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                isInvalid={!!errors.password}
                as="input"
                type="password"
                placeholder="password"
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters",
                  },
                })}
                // feedback="Error"
                // ref={ref}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Group className="mb-3" controlId="password_confirm">
              <Form.Control
                isInvalid={!!errors.password_confirm}
                as="input"
                type="password"
                placeholder="confirm password"
                {...register("password_confirm", {
                  validate: (value) =>
                    value === watchAllFields.password ||
                    "The passwords do not match",
                })}
                // feedback="Error"
                //ref={ref}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password_confirm && errors.password_confirm.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
