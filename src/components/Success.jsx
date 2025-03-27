import { useLocation } from "react-router-dom";
import Footer from "./Footer";


export default function Success() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  return (
    <div  className="succesPage">
      <img src="../images/iteration-1-images/logo.svg" />

    
        <span className="s1y">lezzetin yolda</span>
        <span className="s2t">SİPARİŞ ALINDI</span>

        <div style={{ width:"25%",color:"white",borderBottom: "1px solid white", margin:"10px 0"}}></div>

      <h5 style={{marginTop:"20px"}}>{orderData?.pizzaname  || "PosiaAbsolute Acı Pizza"}</h5>

      <div className="icerik">
        <p>
          Boyut: <b>{orderData?.boyut}</b>
        </p>
        <p>
          Hamur: <b>{orderData?.hamur}</b>
        </p>
        <p>
          Ek Malzemeler: <b>{orderData?.malzemeler.join(", ")}</b>
        </p>
      </div>

      <div className="sstm">

        <h6>Sipariş Toplamı</h6>
        <div className="sf">
          <span>Seçimler</span>
          <span>{orderData?.extraPrice}₺</span>
        </div>

        <div className="sf">
          <span>Toplam</span>
          <span>{orderData?.totalPrice}₺</span>
        </div>
      </div>
    
    </div>
   
  );
}
