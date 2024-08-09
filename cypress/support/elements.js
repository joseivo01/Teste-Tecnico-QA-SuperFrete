module.exports = {
    opcoes_sidebar: (item) => {return `div > a[title="${item}"]`},

    // Foi escolhido usar os name, visto que há IDs duplicados
    input_cep_origem: 'input[name="origin_postcode"]',
    input_formato: 'div[aria-labelledby="object_format"]',
    input_peso: 'div[aria-labelledby="weight"]',
    input_altura: 'input[name="package_height"]',
    input_largura: 'input[name="package_width"]',
    input_comprimento: 'input[name="package_depth"]',

    botao_salvar_descricao_produto: 'button[aria-label="Salvar"]',
    botao_limpar_descricao_produto: 'button[aria-label="Limpar"]',

    // Modal adicionar email
    email: '#email',
    botao_concluir: 'button:contains("Concluir")',

    selecionar_tipo_pacote: (item) => {return `ul.MuiMenu-list > li.Mui-selected:contains("${item}") `},

    mais_opcoes: 'p.MuiTypography-root:contains("Seguro, aviso e mão própria")',
    input_opcional_mao_propria: 'input[name="optional_services_self_hand"]',
    input_opcional_aviso_de_recebimento:'input[name="optional_services_acknowledgment_of_receipt"]',
    input_opcional_declaracao_de_valor: 'input[name="optional_services_value_declaration"]',
    input_inserir_valor_declarado_objeto: 'input[name="object_value"]',

    input_cep_destino:'input[name="destiny_postcode"]',

    botao_calcular_frete_com_desconto: 'button:contains("CALCULAR FRETE COM DESCONTO")',
    nao_sei_cep: 'button:contains("Não sei o CEP")',
    botao_emitir_frete_com_desconto: 'button:contains("EMITIR FRETE COM DESCONTO")',

    // Elementos que exibe os erros e notificações
    label_do_campo_com_erro: 'label.Mui-error',
    elemento_com_erro: 'p.MuiFormHelperText-root', // comparar o texto esperado

    notificacao: '#notistack-snackbar', // Salvar/Limpar

    // Buscar/Pesquisar Cep
    input_estado: '#states',
    input_cidade: '#cities',
    input_logradouro: '#street',

    botao_buscar: 'button:contains("BUSCAR")',
    seta_voltar: 'svg[viewBox="0 0 24 24"] > path[d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"]'
}