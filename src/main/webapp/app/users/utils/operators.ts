import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function log<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => {
        return source.pipe(
            tap(obj => {
                // tslint:disable-next-line:no-debugger
                debugger;
            })
        );
    };
}
