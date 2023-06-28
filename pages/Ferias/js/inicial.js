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
    .then((data) => data.msg.ferias)
    .then((ferias) => {
      let containerInfo = document.getElementById('containerInfos');

      ferias.shift()

      ferias.map((dataFerias) => {

        var partesData = dataFerias.inicio.split('-');
        var dataFormatadaInicio = partesData[2] + '/' + partesData[1] + '/' + partesData[0];

        var partesDataFim = dataFerias.fim.split('-');
        var dataFormatadaFim = partesDataFim[2] + '/' + partesDataFim[1] + '/' + partesDataFim[0];


        containerInfo.innerHTML = `
        
        <p style="margin-top: 21px;">Solicitar até ${dataFormatadaInicio}</p>
        <p style="margin-top: -11px;">Data limite de saída é ${dataFormatadaFim}</p>
        
        `
      })
    })
}