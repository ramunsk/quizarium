import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
    standalone: true,
})
export class TimePipe implements PipeTransform {
    transform(value: number): string {
        const totalSeconds = Math.floor(value / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const minutesString = String(minutes).padStart(2, '0');
        const secondsString = String(seconds).padStart(2, '0');

        return `${minutesString}:${secondsString}`;
    }
}
