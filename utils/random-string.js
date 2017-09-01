module.exports = {
  randomString: function() {
    let output = "";
    let characters = "abcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < 6; i++) {
      output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return output;
  }
}
