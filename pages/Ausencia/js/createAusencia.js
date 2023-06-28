if (!token) {
  alert("Você não tem autorização")
} else {
  var payload = token.split('.')[1];
  var decodedPayload = atob(payload);
  var userId = JSON.parse(decodedPayload).id;







  const boton_foto = document.querySelector('#file');


  let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dkt07q4bz',
    uploadPreset: 'ml_default',
    language: "pt",
    text: {

      "pt": {
        "or": "ou",
        "menu": {
          "files": "Meus arquivos"
        },
        "queue": {
          "title": "Seu arquivo",
          "done": "Enviar",
          "upload_more": "Enviar mais",
        },
        "local": {
          "browse": "Enviar arquivo",
          "dd_title_single": "Coloque seu arquivo aqui",
          "dd_title_multi": "Coloque seu arquivo aqui",
          "drop_title_single": "Drop a file to upload",
          "drop_title_multiple": "Drop files to upload"
        },
      }

    },
  }, (err, result) => {
    if (!err && result && result.event === 'success') {
      console.log('Imagen subida con éxito', result.info);
      let imagenSrc = result.info.secure_url;

      var motivo = document.getElementById('motivo').value;
      var dia = document.getElementById('diaAusencia').value;
      var explicacao = document.getElementById('subject').value

      const formAusencia = document.getElementById("formAusencia")


      formAusencia.addEventListener('submit', () => {
        document.getElementById('loading-spinner').style.display = 'block';
        fetch(`https://api-yourdp.onrender.com/user/${userId}/ausencia`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ausencia: {
              dia: dia,
              motivo: motivo,
              explicacao: explicacao,
              arquivo: imagenSrc,
              statusAusencia: false
            }
          })
        })
          .then((res) => res.json())
          .then((data) => {
            document.getElementById('loading-spinner').style.display = 'none';

            alert("Ausencia cadastrada")


            if (data.msg) {
              alert(data.msg)
            } else {
              alert('Error ao cadastrar o ponto')
            }
          })
          .catch((err) => console.log(err))
      })


    }
  });

  boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
  }, false);




}