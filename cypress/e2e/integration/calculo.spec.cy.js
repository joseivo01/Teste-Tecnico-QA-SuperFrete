const produtos = require("../../fixtures/produtos_descricao")
const calculoPage = require("../../pages/calculo_page")

const calculo_page = new calculoPage

describe('Calcular testes', () => {
    let produto = produtos.produto_1
    let produto_erro = produtos.produto_2

    beforeEach(() => {
        cy.clear_session()
        cy.wait(1000) // trocar para 10000
    });

    afterEach(() => {
        cy.wait(1000); // Espera 1 segundo antes de iniciar o próximo teste
    });

    it('Calcular o envio do pacote com sucesso', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.verificar_botao_emitir_desconto()
    });
    it('Calcular o envio do pacote com seguro com corretamente', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        
        calculo_page.clicar_botao_seguro_aviso_maopropria()
        calculo_page.selecionar_mao_propria()
        calculo_page.selecionar_aviso_recebimento()
        calculo_page.selecionar_declarar_valor()
        calculo_page.inserir_valor_a_declarar(produto.valor_do_seguro)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.inserir_email()

        calculo_page.verificar_botao_emitir_desconto()
    });
    it('Salvar informações de um pacote com sucesso', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.clicar_botao_salvar()
        calculo_page.verificar_notificacao("As informações do pacote atual foram salvas e estarão preenchidas na próxima vez que você abrir o aplicativo.")
    });
    it('Limpar informações de um pacote com sucesso', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.clicar_botao_limpar()
        calculo_page.verificar_notificacao("As informações do pacote foram limpas.")
    });
    it('Ao calcular o envio do pacote com soma, da altura, largura e comprimento deve acusar erro.', () => {
        //obs:. Melhoria: deixar claro que a soma de tudo nao deve ser supero a 300cm.
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto_erro.altura_pacote)
        calculo_page.inserir_largura(produto_erro.largura_pacote)
        calculo_page.inserir_comprimento(produto_erro.comprimento_pacote)

        calculo_page.clicar_botao_calcular_frete_com_desconto()
        cy.contains("a soma resultante da altura + largura + comprimento não deve superar 300 cm.").should('exist')
    });
    it('Ao calcular o envio do pacote com valor abaixo de 12,25, da altura, deve acusar erro.', () => {
        //obs:. Melhoria: deixar claro que o valor minimo é 12,25 (placeholder).
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.clicar_botao_seguro_aviso_maopropria()
        calculo_page.selecionar_mao_propria()
        calculo_page.selecionar_aviso_recebimento()
        calculo_page.selecionar_declarar_valor()
        calculo_page.inserir_valor_a_declarar(produto_erro.valor_do_seguro)

        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("O valor declarado não pode ser menor do que R$ 12,25")
    });
    it('Ao tentar calcular o envio do pacote com destino o mesmo que a origem, deve informar que não pode.', () => {
        //o cep de origem não pode postar para o cep de destino.
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_origem)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        cy.contains("o cep de origem não pode postar para o cep de destino.").should('exist')
    });
    it('Ao tentar calcular o envio do pacote com o cep de origem inválido, deve informar um erro.', () => {
        calculo_page.inserir_cep_origem(produto_erro.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_origem)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("CEP de origem inválido.")
    });
    it('Ao tentar calcular o envio do pacote com o cep de destino inválido, deve informar um erro.', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto_erro.cep_origem)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("CEP de destino inválido.")
    });
    it('Ao declarar valor de seguro ao calcular um produto, o campo não deve estar vazio', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        
        calculo_page.clicar_botao_seguro_aviso_maopropria()
        calculo_page.selecionar_mao_propria()
        calculo_page.selecionar_aviso_recebimento()
        calculo_page.selecionar_declarar_valor()

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        cy.contains("o valor declarado precisa ser preenchido.").should('exist')
    });

    // Obs:. Foi escolhido fazer casos de testes separado, para manter uma melhor rastreabilidade dos problemas
    it('Tentar calcular o valor do frete do produto com o campo "CEP de origem" vazio', () => {
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("CEP de origem é obrigatório")
    });
    it('Tentar calcular o valor do frete do produto com o campo "Peso" vazio', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("peso é obrigatório","Peso")
    });
    it('Tentar calcular o valor do frete do produto com o campo "Altura" vazio', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Altura mínima 0.4 cm.","Altura")
    });
    it('Tentar calcular o valor do frete do produto com o campo "Largura" vazio', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Largura mínima 8 cm.","Largura")
    });
    it('Tentar calcular o valor do frete do produto com o campo "Comprimento" vazio', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Comprimento mínimo 13 cm.","Comprimento")
    });
    it('Tentar calcular o valor do frete do produto com o campo "CEP de destino" vazio', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        //calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("CEP de destino é obrigatório","CEP de destino")
    });
    
    //altura, largura e comprimento precisa ser um número, atualmente recebe nao numero.
    it('Campo Altura deve possuir altura maxima de 150cm', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto_erro.altura_pacote + '1')
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Altura máxima 150 cm.","Altura")
    });
    it('Campo Largura deve possuir altura maxima de 150cm', () => {
        //Largura máxima 150 cm.
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote )
        calculo_page.inserir_largura(produto_erro.largura_pacote + '1')
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Largura máxima 150 cm.","Largura")
    });
    it('Campo Comprimento deve possuir altura maxima de 150cm', () => {
        //Comprimento máxima 150 cm.
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote )
        calculo_page.inserir_largura(produto.largura_pacote )
        calculo_page.inserir_comprimento(produto_erro.comprimento_pacote + '1')

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Comprimento máximo 150 cm.","Comprimento")
    });
    it('Campo Altura deve possuir altura minima de 0.4cm', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura("0.3")
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Altura mínima 0.4 cm.","Altura")
    });
    it('Campo Largura deve possuir altura minima de 8 cm', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura("7")
        calculo_page.inserir_comprimento(produto.comprimento_pacote)

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Largura mínima 8 cm.","Largura")
    });
    it('Campo Comprimento deve possuir altura minima de 13 cm', () => {
        calculo_page.inserir_cep_origem(produto.cep_origem)
        calculo_page.selecionar_formato(produto.formato_pacote)
        calculo_page.selecionar_peso(produto.peso_pacote)
        calculo_page.inserir_altura(produto.altura_pacote)
        calculo_page.inserir_largura(produto.largura_pacote)
        calculo_page.inserir_comprimento("12")

        calculo_page.inserir_cep_destino(produto.cep_destino)
        calculo_page.clicar_botao_calcular_frete_com_desconto()

        calculo_page.mensagem_erro_visivel("Comprimento mínimo 13 cm.","Comprimento")
    });
});
  