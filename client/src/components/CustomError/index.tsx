import Alert from "react-bootstrap/Alert";




export default function CustomError({error}:{ error :string | undefined}) {
  return (
    <div>
      <Alert key="danger" variant="danger">
        {error}
      </Alert>
    </div>
  );
}
