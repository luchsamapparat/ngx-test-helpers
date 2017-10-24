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

// tslint:disable-next-line:no-any
export function expectActionToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void, payload?: any) {
    const action = triggerAndWatchForAction(fixture, actionType, triggerFn);
    expect(action).not.toBeUndefined();

    if (!isUndefined(payload)) {
        // tslint:disable-next-line:no-string-literal
        expect(action['payload']).toEqual(payload);
    }
}

export function expectActionNotToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void) {
    const action = triggerAndWatchForAction(fixture, actionType, triggerFn);
    expect(action).toBeUndefined();
}

// tslint:disable-next-line
function triggerAndWatchForAction(fixture: ComponentFixture<{}>, actionType: string, triggerFn = () => {}): Action {
    const store = TestBed.get(Store);
    let storeDispatchSpy;

    if (isUndefined(store.dispatch.calls)) {
        storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    } else {
        storeDispatchSpy = store.dispatch;
        storeDispatchSpy.calls.reset();
    }

    triggerFn();

    fixture.detectChanges();

    const expectedCall = storeDispatchSpy.calls
        .all()
        .find(
            call => (!isUndefined(call.args[0]) && (call.args[0].type === actionType))
        );

    return isUndefined(expectedCall) ? expectedCall : expectedCall.args[0];
}

function getStore<T>(): Store<T> {
    return TestBed.get(Store);
}
