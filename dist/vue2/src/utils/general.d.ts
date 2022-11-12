import { Ref } from "./api";
import { Task } from "../Task";
import { TaskInstance } from "../TaskInstance";
import { AbortSignalWithPromise } from "../types/index";
export declare function waitForValue<T = any>(cb: () => T): Promise<T>;
export declare const reachedMaxConcurrency: (task: Task<any, any>) => boolean;
export declare const cancelFirstRunning: (task: Task<any, any>) => void;
export declare const dropEnqueued: (task: Task<any, any>) => void;
declare type BooleanKeys<T> = {
    [k in keyof T]: T[k] extends boolean ? k : never;
}[keyof T];
export declare function filteredInstances(cb: () => Task<any, any>, key: BooleanKeys<TaskInstance<any>>): import("vue").ComputedRef<TaskInstance<any>[]>;
export declare function computedLength(cb: () => any[]): Readonly<Ref<number>>;
export declare function computedLastOf<T>(cb: () => readonly T[]): Ref<T | undefined>;
export declare function computedFirstOf<T>(cb: () => readonly T[]): Readonly<Ref<T | undefined>>;
export declare type Reactive<T> = {
    [K in keyof T]: T[K] extends Ref<infer U> ? U : T[K];
};
export declare const _reactiveContent: <T>(obj: T) => Reactive<T>;
export declare function _reactive<T extends object>(obj: T): T;
export declare type DeferredObject<T> = {
    promise: Promise<T>;
    resolve: Function;
    reject: Function;
};
export declare function defer<T>(): DeferredObject<T>;
export declare function printTask(task: Task<any, any>): void;
export declare function timeout(time: any): Promise<unknown>;
export declare function getCancelToken<T extends {
    CancelToken: any;
}>(axios: T, signal: AbortSignalWithPromise): any;
export declare function useAsyncTask<T, U extends any[]>(fn: (signal: AbortSignalWithPromise, ...params: U) => Promise<T>): Task<T, U>;
export {};
