import { environment } from '../../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  constructor() { }

  ngOnInit() {
    this.startMap();
  }

  startMap() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.map.flyTo({
        center: [this.lng, this.lat],
        animate: false
      });

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat({ lng: this.lng, lat: this.lat })
        .setHTML('<div class="popup-map">' +
                    '<img src="assets/img/logo-login.png"> ' +
                    '<p>Rua Cardoso José Martins Sobrinho, 785/ RJ- Realengo</p>' +
                '</div>'
        )
        .addTo(this.map);
    });

    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [this.lng, this.lat],
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

  }

}
