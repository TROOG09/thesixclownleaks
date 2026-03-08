async function lookUpIP() {
  const ip = document.getElementById("ipInput").value.trim();
  if (!ip) {
    document.getElementById("output").textContent = "Introduce una IP válida.";
    return;
  }
  
  document.getElementById("output").textContent = "Buscando...";
  
  try {
    // Llamada a una API que permite CORS
    const response = await fetch(`https://ipwho.is/${ip}`);
    const data = await response.json();

    if (!data.success) {
      document.getElementById("output").textContent = "IP no encontrada o inválida.";
      return;
    }

    // Mostramos muchos datos
    const resultText = `
IP:                 ${data.ip}
País:               ${data.country}
Región:             ${data.region}
Ciudad:             ${data.city}
Latitud/Longitud:   ${data.latitude}, ${data.longitude}
Código Postal:      ${data.postal}
ISP / Org:          ${data.org}
Zona Horaria:       ${data.timezone.id}
Moneda:             ${data.currency.code}
Idioma:             ${data.language}
ASN:                ${data.connection.asn}
Tipo de Conexión:   ${data.connection.type}
DOMINIO:            ${data.connection.domain}
`;

    document.getElementById("output").textContent = resultText;

  } catch (err) {
    document.getElementById("output").textContent = "Error al consultar la API.";
    console.error(err);
  }
}
