import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Card,
  CardText,
  Button,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardImg,
} from "reactstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

export default function Menu() {
  const initialValue = {
    adı: "",
    icerigi: "",
    fiyatı: 0,
    rating: 0,
    yorum: 0,
  };


  // Effekt deneme
  useEffect(() => {
    AOS.init({
      duration: 400,
      offset: 100,
    });
  }, []);

  const pizzaList = [
    {
      adı: "Position Absolute Acı Pizza",
      icerigi: "Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.",
      fiyatı: 85.5,
      rating: 4.9,
      yorum: 200,
    },
    {
      adı: "Grid Sistem Pepperoni",
      icerigi: "Grid sistemini çözmeye çalışanlara özel! 12 dilimli bu pizza, CSS Grid gibi düzenli ve simetrik. Pepperoni, mozzarella peyniri, domates sosu ve özel baharatlarla hazırlanan bu pizza, her dilimde mükemmel bir denge sunar. Odun ateşinde pişirilmiş ince hamuru ve çıtır kenarlarıyla frontend dünyasının karmaşık grid yapılarını anımsatır. Unutmayın, yanlış dilimlerseniz layout'unuz bozulabilir! 🍕📊",
      fiyatı: 110,
      rating: 4.7,
      yorum: 178,
    },
    {
      adı: "Flexbox Margarita",
      icerigi: "Flex-direction'ını yanlış anlayıp domatesleri ters koymaktan korkma! 🍅🍕 En uyumlu ve esnek pizza burada, tıpkı Flexbox gibi! Taze fesleğen yaprakları, sulu domatesler ve kremamsı mozzarella ile süslenmiş bu pizza, responsive tasarımın lezzetli bir yansımasıdır. Hamuru, tamamen doğal malzemelerle hazırlanır ve taş fırında özenle pişirilir. Flex-container'ınızı kaydırmadan önce bir dilim alın! 📏✨",
      fiyatı: 95,
      rating: 4.8,
      yorum: 230,
    },
    {
      adı: "Bug Dolması Pizza",
      icerigi: "İlk başta mükemmel görünüyor, ama bir ısırık aldığında içinden bir sürü bug çıkıyor! 🤯 Debug etmeyi sevenlere özel! Mantarlar, biberler ve sürpriz bir iç dolguyla hazırlanan bu pizza, her lokmada farklı bir 'hatayla' karşılaşmanızı sağlar. Ancak lezzeti o kadar bağımlılık yapar ki, tüm bug'ları görmezden gelirsiniz. Dikkat: Bu pizzayı yerken console.log() açık olsun! 🐞🔍",
      fiyatı: 85,
      rating: 4.5,
      yorum: 150,
    },
    {
      adı: "404 Not Found Pizza",
      icerigi: "Bu pizzayı sipariş ettin ama mutfakta bulunamadı! 😅 En iyi ihtimalle ekmek arası peynir geliyor. Domates sosu ve peynir dışında neredeyse hiçbir şey içermeyen bu minimalist pizza, kayıp dosyaların ve 404 sayfalarının ruh halini yansıtır. Ancak basitliğiyle şaşırtıcı derecede doyurucudur. Not: Pizzanın yanında bir de 'Back to Home' butonu servis edilir. 🤔🚀",
      fiyatı: 70,
      rating: 4.0,
      yorum: 98,
    },
    {
      adı: "Dark Mode BBQ",
      icerigi: "Dark mode sevenler için özel! Simsiyah barbekü sosu ve kömürleşmiş kenarlarıyla tam bir karanlık tema lezzeti! Özel olarak marine edilmiş dana eti, karamelize soğanlar ve füme peynirle süslenen bu pizza, gece kod yazarken gözlerinizi yormayan bir deneyim sunar. Hamuru aktif kömür tozuyla siyaha boyanmıştır. Dikkat: Aydınlık modda yemeyin, lezzet kaybolabilir! 🌑🔥",
      fiyatı: 125,
      rating: 4.9,
      yorum: 320,
    },
    {
      adı: "Commit Pizza",
      icerigi: "Kod yazarken commit yapmayı unutanlara özel! Her dilimi yedikçe kendini daha düzenli hissettiren, versiyon kontrolüne alışman için hazırlanmış bir lezzet. Dilimler arasında farklı malzemeler (mantar, pepperoni, biber) kullanılarak her lokmada yeni bir 'commit' keşfedersiniz. Hamuru, tam tahıllı unla hazırlanır ve her dilimde 'git add .' hissi yaşatır. 🍕🖥️",
      fiyatı: 105,
      rating: 4.6,
      yorum: 175,
    },
    {
      adı: "Refactor Special",
      icerigi: "Bu pizza öyle bir hazırlanmış ki, her dilimi daha optimize! Baştan sona refaktör edilmiş ve mükemmel bir lezzet dengesi sunuyor. İlk versiyonunda fazla malzeme yüklüyken, şimdi sadece en temel ve kaliteli içeriklerle (İtalyan domatesleri, taze mozzarella, organik fesleğen) hazırlanır. Pişirme süreci bile CI/CD pipeline gibi otomatize edilmiştir. 🔄🍅",
      fiyatı: 115,
      rating: 4.8,
      yorum: 210,
    },
    {
      adı: "Hotfix Sucuklu",
      icerigi: "Aceleyle yapılmış bir hotfix kadar riskli ama bir o kadar da lezzetli! Yetiştirilmesi gereken deadline'ları olanlara özel bir pizza. Geleneksel Türk sucuğu, acı biber ve kaşar peyniriyle hızlıca hazırlanır. Bazen yanık çıkabilir, bazen hamuru çiğ kalabilir ama müşteri (mideniz) mutlaka doyurulur. Uyarı: Yedikten sonra 'git push --force' yapma dürtüsü oluşabilir. 🚀🌶️",
      fiyatı: 90,
      rating: 4.5,
      yorum: 140,
    },
    {
      adı: "Infinite Loop Pizza",
      icerigi: "Bu pizzayı bir dilim alırsan duramazsın! � Sonsuza kadar yemek isteyeceğin bir lezzet. Özel bir peynir kombinasyonu (cheddar, mozzarella, parmesan) ve baharatlı domates sosuyla hazırlanır. Her ısırıkta aynı tadı alırsınız ama asla sıkılmazsınız. Dikkat: while(true) döngüsüne girebilirsiniz! Pizzayı kesmek için özel bir 'break' bıçağı servis edilir. 🔁🍕",
      fiyatı: 108,
      rating: 4.7,
      yorum: 190,
    },
    {
      adı: "Deprecated Pizza",
      icerigi: "Lezzeti hala güzel ama eski tarif! 🍕 Eskiden herkesin favorisi olan bu pizza, yerini daha modern tatlara bırakıyor. Konserve malzemeler, dondurulmuş sebzeler ve 90'ların pizza kültürünü yansıtan bir sosla hazırlanır. Nostalji sevenler için hala vazgeçilmez olsa da, yeni nesil geliştiriciler 'Bu artık çalışmıyor' diyebilir. Not: Documentasyonu yoktur. 📜🧓",
      fiyatı: 80,
      rating: 4.3,
      yorum: 125,
    },
    {
      adı: "AI-Generated Pizza",
      icerigi: "Bu pizzanın içeriğini AI belirledi! Ne geleceğini tam olarak bilmiyoruz ama bir ısırık almaya değer. Yapay zeka tarafından optimize edilmiş malzeme kombinasyonları (örneğin: ananas + zeytin + çikolata sosu) içerebilir. Hamuru, makine öğrenmesi algoritmalarıyla yoğrulmuştur. Sonuç bazen şaşırtıcı, bazen korkutucu olabilir ama asla sıradan değildir. 🤖🍍",
      fiyatı: 115,
      rating: 4.8,
      yorum: 250,
    },
    {
      adı: "Console Log Cheese",
      icerigi: "Ne zaman nerede bir hata alsan hemen console.log() atıyorsan, işte tam senlik bir pizza! 🍕 Debug yaparken yanında iyi gider. Üzerinde 'Error: Delicious not found' gibi eğlenceli mesajlar yazan peynirlerle süslenmiştir. Her dilimde farklı bir 'log level' (pepperoni=ERROR, mantar=WARN) keşfedersiniz. Dikkat: Pizzayı yerken devtools açık olsun! 🖥️🔧",
      fiyatı: 100,
      rating: 4.7,
      yorum: 185,
    },
  ];

  const history = useHistory();

  function MenuCards({ onClick, src, isim, yazi, rating, yorum, fiyat,dataCy }) {
    return (
      <Card
        style={{
          width: "400px",
          backgroundColor: "#ffffff",
          padding: "0.5rem",
          borderColor: "white",
          borderRadius: "12px",
        }}
      >
        <CardBody>
          <CardImg
            style={{ minWidth: "300px", minHeight: "150px" }}
            src={src}
          />
          <CardTitle
            style={{
              fontWeight: "600",
              fontSize: "1.1rem",
              textAlign: "start",
              marginTop: "1rem",
              fontFamily: "Barlow",
            }}
          >
            {isim}
          </CardTitle>
          <div
            style={{
              textAlign: "start",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <span style={{ fontWeight: "500" }}>{rating}</span>
            <span style={{ fontWeight: "500" }}>({yorum})</span>
            <span
              style={{ marginLeft: "2rem", color: "black", fontWeight: "bold" }}
            >
              {fiyat}₺
            </span>
          </div>
          <CardText
            style={{
              fontSize: "0.9rem",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {yazi}
          </CardText>
        </CardBody>
        <Button data-cy={dataCy} className="homebutton" onClick={onClick}>
          Sipariş Ver
        </Button>
      </Card>
    );
  }

  const onClick = (selectedPizza) => {
    history.push({
      pathname: "/orderpizza",
      state: { orderData: selectedPizza },
    });
  };

  return (
    <div className="mainmenu">
      
      <header className="menu-header">
        <img src="../images/iteration-1-images/logo.svg" />
        <span
          style={{
            fontFamily: "Satisfy",
            marginTop: "2rem",
            color: "#fdc913",
            fontSize: "2rem",
          }}
        >
          Menü{" "}
        </span>

        <nav className="nav" style={{ justifyContent: "center" }}>
          <NavLink to="/" style={{ color: "white" }}>
            Anasayfa
          </NavLink>
          <span>-</span>
          <NavLink to="/menu" style={{ color: "#fdc913" }}>
            Seçenekler
          </NavLink>
          <span>-</span>

          <NavLink to="/orderpizza">
            <span style={{ color: "white" }}>Sipariş Oluştur</span>
          </NavLink>
        </nav>
      </header>

      <body className="menu-body">
        {pizzaList.map((pizza, index) => {
          const animation = index % 2 === 0 ? "fade-up" : "fade-down";
          return (
            <div 
            data-aos={animation}
            data-aos-delay={index * 100}
            key={index}
          >
            <MenuCards
              onClick={() => onClick(pizza)}
              key={index} // Listelerde key kullan
              src={`https://foodish-api.com/images/pizza/pizza${index + 1}.jpg`}
              isim={pizza.adı}
              yazi={pizza.icerigi}
              rating={pizza.rating}
              yorum={pizza.yorum}
              fiyat={pizza.fiyatı}
              dataCy={index}
            />
          </div>
          );
        })}
      </body>
    </div>
  );
}
