import { Component } from '@angular/core';

@Component({
  selector: 'app1-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/magh.png"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
