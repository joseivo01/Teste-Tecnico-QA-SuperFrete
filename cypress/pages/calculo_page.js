const elements = require("../support/elements")

class CalculoPage {
    inserir_cep_origem(cep_origem){
        cy.get(elements.input_cep_origem).type(cep_origem, {delay: 0}), {delay: 0} 
    }
    selecionar_formato(formato){
        cy.get(elements.input_formato).click({force:true})
        cy.get(elements.selecionar_tipo_pacote(formato)).should('be.visible').click()
    }
    selecionar_peso(peso){
        cy.get(elements.input_peso).click()
        cy.contains(peso).click()
    }
    inserir_altura(altura){
        cy.get(elements.input_altura).type(altura, {delay: 0})
    }
    inserir_largura(largura){
        cy.get(elements.input_largura).type(largura, {delay: 0})
    }
    inserir_comprimento(comprimento){
        cy.get(elements.input_comprimento).type(comprimento, {delay: 0})
    }

    clicar_botao_seguro_aviso_maopropria(){
        cy.get(elements.mais_opcoes).click({force:true})
        cy.wait(500)
    }
    selecionar_mao_propria(){
        cy.get(elements.input_opcional_mao_propria).click()
    }
    selecionar_aviso_recebimento(){
        cy.get(elements.input_opcional_aviso_de_recebimento).click()
    }
    selecionar_declarar_valor(){
        cy.get(elements.input_opcional_declaracao_de_valor).click()
    }
    inserir_valor_a_declarar(valor){
        cy.get(elements.input_inserir_valor_declarado_objeto).type(valor, {delay: 0})
    }

    inserir_cep_destino(cep_destino){
        cy.get(elements.input_cep_destino).should('be.visible').type(cep_destino, {delay: 0})
    }

    clicar_botao_calcular_frete_com_desconto(){
        cy.get(elements.botao_calcular_frete_com_desconto).should('be.visible').click()
    }

    clicar_botao_salvar(){
        cy.get(elements.botao_salvar_descricao_produto).should('be.visible').click()
    }

    clicar_botao_limpar(){
        cy.get(elements.botao_limpar_descricao_produto).should('be.visible').click()
    }

    clicar_nao_sei_cep(){
        cy.get(elements.nao_sei_cep).click()
    }

    verificar_botao_emitir_desconto(){
        cy.get(elements.botao_emitir_frete_com_desconto).should('exist')
        .scrollIntoView().and('be.visible')
    }

    inserir_email(){
        cy.get(elements.email).type("email@example.com", {delay: 0})
        cy.get(elements.botao_concluir).click()
    }

    mensagem_erro_visivel(mensagem, label=null){
        if(label != null){
            cy.get(elements.label_do_campo_com_erro).should('be.visible')
            .and('contain', label);
        }
        cy.get(elements.elemento_com_erro).should('contain', mensagem);
    }

    verificar_notificacao(mensagem){
        cy.get(elements.notificacao).contains(mensagem).should('be.visible')
    }

    buscar_cep_por_estado_cidade(estado, cidade, logradouro=null){
        cy.get(elements.input_estado).type(estado,{delay:0})
        cy.contains(estado).click()
        cy.get(elements.input_cidade).type(cidade,{delay:0})
        cy.contains(cidade).click()
        if(logradouro != null){
           cy.get(elements.input_logradouro).type(logradouro,{delay:0})
        }
        cy.get(elements.botao_buscar).click()
    }
}

export default CalculoPage;
