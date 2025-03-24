import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Form,
  Button,
  ButtonGroup,
} from "reactstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function OrderPizza() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedHamur, setSelectedHamur] = useState("Hamur Kalınlığı");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const malzemeler = [
    "Pepperoni",
    "Domates",
    "Biber",
    "Sosis",
    "Mısır",
    "Zeytin",
    "Kanada Jambonu",
    "Sucuk",
    "Ananas",
    "Tavuk Izgara",
    "Jalepeno",
    "Kabak",
    "Soğan",
    "Sarımsak",
  ];

  const history = useHistory();

  const succes = () => {
    history.push("/success");
  };

  return (
    <div className="main">
      <header>
      <img src="../images/iteration-1-images/logo.svg"/>
      <nav className="nav">
          <NavLink to="/">Anasayfa</NavLink>
          <span>-</span>
          <NavLink to="">Seçenekler</NavLink>
          <span>-</span>

          <NavLink to="/orderpizza">Sipariş Oluştur</NavLink>
        </nav>
      </header>

      <div className="container">
        <h3 className="anabaslik">Position Absolute Acı Pizza</h3>

        <div className="fiyat">
          <p className="para">85.50₺</p>

          <div className="rating">
            <p>4.9</p>
            <p>(200)</p>
          </div>
        </div>

        <p style={{ color: "#5F5F5F" }}>
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <div className="secimler">
          <div className="boyutSec">
            <p className="titles">
              Boyut Seç<span style={{ color: "red" }}> *</span>
            </p>

            <div className="boyutlar">
              <Label for="kucuk">
                <Input id="kucuk" type="radio" name="boyut" value="kucuk" />{" "}
                Küçük
              </Label>

              <Label for="orta">
                <Input id="orta" type="radio" name="boyut" value="orta" /> Orta
              </Label>

              <Label for="buyuk">
                <Input id="buyuk" type="radio" name="boyut" value="buyuk" />{" "}
                Büyük
              </Label>
            </div>
          </div>

          <div>
            <p className="titles">
              Hamur Seç<span style={{ color: "red" }}> *</span>
            </p>

            <div className="hamur">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret> {selectedHamur}</DropdownToggle>

                <DropdownMenu>
                  <DropdownItem onClick={() => setSelectedHamur("İnce Hamur")}>
                    İnce Hamur
                  </DropdownItem>
                  <DropdownItem onClick={() => setSelectedHamur("Orta Hamur")}>
                    Orta Hamur
                  </DropdownItem>
                  <DropdownItem onClick={() => setSelectedHamur("Kalın Hamur")}>
                    Kalın Hamur
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div>
          <p className="titles">Ek Malzemeler</p>
          <p style={{ color: "#5F5F5F" }}>
            En fazla 10 adet seçebilirsiniz. 5₺
          </p>

          <Form className="malzemeler">
            {malzemeler.map((malzeme) => (
              <FormGroup className="malzeme-grup" check inline>
                <Input id={malzeme} type="checkbox" />
                <Label for={malzeme} check>
                  <b>{malzeme}</b>
                </Label>
              </FormGroup>
            ))}
          </Form>
        </div>

        <FormGroup>
          <Label for="siparisnotu" className="titles">
            Sipariş Notu
          </Label>
          <Input
            id="siparisnotu"
            name="text"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            type="text"
          />
        </FormGroup>

        <div style={{ borderBottom: "1px solid gray", margin: "10px 0" }}></div>

        <div className="siparisbottom">
          <ButtonGroup>
            <Button className="btn">-</Button>
            <span className="sayi">1</span>
            <Button className="btn">+</Button>
          </ButtonGroup>

          <div className="siparistoplam">
            <div className="s2">
              <p className="titles">Sipariş Toplamı</p>

              <div className="price">
                <span>Seçimler</span>
                <span>25.00₺</span>
              </div>

              <div className="price" style={{ color: "#CE2829" }}>
                <span>Toplam</span>
                <span>110.50₺</span>
              </div>
            </div>
            <Button onClick={succes} className="siparisbutton">
              <b>Sipariş Ver</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
