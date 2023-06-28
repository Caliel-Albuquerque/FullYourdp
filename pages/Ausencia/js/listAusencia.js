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
    .then((data) => data.msg.ausencia)
    .then((ausencias) => {
      let listAusencia = document.getElementById("listAusencia")

      ausencias.shift()

      ausencias.map((ausencia) => {

       

        listAusencia.innerHTML += `

        <div class="ausenciaItem">
          <h3>${ausencia.dia}</h3>
          <h3>${ausencia.motivo}</h3>
        </div>
      
      `
      })
    })
}




