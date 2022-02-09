
var ul = window.document.querySelector('.listar_detalhes')

function area(title) {

  console.log(title)
  ul.innerHTML = title


  /*pegar os itens*/
  function mostar_itens(lista) {
    const lista_itens = lista/*["Banana", "Orange", "Apple", "Mango", 'ana', "Banana", "tia", "Apple", "tio", 'maninha']*/;
    let fLen = lista_itens.length;

    let text = "<ul>";
    for (let i = 0; i < fLen; i++) {
      text += "<li>" + lista_itens[i] + "</li>";
    }
    text += "</ul>";

    document.querySelector(".listar_detalhes").innerHTML = text;
  }



  if (title == 'pneus-bt_lft') {
    // code block
    mostar_itens(["Pneu traseiro esquerdo"])
  } else if (title == 'pneus-bt_rgt') {
    // code block
    mostar_itens(["Pneu traseiro direito"])

  } else if (title == 'pneus-top_lft') {
    // code block
    mostar_itens(["Pneu dianteiro esquerdo"])

  } else if (title == 'pneus-top_rgt') {
    // code block
    mostar_itens(["Pneu dianteiro direito"])

  } else if (title == 'peca_46_47') {
    // code block
    mostar_itens(["Plano principal inferior traseiro", "Placa final da asa traseira"])

  } else if (title == 'peca_51-54') {
    // code block
    mostar_itens(["Egine Cover", "Batman", "Earwing", "Top Exit"])

  } else if (title == 'peca_20') {
    // code block
    mostar_itens(["Headrest"])

  } else if (title == 'peca_55_56') {
    // code block
    mostar_itens(["Floor", "Diffusor"])

  } else if (title == 'peca_14-17') {
    // code block
    mostar_itens(["Front Wing Flap End Plate", "Front Wing Flap Main Plane", "Front Wing Flap", "Nose Cone"])

  } else if (title == 'peca_23') {
    // code block
    mostar_itens(["Main Turning Vane"])

  } else if (title == 'peca_5') {
    // code block
    mostar_itens(["Brake Caliper"])

  } else if (title == 'peca_32-45') {
    // code block
    mostar_itens(["Wheel Nut", "Brake Pads", "Brake Disc", "Brake Duct", "Brake Caliper", "Drive Shaft / Upright", "Rear Lower Wishbone", "Rear Uper Wishbone", "Rear Pushrod", "Rear Toe link", "Gearbox", "Rear Crasher", "Rain Light", "Rear Lower Main Plane"])

  } else if (title == 'peca_2-13') {
    // code block
    mostar_itens(["Wheel Nut", "Brake Pads", "Brake Disc", "Brake Duct", "Brake Caliper", 'Upright', 'Brake Duct', 'Front Lower Wishbone', 'Fron Upper Wishbone', 'Front Pushrod', 'Front Track Rod', 'Side Damper', 'Fairing'])

  } else if (title == 'peca_18-19') {
    // code block
    mostar_itens(["Steering Housing", "Front 3rd Element"])

  } else if (title == 'peca_31') {
    // code block
    mostar_itens(["Engine"])

  } else if (title == 'peca_48-50') {
    // code block
    mostar_itens(["Sidepod", "Mirror", "Monocoque"])

  } else {
    ul.innerHTML = 'Item não registado'
  }
}
