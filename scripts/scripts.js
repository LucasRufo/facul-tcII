let formularioCadastro = document.getElementById('formCadastro')
let formularioImc = document.getElementById('formIMC')

const ACTIVE_CLASS = 'active-row'
const DISPLAY_NONE = 'd-none'
const INPUT_ERROR = 'error'

formularioCadastro.onsubmit = onFormCadastroSubmit
formularioCadastro.onreset = onFormCadastroReset
formularioImc.onsubmit = onFormImcSubmit
formularioImc.onreset = onFormImcReset

function onFormCadastroSubmit(e) {
  e.preventDefault()

  let formValues = getFormCadastroValues()

  let formIsValid = validateFormCadastro(formValues)

  if (formIsValid) {
    alert('Cadastro realizado com sucesso!')
    formularioCadastro.reset()
  }
}

function onFormImcSubmit(e) {
  e.preventDefault()

  let formValues = getFormImcValues()

  let formIsValid = validateFormImc(formValues)

  if (formIsValid) {
    let imc = (formValues.peso / (formValues.altura * formValues.altura)).toFixed(2)

    let resultado = document.getElementById('resultado')

    onFormImcReset()

    if (imc < 18.5) {
      document.getElementById('abaixoPeso').classList.add(ACTIVE_CLASS)
      resultado.innerText = `Seu IMC é ${imc} e você está abaixo do peso.`
    }

    if (imc >= 18.5 && imc <= 24.9) {
      document.getElementById('pesoNormal').classList.add(ACTIVE_CLASS)
      resultado.innerText = `Seu IMC é ${imc} e você está com o peso normal.`
    }

    if (imc >= 25 && imc <= 29.9) {
      document.getElementById('sobrepeso').classList.add(ACTIVE_CLASS)
      resultado.innerText = `Seu IMC é ${imc} e você está com sobrepeso.`
    }

    if (imc >= 30 && imc <= 34.9) {
      document.getElementById('obesidadeI').classList.add(ACTIVE_CLASS)
      resultado.innerText = `Seu IMC é ${imc} e você está com obesidade grau I.`
    }

    if (imc >= 35 && imc <= 39.9) {
      document.getElementById('obesidadeII').classList.add(ACTIVE_CLASS)
      resultado.innerText = `Seu IMC é ${imc} e você está com obesidade grau II.`
    }

    if (imc >= 40) {
      document.getElementById('obesidadeIII').classList.add(ACTIVE_CLASS)
      resultado.innerText = `Seu IMC é ${imc} e você está com obesidade grau III.`
    }

    resultado.classList.remove(DISPLAY_NONE)
  }
}

function onFormImcReset() {
  document.getElementById('resultado').classList.add(DISPLAY_NONE)
  document.getElementById('abaixoPeso').classList.remove(ACTIVE_CLASS)
  document.getElementById('pesoNormal').classList.remove(ACTIVE_CLASS)
  document.getElementById('sobrepeso').classList.remove(ACTIVE_CLASS)
  document.getElementById('obesidadeI').classList.remove(ACTIVE_CLASS)
  document.getElementById('obesidadeII').classList.remove(ACTIVE_CLASS)
  document.getElementById('obesidadeIII').classList.remove(ACTIVE_CLASS)
}

function onFormCadastroReset() {
  let inputs = document.querySelectorAll('input')

  inputs.forEach(input => {
    input.classList.remove(INPUT_ERROR)
  })
}

function validateFormCadastro(formValues) {
  let errors = []
  let elements = []

  onFormCadastroReset()

  if (!validarCPF(formValues?.cpf)) {
    errors.push('CPF inválido')
    elements.push(formValues.referencias.cpf)
    formValues.referencias.cpf.classList.add(INPUT_ERROR)
  }

  if (!formValues?.nome) {
    errors.push('Nome inválido')
    elements.push(formValues.referencias.nome)
    formValues.referencias.nome.classList.add(INPUT_ERROR)
  }

  if (!formValues?.dataNascimento) {
    errors.push('Data de nascimento inválida')
    elements.push(formValues.referencias.dataNascimento)
    formValues.referencias.dataNascimento.classList.add(INPUT_ERROR)
  }

  if (!formValues?.sexo) {
    errors.push('Sexo inválido')
  }

  if (!formValues?.logradouro) {
    errors.push('Logradouro inválido')
    elements.push(formValues.referencias.logradouro)
    formValues.referencias.logradouro.classList.add(INPUT_ERROR)
  }

  if (!formValues?.numero) {
    errors.push('Número inválido')
    elements.push(formValues.referencias.numero)
    formValues.referencias.numero.classList.add(INPUT_ERROR)
  }

  if (!formValues?.cep) {
    errors.push('CEP inválido')
    formValues.referencias.cep.classList.add(INPUT_ERROR)
  }

  if (!formValues?.cidade) {
    errors.push('Cidade inválida')
    elements.push(formValues.referencias.cidade)
    formValues.referencias.cidade.classList.add(INPUT_ERROR)
  }

  if (!formValues?.uf) {
    errors.push('UF inválido')
    elements.push(formValues.referencias.uf)
    formValues.referencias.uf.classList.add(INPUT_ERROR)
  }

  if (errors.length > 0) {
    elements[0].focus()
    alert('Por favor corrija os erros no cadastro: \n' + errors.join('\n'))
    return false
  }

  return true
}

function validateFormImc(formValues) {
  let errors = []

  if (!formValues?.peso) {
    errors.push('Peso inválido')
  }

  if (!formValues?.altura) {
    errors.push('Altura inválida')
  }

  if (errors.length > 0) {
    alert('Por favor corrija os erros no calculo de IMC: \n' + errors.join('\n'))
    return false
  }

  return true
}

function getFormCadastroValues() {
  let nome = document.querySelector('#nome')
  let dataNascimento = document.querySelector('#dataNascimento')
  let sexo = document.querySelector('input[name="sexo"]:checked');
  let cpf = document.querySelector('#cpf')
  let logradouro = document.querySelector('#logradouro')
  let numero = document.querySelector('#numero')
  let cep = document.querySelector('#cep')
  let cidade = document.querySelector('#cidade')
  let uf = document.querySelector('#uf')

  //referencias para o html, para poder colocar classes nos inputs depois
  let referencias = {
    nome,
    dataNascimento,
    sexo,
    cpf,
    logradouro,
    numero,
    cep,
    cidade,
    uf
  }

  return {
    nome: nome?.value,
    dataNascimento: dataNascimento?.value,
    sexo: sexo?.value,
    cpf: cpf?.value,
    logradouro: logradouro?.value,
    numero: numero?.value,
    cep: cep?.value,
    cidade: cidade?.value,
    uf: uf?.value,
    referencias
  }
}

function getFormImcValues() {
  let peso = +document.querySelector('#peso')?.value.replace(',', '.')
  let altura = +document.querySelector('#altura')?.value.replace(',', '.')

  return {
    peso,
    altura,
  }
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf == '') return false

  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false

  add = 0;
  for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i)
  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11)
    rev = 0
  if (rev != parseInt(cpf.charAt(9)))
    return false

  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11)
    rev = 0
  if (rev != parseInt(cpf.charAt(10)))
    return false
  return true
}