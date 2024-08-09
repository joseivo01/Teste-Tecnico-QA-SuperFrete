function capitalize_first_letter(texto) {
    if (texto.length === 0) return texto; // Retorna texto vazio se a string for vazia

    // Capitaliza o primeiro caractere e transforma o restante em minúsculo
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
function generate_string(base) {
    const baseString = base;
    const randomNumber = Math.floor(1000 + Math.random() * 9000468);
    return `${randomNumber}${baseString}`;
}
  module.exports = {
    generate_string,
    capitalize_first_letter
  };