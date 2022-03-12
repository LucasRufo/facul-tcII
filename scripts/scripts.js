let formularioCadastro = document.getElementById('formCadastro')

formularioCadastro.onsubmit = onFormCadastroSubmit

function onFormCadastroSubmit(e) {
  e.preventDefault()

  let formValues = getFormCadastroValues()

  let formIsValid = validateFormCadastro(formValues)

  if (formIsValid) {
    alert('Cadastro realizado com sucesso!')
    formularioCadastro.reset()
  }
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