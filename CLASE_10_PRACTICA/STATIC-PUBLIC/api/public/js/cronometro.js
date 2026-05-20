function Cronometro() {
  this.horas = 0;
  this.minutos = 0;
  this.segundos = 0;
  this.milisegundos = 0;
  this.intervalo = null;
  this.iniciar = function () {
    var self = this;
    this.intervalo = setInterval(function () {
      self.milisegundos += 10;
      if (self.milisegundos >= 1000) {
        self.milisegundos = 0;
        self.segundos++;
      }
      if (self.segundos >= 60) {
        self.segundos = 0;
        self.minutos++;
      }
      if (self.minutos >= 60) {
        self.minutos = 0;
        self.horas++;
      }
      self.mostrar();
    }, 10);
  };
  this.detener = function () {
    clearInterval(this.intervalo);
  };
  this.reiniciar = function () {
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.milisegundos = 0;
    this.mostrar();
  };
  this.mostrar = function () {
    var formatoHoras = this.horas < 10 ? "0" + this.horas : this.horas;
    var formatoMinutos = this.minutos < 10 ? "0" + this.minutos : this.minutos;
    var formatoSegundos =
      this.segundos < 10 ? "0" + this.segundos : this.segundos;
    var formatoMilisegundos =
      this.milisegundos < 100
        ? this.milisegundos < 10
          ? "00" + this.milisegundos
          : "0" + this.milisegundos
        : this.milisegundos;
    document.getElementById("cronometro").innerHTML =
      formatoHoras +
      ":" +
      formatoMinutos +
      ":" +
      formatoSegundos +
      "." +
      formatoMilisegundos;
  };
}
