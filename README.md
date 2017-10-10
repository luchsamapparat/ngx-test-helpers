# ngx-test-helpers

Various helper methods for testing Angular applications with Jasmine.

Install `ngx-test-helpers` as dev dependency.

```
npm install ngx-test-helpers --save-dev
```

## setupComponentTest

```ts
function setupComponentTest(moduleDef: TestModuleMetadata): void
```

Angular resets its testing module for each single test. This ensures that all tests run in complete isolation from each other. While this is the ideal situation for running unit tests, it comes with a heavy price regarding performance. Many tests may be perfomed without resetting the testing module. Currently, there is no official way to prevent the reset, however there is a workaround described in [this GitHub issue](https://github.com/angular/angular/issues/12409). Basically, after configuring the testing module, the `TestBed.resetTestingModule` method is replaced with a dummy implementation. This happens in a `beforeAll` block which is run once before the specs in a `describe` block are executed. In an `afterAll` block the `TestBed.resetTestingModule` method is restored after the tests of the `describe` block have been executed.

`setupComponentTest` wraps this workaround and combines it with `configureComponentTestEnvironment`.

### API

| Param       | Type                 | Description                                                                                                                        |
|-------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `moduleDef` | `TestModuleMetadata` | [Angular module definition](https://angular.io/api/core/testing/TestModuleMetadata) as passed to `TestBed.configureTestingModule`. |

### Example
```ts
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    setupComponentTest({
        declarations: [
            AppComponent
        ]
    });

    beforeEach(() => {
        fixture = createComponent(AppComponent);
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });
});
```

## configureComponentTestEnvironment

```ts
function configureComponentTestEnvironment(moduleDef: TestModuleMetadata): void
```

Configures the testing module with given module definition and `NO_ERRORS_SCHEMA` and compiles the components. Use this method in a `beforeEach` block if you don't want to use the performance workaround implemented by `setupComponentTest`.

`NO_ERRORS_SCHEMA` allows any property on any element so that components can be compiled even if directives, which are irrelevant to the use case being tested, aren't imported.

### API

| Param       | Type                 | Description                                                                                                                        |
|-------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `moduleDef` | `TestModuleMetadata` | [Angular module definition](https://angular.io/api/core/testing/TestModuleMetadata) as passed to `TestBed.configureTestingModule`. |

### Example

```ts
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        configureComponentTestEnvironment({
            declarations: [
                AppComponent
            ]
        });
        fixture = createComponent(AppComponent);
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });
});
```

## mergeModuleDefs

```ts
function mergeModuleDefs(...moduleDefs: TestModuleMetadata[]): TestModuleMetadata
```

Merges two or more [Angular module definitions](https://angular.io/api/core/testing/TestModuleMetadata). Useful if you want to combine an externally defined default definition with a local one.

### API

| Param          | Type                 | Description                                                                                       |
|----------------|----------------------|---------------------------------------------------------------------------------------------------|
| `...moduleDef` | `TestModuleMetadata` | Two or more [Angular module definitions](https://angular.io/api/core/testing/TestModuleMetadata). |

### Example

```ts
describe('AppComponent', () => {
    setupComponentTest(mergeModuleDefs(
        getModuleDefForStore(reducerConfig), // returns a module definition with everything needed to setup the ngrx store
        {
            declarations: [
                AppComponent
            ]
        }
    ));
});
```

## createComponent

```ts
function createComponent<T>(component: Type<T>): ComponentFixture<T>
```

Creates a `ComponentFixture` for the given component. Just a wrapper for `TestBed.createComponent` so that you don't need to mix `TestBed` methods with methods from this helper.


| Param       | Type      | Description                  |
|-------------|-----------|------------------------------|
| `component` | `Type<T>` | The component to be created. |

### Example

```ts
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        configureComponentTestEnvironment({
            declarations: [
                AppComponent
            ]
        });
        fixture = createComponent(AppComponent);
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });
});
```

## forceChangeDetection

```ts
function forceChangeDetection<T>(fixture: ComponentFixture<T>): void
```

When testing components that are configured with an `OnPush` change detection strategy, a call to `fixture.detectChanges()` does not trigger Angular's change detection to run. Change detection for those components only runs when the host component passes new values. One way to solve this issue in unit tests is to use a [test host component](https://angular.io/guide/testing#test-a-component-inside-a-test-host-component). However, this is cumbersome and pollutes tests with a lot of boilerplate code. A workaround for this issue is a hack described in a comment in [this GitHub issue](https://github.com/angular/angular/issues/12313#issuecomment-300429985). This method wraps the workaround in a convenient method.

As this method directly accesses internal, non-public properties of Angular, it should be noted that this method may fail in a future Angular version.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |

### Example

```ts
it('should create', () => {
    fixture.componentIntance.buttonIsDisabled = true;

    forceChangeDetection(fixture);

    expectElementFromFixture(fixture, 'button').toBeDisabled();
});
```

## expectComponent

```ts
function expectComponent<T>(fixture: ComponentFixture<T>): jasmine.Matchers<T>
```

Wraps the fixture's component instance in an `expect` call.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |

### Example

```ts
it('should create', () => {
    expectComponent(fixture).toBeTruthy();
});
```

## expectElementFromFixture

```ts
function expectElementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): jasmine.Matchers<{}>
```

Write expectations for the component's root element or for one of its child elements. Useful in combination with [Jasmine Dom Matchers](https://github.com/charleshansen/jasmine_dom_matchers).

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `domQuery` | `string` | (optional) A DOM query as required by `Element.querySelector`. If omitted, the component's root element itself is used. |

### Example

This example uses [Jasmine Dom Matchers](https://github.com/charleshansen/jasmine_dom_matchers).

```ts
it('should be rendered as block-level element', () => {
    expectElementFromFixture(fixture).toHaveCss({ display: 'block' });
});

it('contain a title', () => {
    expectElementFromFixture(fixture, 'h1').toContainText('Hello World');
});
```

## expectElementsFromFixture

```ts
function function expectElementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): jasmine.ArrayLikeMatchers<{}>
```

Write expectations for an array of HTML elements.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelectorAll`. |

### Example

This example uses [Jasmine-Matchers](https://github.com/JamieMason/Jasmine-Matchers).


```ts
it('should contain a list of 10 items', () => {
    expectElementsFromFixture(fixture, 'ul > li').toBeArrayOfSize(10);
});
```

## expectFormElementFromFixture

```ts
function expectFormElementFromFixture<T>(fixture: ComponentFixture<T>, formControlName: string): jasmine.Matchers<{}>
```

Write expectations for a form control.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `formControlName` | `string` | A form control name as defined by [Angular's `formControlName` directive](https://angular.io/api/forms/FormControlName). |

### Example

This example uses [Jasmine Dom Matchers](https://github.com/charleshansen/jasmine_dom_matchers).

```ts
it('has a disabled comment field', () => {
    expectFormElementFromFixture(fixture, 'comment').toBeDisabled();
});
```

## expectViewChildFromFixture

```ts
function expectViewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): jasmine.Matchers<{}>
```

Write expectations for a component's [view child](https://angular.io/api/core/ViewChild).

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `viewChildProperty` | `string` | The name of the component's property which is annotated as ViewChild.  |

### Example

This example uses [Jasmine Dom Matchers](https://github.com/charleshansen/jasmine_dom_matchers).

```ts
// component-with-view-child.ts
@Component({
    selector: 'app-root',
    template: `
        <main>
            <app-child-component #child></child-component>
        </main>
    `
})
export class AppComponent {

    @ViewChild('child')
    child: ChildComponent;

}
```

```ts
it('has a child that is rendered as block-level element', () => {
    expectViewChildFromFixture(fixture, 'child').toHaveCss({ display: 'block' });
});
```

## componentFromFixture

```ts
function componentFromFixture<T>(fixture: ComponentFixture<T>): T
```

Returns the fixture's component instance.

### API

| Param     | Type                  | Description                                             |
|-----------|-----------------------|---------------------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The fixture for which to return the component instance. |

### Example

This example uses [Jasmine Dom Matchers](https://github.com/charleshansen/jasmine_dom_matchers).

```ts
it('exposes a reset method that resets the form', () => {
    componentFromFixture(fixture).reset();
    
    formElementFromFixture(fixture, 'firstName').toHaveValue('');
});
```

## viewChildFromFixture

```ts
function viewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): Element
```

Returns the [view child](https://angular.io/api/core/ViewChild)'s DOM element.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `viewChildProperty` | `string` | The name of the component's property which is annotated as ViewChild.  |

### Example

```ts
it('has a disabled comment field', () => {
    const form = viewChildFromFixture(fixture, 'commentForm');

    expect(form.querySelector('textarea#comment').disabled).toBeTrue();
});
```

## formElementFromFixture

```ts
function formElementFromFixture<T>(fixture: ComponentFixture<T>, formControlName: string): Element
```

Returns the DOM for a form control.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `formControlName` | `string` | A form control name as defined by [Angular's `formControlName` directive](https://angular.io/api/forms/FormControlName). |

### Example

```ts
it('has a disabled comment field', () => {
    const commentField = formElementFromFixture(fixture, 'comment');

    expect(commentField.disabled).toBeTrue();
});
```

## elementFromFixture

```ts
function elementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): Element
```

Returns a DOM element from within the component matching the query.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `domQuery` | `string` | (optional) A DOM query as required by `Element.querySelector`. If omitted, the component's root element itself is used. |

### Example

```ts
it('has a disabled comment field', () => {
    const commentField = elementFromFixture(fixture, 'textarea#comment');
    expect(commentField.disabled).toBeTrue();
});
```

## elementsFromFixture

```ts
function elementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): Element[]
```

Returns an array of DOM elements from within the component matching the query.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelectorAll`. |

```ts
it('checkboxes that are all checked', () => {
    elementsFromFixture(fixture, 'input[type="checkbox"]').forEach(checkbox => {
        expect(checkbox.checked).toBeTrue();
    });
});
```

## childComponentsFromFixture

```ts
function childComponentsFromFixture<T>(fixture: ComponentFixture<{}>, domQuery: string): T[]
```

It returns child components matching the DOM query casted as the given type.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `fixture` | `ComponentFixture<T>` | The component fixture for the expectation. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelectorAll`. |

### Example

```ts
it('has a child components which all expose an active property', () => {
    childComponentsFromFixture<ChildComponent>(fixture, 'app-child').forEach(child => {
        expect(child.active).toBeBoolean();
    });
});
```

## ReducerConfig

In order to use ngrx with AOT the reducers have to be provided using an `InjectionToken`. See this [GitHub issue](https://github.com/ngrx/platform/issues/116#issuecomment-316843727) for more details. That is why some methods require a `reducerConfig` consisting of a `ActionReducerMap` and an injection token.

```ts
export interface ReducerConfig<T> {
    injectionToken: InjectionToken<ActionReducerMap<T>>;
    reducers: ActionReducerMap<T>;
}
```

### Example

```ts
export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer
};

export const reducersInjectionToken = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');
Object.assign(reducersInjectionToken, reducers);

export const reducerConfig: ReducerConfig<AppState> = {
    reducers,
    injectionToken: reducersInjectionToken
};
```

## configureEffectsTestEnvironment

```ts
function configureEffectsTestEnvironment<T>( EffectsClass: {}, actionsFn: () => Observable<Action>, moduleDef: TestModuleMetadata, reducerConfig: ReducerConfig<T>, appState?: T): void
```

Configures the testing module for testing the given Effects class according to the [ngrx testing guide](https://github.com/ngrx/effects/blob/master/docs/testing.md).

### API

| Param           | Type                       | Description                                                                                                                           |
|-----------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `EffectsClass`  | `Type`                     | The Effects class to be tested.                                                                                                       |
| `actionsFn`     | `() => Observable<Action>` | A function that is used by ngrx' [`provideMockActions` method](https://github.com/ngrx/platform/blob/master/docs/effects/testing.md). |
| `moduleDef`     | `TestModuleMetadata`       | [Angular module definition](https://angular.io/api/core/testing/TestModuleMetadata) as passed to `TestBed.configureTestingModule`.    |
| `reducerConfig` | `ReducerConfig<T>`         | A configuration consisting of the `ActionReducerMap` and an `InjectionToken` for the reducer map. See comment above.                  |
| `appState`      | `T`                        | (optional) An initial app state with which the store is initialised.                                                                  |

### Example

```ts
describe('CounterEffects', () => {
    let actions: Observable<Action>;
    let counterEffects: CounterEffects;

    beforeEach(() => {
        configureEffectsTestEnvironment(
            CounterEffects,
            () => actions,
            {
                imports: [
                    CounterModule
                ]
            },
            reducerConfig
        );
        counterEffects = TestBed.get(CounterEffects);
    });

    describe('count', () => {
        it('dispatches a new action when something has been counted', () => {
            actions = hot('--a-', { a: new CountAction() });

            counterEffects.count
                .subscribe((dispatchedAction: CountedAction) => {
                    expect(dispatchedAction.type).toBe('Counted')
                });
        });
    });

});

```

## getModuleDefForStore

```ts
function getModuleDefForStore<T>(reducerConfig: ReducerConfig<T>, appState?: T): TestModuleMetadata
```

Returns a module configuration setting up the ngrx store with the given reducers and an initial application state.

### API

| Param           | Type               | Description                                                                                                          |
|-----------------|--------------------|----------------------------------------------------------------------------------------------------------------------|
| `reducerConfig` | `ReducerConfig<T>` | A configuration consisting of the `ActionReducerMap` and an `InjectionToken` for the reducer map. See comment above. |
| `appState`      | `T`                | (optional) An initial app state with which the store is initialised.                                                 |

### Example

```ts
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let store: Store<AppState>;

    beforeEach(() => {
        configureComponentTestEnvironment(
            mergeModuleDefs(
                getModuleDefForStore(
                    reducerConfig,
                    {
                        counter: {
                            currentValue: 5
                        }
                    }
                ),
                {
                    imports: [
                        AppModule
                    ]
                }
            )
        );
        store = TestBed.get(Store);
        fixture = createComponent(AppComponent);
    });
});
```

## getAppState

```ts
function getAppState<T>(stateFn: (T) => void): void
```

Calls the given function with the current application state.

### API

| Param     | Type          | Description                                  |
|-----------|---------------|----------------------------------------------|
| `stateFn` | `(T) => void` | The method to which the app state is passed. |

### Example

```ts
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let appState: AppState;

    beforeEach(() => {
        configureComponentTestEnvironment(
            mergeModuleDefs(
                getModuleDefForStore(reducerConfig),
                {
                    imports: [
                        AppModule
                    ]
                }
            )
        );
        getAppState(state => appState = state);
        fixture = createComponent(AppComponent);
    });
});
```

## expectActionToBeDispatched

```ts
function expectActionToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void): void
```

Tests if the given action has been dispatched. Optionally, a trigger function may be passed which is used to trigger the action.

### API

| Param        | Type                  | Description                                           |
|--------------|-----------------------|-------------------------------------------------------|
| `fixture`    | `ComponentFixture<T>` | The component fixture for the expectation.            |
| `actionType` | `string`              | The type of the action to check against.              |
| `triggerFn`  | `() => void`          | A function that leads to the action to be dispatched. |

### Example

```ts
it('dispatches a count action when the onClickCount handler is called', () => {
    expectActionToBeDispatched(fixture, ActionType.Count, () => {
        fixture.componentInstance.onClickCount();
    });
});
```

## expectActionNotToBeDispatched

```ts
function expectActionNotToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void): void
```

Tests if the given action has not been dispatched. This method is useful if actions are only dispatched under certain conditions.

### API

| Param        | Type                  | Description                                                    |
|--------------|-----------------------|----------------------------------------------------------------|
| `fixture`    | `ComponentFixture<T>` | The component fixture for the expectation.                     |
| `actionType` | `string`              | The type of the action to check against.                       |
| `triggerFn`  | `() => void`          | A function that normally leads to the action to be dispatched. |

### Example

```ts
it('does not dispatch a count action when counting is disabled', () => {
    fixture.componentInstance.countingDisabled = true;

    expectActionNotToBeDispatched(fixture, ActionType.Count, () => {
        fixture.componentInstance.onClickCount();
    });
});
```

## expectElement

```ts
function expectElement(rootElement: Element, domQuery: string): jasmine.Matchers<{}>
```

Write expectations for a DOM element.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `rootElement` | `Element` | The root element for the expectation. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelector`. |

### Example

```ts
it('has a disabled comment field', () => {
    const componentElement = elementFromFixture(fixture);

    expectElement(componentElement, 'textarea#comment').disabled).toBeTrue();
});
```

## expectElements

```ts
function expectElements(rootElement: Element, domQuery: string): jasmine.ArrayLikeMatchers<{}>(')
```

Write expectations for an array of DOM elements.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `rootElement` | `Element` | The root element for the expectation. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelectorAll`. |

### Example

This example uses [Jasmine-Matchers](https://github.com/JamieMason/Jasmine-Matchers).

```ts
it('should contain a list of 10 items', () => {
    const componentElement = elementFromFixture(fixture);
    expectElements(componentElement, 'ul > li').toBeArrayOfSize(10);
});
```

## elementByQuery

```ts
function elementByQuery(rootElement: Element, domQuery: string): Element
```

Returns a child element matching the given DOM query.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `rootElement` | `Element` | The root element from which to query for a child element. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelector`. |

### Example

```ts

it('has a disabled comment field', () => {
    const componentElement = elementFromFixture(fixture);

    expect(elementByQuery(componentElement, 'textarea#comment').disabled).toBeTrue();
});
```

## elementsByQuery

```ts
function elementsByQuery(rootElement: Element, domQuery: string): Element[]
```

Returns an array of child elements matching the given DOM query.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `rootElement` | `Element` | The root element from which to query for child elements. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelectorAll`. |

### Example

This example uses [Jasmine-Matchers](https://github.com/JamieMason/Jasmine-Matchers).

```ts
it('should contain a list of 10 items', () => {
    const componentElement = elementFromFixture(fixture);
    expect(elementsByQuery(componentElement, 'ul > li')).toBeArrayOfSize(10);
});
```

## childComponentsByQuery

```ts
function childComponentsByQuery<T>(rootElement: Element, domQuery: string): T[]
```

Returns an array of child elements matching the given DOM query casted as the given type.

### API

| Param     | Type                  | Description                                |
|-----------|-----------------------|--------------------------------------------|
| `rootElement` | `Element` | The root element from which to query for child elements. |
| `domQuery` | `string` | A DOM query as required by `Element.querySelectorAll`. |

### Example

```ts
it('has a child components which all expose an active property', () => {
    const componentElement = elementFromFixture(fixture);
    childComponentsByQuery<ChildComponent>(componentElement, 'app-child').forEach(child => {
        expect(child.active).toBeBoolean();
    });
});
```
