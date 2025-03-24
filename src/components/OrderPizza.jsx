import React, { useEffect } from "react";
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
  FormFeedback,
} from "reactstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function OrderPizza() {
  const initialValue = {
    boyut: "",
    hamur: "",
    malzemeler: [],
    isim: "",
    adres: "",
    siparisnotu: "",
    adet: 1,
  };

  const [formData, setFormData] = useState(initialValue);

  let basePrice = 85.5;
  const extraPrice = () => formData.malzemeler.length * 5.0;
  const totalPrice = () => (basePrice + extraPrice())*formData.adet;

   
  // Adet değiştiriciler

const arttir = () =>{
setFormData(oldState => ({
...oldState , adet:oldState.adet + 1
}))
}

const azalt = () =>{
    if (formData.adet > 1) { 
setFormData(oldState => ({
...oldState , adet:oldState.adet - 1
}))
}}

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

  const [isValid, setIsValid] = useState(false);

  const [errors, setErrors] = useState({
    boyut: false,
    hamur: false,
    malzemeler: false,
    isim: false,
    adres: false,
  });

  const errorMessages = {
    boyut: "Pizza boyutunu seçmeniz gerekiyor.",
    hamur: "Pizza hamurunu seçmeyi unuttunuz!",
    malzemeler: "En az 4, en fazla 10 adet malzeme seçmeniz gerekiyor.",
    isim: "İsminizi yazmayı unuttunuz!",
    adres: "Sipariş adresiniz en az 10 karakter olmalı. ",
  };


  



  const onHandleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedMalzemeler = checked
        ? [...formData.malzemeler, name]
        : formData.malzemeler.filter((i) => i !== name);

      setFormData((prevState) => ({
        ...prevState,
        malzemeler: updatedMalzemeler,
      }));

      //Malzemeler Validasyonu
      if (updatedMalzemeler.length < 4 || updatedMalzemeler.length > 10) {
        setErrors((prev) => ({ ...prev, malzemeler: true }));
      } else {
        setErrors((prev) => ({ ...prev, malzemeler: false }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    //Validasyonlar

    //Boyut
    if (name === "boyut") {
      if (value !== "") {
        setErrors({ ...errors, boyut: false });
      }
    }

    //Hamur
    if (name === "hamur") {
      if (value !== "") {
        setErrors({ ...errors, hamur: false });
      }
    }

    //İsim
    if (name === "isim") {
      if (value.length < 3) {
        setErrors({ ...errors, isim: true });
      } else {
        setErrors({ ...errors, isim: false });
      }
    }

    //Adres
    if (name === "adres") {
      if (value.length < 10) {
        setErrors({ ...errors, adres: true });
      } else {
        setErrors({ ...errors, adres: false });
      }
    }

    console.log(errors);
  };

  useEffect(() => {
    if (
      formData.isim.length >= 3 &&
      formData.adres.length >= 10 &&
      formData.boyut !== "" &&
      formData.hamur !== "" &&
      formData.malzemeler.length >= 4 &&
      formData.malzemeler.length <= 10
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log("is form valid:", isValid);
    console.log(formData);
    console.log(errors);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
  };

  return (
    <div className="main">
      <header>
        <img src="../images/iteration-1-images/logo.svg" />
        <nav className="nav">
          <NavLink to="/">Anasayfa</NavLink>
          <span>-</span>
          <NavLink to="">Seçenekler</NavLink>
          <span>-</span>

          <NavLink to="/orderpizza">
            <b>Sipariş Oluştur</b>
          </NavLink>
        </nav>
      </header>

      <div className="container">
        <h3 className="anabaslik">Position Absolute Acı Pizza</h3>

        <div className="fiyat">
          <p className="para">{basePrice}₺</p>

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
              <Label for="küçük">
                <Input
                  onChange={onHandleChange}
                  id="küçük"
                  type="radio"
                  name="boyut"
                  value="küçük"
                />{" "}
                Küçük
              </Label>

              <Label for="orta">
                <Input
                  onChange={onHandleChange}
                  id="orta"
                  type="radio"
                  name="boyut"
                  value="orta"
                />{" "}
                Orta
              </Label>

              <Label for="büyük">
                <Input
                  onChange={onHandleChange}
                  id="büyük"
                  type="radio"
                  name="boyut"
                  value="büyük"
                />{" "}
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
                  <DropdownItem
                    onClick={() => {
                      setSelectedHamur("İnce Hamur");
                      onHandleChange({
                        target: {
                          name: "hamur",
                          value: "İnce Hamur",
                        },
                      });
                    }}
                  >
                    İnce Hamur
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setSelectedHamur("Orta Hamur");
                      onHandleChange({
                        target: {
                          name: "hamur",
                          value: "Orta Hamur",
                        },
                      });
                    }}
                  >
                    Orta Hamur
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setSelectedHamur("Kalın Hamur");
                      onHandleChange({
                        target: {
                          name: "hamur",
                          value: "Kalın Hamur",
                        },
                      });
                    }}
                  >
                    Kalın Hamur
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div>
          <p className="titles">
            Ek Malzemeler<span style={{ color: "red" }}> *</span>
          </p>
          <p style={{ color: "#5F5F5F" }}>
            En fazla 10 adet seçebilirsiniz. Her biri 5₺.
            {errors.malzemeler && (
              <p
                style={{
                  color: "#dc3545",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {errorMessages.malzemeler}
              </p>
            )}
          </p>

          <Form className="malzemeler">
            {malzemeler.map((malzeme) => (
              <FormGroup className="malzeme-grup" check inline>
                <Input
                  onChange={onHandleChange}
                  name={malzeme}
                  value={malzeme}
                  id={malzeme}
                  type="checkbox"
                />
                <Label for={malzeme} check>
                  <b>{malzeme}</b>
                </Label>
              </FormGroup>
            ))}
          </Form>
        </div>

        <FormGroup className="notlar">
          <Label for="isim" className="titles">
            İsim<span style={{ color: "red" }}> *</span>
            <Input
              onChange={onHandleChange}
              name="isim"
              id="isim"
              type="text"
              invalid={errors.isim}
              placeholder="İsmini yaz"
            />
            {errors.isim && <FormFeedback>{errorMessages.isim}</FormFeedback>}
          </Label>

          <Label for="adres" className="titles">
            Adres<span style={{ color: "red" }}> *</span>
            <Input
              name="adres"
              id="adres"
              onChange={onHandleChange}
              type="text"
              invalid={errors.adres}
              placeholder="Sipariş adresini gir"
            />
            {errors.adres && <FormFeedback>{errorMessages.adres}</FormFeedback>}
          </Label>

          <Label for="siparisnotu" className="titles">
            Sipariş Notu
          </Label>
          <Input
            onChange={onHandleChange}
            id="siparisnotu"
            name="siparisnotu"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            type="text"
          />
        </FormGroup>

        <div style={{ borderBottom: "1px solid gray", margin: "10px 0" }}></div>

        <div className="siparisbottom">
          <ButtonGroup>
            <Button  onClick={azalt} className="btn">-</Button>
            <span className="sayi">{formData.adet}</span>
            <Button onClick={arttir} className="btn">+</Button>
          </ButtonGroup>

          <div className="siparistoplam">
            <div className="s2">
              <p className="titles">Sipariş Toplamı</p>

              <div className="price">
                <span>Seçimler</span>
                <span>{extraPrice()}₺</span>
              </div>

              <div className="price" style={{ color: "#CE2829" }}>
                <span>Toplam</span>
                <span>{totalPrice()}₺</span>
              </div>
            </div>
            <Button
              disabled={!isValid}
              onClick={succes}
              className="siparisbutton"
            >
              <b>Sipariş Ver</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
