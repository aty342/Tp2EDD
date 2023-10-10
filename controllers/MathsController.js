import Controller from './Controller.js';
export default class mathsController extends Controller {
  constructor(HttpContext) {
    super(HttpContext);

  }
  get() {
    const params = this.HttpContext.path.params;
    if(Object.keys(params).length == 0) {
      this.HttpContext.response.JSON(pageVide());
      return;
    }
    const optionsOperandes = [' ', '-', '', '/', '%', '!', 'p', 'np'];
    let result = {};

    if (params.op == undefined) {
      result = params;
      result.error = "Operation manquante";
    }
    else if (!optionsOperandes.includes(params.op.toLowerCase())) {
      result = params;
      result.error = "Operation inexsitante";
    }
    else
      result.op = params.op;

    switch (result.op) {
      case ' ':
          result.op = '+';
      case '-':
      case '':
      case '/':
      case '%':
        if (Object.keys(params).length > 3) {
          result.error = "Paramètres en trop";
          break;
        }
        else if (Object.keys(params).length < 3) {
          result.error = "Paramètres manquants";
          break;
        }

        if(params.x == undefined || params.y == undefined) {
          result.error = "Paramètres mal nommés";
          break;
        }
        result.x = params.x;
        result.y = params.y;

        if(isNaN(result.x)) {
          result.error = "x doit être un nombre";
          break;
        }
        else if(isNaN(result.y)) {
          result.error = "y doit être un nombre";
          break;
        }
        result.x = parseFloat(result.x);
        result.y = parseFloat(result.y);

        if (result.op == '+')
          result.value = result.x + result.y;
        else if (result.op == '-')
          result.value = result.x - result.y;
        else if (result.op == '*')
          result.value = result.x * result.y;
        else if (result.op == '/') {
          if(result.x != 0 && result.y == 0) {
            result.value = "Infinity";
            break;
          }
          result.value = result.x / result.y;
        }
        else if (result.op == '%')
          result.value = result.x % result.y;

        if(isNaN(result.value))
          result.value = "NaN";
        break;
      case '!':
      case 'p':
      case 'np':

        if (Object.keys(params).length > 2) {
          result.error = "Paramètres en trop";
          break;
        }
        else if (Object.keys(params).length < 2) {
          result.error = "Paramètres manquants";
          break;
        }

        if(params.n == undefined) {
          result.error = "Paramètre mal nommé";
          break;
        }
        result.n = params.n;

        if(isNaN(result.n)) {
          result.error = "n doit être un nombre";
          break;
        }

        result.n = parseFloat(result.n);
        if(result.n % 1 != 0) {
          result.error = "n doit être un nombre entier";
          break;
        }

        if (result.n <= 0) {
          result.error = "n doit être plus grand ou égal à 0";
          break;
        }

        if (result.op == '!')
          result.value = factorial(result.n);
        else if (result.op == 'p')
          result.value = isPrime(result.n);
        else if (result.op == 'np')
          result.value = findPrime(result.n);

        break;
    }
    this.HttpContext.response.JSON(result);
  }
}

function factorial(n) {
  if (n === 0 ||  n === 1) {
      return 1;
  }
  return n * factorial(n - 1);
}

function isPrime(value) {
  for (var i = 2; i < value; i++) {
      if (value % i === 0) {
          return false;
      }
  }
  return value > 1;
}

function findPrime(n) {
  let primeNumer = 0;
  for (let i = 0; i < n; i++) {
      primeNumer++;
      while (!isPrime(primeNumer)) {
          primeNumer++;
      }
  }
  return primeNumer;
}

function pageVide() {
  return "Page Vide";
}