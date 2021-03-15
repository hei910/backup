import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';
import { useInterval } from './useInterval';
import useUpdateEffect from './useUpdateEffect';

type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
    run: (...args: T) => void;
    cancel: () => void;
}

function useSpringDebounceFn<T extends any[]>(fn: (...args: T) => any, wait: number, level?: number): ReturnValue<T>;
function useSpringDebounceFn<T extends any[]>(
    fn: (...args: T) => any,
    deps: DependencyList,
    wait: number,
    level?: number,
): ReturnValue<T>;
function useSpringDebounceFn<T extends any[]>(
    fn: (...args: T) => any,
    deps: DependencyList | number,
    wait?: number,
    level?: number,
): ReturnValue<T> {
    const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
    const _wait: number = typeof deps === 'number' ? deps : wait || 0;
    const _level: number = level || 4;
    const delayLevel = 1 / _level;
    const timer = useRef<any>();
    const count = useRef<number>(0);

    const [runningInterval, setIsRunning] = useState(true);
    const reduceDelay = _wait * count.current;

    const addTimeDelay = useCallback(() => {
        if (count.current < 1) {
            count.current = count.current + delayLevel;
        } else if (count.current > 1) {
            count.current = 1;
        }
    }, [delayLevel]);

    const reduceTimeDelay = useCallback(() => {
        count.current = count.current <= 0 ? 0 : count.current - delayLevel;
        setIsRunning(count.current > 0);
    }, [delayLevel]);

    const fnRef = useRef<noop>(fn);
    fnRef.current = fn;

    const cancel = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            setIsRunning(false);
        }
    }, []);

    const run = useCallback(
        (...args: any) => {
            cancel();
            timer.current = setTimeout(
                () => {
                    fnRef.current(...args);
                    setIsRunning(true);
                },
                count.current <= 0 ? 50 : _wait * count.current,
            );

            addTimeDelay();
        },
        [_wait, addTimeDelay, cancel],
    );

    useUpdateEffect(() => {
        run();
        return cancel;
    }, [..._deps, run]);

    useEffect(() => cancel, [cancel]);

    useInterval(
        () => {
            reduceTimeDelay();
        },
        runningInterval ? reduceDelay : null,
    );

    return {
        run,
        cancel,
    };
}

// eslint-disable-next-line import/no-unused-modules
export default useSpringDebounceFn;
