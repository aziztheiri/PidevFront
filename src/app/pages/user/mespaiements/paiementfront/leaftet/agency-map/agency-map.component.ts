import { Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-agency-map',
  standalone: true,
  template: `<div id="agency-map" style="height: 100vh; width: 100%;"></div>`,
  styles: []
})
export class AgencyMapComponent {
  private map: any;
  private markers: L.Marker[] = [];

  @Input() set agencies(agencies: any[]) {
    if (agencies && agencies.length > 0) {
      this.initMap(agencies);
    }
  }

  private initMap(agencies: any[]): void {
    // Centrer sur Tunis
    this.map = L.map('agency-map').setView([36.8, 10.18], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.addMarkers(agencies);
  }

  private addMarkers(agencies: any[]): void {
    agencies.forEach(agency => {
      const marker = L.marker([agency.latitude, agency.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${agency.name}</b><br>${agency.address}`);
      
      this.markers.push(marker);
    });

    // Ajuster la vue pour voir tous les marqueurs
    if (this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.2));
    }
  }
}