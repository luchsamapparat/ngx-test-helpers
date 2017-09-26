(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("@angular/core/testing"), require("@angular/core"), require("@ngrx/effects/testing"), require("@ngrx/store"));
	else if(typeof define === 'function' && define.amd)
		define("ngx-test-helpers", ["lodash", "@angular/core/testing", "@angular/core", "@ngrx/effects/testing", "@ngrx/store"], factory);
	else if(typeof exports === 'object')
		exports["ngx-test-helpers"] = factory(require("lodash"), require("@angular/core/testing"), require("@angular/core"), require("@ngrx/effects/testing"), require("@ngrx/store"));
	else
		root["ngx-test-helpers"] = factory(root["lodash"], root["@angular/core/testing"], root["@angular/core"], root["@ngrx/effects/testing"], root["@ngrx/store"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["configureComponentTestEnvironment"] = configureComponentTestEnvironment;
/* harmony export (immutable) */ __webpack_exports__["configureTestEnvironment"] = configureTestEnvironment;
/* harmony export (immutable) */ __webpack_exports__["mergeModuleDefs"] = mergeModuleDefs;
/* harmony export (immutable) */ __webpack_exports__["createComponent"] = createComponent;
/* harmony export (immutable) */ __webpack_exports__["expectComponent"] = expectComponent;
/* harmony export (immutable) */ __webpack_exports__["expectElementFromFixture"] = expectElementFromFixture;
/* harmony export (immutable) */ __webpack_exports__["expectElementsFromFixture"] = expectElementsFromFixture;
/* harmony export (immutable) */ __webpack_exports__["expectFormElementFromFixture"] = expectFormElementFromFixture;
/* harmony export (immutable) */ __webpack_exports__["expectFormElementsFromFixture"] = expectFormElementsFromFixture;
/* harmony export (immutable) */ __webpack_exports__["expectViewChildFromFixture"] = expectViewChildFromFixture;
/* harmony export (immutable) */ __webpack_exports__["componentFromFixture"] = componentFromFixture;
/* harmony export (immutable) */ __webpack_exports__["viewChildFromFixture"] = viewChildFromFixture;
/* harmony export (immutable) */ __webpack_exports__["formElementFromFixture"] = formElementFromFixture;
/* harmony export (immutable) */ __webpack_exports__["elementFromFixture"] = elementFromFixture;
/* harmony export (immutable) */ __webpack_exports__["childComponentsFromFixture"] = childComponentsFromFixture;
/* harmony export (immutable) */ __webpack_exports__["formElementsFromFixture"] = formElementsFromFixture;
/* harmony export (immutable) */ __webpack_exports__["elementsFromFixture"] = elementsFromFixture;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_testing__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_testing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core_testing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom__ = __webpack_require__(3);




var defaultModuleDef = {
    imports: [],
    providers: [],
    declarations: [],
    schemas: []
};
// tslint:disable-next-line:variable-name
function configureComponentTestEnvironment(ComponentClass, moduleDef) {
    configureTestEnvironment(mergeModuleDefs({
        declarations: [
            ComponentClass
        ],
        schemas: [
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NO_ERRORS_SCHEMA"]
        ]
    }, moduleDef))
        .compileComponents();
}
function configureTestEnvironment(moduleDef) {
    return __WEBPACK_IMPORTED_MODULE_1__angular_core_testing__["TestBed"]
        .configureTestingModule(moduleDef);
}
function mergeModuleDefs() {
    var moduleDefs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        moduleDefs[_i] = arguments[_i];
    }
    return moduleDefs.reduce(function (moduleDef1, moduleDef2) { return Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["mergeWith"])(moduleDef1, moduleDef2, function (newValue, value) { return Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isArray"])(newValue) ? newValue.concat(value) : undefined; }); }, defaultModuleDef);
}
function createComponent(component) {
    return __WEBPACK_IMPORTED_MODULE_1__angular_core_testing__["TestBed"].createComponent(component);
}
function expectComponent(fixture) {
    return expect(fixture.componentInstance);
}
function expectElementFromFixture(fixture, domQuery) {
    return expect(elementFromFixture(fixture, domQuery));
}
function expectElementsFromFixture(fixture, domQuery) {
    return expect(elementsFromFixture(fixture, domQuery));
}
function expectFormElementFromFixture(fixture, formControlName) {
    return expect(elementFromFixture(fixture, getFormControlDomQuery(formControlName)));
}
function expectFormElementsFromFixture(fixture, formControlName) {
    return expect(elementsFromFixture(fixture, getFormControlDomQuery(formControlName)));
}
function expectViewChildFromFixture(fixture, viewChildProperty) {
    return expect(viewChildFromFixture(fixture, viewChildProperty));
}
function componentFromFixture(fixture) {
    return fixture.componentInstance;
}
function viewChildFromFixture(fixture, viewChildProperty) {
    return fixture.componentInstance[viewChildProperty].nativeElement;
}
function formElementFromFixture(fixture, formControlName) {
    return elementFromFixture(fixture, getFormControlDomQuery(formControlName));
}
function elementFromFixture(fixture, domQuery) {
    var nativeElement = getNativeElement(fixture);
    return Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isUndefined"])(domQuery) ? nativeElement : Object(__WEBPACK_IMPORTED_MODULE_3__dom__["elementByQuery"])(nativeElement, domQuery);
}
function childComponentsFromFixture(fixture, domQuery) {
    return elementsFromFixture(fixture, domQuery);
}
function formElementsFromFixture(fixture, formControlName) {
    return elementsFromFixture(fixture, getFormControlDomQuery(formControlName));
}
function elementsFromFixture(fixture, domQuery) {
    var nativeElement = getNativeElement(fixture);
    return Object(__WEBPACK_IMPORTED_MODULE_3__dom__["elementsByQuery"])(nativeElement, domQuery);
}
function getNativeElement(fixture) {
    fixture.detectChanges();
    return fixture.nativeElement;
}
function getFormControlDomQuery(formControlName) {
    return "[formcontrolname=\"" + formControlName + "\"]";
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["expectElement"] = expectElement;
/* harmony export (immutable) */ __webpack_exports__["expectElements"] = expectElements;
/* harmony export (immutable) */ __webpack_exports__["elementByQuery"] = elementByQuery;
/* harmony export (immutable) */ __webpack_exports__["elementsByQuery"] = elementsByQuery;
/* harmony export (immutable) */ __webpack_exports__["childComponentsByQuery"] = childComponentsByQuery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

function expectElement(rootElement, domQuery) {
    return expect(elementByQuery(rootElement, domQuery));
}
function expectElements(rootElement, domQuery) {
    return expect(elementsByQuery(rootElement, domQuery));
}
function elementByQuery(rootElement, domQuery) {
    return rootElement.querySelector(domQuery);
}
function elementsByQuery(rootElement, domQuery) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["toArray"])(rootElement.querySelectorAll(domQuery));
}
function childComponentsByQuery(rootElement, domQuery) {
    return elementsByQuery(rootElement, domQuery);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
module.exports = __webpack_require__(6);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["configureEffectsTestEnvironment"] = configureEffectsTestEnvironment;
/* harmony export (immutable) */ __webpack_exports__["getModuleDefForStore"] = getModuleDefForStore;
/* harmony export (immutable) */ __webpack_exports__["getAppState"] = getAppState;
/* harmony export (immutable) */ __webpack_exports__["expectActionToBeDispatched"] = expectActionToBeDispatched;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core_testing__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core_testing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core_testing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects_testing__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects_testing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects_testing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular__ = __webpack_require__(1);





function configureEffectsTestEnvironment(
    // tslint:disable-next-line:variable-name
    EffectsClass, actionsFn, moduleDef, reducerConfig, appState) {
    Object(__WEBPACK_IMPORTED_MODULE_4__angular__["configureTestEnvironment"])(Object(__WEBPACK_IMPORTED_MODULE_4__angular__["mergeModuleDefs"])(getModuleDefForStore(reducerConfig, appState), {
        providers: [
            EffectsClass,
            Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects_testing__["provideMockActions"])(actionsFn)
        ]
    }, moduleDef));
}
function getModuleDefForStore(reducerConfig, appState) {
    return {
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["StoreModule"].forRoot(reducerConfig.injectionToken, {
                initialState: Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["isUndefined"])(appState) ? {} : appState
            })
        ],
        providers: [
            { provide: reducerConfig.injectionToken, useValue: reducerConfig.reducers }
        ]
    };
}
function getAppState(stateFn) {
    getStore().subscribe(function (appState) { return stateFn(appState); });
}
function expectActionToBeDispatched(fixture, actionType) {
    var storeDispatchSpy = spyOn(__WEBPACK_IMPORTED_MODULE_0__angular_core_testing__["TestBed"].get(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"]), 'dispatch').and.callThrough();
    fixture.detectChanges();
    var dispatchActionCall = storeDispatchSpy.calls
        .all()
        .find(function (call) { return (!Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["isUndefined"])(call.args[0]) && (call.args[0].type === actionType)); });
    expect(dispatchActionCall).not.toBeUndefined();
}
function getStore() {
    return __WEBPACK_IMPORTED_MODULE_0__angular_core_testing__["TestBed"].get(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"]);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ngx-test-helpers.js.map