import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { isArray, isUndefined, mergeWith, toArray } from 'lodash-es';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';

/**
 * @param {?} rootElement
 * @param {?} domQuery
 * @return {?}
 */
function expectElement(rootElement, domQuery) {
    return expect(elementByQuery(rootElement, domQuery));
}
/**
 * @param {?} rootElement
 * @param {?} domQuery
 * @return {?}
 */
function expectElements(rootElement, domQuery) {
    return expect(elementsByQuery(rootElement, domQuery));
}
/**
 * @param {?} rootElement
 * @param {?} domQuery
 * @return {?}
 */
function elementByQuery(rootElement, domQuery) {
    return rootElement.querySelector(domQuery);
}
/**
 * @param {?} rootElement
 * @param {?} domQuery
 * @return {?}
 */
function elementsByQuery(rootElement, domQuery) {
    return toArray(rootElement.querySelectorAll(domQuery));
}
/**
 * @template T
 * @param {?} rootElement
 * @param {?} domQuery
 * @return {?}
 */
function childComponentsByQuery(rootElement, domQuery) {
    return /** @type {?} */ (((elementsByQuery(rootElement, domQuery))));
}

const defaultModuleDef = {
    imports: [],
    providers: [],
    declarations: [],
    schemas: []
};
/**
 * @param {?} moduleDef
 * @return {?}
 */
function setupComponentTest(moduleDef) {
    // workaround to improve component tests: prevent testing module from
    // being reset after every spec
    // see https://github.com/angular/angular/issues/12409
    const /** @type {?} */ resetTestingModuleFn = TestBed.resetTestingModule;
    beforeAll(() => {
        TestBed.resetTestingModule();
        configureComponentTestEnvironment(moduleDef);
        TestBed.resetTestingModule = () => TestBed;
    });
    afterAll(() => {
        TestBed.resetTestingModule = resetTestingModuleFn;
    });
}
/**
 * @param {?} moduleDef
 * @return {?}
 */
function configureComponentTestEnvironment(moduleDef) {
    configureTestEnvironment(mergeModuleDefs({
        schemas: [
            NO_ERRORS_SCHEMA
        ]
    }, moduleDef))
        .compileComponents();
}
/**
 * @param {...?} moduleDefs
 * @return {?}
 */
function mergeModuleDefs(...moduleDefs) {
    return moduleDefs.reduce((moduleDef1, moduleDef2) => mergeWith(moduleDef1, moduleDef2, (newValue, value) => isArray(newValue) ? newValue.concat(value) : undefined), defaultModuleDef);
}
/**
 * @template T
 * @param {?} component
 * @return {?}
 */
function createComponent(component) {
    return TestBed.createComponent(component);
}
/**
 * @template T
 * @param {?} fixture
 * @return {?}
 */
function forceChangeDetection(fixture) {
    // Forces change detection even on components with change detection set to OnPush
    // see https://github.com/angular/angular/issues/12313#issuecomment-300429985
    // tslint:disable-next-line
    ((fixture.changeDetectorRef))._view.nodes[0].componentView.state |= (1 << 3);
}
/**
 * @template T
 * @param {?} fixture
 * @return {?}
 */
function expectComponent(fixture) {
    return expect(fixture.componentInstance);
}
/**
 * @template T
 * @param {?} fixture
 * @param {?=} domQuery
 * @return {?}
 */
function expectElementFromFixture(fixture, domQuery) {
    return expect(elementFromFixture(fixture, domQuery));
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} domQuery
 * @return {?}
 */
function expectElementsFromFixture(fixture, domQuery) {
    return expect(elementsFromFixture(fixture, domQuery));
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} formControlName
 * @return {?}
 */
function expectFormElementFromFixture(fixture, formControlName) {
    return expect(elementFromFixture(fixture, getFormControlDomQuery(formControlName)));
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} viewChildProperty
 * @return {?}
 */
function expectViewChildFromFixture(fixture, viewChildProperty) {
    return expect(viewChildFromFixture(fixture, viewChildProperty));
}
/**
 * @template T
 * @param {?} fixture
 * @return {?}
 */
function componentFromFixture(fixture) {
    return fixture.componentInstance;
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} viewChildProperty
 * @return {?}
 */
function viewChildFromFixture(fixture, viewChildProperty) {
    return ((fixture.componentInstance[viewChildProperty].nativeElement));
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} formControlName
 * @return {?}
 */
function formElementFromFixture(fixture, formControlName) {
    return elementFromFixture(fixture, getFormControlDomQuery(formControlName));
}
/**
 * @template T
 * @param {?} fixture
 * @param {?=} domQuery
 * @return {?}
 */
function elementFromFixture(fixture, domQuery) {
    const /** @type {?} */ nativeElement = getNativeElement(fixture);
    return isUndefined(domQuery) ? nativeElement : elementByQuery(nativeElement, domQuery);
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} domQuery
 * @return {?}
 */
function childComponentsFromFixture(fixture, domQuery) {
    return /** @type {?} */ (((elementsFromFixture(fixture, domQuery))));
}
/**
 * @template T
 * @param {?} fixture
 * @param {?} domQuery
 * @return {?}
 */
function elementsFromFixture(fixture, domQuery) {
    const /** @type {?} */ nativeElement = getNativeElement(fixture);
    return elementsByQuery(nativeElement, domQuery);
}
/**
 * @param {?} moduleDef
 * @return {?}
 */
function configureTestEnvironment(moduleDef) {
    return TestBed
        .configureTestingModule(moduleDef);
}
/**
 * @template T
 * @param {?} fixture
 * @return {?}
 */
function getNativeElement(fixture) {
    fixture.detectChanges();
    return fixture.nativeElement;
}
/**
 * @param {?} formControlName
 * @return {?}
 */
function getFormControlDomQuery(formControlName) {
    return `[formcontrolname="${formControlName}"]`;
}

/**
 * @template T
 * @param {?} EffectsClass
 * @param {?} actionsFn
 * @param {?} moduleDef
 * @param {?} reducerConfig
 * @param {?=} appState
 * @return {?}
 */
function configureEffectsTestEnvironment(
    // tslint:disable-next-line:variable-name
    EffectsClass, actionsFn, moduleDef, reducerConfig, appState) {
    configureTestEnvironment(mergeModuleDefs(getModuleDefForStore(reducerConfig, appState), {
        providers: [
            EffectsClass,
            provideMockActions(actionsFn)
        ]
    }, moduleDef));
}
/**
 * @template T
 * @param {?} reducerConfig
 * @param {?=} appState
 * @return {?}
 */
function getModuleDefForStore(reducerConfig, appState) {
    return {
        imports: [
            StoreModule.forRoot(reducerConfig.injectionToken, {
                initialState: isUndefined(appState) ? {} : appState
            })
        ],
        providers: [
            { provide: reducerConfig.injectionToken, useValue: reducerConfig.reducers }
        ]
    };
}
/**
 * @template T
 * @param {?} stateFn
 * @return {?}
 */
function getAppState(stateFn) {
    getStore().subscribe(appState => stateFn(appState));
}
/**
 * @param {?} fixture
 * @param {?} actionType
 * @param {?=} triggerFn
 * @param {?=} payload
 * @return {?}
 */
function expectActionToBeDispatched(fixture, actionType, triggerFn, payload) {
    const /** @type {?} */ action = triggerAndWatchForAction(fixture, actionType, triggerFn);
    expect(action).not.toBeUndefined();
    if (!isUndefined(payload)) {
        // tslint:disable-next-line:no-string-literal
        expect(action['payload']).toEqual(payload);
    }
}
/**
 * @param {?} fixture
 * @param {?} actionType
 * @param {?=} triggerFn
 * @return {?}
 */
function expectActionNotToBeDispatched(fixture, actionType, triggerFn) {
    const /** @type {?} */ action = triggerAndWatchForAction(fixture, actionType, triggerFn);
    expect(action).toBeUndefined();
}
/**
 * @param {?} fixture
 * @param {?} actionType
 * @param {?=} triggerFn
 * @return {?}
 */
function triggerAndWatchForAction(fixture, actionType, triggerFn = () => { }) {
    const /** @type {?} */ store$$1 = TestBed.get(Store);
    let /** @type {?} */ storeDispatchSpy;
    if (isUndefined(store$$1.dispatch.calls)) {
        storeDispatchSpy = spyOn(store$$1, 'dispatch').and.callThrough();
    }
    else {
        storeDispatchSpy = store$$1.dispatch;
        storeDispatchSpy.calls.reset();
    }
    triggerFn();
    fixture.detectChanges();
    const /** @type {?} */ expectedCall = storeDispatchSpy.calls
        .all()
        .find(call => (!isUndefined(call.args[0]) && (call.args[0].type === actionType)));
    return isUndefined(expectedCall) ? expectedCall : expectedCall.args[0];
}
/**
 * @template T
 * @return {?}
 */
function getStore() {
    return TestBed.get(Store);
}

/// <reference types="jasmine" />

/**
 * Generated bundle index. Do not edit.
 */

export { setupComponentTest, configureComponentTestEnvironment, mergeModuleDefs, createComponent, forceChangeDetection, expectComponent, expectElementFromFixture, expectElementsFromFixture, expectFormElementFromFixture, expectViewChildFromFixture, componentFromFixture, viewChildFromFixture, formElementFromFixture, elementFromFixture, childComponentsFromFixture, elementsFromFixture, configureTestEnvironment, expectElement, expectElements, elementByQuery, elementsByQuery, childComponentsByQuery, configureEffectsTestEnvironment, getModuleDefForStore, getAppState, expectActionToBeDispatched, expectActionNotToBeDispatched };
//# sourceMappingURL=ngx-test-helpers.js.map
