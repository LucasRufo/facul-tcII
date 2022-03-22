let formularioCadastro = document.getElementById('formCadastro')
let formularioImc = document.getElementById('formIMC')

const ACTIVE_CLASS = 'active-row'
const DISPLAY_NONE = 'd-none'

formularioCadastro.onsubmit = onFormCadastroSubmit
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

function validateFormCadastro(formValues) {
  let errors = []

  if (!validarCPF(formValues?.cpf)) {
    errors.push('CPF inválido')
  }

  if (!formValues?.nome) {
    errors.push('Nome inválido')
  }

  if (!formValues?.dataNascimento) {
    errors.push('Data de nascimento inválida')
  }

  if (!formValues?.sexo) {
    errors.push('Sexo inválido')
  }

  if (!formValues?.logradouro) {
    errors.push('Logradouro inválido')
  }

  if (!formValues?.numero) {
    errors.push('Número inválido')
  }

  if (!formValues?.cep) {
    errors.push('CEP inválido')
  }

  if (!formValues?.cidade) {
    errors.push('Cidade inválida')
  }

  if (!formValues?.uf) {
    errors.push('UF inválido')
  }

  if (errors.length > 0) {
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
  let nome = document.querySelector('#nome')?.value
  let dataNascimento = document.querySelector('#dataNascimento')?.value
  let sexo = document.querySelector('input[name="sexo"]:checked')?.value;
  let cpf = document.querySelector('#cpf')?.value
  let logradouro = document.querySelector('#logradouro')?.value
  let numero = document.querySelector('#numero')?.value
  let cep = document.querySelector('#cep')?.value
  let cidade = document.querySelector('#cidade')?.value
  let uf = document.querySelector('#uf')?.value

  return {
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