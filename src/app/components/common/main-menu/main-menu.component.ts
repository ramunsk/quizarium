import { Component, input } from '@angular/core';

@Component({
    selector: 'qz-main-menu',
    standalone: true,
    imports: [],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
    title = input.required<string>();
}
