/// <reference types="jasmine" />
export declare function expectElement(rootElement: Element, domQuery: string): jasmine.Matchers<{} | null>;
export declare function expectElements(rootElement: Element, domQuery: string): jasmine.ArrayLikeMatchers<{}>;
export declare function elementByQuery(rootElement: Element, domQuery: string): Element | null;
export declare function elementsByQuery(rootElement: Element, domQuery: string): Element[];
export declare function childComponentsByQuery<T>(rootElement: Element, domQuery: string): T[];
