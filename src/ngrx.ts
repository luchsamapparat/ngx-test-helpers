import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, ActionReducer, ActionReducerMap, Store, StoreModule, combineReducers } from '@ngrx/store';
import { isUndefined } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { configureTestEnvironment, mergeModuleDefs } from './angular';

export interface ReducerConfig<T> {
    injectionToken: InjectionToken<ActionReducerMap<T>>;
    reducers: ActionReducerMap<T>;
}

export function configureEffectsTestEnvironment<T>(
    // tslint:disable-next-line:variable-name
    EffectsClass: {},
    actionsFn: () => Observable<Action>,
    moduleDef: TestModuleMetadata,
    reducerConfig: ReducerConfig<T>,
    appState?: T
) {
    configureTestEnvironment(
        mergeModuleDefs(
            getModuleDefForStore(reducerConfig, appState),
            {
                providers: [
                    EffectsClass,
                    provideMockActions(actionsFn)
                ]
            },
            moduleDef
        )
    );
}

export function getModuleDefForStore<T>(reducerConfig: ReducerConfig<T>, appState?: T): TestModuleMetadata {
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

export function getAppState<T>(stateFn: (T) => void) {
    getStore().subscribe(appState => stateFn(appState));
}

export function expectActionToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void) {
    expect(triggerAndWatchForActionCall(fixture, actionType, triggerFn)).not.toBeUndefined();
}

export function expectActionNotToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void) {
    expect(triggerAndWatchForActionCall(fixture, actionType, triggerFn)).toBeUndefined();
}

// tslint:disable-next-line:no-empty
function triggerAndWatchForActionCall(fixture: ComponentFixture<{}>, actionType: string, triggerFn = () => {}) {
    const storeDispatchSpy = spyOn(TestBed.get(Store), 'dispatch').and.callThrough();

    triggerFn();

    fixture.detectChanges();

    return storeDispatchSpy.calls
        .all()
        .find(
            call => (!isUndefined(call.args[0]) && (call.args[0].type === actionType))
        );
}

function getStore<T>(): Store<T> {
    return TestBed.get(Store);
}
