import { TaskInstance } from "./TaskInstance";
import { Resolved, TaskCb } from "./types/index";
export declare type Task<T, U extends any[]> = {
    isIdle: boolean;
    isRunning: boolean;
    isError: boolean;
    performCount: number;
    last: TaskInstance<T> | undefined;
    lastSuccessful: TaskInstance<T> | undefined;
    firstEnqueued: TaskInstance<T> | undefined;
    cancelAll: (options?: {
        force: boolean;
    }) => void;
    perform: (...params: U) => TaskInstance<T>;
    clear: () => void;
    destroy: () => void;
    restartable: () => Task<T, U>;
    drop: () => Task<T, U>;
    enqueue: () => Task<T, U>;
    keepLatest: () => Task<T, U>;
    maxConcurrency: (number: any) => Task<T, U>;
    _resetModifierFlags: () => void;
    _maxConcurrency: number;
    _isRestartable: boolean;
    _isEnqueuing: boolean;
    _isDropping: boolean;
    _isKeepingLatest: boolean;
    _hasConcurrency: boolean;
    _instances: TaskInstance<T>[];
    _successfulInstances: readonly TaskInstance<T>[];
    _runningInstances: readonly TaskInstance<T>[];
    _activeInstances: readonly TaskInstance<T>[];
    _enqueuedInstances: readonly TaskInstance<T>[];
    _notDroppedInstances: readonly TaskInstance<T>[];
};
export default function useTask<T, U extends any[]>(cb: TaskCb<T, U>, options?: {
    cancelOnUnmount: boolean;
}): Task<Resolved<T>, U>;
