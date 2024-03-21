import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'qz-app',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AppComponent {}
