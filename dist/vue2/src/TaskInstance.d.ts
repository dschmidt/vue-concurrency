import { EffectScope } from "./utils/api";
import { DeferredObject } from "./utils/general";
import { AbortSignalWithPromise, TaskCb, onFulfilled, onRejected } from "./types/index";
export declare type TaskInstanceStatus = "running" | "enqueued" | "canceled" | "canceling" | "dropped" | "error" | "success";
export interface TaskInstance<T> extends PromiseLike<any> {
    id: number;
    hasStarted: boolean;
    isRunning: boolean;
    isActive: boolean;
    isFinished: boolean;
    isError: boolean;
    isSuccessful: boolean;
    isCanceling: boolean;
    isCanceled: boolean;
    isNotDropped: boolean;
    status: TaskInstanceStatus;
    _run: () => void;
    cancel: (options?: {
        force: boolean;
    }) => void;
    canceledOn: (signal: AbortSignalWithPromise) => TaskInstance<T>;
    token?: Record<string, any>;
    isDropped: boolean;
    isEnqueued: boolean;
    value: T | null;
    error: any | null;
    _shouldThrow: boolean;
    _canAbort: boolean;
    _deferredObject: DeferredObject<T>;
    _handled: boolean;
    then: (onfulfilled: onFulfilled<T>, onrejected?: onRejected) => Promise<any>;
    catch: (onrejected?: onRejected) => any;
    finally: (onfulfilled: () => any) => any;
}
export interface ModifierOptions {
    drop: boolean;
    enqueue: boolean;
}
export interface TaskInstanceOptions {
    id: number;
    scope: EffectScope;
    modifiers: ModifierOptions;
    onFinish: (taskInstance: TaskInstance<any>) => any;
}
export default function createTaskInstance<T>(cb: TaskCb<T, any>, params: any[], options: TaskInstanceOptions): TaskInstance<T>;
