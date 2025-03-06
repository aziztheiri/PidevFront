import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() agenceSelected = new EventEmitter<string>();
  // @ts-ignore
  map: L.Map | undefined;

  agences = [
    { name: 'Agence Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Agence Lyon', lat: 45.75, lng: 4.85 },
    { name: 'Agence Marseille', lat: 43.2965, lng: 5.3698 },
    { name: 'Agence Tunis', lat: 36.8065, lng: 10.1815 }  // Agence à Tunis
  ];

  ngOnInit(): void {
    // @ts-ignore
    this.map = L.map('map', {
      center: [36.8065, 10.1815],
      zoom: 12,
      maxZoom: 18,
      minZoom: 10,
      zoomControl: true,
      scrollWheelZoom: false
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);


    this.agences.forEach(agence => {
      // @ts-ignore
      const marker = L.marker([agence.lat, agence.lng]).addTo(this.map);
      marker.bindPopup(agence.name);

      marker.on('click', () => {
        this.agenceSelected.emit(agence.name);
      });
    });
  }
}
