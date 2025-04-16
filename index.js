const express = require("express");
const router = require("./router");
const app = express();
const port = 3000;

app.use('/', router);
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("to aqui");
});

//LISTA COM NOMES ----------------------------------------
app.get("/ola_form", (req, res) => {
  res.render("ola_form");
});

app.post("/ola", (req, res) => {
  nome1 = req.body.nome1;
  nome2= req.body.nome2
  nome3= req.body.nome3

  lista_nome = [nome1, nome2, nome3];
  res.render("ola_resposta", { nomes: lista_nome });
});

//SOMA DOIS NÚMEROS ----------------------------------------

app.post("/calculo", (req, res) => {
  num1 = parseInt(req.body.num1);
  num2 = parseInt(req.body.num2);
  soma = num1 + num2 
  res.render("calculo_resposta", { soma: soma });
});

//NOVOS PRODUTOS ----------------------------------------

let lista_de_operacoes = [];

app.get("/nova_operacao", (req, res) => {
  res.render("nova_operacao");
});

app.post("/nova_operacao", (req, res) => {
  codigo = req.body.codigo;
  data = req.body.data;
  tipo = req.body.tipo;
  qtd = parseInt(req.body.qtd);
  preco = parseFloat(req.body.preco);
  //atributos derivados 
  let valor_bruto = qtd * preco
  let valor_liquido;

  if (tipo == 'Compra') {
    valor_liquido = valor_bruto + ((valor_bruto * 0.05) / 100) 
  } 
  else {
      valor_liquido = valor_bruto - ((valor_bruto * 0.05) / 100) 
  }

  //salva o objeto no vetor 
  lista_de_operacoes.push({
    codigo: codigo,
    data: data,
    tipo: tipo,
    qtd: qtd,
    preco: preco,
    valor_bruto: valor_bruto,
    valor_liquido: valor_liquido
  });

  res.render('lista_operacao', {lista_de_operacoes: lista_de_operacoes})
  // console.log(lista_de_operacoes);
});

//SUAPI ----------------------------------------
let lista_novo_registro = [];

app.get("/index_suapi", (req, res) => {
  res.render("index_suapi");
});
app.get("/historico_aluno", (req, res) => {
  res.render("historico_aluno", {lista_novo_registro : lista_novo_registro });
});

app.get("/novo_registro", (req, res) => {
  res.render("novo_registro");
});

app.post("/novo_registro", (req, res) => {
  disciplina = req.body.disciplina;
  nota1 = parseInt(req.body.nota1);
  nota2 = parseInt(req.body.nota2);
  //atributos derivados 
  let media = (nota1 + nota2) / 2;

  lista_novo_registro.push({
    disciplina:disciplina,
    nota1: nota1,
    nota2: nota2,
    media: media
  });

  res.render("historico_aluno", {lista_novo_registro : lista_novo_registro })
  //console.log(lista_novo_registro);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
