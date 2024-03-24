export type TimerCallback = (elapsed: number) => void;

export class Timer {
    private startedAt: number;
    private handle: number | undefined;
    private _elapsed: number;
    private resolution: number;

    constructor(resolution: number) {
        this.resolution = resolution;
        this.startedAt = 0;
        this._elapsed = 0;
    }

    get elapsed(): number {
        return this._elapsed;
    }

    start(callback: TimerCallback, initialValue: number): void {
        this.startedAt = new Date().getTime();
        this.handle = +setInterval(() => {
            const now = new Date().getTime();
            this._elapsed = initialValue + now - this.startedAt;
            callback(this.elapsed);
        }, this.resolution);
    }

    stop(): void {
        clearInterval(this.handle);
    }
}
