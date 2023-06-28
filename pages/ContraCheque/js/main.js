// const carousel = document.querySelector('.carousel');
// const prevButton = document.querySelector('.prev-button');
// const nextButton = document.querySelector('.next-button');

// let translateX = 0;

// prevButton.addEventListener('click', () => {
//   translateX += carousel.offsetWidth;
//   carousel.style.transform = `translateX(${translateX}px)`;
// });

// nextButton.addEventListener('click', () => {
//   translateX -= carousel.offsetWidth;
//   carousel.style.transform = `translateX(${translateX}px)`;
// });

// carousel.addEventListener('transitionend', () => {
//   const firstItem = carousel.firstElementChild;
//   const lastItem = carousel.lastElementChild;

//   if (translateX < -lastItem.offsetLeft) {
//     carousel.style.transition = 'none';
//     translateX += carousel.offsetWidth;
//     carousel.style.transform = `translateX(${translateX}px)`;
//     setTimeout(() => {
//       carousel.style.transition = 'transform 0.5s ease-in-out';
//     }, 0);
//   }

//   if (translateX > -firstItem.offsetLeft) {
//     carousel.style.transition = 'none';
//     translateX -= carousel.offsetWidth;
//     carousel.style.transform = `translateX(${translateX}px)`;
//     setTimeout(() => {
//       carousel.style.transition = 'transform 0.5s ease-in-out';
//     }, 0);
//   }
// });
if (!token) {
  // Redirecione para a página de login se não houver token
  alert('Não foi possivel carregar a lista de pontos')
} else {
  var payload = token.split('.')[1];
  var decodedPayload = atob(payload);
  var userId = JSON.parse(decodedPayload).id;

  fetch('https://api-yourdp.onrender.com/user/' + userId, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then((res) => res.json())
    .then((data) => data.msg.contracheque)
    .then((contracheques) => {
      let table = document.getElementById("tableContracheque")

      contracheques.shift()

      contracheques.map((contracheque) => {



        table.innerHTML += `

        <tr>
          <td id="ct${contracheques.indexOf(contracheque) + 1}">${contracheque.diaArquivo}</td>
          <td id="dd${contracheques.indexOf(contracheque) + 1}"><button class="btnContracheque"><a href="${contracheque.arquivoContracheque}" download>Baixar</a> </button></td>
        </tr>
      
      `

      
      })
    })
}