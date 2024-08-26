const form = document.getElementById('matriculaForm');
const resultado = document.getElementById('resultado');

function formatarPorcentagem(valor) {
    return `${(valor * 100).toFixed(0)}%`;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obter os valores dos campos
    const alunos2025 = parseInt(document.getElementById('alunos2025').value);
    const alunos2023 = parseInt(document.getElementById('alunos2023').value);
    const alunos2024 = parseInt(document.getElementById('alunos2024').value);
    const novosAlunos2024 = parseInt(document.getElementById('novosAlunos2024').value);
    const visitas2024 = parseInt(document.getElementById('visitas2024').value);
    const alunosSaida2025 = parseInt(document.getElementById('alunosSaida2025').value);

    // Cálculos
function calcularMetaRematricula(alunos2023, alunos2024, novosAlunos2024) {
    // Calcula a meta de rematrículas
    let metaRematricula;
    if ((alunos2024 - novosAlunos2024) > alunos2023) {
        metaRematricula = Math.round(alunos2024);
    } else {
        metaRematricula = Math.round(alunos2024 * (alunos2024 - novosAlunos2024) / alunos2023);
    }
    return metaRematricula;
}

function calcularMetaNovasMatriculas(alunos2025, alunos2023, alunos2024, novosAlunos2024, alunosSaida2025) {
    // Calcula a meta de novas matrículas
    let novasMatriculas;
    if ((alunos2024 - novosAlunos2024) > alunos2023) {
        novasMatriculas = Math.round(alunos2025-alunos2024+alunosSaida2025);
    } else {
        novasMatriculas = Math.round(alunos2025-(alunos2024*(alunos2024-novosAlunos2024)/alunos2023)+alunosSaida2025);
    }
    return novasMatriculas;
}

function calcularTaxaFidelizacao(alunos2023, alunos2024, novosAlunos2024) {
    // Calcula a taxa de fidelização
    let taxaFidelizacao;
    if ((alunos2024 - novosAlunos2024) > alunos2023) {
//        taxaFidelizacao = formatarPorcentagem(100);
        taxaFidelizacao = 100;

    } else {
//        taxaFidelizacao = formatarPorcentagem((alunos2024-novosAlunos2024)/alunos2023);
        taxaFidelizacao = (alunos2024-novosAlunos2024)/alunos2023;
    }
    return taxaFidelizacao;
}

function calcularTaxaConversao(novosAlunos2024, visitas2024) {
    // Calcula a taxa de conversão
    let taxaConversao;
    if (novosAlunos2024>visitas2024) {
//        taxaConversao = formatarPorcentagem(100);
        taxaConversao = 100;
    } else {
//      taxaConversao = formatarPorcentagem(novosAlunos2024 / visitas2024);
      taxaConversao = novosAlunos2024 / visitas2024;
    }
    return taxaConversao;
}

function calcularMetaVisitas(novosAlunos2024, visitas2024) {
    let novasMatriculas = calcularMetaNovasMatriculas(alunos2025, alunos2023, alunos2024, novosAlunos2024, alunosSaida2025);
    let taxaConversao = calcularTaxaConversao(novosAlunos2024, visitas2024);
    let metaVisitas;
    // Calcula a meta de visitas
    if (novosAlunos2024>visitas2024) {
        metaVisitas = novasMatriculas;
    } else {
        metaVisitas = novasMatriculas/taxaConversao
    }
    return metaVisitas;
}

function calcularTipoMeta(alunos2025) {
    let novasMatriculas = calcularMetaNovasMatriculas(alunos2025, alunos2023, alunos2024, novosAlunos2024, alunosSaida2025);
    let tipoMeta;
    // Calcula o tipo de meta
    if (novasMatriculas/alunos2025>=0.3) {
        tipoMeta = "Esta é uma meta agressiva, mas é possível chegar!";
    } else {
        tipoMeta = "Esta meta está compatível com as médias de mercado.";
    }
    return tipoMeta
}

//Função que verifica se os números são inteiros e positivos
function isPositiveInteger(value) {
  return /^\d+$/.test(value);
}

// Função que chama tudo
function calcularResultado (alunos2025, alunos2023, alunos2024, novosAlunos2024, visitas2024, alunosSaida2025) {
    //Calcular os resultados
    let metaRematricula = calcularMetaRematricula(alunos2023, alunos2024, novosAlunos2024);
    let novasMatriculas = calcularMetaNovasMatriculas(alunos2025, alunos2023, alunos2024, novosAlunos2024, alunosSaida2025);
    let taxaFidelizacao = calcularTaxaFidelizacao(alunos2023, alunos2024, novosAlunos2024);
    let taxaConversao = calcularTaxaConversao(novosAlunos2024, visitas2024);
    let metaVisitas = calcularMetaVisitas(novosAlunos2024, visitas2024);
    let tipoMeta = calcularTipoMeta(alunos2025);
    let taxaFidelizacaoPorcentagem = formatarPorcentagem(taxaFidelizacao);
    let taxaConversaoPorcentagem = formatarPorcentagem(taxaConversao);
    let resultadoHTML;
  // Verifica se todos os campos estão preenchidos
  if (
    !isPositiveInteger(alunos2025) ||
    !isPositiveInteger(alunos2023) ||
    !isPositiveInteger(alunos2024) ||
    !isPositiveInteger(novosAlunos2024) ||
    !isPositiveInteger(visitas2024) ||
    !isPositiveInteger(alunosSaida2025)
  ) {
        resultadoHTML = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Meta de Matrículas</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body class="conteudo">
                    <h1>Meta de Matrículas</h1>
                    <p>Preencha todos os campos, com valores inteiros e positivos, para conseguirmos calcular sua meta corretamente.</p>
                    </br>
                    <button class="botao-fechar" onclick="window.close()">OK</button>
                </body>
            </html>
            `;
    } else {
        resultadoHTML = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Meta de Matrículas</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body class="conteudo">
                    <h1>Meta de Matrículas</h1>
                    <p>Sua meta de rematrículas é de ${metaRematricula} alunos.</p>
                    <p>Sua meta de novas matrículas é de ${novasMatriculas} alunos.</p>
                    <p>A taxa de fidelização da sua escola é de ${taxaFidelizacaoPorcentagem}.</p>
                    <p>Na campanha de 2024, você converteu ${taxaConversaoPorcentagem} das visitas em matrícula.</p>
                    <p>Na campanha de 2025, você precisa ter ${metaVisitas} visitas para alcançar sua meta de ${novasMatriculas} novas matrículas.</p>
                    </br>
                    <p><strong>${tipoMeta}</strong></p>
                    </br>
                    <button class="botao-fechar" onclick="window.close()">OK</button>
                </body>
            </html>
            `;
    }
    return resultadoHTML
}

    // Exibir os resultados
let novaJanela =window.open("", "Meta de Matrículas", "width=800,height=400");
novaJanela.document.body.innerHTML= "";
novaJanela.document.write(calcularResultado(alunos2025, alunos2023, alunos2024, novosAlunos2024, visitas2024, alunosSaida2025));
});