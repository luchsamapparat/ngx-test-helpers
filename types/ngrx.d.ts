import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Action, ActionReducerMap } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
export interface ReducerConfig<T> {
    injectionToken: InjectionToken<ActionReducerMap<T>>;
    reducers: ActionReducerMap<T>;
}
export declare function configureEffectsTestEnvironment<T>(EffectsClass: {}, actionsFn: () => Observable<Action>, moduleDef: TestModuleMetadata, reducerConfig: ReducerConfig<T>, appState?: T): void;
export declare function getModuleDefForStore<T>(reducerConfig: ReducerConfig<T>, appState?: T): {
    imports: ModuleWithProviders[];
    providers: {
        provide: InjectionToken<ActionReducerMap<T, Action>>;
        useValue: ActionReducerMap<T, Action>;
    }[];
};
export declare function getAppState<T>(stateFn: (T) => void): void;
export declare function expectActionToBeDispatched(fixture: ComponentFixture<{}>, actionType: {}): void;
