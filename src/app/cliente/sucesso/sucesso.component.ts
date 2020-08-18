import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { Agendamento } from 'src/app/shared/models/agendamento.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/login/auth/auth.service';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
  agendamento$: Observable<Agendamento[]>;
  numeroAgendamento: number;
  //emailUsuario: string = null;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.agendamento$ = this.apiService.getAgendamentos();
    this.agendamento$.subscribe(data => {
      this.numeroAgendamento = data.length;
    });
    /*this.authService.getUser().subscribe(data => {
       this.emailUsuario =  data.email;
    });*/
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
