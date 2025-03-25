import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";

export default function Home() {
  const history = useHistory();

  function go() {
    history.push("/orderpizza");
  }

  return (
    <div className="home">
      <img src="../images/iteration-1-images/logo.svg" />

      <div>
        <span>KOD ACIKTIRIR </span>
        <span>PİZZA, DOYURUR</span>
      </div>

      <Button onClick={go} data-cy="acıktım" className="homebutton">
        ACIKTIM
      </Button>
    </div>
  );
}
