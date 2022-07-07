
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import RegisterForm, { RegisterFormValues } from "../../components/FormRegister";
import { Heading1 } from "../../styles";

export default function Register() {

    const navigate = useNavigate()

  const onFormSubmit = async (data : RegisterFormValues ) => {
 
    try {

      await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });

       navigate('/login')

    } catch (error : any) {
      console.log(error);
      
      if (!error?.response) {
        console.log("no server response");
      } else if (error.response?.status === 409) {
        console.log("username taken");
      } else {
        console.log("registration failed");
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Heading1>Register</Heading1>
      <RegisterForm onFormSubmit={onFormSubmit}></RegisterForm>
    </div>
  );
}
