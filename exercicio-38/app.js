/*
  01

  - Crie um objeto com um método getColor. Este método deve retornar o valor da
    propriedade 'color' dos objetos descritos abaixo;
  - Crie 2 novos objetos que representem dois carros. Na criação dos objetos, 
    faça o objeto com o método getColor ser prototype desses dois carros;
  - Após criar os carros, crie neles as propriedades 'color'. Atribua valores 
    diferentes para a propriedade color de cada carro;
  - Teste o método getColor do prototype dos carros.
*/

// methodo
const carProto = {
  getColor() {
    /*retorno de valor color */
    return this.color;
  },
};
/*cirando os dois novos objetos fazendo o obvjeto com o metodo get color ser prototype desses dois carros abaixo */

let audiA8 = Object.create(carProto);
let volvoS90 = Object.create(carProto);

/*atribuindo valores diferentes aos objetos */
audiA8.color = "azul";
volvoS90.color = "vermelho";

/*testando metodo */
console.log(audiA8.getColor(), volvoS90.getColor());
console.log(carProto.isPrototypeOf(audiA8) && carProto.isPrototypeOf(volvoS90));

/*
  02

  - No código abaixo, a invocação da função 'getSummary' está retornando 
    "undefined foi dirigido por undefined e tem undefined no papel principal.";
  - Faça a invocação da função retornar a string com os valores esperados 
    (ao invés de undefined's);
  - Não modifique o objeto 'movie' e a declaração da função 'getSummary';
  - Após fazer o código funcionar, você pode refatorar a declaração da função, 
    se necessário.
*/

const movie = {
  title: "Forrest Gump",
  director: "Robert Zemeckis",
  starringRole: "Tom Hanks",
};

function getSummary() {
  const { title, director, starringRole } = this;
  return `${title} foi dirigido por ${director} e tem ${starringRole} no papel principal.`;
}

const getSummaryBound = getSummary.bind(movie);

// 3 formas de fazer trazer o mesmo resultado
// Chamando a função 'getSummaryBound'
//console.log(getSummaryBound());
//console.log(getSummary.call(movie))
//console.log(getSummary.apply(movie))

/*
  03

  - A invocação da função abaixo deve retornar este objeto:
    {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3' 
    }
  - Descomente o código e crie a função.
*/

const createObj = (arr) =>
  arr.reduce((acc, [key, value]) => {
    console.log(acc.item);
    acc[key] = value;
    return acc;
  }, {});

const arrayToObj = createObj;

//console.log(
//  arrayToObj([
//    ['prop1', 'value1'],
//    ['prop2', 'value2'],
//    ['prop3', 'value3']
//  ])
//)

/*
  04

  - Refatore as classes abaixo para factory functions.
*/

const concatenateZero = (unit) => (unit < 10 ? `0${unit}` : unit);

const formatTimeUnits = (units) => units.map(concatenateZero);

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return [hours, minutes, seconds];
};

const getFormattedTime = (template) => {
  const [hours, minutes, seconds] = getTime();
  const formattedTime = formatTimeUnits([hours, minutes, seconds]);
  const getTimeAsArray = (_, index) => formattedTime[index];

  return template.split(":").map(getTimeAsArray).join(":");
};

const makeClock = ({ template }) => ({
  template,
  render() {
    const formattedTime = getFormattedTime(this.template);
    console.log(formattedTime);
  },
  start() {
    const oneSecond = 1000;

    this.render();
    this.timer = setInterval(() => this.render(), oneSecond);
  },
  stop() {
    clearInterval(this.timer);
  },
});

const makeExtendClock = ({ template, precision = 1000 }) => ({
  precision,
  ...makeClock({ template }),
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  },
});

const clock = makeClock({ template: "h:m:s" });
const exetendClock = makeExtendClock({ template: "h:m:s", precision: 1000 });

clock.start();
clock.stop();

exetendClock.start();
exetendClock.stop();

/*classe refatorada  Refatorada para factory function*/
/*
class Clock {
  constructor ({ template }) {
    this.template = template
  }

  render () {
    const formattedTime = getFormattedTime(this.template)
    console.log(formattedTime)
  }

  start () {
    const oneSecond = 1000

    this.render()
    this.timer = setInterval(() => this.render(), oneSecond)
  }

  stop () {
    clearInterval(this.timer)
  }
}
*/

/* classe extend Refatorada para factory function*/
/*
class ExtendedClock extends Clock {
  constructor (options) {
    super(options)
    
    const { precision = 1000 } = options
    this.precision = precision
  }

  start () {
    this.render()
    this.timer = setInterval(() => this.render(), this.precision)
  }
}

const clock = new ExtendedClock({ template: 'h:m:s', precision: 1000 })

// clock.start()
*/
/*
  05

  - No index.html, descomente: 
    - A div com a classe "container" que contém uma tabela e um botão;
    - A tag link (no head) que carrega os estilos CSS do Bootstrap.
  - Seu desafio neste exercício é exportar as células da tabela HTML para um 
    arquivo CSV que pode ser aberto no Excel ou Google Planilhas;
  
  Passo a passo para alcançar este resultado
    - Quando um click no botão "Exportar para CSV" acontecer, faça o seguinte:
      - Gere um array com todas as referências dos elementos <tr> da tabela;
      - À partir do array de referências das <tr>, gere uma string CSV:
        - Uma string CSV contém, em cada linha, separados por vírgula, o 
          conteúdo textual de uma célula da <tr> (seja a célula um <th> ou 
          <td>). Ou seja, a string CSV deve ter a formatação abaixo, incluindo 
          as quebras de linha:
          
          #,Jogo do Ano,Desenvolvedora,Data da premiação
          1,The Last of Us Part II,Naughty Dog,10 de dezembro de 2020
          2,Sekiro: Shadows Die Twice,FromSoftware,12 de dezembro de 2019
          3,God of War,SIE Santa Monica Studio,6 de dezembro de 2018
          4,The Legend of Zelda: Breath...,Nintendo...,7 de dezembro de 2017
          5,Overwatch,Blizzard Entertainment,1 de dezembro de 2016
        
        - Dicas:
          - O elemento <tr> contém uma propriedade 'cells'.
          - Para quebrar linha, você pode usar dentro da string o caractere 
            especial '\n';
          - É possível gerar a string usando o método reduce. Porém, neste caso,
            o código fica mais legível (e menos complicado) com o map.
      - Após gerar a string CSV, insira 2 atributos no botão:
        - href, com o valor 
          `data:text/csvcharset=utf-8,${encodeURIComponent(SUA_STRING_CSV)}`. 
          encodeURIComponent é um método do window que precisa receber a string 
          CSV que você criou;
        - download, com o valor 'table.csv'.
*/

const tableRows = document.querySelectorAll("tr");
const exportBtn = document.querySelector('[data-js="export-table-btn"]');

const getCellText = ({ textContent }) => textContent;

const getStringWiithCommas = ({ cells }) =>
  Array.from(cells).map(getCellText).join(",");

const creatCSVString = () =>
  Array.from(tableRows).map(getStringWiithCommas).join("\n");

const setCSVDownload = (CSVString) => {
  const CSVURI = `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`;

  exportBtn.setAttribute("href", CSVURI);
  exportBtn.setAttribute("download", "table.csv");
};

const exportTable = () => {
  const CSVString = creatCSVString();

  setCSVDownload(CSVString);
};
// Chama a função para gerar a string CSV assim que o DOM estiver pr
//exportBtn.addEventListener("click", exportTable)

/*
  06
  
  - Na Weather Application, refatore para uma factory function o código que 
    executa os requests e obtém as informações do clima da cidade;
  - Se ao fazer o request, uma mensagem "Access to fetch at 'http://...' from 
    origin 'http://...'"... for exibida no console, crie uma nova app na 
    plataforma da accuweather e pegue uma nova chave: 
    https://developer.accuweather.com/;
  - O procedimento é o mesmo mostrado nas aulas da etapa em que construímos 
    essa aplicação.
*/

/*
  07

  - No index.html, comente a div com a classe "container" que contém a tabela;
  - Descomente: 
    - A <div> com a classe "container" abaixo da div que você acabou de 
      comentar;
    - A <link> que importa o style.css;
  - Construa uma aplicação de conversão de moedas. O HTML e CSS são os que 
    você está vendo no browser (após salvar os arquivos);
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada: 
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para 
        dollar dos Estados Unidos, etc. Use os dados da API para popular 
        os selects.
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";
      - O parágrafo com data-js="converted-value" deve exibir o resultado da 
        conversão de 1 USD para 1 BRL;
      - Quando um novo número for inserido no input com 
        data-js="currency-one-times", o parágrafo do item acima deve atualizar 
        seu valor;
      - O parágrafo com data-js="conversion-precision" deve conter a conversão 
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de 
        dois dígitos após o ponto, você pode usar o método toFixed: 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
  
  PS: o desafio aqui é você implementar essa aplicação sozinho(a), antes 
  de ver as próximas aulas, ok? =)
*/

const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const curreniesEl = document.querySelector('[data-js="currencies-container"]');
const convertedValueEl = document.querySelector('[data-js="converted-value"]');
const valuePrecisionEl = document.querySelector(
  '[data-js="conversion-precision"]'
);
const timesCurrencyOneEl = document.querySelector(
  '[data-js="currency-one-times"]'
);

//let internalExchangeRate = {}

const showAlert = (err) => {
  const div = document.createElement("div");
  const button = document.createElement("button");

  div.textContent = err.message;
  div.classList.add(
    "alert",
    "alert-warning",
    "alert-dismissible",
    "fade",
    "show"
  );
  div.setAttribute("role", "alert");
  button.classList.add("btn-close");
  button.setAttribute("type", "button");
  button.setAttribute("aria-label", "Close");

  const removeAlert = () => div.remove();
  button.addEventListener("click", removeAlert);

  div.appendChild(button);
  curreniesEl.insertAdjacentElement("afterend", div);
};

//Clousure IFFI
const state = (() => {
  let exchangeRate = {};

  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: (newExchangeRate) => {
      if (!newExchangeRate.conversion_rates) {
        showAlert({ message: " Obejto não encontrado" });
        return;
      }

      exchangeRate = newExchangeRate;
      return exchangeRate;
    },
  };
})();

const apiKey = `74fec6afa301a3ca6e83db74`;
const getUrl = (currency) =>
  `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;

const getErrormessage = (erroType) =>
  ({
    "unsupported-code": "A moeda não existe em nosso banco de dados.",
    "malformed-request": "Sua solicitação naõ segue o padrão exigido",
    "invalid-key": "A chave da API é invalida",
    "inactive-account": "Seu e-mail não foi confirmado",
    "quota-reached": "Você atingiu o número máximo de requisição da api",
  }[erroType] || "Não foi possível obter as informações");

const fetchExchangeRate = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Sua conexão falhou. Não foi possível obter as informações."
      );
    }

    const exchangeRateData = await response.json();

    if (exchangeRateData.result === "error") {
      const errorMessage = exchangeRateData["error-type"];
      throw new Error(getErrormessage(errorMessage));
    }

    return state.setExchangeRate(exchangeRateData);
  } catch (err) {
    showAlert(err);
  }
};
const getOption = (selectedCurrency, conversion_rates) => {
  const setSelectedAtrribute = (currency) =>
    currency === selectedCurrency ? "selected" : "";
  const getOptionsAsArray = (currency) =>
    `<option ${setSelectedAtrribute(currency)}>${currency}</option>`;

  return Object.keys(conversion_rates).map(getOptionsAsArray).join(" ");
};

const getMultipliedExchangeRate = (conversion_rates) => {
  const currencyTwo = conversion_rates[currencyTwoEl.value];

  return (timesCurrencyOneEl.value * currencyTwo).toFixed(2);
};

const getNotRoundedExchangeRate = (conversion_rates) => {
  const currencyTwo = conversion_rates[currencyTwoEl.value];

  return `1 ${currencyOneEl.value} = ${1 * currencyTwo} ${currencyTwoEl.value}`;
};

const showUpDatedRates = ({ conversion_rates }) => {
  convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates);
  valuePrecisionEl.textContent = getNotRoundedExchangeRate(conversion_rates);
};

const showInitialInfo = ({ conversion_rates }) => {
  currencyOneEl.innerHTML = getOption("USD", conversion_rates);
  currencyTwoEl.innerHTML = getOption("BRL", conversion_rates);

  showUpDatedRates({ conversion_rates });
};

const init = async () => {
  const url = getUrl("USD");
  const exchangeRate = await fetchExchangeRate(url);

  if (exchangeRate && exchangeRate.conversion_rates) {
    showInitialInfo(exchangeRate);
  }
};

const handleTimesCurrencyOneElInput = () => {
  const { conversion_rates } = state.getExchangeRate();

  convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates);
};

const handleCurrencyTwoElInput = () => {
  const exchangeRate = state.getExchangeRate();
  showUpDatedRates(exchangeRate);
};

const handleCurrencyOneElInput = async (e) => {
  const url = getUrl(e.target.value);
  const exchangeRate = await fetchExchangeRate(url);

  showUpDatedRates(exchangeRate);
};

timesCurrencyOneEl.addEventListener("input", handleTimesCurrencyOneElInput);
currencyTwoEl.addEventListener("input", handleCurrencyTwoElInput);
currencyOneEl.addEventListener("input", handleCurrencyOneElInput);

init();

