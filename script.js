async function lookUpIP() {
    const ip = document.getElementById("ipInput").value.trim();
    const output = document.getElementById("output");

    if (!ip) {
        output.textContent = "Introduce una IP válida.";
        return;
    }

    output.textContent = "Buscando datos de la IP...";

    try {
        // Llamada a API pública compatible con CORS
        const res = await fetch(`https://ipwho.is/${ip}`);
        const data = await res.json();

        if (!data.success) {
            output.textContent = "IP no válida o no encontrada.";
            return;
        }

        // Mostrar muchos datos
        output.textContent = `
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
Dominio:            ${data.connection.domain}
        `;
    } catch (err) {
        output.textContent = "Error al consultar la API.";
        console.error(err);
    }
}
