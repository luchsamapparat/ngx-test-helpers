import { toArray } from 'lodash-es';

export function expectElement(rootElement: Element, domQuery: string): jasmine.Matchers<{} | null> {
    return expect(elementByQuery(rootElement, domQuery));
}

export function expectElements(rootElement: Element, domQuery: string): jasmine.ArrayLikeMatchers<{}> {
    return expect(elementsByQuery(rootElement, domQuery));
}

export function elementByQuery(rootElement: Element, domQuery: string): Element | null {
    return rootElement.querySelector(domQuery);
}

export function elementsByQuery(rootElement: Element, domQuery: string): Element[] {
    return toArray<Element>(rootElement.querySelectorAll(domQuery));
}
