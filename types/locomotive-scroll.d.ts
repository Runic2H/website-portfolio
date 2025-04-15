declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    lerp?: number;
    smartphone?: {
      smooth?: boolean;
      breakpoint?: number;
    };
    tablet?: {
      smooth?: boolean;
      breakpoint?: number;
    };
  }

  export interface LocomotiveScrollInstance {
    destroy(): void;
    scrollTo(target: string | HTMLElement | number, options?: any): void;
    update(): void;
    stop(): void;
    start(): void;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    destroy(): void;
    scrollTo(target: string | HTMLElement | number, options?: any): void;
    update(): void;
    stop(): void;
    start(): void;
  }
} 