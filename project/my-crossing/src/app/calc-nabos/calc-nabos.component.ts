import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ComunicacionService } from 'app/general/services/comunicacion.service';

@Component({
  selector: 'app-calc-nabos',
  templateUrl: './calc-nabos.component.html',
  styleUrls: ['./calc-nabos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalcNabosComponent implements OnInit {

  filtrosView : boolean[] = [false, false, false, false];
  comunication: ComunicacionService;
  constructor(_comunication: ComunicacionService) {
    this.comunication = _comunication;
  }

  ngOnInit(): void {
    this.comunication.activar=false;
    //Esto no parece servir
    this.loadExternalScript('https://code.jquery.com/jquery-3.4.1.min.js', "sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh");
    this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/i18next/19.4.2/i18next.min.js', "sha384-heKFZqp863HDEF6obW4Nvk9hF5pRjZThVwrDiV+tSCKPBTnu6vf5lu8QJGDwGv0X");
    this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js', "sha384-i+dHPTzZw7YVZOx9lbH5l6lP74sLRtMtwN2XjVqjf3uAGAREAF4LMIUDTWEVs4LI");
    this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/i18next-xhr-backend/3.2.2/i18nextXHRBackend.min.js', "sha384-E1yZPo675XVLefQp/3MbG3T1eRDvW41iRKovK3OCHS2dWMrcF/F3/+74qwmoX1jX");
    this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/i18next-browser-languagedetector/4.0.2/i18nextBrowserLanguageDetector.min.js', "sha384-FYlRD8WE3hzVKyoaW6rmqYtUfv1ajxElK/c9bKM1NUnbsJ/VUiUv2YFEQP1AJdOQ");
    this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js', "sha384-fLTSt6zHOb152KeFkj7kSiXdkyjKf6fjk5bdzWYLDPDo9evwd9PVs3TKoYYaaxdl");
   //
    this.loadExternalScript('../../assets/js/predictions.js');
    this.loadExternalScript('../../assets/js/scripts.js');
  }

  public loadExternalScript(url: string, integrity ?: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    if(integrity){
      script.integrity = integrity;
      script.crossOrigin = "anonymous";
    }
    body.appendChild(script);
  }


}
