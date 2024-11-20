/*global QUnit*/

sap.ui.define([
	"flight_dc/controller/view1f.controller"
], function (Controller) {
	"use strict";

	QUnit.module("view1f Controller");

	QUnit.test("I should test the view1f controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
