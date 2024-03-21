import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'qz-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {}