const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar();
    this.generar_secuencia();
    setTimeout(this.siguiente_nivel, 500);
  }
  inicializar() {
    this.toggle_btn_empezar();
    this.inicializar = this.inicializar.bind(this);
    this.elegir_color = this.elegir_color.bind(this);
    this.siguiente_nivel = this.siguiente_nivel.bind(this);
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggle_btn_empezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }

  generar_secuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguiente_nivel() {
    this.subnivel = 0;
    this.iluminar_secuencia();
    this.agregar_evento_click();
  }

  transformar_numero_a_color(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  transformar_color_a_numero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  iluminar_secuencia() {
    for (let i = 0; i < this.nivel; i++) {
      let color = this.transformar_numero_a_color(this.secuencia[i]);
      setTimeout(() => this.iluminar_color(color), 1000 * i);
    }
  }

  iluminar_color(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagar_color(color), 500);
  }

  apagar_color(color) {
    this.colores[color].classList.remove("light");
  }

  agregar_evento_click() {
    this.colores.celeste.addEventListener("click", this.elegir_color);
    this.colores.verde.addEventListener("click", this.elegir_color);
    this.colores.violeta.addEventListener("click", this.elegir_color);
    this.colores.naranja.addEventListener("click", this.elegir_color);
  }

  eliminar_eventos_click() {
    this.colores.celeste.removeEventListener("click", this.elegir_color);
    this.colores.verde.removeEventListener("click", this.elegir_color);
    this.colores.violeta.removeEventListener("click", this.elegir_color);
    this.colores.naranja.removeEventListener("click", this.elegir_color);
  }

  elegir_color(ev) {
    const nombre_color = ev.target.dataset.color;
    const numero_color = this.transformar_color_a_numero(nombre_color);
    this.iluminar_color(nombre_color);
    if (numero_color === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminar_eventos_click();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.gano_el_juego();
        } else {
          setTimeout(this.siguiente_nivel, 1500);
        }
      }
    } else {
      this.perdio_el_juego();
    }
  }

  gano_el_juego() {
    swal("WoW", "Ganaste =)", "success").then(() => this.inicializar());
  }

  perdio_el_juego() {
    swal("Ohh no", "Perdiste =(", "error").then(() => {
      this.eliminar_eventos_click();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
