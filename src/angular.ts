import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { cloneDeep, isArray, isUndefined, mergeWith } from 'lodash-es';
import { elementByQuery, elementsByQuery } from './dom';

const defaultModuleDef: TestModuleMetadata = {
    imports: [],
    providers: [],
    declarations: [],
    schemas: []
};

export function setupComponentTest(moduleDef: TestModuleMetadata) {
    // workaround to improve component tests: prevent testing module from
    // being reset after every spec
    // see https://github.com/angular/angular/issues/12409

    const resetTestingModuleFn = TestBed.resetTestingModule;

    beforeAll(() => {
        TestBed.resetTestingModule();
        configureComponentTestEnvironment(moduleDef);
        TestBed.resetTestingModule = () => TestBed;
    });

    afterAll(() => {
        TestBed.resetTestingModule = resetTestingModuleFn;
    });
}

// tslint:disable-next-line:variable-name
export function configureComponentTestEnvironment(moduleDef: TestModuleMetadata) {
    configureTestEnvironment(
        mergeModuleDefs(
            {
                schemas: [
                    NO_ERRORS_SCHEMA
                ]
            },
            moduleDef
        )
    )
        .compileComponents();
}

export function mergeModuleDefs(...moduleDefs: TestModuleMetadata[]) {
    return moduleDefs.reduce(
        (moduleDef1, moduleDef2) => mergeWith(
            moduleDef1,
            moduleDef2,
            (newValue, value) => isArray(newValue) ? newValue.concat(value) : undefined
        ),
        cloneDeep(defaultModuleDef)
    );
}

export function createComponent<T>(component: Type<T>) {
    return TestBed.createComponent<T>(component);
}

export function forceChangeDetection<T>(fixture: ComponentFixture<T>) {
    // Forces change detection even on components with change detection set to OnPush
    // see https://github.com/angular/angular/issues/12313#issuecomment-300429985
    // tslint:disable-next-line
    (<any> fixture.changeDetectorRef)._view.nodes[0].componentView.state |= (1 << 3);
}

export function expectComponent<T>(fixture: ComponentFixture<T>) {
    return expect(fixture.componentInstance);
}

export function expectElementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): jasmine.Matchers<{} | null> {
    return expect(elementFromFixture(fixture, domQuery));
}

export function expectElementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): jasmine.ArrayLikeMatchers<{}> {
    return expect(elementsFromFixture(fixture, domQuery));
}

export function expectViewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): jasmine.Matchers<{}> {
    return expect(viewChildFromFixture(fixture, viewChildProperty));
}

export function componentFromFixture<T>(fixture: ComponentFixture<T>): T {
    return fixture.componentInstance;
}

export function viewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): Element {
    return (<HTMLElement> fixture.componentInstance[viewChildProperty].nativeElement);
}

export function formElementFromFixture<T>(fixture: ComponentFixture<T>, formControlName: string): Element | null {
    return elementFromFixture(fixture, getFormControlDomQuery(formControlName));
}

export function elementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): Element | null {
    const nativeElement = getNativeElement(fixture);
    return isUndefined(domQuery) ? nativeElement : elementByQuery(nativeElement, domQuery);
}

export function elementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): Element[] {
    const nativeElement = getNativeElement(fixture);
    return elementsByQuery(nativeElement, domQuery);
}

export function configureTestEnvironment(moduleDef: TestModuleMetadata) {
    return TestBed
        .configureTestingModule(moduleDef);
}

function getNativeElement<T>(fixture: ComponentFixture<T>): HTMLElement {
    fixture.detectChanges();
    return fixture.nativeElement;
}

function getFormControlDomQuery(formControlName: string): string {
    return `[formcontrolname="${formControlName}"]`;
}
