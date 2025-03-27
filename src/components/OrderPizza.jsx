import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
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
import Footer from "./Footer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function PizzaParticle() {
  return (
    <FontAwesomeIcon
      className="pizzaicon"
      icon={faPizzaSlice}
      style={{ color: "#FFD43B", fontSize: "50px" }} // İkon büyüklüğü
    />
  );
}

export default function OrderPizza() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  const initialValue = {
    pizzaname: `${orderData?.adı || "Position Absolute Acı Pizza"}`,
    boyut: "",
    hamur: "",
    malzemeler: [],
    isim: "",
    adres: "",
    siparisnotu: "",
    adet: 1,
    basePrice: orderData?.fiyatı || 85.5,
    extraPrice: 0,
    totalPrice: orderData?.fiyatı || 85.5,
  };

  const [formData, setFormData] = useState(initialValue);

  // Adet değiştiriciler

  const arttir = () => {
    setFormData((oldState) => {
      const newState = {
        ...oldState,
        adet: oldState.adet + 1,
      };
      const prices = calculatePrices(newState);
      return {
        ...newState,
        ...prices,
      };
    });
  };

  const azalt = () => {
    if (formData.adet > 1) {
      setFormData((oldState) => {
        const newState = {
          ...oldState,
          adet: oldState.adet - 1,
        };
        const prices = calculatePrices(newState);
        return {
          ...newState,
          ...prices,
        };
      });
    }
  };

  const calculatePrices = (formData) => {
    const extraPrice = formData.malzemeler.length * 5.0;
    const totalPrice = (formData.basePrice + extraPrice) * formData.adet;
    return { extraPrice, totalPrice };
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedHamur, setSelectedHamur] = useState("-Hamur Kalınlığı Seç-");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    axios
      .post("https://reqres.in/api/pizza", formData)
      .then((r) => {
        console.log("Giden data:", formData);
        console.log("Sipariş Özeti:", r.data);
        history.push({
          pathname: "/success",
          state: { orderData: formData },
        });
      })
      .catch((e) => console.log(e));
  };

  const onHandleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedMalzemeler = checked
        ? [...formData.malzemeler, name]
        : formData.malzemeler.filter((i) => i !== name);

      setFormData((prevState) => {
        const newState = {
          ...prevState,
          malzemeler: updatedMalzemeler,
        };
        const prices = calculatePrices(newState);
        return {
          ...newState,
          ...prices,
        };
      });

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

  function SizeSelector() {
    const sizes = ["S", "M", "L"];
    const selectedSize = formData.boyut; // Form state'inden güncel boyutu al

    const handleClick = (size) => {
      setFormData((prev) => ({
        ...prev,
        boyut: size,
      }));
    };

    return (
      <div className="sizeCover">
        {sizes.map((size) => (
          <button
            key={size}
            id={size}
            data-cy={size}
            data-selected={selectedSize === size}
            name="boyut"
            value={size}
            onClick={() => handleClick(size)}
            className="size-button"
          >
            {size}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="maindiv">
      <header>
        <img src="../images/iteration-1-images/logo.svg" />
      </header>
      <div className="ust">
        <div className="ustic">
          <img src="../images/iteration-2-images/pictures/form-banner.png" />

          <nav className="nav">
            <NavLink to="/">Anasayfa</NavLink>
            <span>-</span>
            <NavLink to="/menu">Seçenekler</NavLink>
            <span>-</span>

            <NavLink to="/orderpizza">
              <span style={{ color: "red" }}>Sipariş Oluştur</span>
            </NavLink>
          </nav>

          <h3 className="anabaslik">
            {orderData?.adı || "Position Absolute Acı Pizza"}
          </h3>
          <div className="fiyat">
            <p className="para">{orderData?.fiyatı || "85.50"}₺</p>

            <div className="rating">
              <p>{orderData?.rating || "4.9"}</p>
              <p>({orderData?.yorum || "200"})</p>
            </div>
          </div>

          <p style={{ color: "#5F5F5F" }}>
            {orderData?.icerigi.trim() ||
              "Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir."}
          </p>
        </div>
      </div>
      <div className="dis">
        {/*Seçimler Section */}
        <section className="secimler">
          {/*Boyut Section */}
          <section className="boyutSec">
            <p className="titles">
              Boyut Seç<span style={{ color: "red" }}> *</span>
            </p>
            <div className="boyutlar">
              <SizeSelector />
            </div>
          </section>

          {/*Hamur Section */}
          <section>
            <p className="titles">
              Hamur Seç<span style={{ color: "red" }}> *</span>
            </p>

            <Dropdown data-cy="hamur" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="hmr" caret>
                {" "}
                {selectedHamur}
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setSelectedHamur("Süpper İnce");
                    onHandleChange({
                      target: {
                        name: "hamur",
                        value: "Süpper İnce",
                      },
                    });
                  }}
                >
                  Süpper İnce
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setSelectedHamur("İnce");
                    onHandleChange({
                      target: {
                        name: "hamur",
                        value: "İnce",
                      },
                    });
                  }}
                >
                  İnce
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedHamur("Orta");
                    onHandleChange({
                      target: {
                        name: "hamur",
                        value: "Orta",
                      },
                    });
                  }}
                >
                  Orta
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedHamur("Kalın");
                    onHandleChange({
                      target: {
                        name: "hamur",
                        value: "Kalın",
                      },
                    });
                  }}
                >
                  Kalın
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setSelectedHamur("Extra Kalın");
                    onHandleChange({
                      target: {
                        name: "hamur",
                        value: "Extra Kalın",
                      },
                    });
                  }}
                >
                  Extra Kalın
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </section>
        </section>

        {/*Malzemeler Section */}
        <section>
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
           
             
               
               
                <Label className="malzeme-adi" for={malzeme} check>
                <input
                  onChange={onHandleChange}
                  name={malzeme}
                  value={malzeme}
                  id={malzeme}
                  data-cy={malzeme}
                  type="checkbox"
                />  <b>{malzeme}</b>
                </Label>


            ))}
          </Form>
        </section>

        {/*Isim, adres ve not Section*/}
        <section className="notlar">
          <Label for="isim" className="titles">
            İsim<span style={{ color: "red" }}> *</span>
            <Input
              style={{
                background: "#FAF7F2",
                marginTop: "1rem",
                padding: "1rem",
                borderColor: "#FFFFFF",
              }}
              onChange={onHandleChange}
              name="isim"
              id="isim"
              type="text"
              data-cy="isim"
              value={formData.isim}
              invalid={errors.isim}
              placeholder="İsmini yaz"
            />
            {errors.isim && <FormFeedback>{errorMessages.isim}</FormFeedback>}
          </Label>

          <Label for="adres" className="titles">
            Adres<span style={{ color: "red" }}> *</span>
            <Input
              style={{
                background: "#FAF7F2",
                marginTop: "1rem",
                padding: "1rem",
                borderColor: "#FFFFFF",
              }}
              name="adres"
              id="adres"
              data-cy="adres"
              onChange={onHandleChange}
              type="text"
              value={formData.adres}
              invalid={errors.adres}
              placeholder="Sipariş adresini gir"
            />
            {errors.adres && <FormFeedback>{errorMessages.adres}</FormFeedback>}
          </Label>

          <Label for="siparisnotu" className="titles">
            Sipariş Notu
            <Input
              style={{
                background: "#FAF7F2",
                marginTop: "1rem",
                padding: "1rem",
                borderColor: "#FFFFFF",
              }}
              onChange={onHandleChange}
              id="siparisnotu"
              value={formData.siparisnotu}
              name="siparisnotu"
              data-cy="siparisnotu"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              type="text"
            />
          </Label>
        </section>

        <div style={{ borderBottom: "1px solid gray", margin: "10px 0" }}></div>

        {/*Sipariş Fiyatı*/}
        <section className="siparisbottom">
          <ButtonGroup>
            <Button onClick={azalt} data-cy="azalt" className="adetbtn">
              <b>-</b>
            </Button>
            <span
              className="sayi"
              style={{ background: "#FAF7F2", padding: "1rem" }}
            >
              <b>{formData.adet}</b>
            </span>
            <Button onClick={arttir} data-cy="arttır" className="adetbtn">
              <b>+</b>
            </Button>
          </ButtonGroup>

          <div className="siparistoplam">
            <div className="s2">
              <p className="titles">Sipariş Toplamı</p>

              <div className="price">
                <span>Seçimler</span>
                <span>{formData.extraPrice}₺</span>
              </div>

              <div className="price" style={{ color: "#CE2829" }}>
                <span>Toplam</span>
                <span>{formData.totalPrice}₺</span>
              </div>
            </div>
            <Button
              disabled={!isValid}
              name="submit"
              data-cy="submit"
              onClick={handleSubmit}
              className="siparisbutton"
            >
              <b>SİPARİŞ VER</b>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
