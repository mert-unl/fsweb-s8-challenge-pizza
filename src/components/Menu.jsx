import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {Card,CardText,Button, CardBody, CardSubtitle, CardTitle } from "reactstrap"


export default function Menu(){

  const initialValue = {
     adı: "",
     icerigi:"",
     fiyatı:0,
      rating:0,
     yorum:0
    }


    const pizzaList = [
      {
        adı: "Position Absolute Acı Pizza",
        icerigi:
          "Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre! Bir ısırık aldığında bile kodlarının akışkanlığını hissedeceksin. 🔥",
        fiyatı: 85.5,
        rating: 4.9,
        yorum: 200,
      },
      {
        adı: "Grid Sistem Pepperoni",
        icerigi:
          "Grid sistemini çözmeye çalışanlara özel! 12 dilimli bu pizza, CSS Grid gibi düzenli ve simetrik. Ama dikkat et, yanlış yerden kesersen hatalı alignment alabilirsin! 🍕",
        fiyatı: 110,
        rating: 4.7,
        yorum: 178,
      },
      {
        adı: "Flexbox Margarita",
        icerigi:
          "Flex-direction'ını yanlış anlayıp domatesleri ters koymaktan korkma! 🍅🍕 En uyumlu ve esnek pizza burada, tıpkı Flexbox gibi! 📏",
        fiyatı: 95,
        rating: 4.8,
        yorum: 230,
      },
      {
        adı: "Bug Dolması Pizza",
        icerigi:
          "İlk başta mükemmel görünüyor, ama bir ısırık aldığında içinden bir sürü bug çıkıyor! 🤯 Debug etmeyi sevenlere özel! 🐞",
        fiyatı: 85,
        rating: 4.5,
        yorum: 150,
      },
      {
        adı: "404 Not Found Pizza",
        icerigi:
          "Bu pizzayı sipariş ettin ama mutfakta bulunamadı! 😅 En iyi ihtimalle ekmek arası peynir geliyor. Denemek ister misin? 🤔",
        fiyatı: 70,
        rating: 4.0,
        yorum: 98,
      },
      {
        adı: "Dark Mode BBQ",
        icerigi:
          "Dark mode sevenler için özel! Simsiyah barbekü sosu ve kömürleşmiş kenarlarıyla tam bir karanlık tema lezzeti! 🌑🔥",
        fiyatı: 125,
        rating: 4.9,
        yorum: 320,
      },
      {
        adı: "Commit Pizza",
        icerigi:
          "Kod yazarken commit yapmayı unutanlara özel! Her dilimi yedikçe kendini daha düzenli hissettiren, versiyon kontrolüne alışman için hazırlanmış bir lezzet. 🍕🖥️",
        fiyatı: 105,
        rating: 4.6,
        yorum: 175,
      },
      {
        adı: "Refactor Special",
        icerigi:
          "Bu pizza öyle bir hazırlanmış ki, her dilimi daha optimize! Baştan sona refaktör edilmiş ve mükemmel bir lezzet dengesi sunuyor. 🔄",
        fiyatı: 115,
        rating: 4.8,
        yorum: 210,
      },
      {
        adı: "Hotfix Sucuklu",
        icerigi:
          "Aceleyle yapılmış bir hotfix kadar riskli ama bir o kadar da lezzetli! Yetiştirilmesi gereken deadline'ları olanlara özel bir pizza. 🚀",
        fiyatı: 90,
        rating: 4.5,
        yorum: 140,
      },
      {
        adı: "Infinite Loop Pizza",
        icerigi:
          "Bu pizzayı bir dilim alırsan duramazsın! 🍕 Sonsuza kadar yemek isteyeceğin bir lezzet. Aman dikkat, çıkış yolunu unutma! 🔁",
        fiyatı: 108,
        rating: 4.7,
        yorum: 190,
      },
      {
        adı: "Deprecated Pizza",
        icerigi:
          "Lezzeti hala güzel ama eski tarif! 🍕 Eskiden herkesin favorisi olan bu pizza, yerini daha modern tatlara bırakıyor ama nostalji sevenler için hala vazgeçilmez. 📜",
        fiyatı: 80,
        rating: 4.3,
        yorum: 125,
      },
      {
        adı: "AI-Generated Pizza",
        icerigi:
          "Bu pizzanın içeriğini AI belirledi! Ne geleceğini tam olarak bilmiyoruz ama bir ısırık almaya değer. 🤖🍕",
        fiyatı: 115,
        rating: 4.8,
        yorum: 250,
      },
      {
        adı: "Console Log Cheese",
        icerigi:
          "Ne zaman nerede bir hata alsan hemen console.log() atıyorsan, işte tam senlik bir pizza! 🍕 Debug yaparken yanında iyi gider. 🖥️",
        fiyatı: 100,
        rating: 4.7,
        yorum: 185,
      },
    ];

    const history = useHistory()
    const onClick = ()=>{
    history.push("/orderpizza")
    }




    return(

  <div className="mainmenu">
<header className="menu-header">
 <h1>Pizza Seçenekleri</h1>
 <h3>Menü</h3>
</header>

<body className="menu-body">

{pizzaList.map((pizza,index)=>{
return(
<Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src={`https://foodish-api.com/images/pizza/pizza${index+1}.jpg`}
    />
  <CardBody>
    <CardTitle tag="h5">
    {pizza.adı}
    </CardTitle>
    
    <CardSubtitle
      className="subtitle"
      tag="h6"
    >
      <span>{pizza.rating}</span> 
      <span>({pizza.yorum})
      </span>   
     </CardSubtitle>
  
    <CardText>
       {pizza.icerigi}
    </CardText>
    <Button onClick={onClick}>
      {pizza.fiyatı} ₺
    </Button>
  </CardBody>
</Card>
)
})}

 </body>

  </div>


    )

}