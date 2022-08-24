function enviarWhatsapp () {
    const plato1 = document.getElementById('Plato1').value
    const plato2 = document.getElementById('Plato2').value
    const plato3 = document.getElementById('Plato3').value
    const plato4 = document.getElementById('Plato4').value
    const plato5 = document.getElementById('Plato5').value
    const nombre = document.getElementById('nombre').value
    const calle = document.getElementById('calle').value
    const altura = document.getElementById('altura').value
    const piso = document.getElementById('piso').value
    const telefono = document.getElementById('telefono').value
    const mensaje = document.getElementById('mensaje').value


    const url = "https://api.whatsapp.com/send?phone=+5491131271710&text=" + 
    "Hola" + "%0a%0a" + 
    "Mi nombre es: " + nombre + "%0a" 
    + "Telefono: " + telefono + "%0a" + 
    mensaje + plato1 + " " + plato2 + " " + plato3 + " " + plato4 + " " + plato5

    console.log('enviando...')
    window.open(url, '_blank').focus();
}

console.log('conectado')