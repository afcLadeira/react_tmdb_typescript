import { Button } from "../../styles";

interface ToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const Toggle = ({ theme, toggleTheme }: ToggleProps) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? "Dark mode" : "Light mode"}
    </Button>
  );
};
export default Toggle;
