sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function ( Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper;


        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () { //onInit equivale a INITIALIZATION no ABAP
                
                //alert("Meu primeiro programa Fiori");
            let produto = {};
            let productModel = new JSONModel(produto);
            let view = this.getView();
            view.setModel(productModel, "ModeloProduto");
            //this no javascript é igual me no abap - referencia a si mesmo

            },
            onClickImage : function(oEvent){
                urlObject.redirect(oEvent.getSource().get.Src(), true);

            },
            onPressBuscar: function(){
               let input;
               input = this.byId("inpBusca");
               let valor = input.getValue();
             //  alert(valor); 
               let parameters = {
                url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                method : "GET", //Ler
                async : true,
                crossDomain : true
               };
               //Chamar API
               //debugger
               //promisse = quando uma função retorna como parâemtro de exportação outra função
               $.ajax(parameters).done(function(response){
                //obter instancia do modelo 
                let oProdutoModel = this.getView().getModel("ModeloProduto");
                //clear
                oProdutoModel.setData({});
                oProdutoModel.refresh(); // Limpa Tela
                oProdutoModel.setData(response);
                oProdutoModel.refresh();




               }.bind(this))//sucesso - retorno . .bind(this), pega função(response) e anexa no this(global,prog principal)
               .fail(function (){

               }.bind(this));//exception
            }
        });});