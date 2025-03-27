describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});


describe("Ana Sayfa kontrolleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Ana sayfa görünüyor", () => {
    //Home sayfası kontrolleri
    cy.contains("KOD ACIKTIRIR").should("be.visible");
    cy.get('[data-cy="acıktım"]').should("be.visible");
  });

  it("ACIKTIM butonuna tıklandığında Menü sayfasına yönlendiriliyor", () => {
    cy.get('[data-cy="acıktım"]').click();
    cy.url().should("include", "/menu");
  });

  it("Sipariş ver butonuna tıklandığında Sipariş oluştur sayfasına yönlendiriliyor", () => {
    cy.get('[data-cy="homesiparis"]').click();
    cy.url().should("include", "/orderpizza");
  });

});

describe("Pizza testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="acıktım"]').should("be.visible");
    cy.get('[data-cy="acıktım"]').click();
    cy.get('[data-cy="1"]').scrollIntoView().click();
  });

  it("Buton ilk olarak disabled", () => {
    cy.get('[data-cy="submit"]').should("be.disabled");
  }); 

  it("Tüm malzemeler ve özellikler seçilip 'Success' sayfasına yönlendiriyor", () => {
    cy.get('[data-cy="L"]').click();
    cy.get('[data-cy="hamur"]').click();
    cy.contains("Extra Kalın").click();
    /* 5 adet seçiliyor*/
    cy.contains("Zeytin").click();
    cy.contains("Sosis").click();
    cy.contains("Soğan").click();
    cy.contains("Jalepeno").click();
    cy.contains("Ananas").click();

    cy.get('[data-cy="isim"]').type("Mert Ünal");
    cy.get('[data-cy="adres"]').type("Sur Yapı Antalya Türkiye");
    cy.get('[data-cy="siparisnotu"]').type("Zile basmayın lütfen!");
    cy.get('[data-cy="submit"]').should("be.enabled");
    cy.get('[data-cy="submit"]').click();
    cy.contains("SİPARİŞ ALINDI");
  });

  it("İsim 3 harften az yazılırsa hata mesajı veriyor.", () => {
    cy.get('[data-cy="isim"]').type("sa");
    cy.contains("İsminizi yazmayı unuttunuz!");
  });

  it("Adres 10 harften az yazılırsa hata mesajı veriyor.", () => {
    cy.get('[data-cy="adres"]').type("1234567");
    cy.contains("Sipariş adresiniz en az 10 karakter olmalı. ");
  });
  it("3 malzeme seçince hata veriyor.", () => {
    cy.contains("Zeytin").click();
    cy.contains("Sosis").click();
    cy.contains("Soğan").click();
    cy.contains("En az 4, en fazla 10 adet malzeme seçmeniz gerekiyor.");
  });

  it("11 malzeme seçince hata veriyor.", () => {
    cy.contains("Zeytin").click();
    cy.contains("Sosis").click();
    cy.contains("Soğan").click();
    cy.contains("Domates").click();
    cy.contains("Mısır").click();
    cy.contains("Tavuk Izgara").click();
    cy.contains("Kanada Jambonu").click();
    cy.contains("Sarımsak").click();
    cy.contains("Biber").click();
    cy.contains("Ananas").click();
    cy.contains("Kabak").click();
    cy.contains("En az 4, en fazla 10 adet malzeme seçmeniz gerekiyor.");
  });

  it("Her şey doğru ama boyut ve hamur seçilmezse buton disabled", () => {
    cy.contains("Zeytin").click();
    cy.contains("Sosis").click();
    cy.contains("Soğan").click();
    cy.contains("Biber").click();
    cy.get('[data-cy="isim"]').type("Mert Ünal");
    cy.get('[data-cy="adres"]').type("Sur Yapı Antalya Türkiye");
    cy.get('[data-cy="submit"]').should("be.disabled");
  });

  it("Sipariş notu zorunlu olmadığı için eğer her şey doğruysa notsuz sipariş verilebiliyor.", () => {
    cy.get('[data-cy="M"]').click();
    cy.get('[data-cy="hamur"]').click();
    cy.contains("Süpper İnce").click();
    cy.contains("Zeytin").click();
    cy.contains("Sosis").click();
    cy.contains("Soğan").click();
    cy.contains("Biber").click();
    cy.get('[data-cy="isim"]').type("Mert Ünal");
    cy.get('[data-cy="adres"]').type("Sur Yapı Antalya Türkiye");
    cy.get('[data-cy="submit"]').should("be.enabled");
    cy.get('[data-cy="submit"]').click();
    cy.contains("SİPARİŞ ALINDI");
  });

  it("4 adet pizza (3 kez tıklanıyor) ve 5 adet malzeme seçilince doğru fiyatı veriyor ve sipariş veriliyor.", () => {
    cy.get('[data-cy="S"]').click();
    cy.get('[data-cy="hamur"]').click();
    cy.contains("Orta").click();
    cy.contains("Domates").click();
    cy.contains("Soğan").click();
    cy.contains("Tavuk Izgara").click();
    cy.contains("Biber").click();
    cy.contains("Ananas").click();
    cy.get('[data-cy="isim"]').type("Mert Ünal");
    cy.get('[data-cy="adres"]').type("Sur Yapı Antalya Türkiye");

    Cypress._.times(3, () => cy.get('[data-cy="arttır"]').click());
    cy.contains("25₺");
    cy.contains("540₺");

    cy.get('[data-cy="submit"]').should("be.enabled");
    cy.get('[data-cy="submit"]').click();
    cy.contains("SİPARİŞ ALINDI");
  });

  it("Veriler en baştan itibaren dinamik olarak geliyor", () => {
    cy.contains("Grid Sistem Pepperoni")
    cy.contains("(178)")
    cy.get('[data-cy="M"]').click();
    cy.get('[data-cy="hamur"]').click();
    cy.contains("Süpper İnce").click();
    cy.contains("Ananas").click();
    cy.contains("Sosis").click();
    cy.contains("Mısır").click();
    cy.contains("Zeytin").click();
    cy.get('[data-cy="isim"]').type("Mert Ünal");
    cy.get('[data-cy="adres"]').type("Sur Yapı Antalya Türkiye");
    cy.get('[data-cy="siparisnotu"]').type("Lütfen Zile Basmayın!");
    Cypress._.times(3, () => cy.get('[data-cy="arttır"]').click());
    cy.get('[data-cy="submit"]').should("be.enabled").click(),
    cy.contains("Mert Ünal")
    cy.contains("Grid Sistem Pepperoni")
    cy.contains("Ek Malzemeler: Ananas, Sosis, Mısır, Zeytin")
  });


});
