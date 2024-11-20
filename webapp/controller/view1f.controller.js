sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, MessageToast, JSONModel) {
        "use strict";



        return Controller.extend("flightdc.controller.view1f", {
            onInit: function () {

            },
            onLoad: function () {
                MessageToast.show("Fetching....")
                var model =this.getOwnerComponent().getModel();
                var path = this.getOwnerComponent().getModel().sServiceUrl;
                // 'http://in-blr-srv1.corp.capgemini.com:8000'y
                // BusinessPartnerSet('0100000000')/ToSalesOrders
                var url = path + '/zsflightSet?$format=json&$expand=zsbookSet'
                
                console.log(url);
                var that = this


                var entity = '/zsflightSet?$format=json&$expand=zsbookSet'
                model.read(entity,{
                        success: function(odata,res){
                            if(res.statusCode==="200" || res.statusText==="OK"){
                                var oMod = new JSONModel(odata)
                                console.log(oMod);
                                
                                that.getView().setModel(oMod,"dcc")
                            }
                        }
                })

                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "json",
                    success: function (odata, response) {
                        console.log(odata);
                        console.log(response);

                        if (response === 'success') {
                            var oModel = new JSONModel(odata)
                            // var oDateArray = oModel['oData']['d']['results'];

                            // dateFormetter(oDateArray)

                            // function dateFormetter(oDateArray){
                            //     oDateArray.forEach(element => {
                            //         let timestamp = parseInt(element['Fldate'].replace("/Date(", "").replace(")/", ""));

                            //         let date = new Date(timestamp);

                            //         let formattedDate = date.toLocaleDateString('en-GB', {
                            //             weekday: 'short', // "Mon"
                            //             day: '2-digit',   // "01"
                            //             month: 'short',   // "Jan"
                            //             year: 'numeric'   // "'23"
                            //         });

                            //         console.log(formattedDate); 

                            //         element['Fldate'] = formattedDate
                            //     });

                            // }

                            that.getView().setModel(oModel, "dc")
                            // var view = that.getView().getModel("dc")

                        }
                    },
                    error: function () {
                        console.log("error");
                    }


                    


                })
            },
             dateFormetterAlone: function(oDate){
                if(!oDate){
                    return "N/A";
                }else{
                    let timestamp = parseInt(oDate.replace("/Date(", "").replace(")/", ""));
    
                    let date = new Date(timestamp);
    
                    let formattedDate = date.toLocaleDateString('en-GB', {
                        weekday: 'short', // "Mon"
                        day: '2-digit',   // "01"
                        month: 'short',   // "Jan"
                        year: 'numeric'   // "'23"
                    });
    
                    return formattedDate;
                }
                
            },
            onRowSelect: function (oAction) {
                // console.log(oAction);
                var oRowContextBinding = oAction.getParameter("rowContext")
                var path = `dc>${oRowContextBinding.sPath}`
                console.log(path);
                var oForm = this.getView().byId("idSimpleForm")
                oForm.bindElement(path)   //element binding

                var path1 = `dc>${oRowContextBinding.sPath}`
                var oTab = this.getView().byId("t12")
                oTab.bindElement(path1)   //element binding
                // console.log(path1);
            }
        });

        function dateFormetter(oDateArray) {
            oDateArray.forEach(element => {
                let timestamp = parseInt(element['Fldate'].replace("/Date(", "").replace(")/", ""));

                let date = new Date(timestamp);

                let formattedDate = date.toLocaleDateString('en-GB', {
                    weekday: 'short', // "Mon"
                    day: '2-digit',   // "01"
                    month: 'short',   // "Jan"
                    year: 'numeric'   // "'23"
                });

                let oArryaDate = element['zsbookSet']['results']
                // console.log(oArryaDate);

                    oArryaDate.forEach(ele => {

                        if (ele['OrderDate']!==undefined) {

                            let timestamp1 = parseInt(ele['OrderDate'].replace("/Date(", "").replace(")/", ""));

                            let date1 = new Date(timestamp1);

                            let formattedDate1 = date1.toLocaleDateString('en-GB', {
                                weekday: 'short', // "Mon"
                                day: '2-digit',   // "01"
                                month: 'short',   // "Jan"
                                year: 'numeric'   // "'23"
                            });

                            console.log(formattedDate1);

                            ele['OrderDate'] = formattedDate1==='Invalid Date'?'N/A':formattedDate1

                        }
                    })


                element['Fldate'] = formattedDate
            });

        }

        
    });
