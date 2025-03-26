import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";

export default function Home() {
  const history = useHistory();

  function go() {
    history.push("/orderpizza");
  }

  function Mycard({ src, extra, yazi, color1 }) {
    return (
      <Card
        style={{
          backgroundImage: `url('${src}')`,
          width: "550px",
          height: "240px",
          backgroundSize: "cover",
          borderRadius: "12px",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <CardBody>
          <CardTitle
            style={{
              maxWidth: "300px",
              fontWeight: "500",
              fontSize: "2rem",
              color: `${color1}`,
            }}
          >
            <span style={{ color: "#CE2829" }}>{extra}</span>
            {yazi}
          </CardTitle>
          <button className="siparis">SİPARİŞ VER</button>{" "}
        </CardBody>
      </Card>
    );
  }

  function AltCard({ src, yazi }) {
    return (
      <Card
        style={{
          width: "250px",
          height: "400px",
          borderRadius: "10px",
        }}
      >
        <CardBody>
          <CardImg src={src} />
          <CardTitle>
            {yazi}
          </CardTitle>
        <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <span>4.9</span>
            <span>(200)</span>
            <span>60TL</span>
          </div>
        </CardBody>
      </Card>
    );
  }

  function TopButton({ src, isim }) {
    return (
      <button
        className="topbtn"
        style={{
          textAlign: "center",

          gap: "10px",
          padding: "0.5rem 1rem",
          display: "flex",
          backgroundColor: "white",
          border: "solid 1px white",
          borderRadius: "40px",
          flexDirection: "row",
        }}
      >
        <img src={src} />
        <p
          style={{
            textAlign: "center",
            fontWeight: "500",
            alignItems: "center",
            margin: "6px 0px 0px 0px",
          }}
        >
          {isim}
        </p>
      </button>
    );
  }

  return (
    <div>
      <div className="home">
        <img src="../images/iteration-1-images/logo.svg" />

        <div>
          <span
            style={{
              fontFamily: "Satisfy",
              marginTop: "1rem",
              color: "#fdc913",
              fontSize: "2rem",
            }}
          >
            fırsatı kaçırma
          </span>
          <span>KOD ACIKTIRIR </span>
          <span>PİZZA, DOYURUR</span>
        </div>

        <Button onClick={go} data-cy="acıktım" className="homebutton">
          ACIKTIM
        </Button>
      </div>

      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <TopButton
          src={"../images/iteration-2-images/icons/1.svg"}
          isim={"YENİ! Kore"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/2.svg"}
          isim={"Pizza"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/3.svg"}
          isim={"Burger"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/4.svg"}
          isim={"Kızartmalar"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/5.svg"}
          isim={"Fast food"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/6.svg"}
          isim={"Gazlı İçecek"}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "#FAF7F2",
          gap: "1rem",
          paddingTop: "4rem",
        }}
      >
        <Card
          style={{
            backgroundImage: `url('../images/iteration-2-images/cta/kart-1.png')`,
            width: "550px",
            height: "500px",
            backgroundSize: "cover",
            borderRadius: "12px",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <CardBody>
            <CardTitle
              style={{
                fontFamily: "Quattrocento",
                maxWidth: "250px",
                fontWeight: "bold",
                fontSize: "3rem",
                color: "white",
              }}
            >
              Özel Lezzetus
            </CardTitle>
            <CardText style={{ color: "white" }}>
              <b>Position: Absolute Acı Burger</b>
            </CardText>
            <button className="siparis">SİPARİŞ VER</button>{" "}
          </CardBody>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Mycard
            src={"../images/iteration-2-images/cta/kart-2.png"}
            yazi={"Hackathlon Burger Menü"}
            color1={"white"}
          />
          <Mycard
            src={"../images/iteration-2-images/cta/kart-3.png"}
            extra={"Çoooook"}
            yazi={" hızlı npm gibi kurye"}
            color1={"black"}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          paddingTop: "2rem",
          backgroundColor: "#FAF7F2",
        }}
      >
        <span
          style={{ fontFamily: "Satisfy", color: "#CE2829", fontSize: "2rem" }}
        >
          en çok paketlenen menüler
        </span>
        <h1>Acıktıran Kodlara Doyuran Lezzetler</h1>
      </div>

      <div
        style={{
          padding: "1rem",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "row",
          background: "#FAF7F2",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <TopButton
          src={"../images/iteration-2-images/icons/1.svg"}
          isim={"Ramen"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/2.svg"}
          isim={"Pizza"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/3.svg"}
          isim={"Burger"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/4.svg"}
          isim={"French fries"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/5.svg"}
          isim={"Fast food"}
        />
        <TopButton
          src={"../images/iteration-2-images/icons/6.svg"}
          isim={"Soft drinks"}
        />
      </div>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "row",
          background: "#FAF7F2",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <AltCard
          src={"../images/iteration-2-images/pictures/food-1.png"}
          yazi={"Terminal Pizza"}
        />

        <AltCard
          src={"../images/iteration-2-images/pictures/food-2.png"}
          yazi={"Ramen"}
        />

        <AltCard
          src={"../images/iteration-2-images/pictures/food-2.png"}
          yazi={"Ramen"}
        />
      </div>
    </div>
  );
}
