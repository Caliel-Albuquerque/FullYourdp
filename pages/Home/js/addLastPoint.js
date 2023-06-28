if (!token) {
  alert("Você não tem autorização")
} else {
  var payload = token.split('.')[1];
  var decodedPayload = atob(payload);
  var userId = JSON.parse(decodedPayload).id;

  updateTime();


  const btnSaida = document.getElementById("formSaida")

  btnSaida.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`https://api-yourdp.onrender.com/user/${userId}/updateLastPoint`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        saida: timeString
      })
    })
      .then((res) => res.json())
      .then((data) => {
        alert("saida atualizada")
        if (data.msg) {
          alert(data.msg)
        }
      })
      .catch((err) => console.log(err))
  })


}