import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#161616",
        color: "white",
        justifyContent: "center",
      }}
    >
      <div className="footermain">
        <div className="a">
          <img
            src="../images/iteration-2-images/footer/logo-footer.svg"
            style={{ width: "80%", height: "60%" }}
          />

          <p>
            <img
              src={"../images/iteration-2-images/footer/icons/icon-1.png"}
              style={{ marginRight: "1rem" }}
            />
            380 Blueberry Road,Antalya Türkiye
          </p>
          <p>
            <img
              src={"../images/iteration-2-images/footer/icons/icon-2.png"}
              style={{ marginRight: "1rem" }}
            />
            aciktim@teknolojikyemekler.com
          </p>
          <p>
            <img
              src={"../images/iteration-2-images/footer/icons/icon-3.png"}
              style={{ marginRight: "1rem" }}
            />
            +90 599 591 90 99
          </p>
        </div>

        <div className="b">
          <h3>Hot Menu</h3>
          <p style={{ marginTop: "1.5rem" }}>Terminal Pizza</p>
          <p>5 Kişilik Hackathlon Pizza</p>
          <p>useEffect Tavuklu Pizza</p>
          <p>Beyaz Console Frosty</p>
          <p>Testler Geçti Mutlu Burger</p>
          <p>Position Absolute Acı Burger</p>
        </div>

        <div className="c">
          <h3 style={{ fontFamily: "Barlow" }}>Instagram</h3>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              maxWidth: "400px",
            }}
          >
            <img
              src="../images/iteration-2-images/footer/insta/li-0.png"
              className="imgs"
            />
            <img
              src="../images/iteration-2-images/footer/insta/li-1.png"
              className="imgs"
            />
            <img
              src="../images/iteration-2-images/footer/insta/li-2.png"
              className="imgs"
            />
            <img
              src="../images/iteration-2-images/footer/insta/li-3.png"
              className="imgs"
            />
            <img
              src="../images/iteration-2-images/footer/insta/li-4.png"
              className="imgs"
            />

            <img
              src="../images/iteration-2-images/footer/insta/li-5.png"
              className="imgs"
            />
          </div>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid gray", margin: "10px 0" }}></div>

      <p
        style={{
          margin: "0 16rem",
          padding: "1rem",
          fontSize: "1rem",
          fontFamily: "Barlow",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        © 2023 Teknolojik Yemekler. <FontAwesomeIcon icon={faTwitter} />
      </p>
    </div>
  );
}
