import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewEncapsulation, OnInit, ElementRef } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { npcs, villagers } from 'animal-crossing';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cal-eventos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cal-eventos.component.html',
  styleUrls: ['./cal-eventos.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CalEventosComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  @HostListener("window:scroll")
  onScroll(){
    this.infoEvento = false;
  }

  view: CalendarView = CalendarView.Month;

  locale : string = "es";
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  infoEvento : boolean = false;
  shownEvent : any = {};

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  colors: any = {
    cumple: {
      primary: '#d41c1c',
      secondary: '#d2ffce'
    }
  };

  // Para la caza de bichos, torneo de pesca y fuegos artificiales
  // hay que calcularlo en funcion del dia y del mes, asi como del
  // hemisferio, por lo que de momento no se cuenta como evento
  eventosJuego = [
    {
      titulo: "Caza del Huevo",
      inicio: "04-12",
      fin: "04-12",
      npc: "Zipper",
      color: {
        primary: '#d41c1c',
        secondary: '#f9fda0'
      },
      descripcion: "Verás que un conejo bastante particular llega a tu isla dando saltos"
      +" y escondiendo huevos por todas partes. Puedes buscar y recoger los distintos"
      +" tipos de huevos para fabricar recetas muy coloridas y prendas acorde al evento.",
      imagenes:[
        "https://acnhcdn.com/latest/DIYRecipeIcon/FtrEggArch.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrEggBasket.png",
        "https://acnhcdn.com/latest/DIYRecipeIcon/FtrEggBalloonA.png",
        "https://acnhcdn.com/latest/DIYRecipeIcon/CapHatEggparty0.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/pyn.png"
    },{
      titulo: "Cuenta atrás",
      inicio: "12-31",
      fin: "12-31",
      npc: "Isabelle",
      color: {
        primary: '#d41c1c',
        secondary: '#cb96ff'
      },
      descripcion: "¡Presta atención a la cuenta atrás! En la plaza del ayuntamiento"
      +" han colocado un contador digital para celebrar la entrada del año nuevo. Además"
      +" podrás jugar a la tómbola de Ladino para conseguir varios accesorios y objetos"
      +" para celebrar el año nuevo.",
      imagenes:[
        "https://acnhcdn.com/latest/FtrIcon/CapHatNewyearsilkPurple.png",
        "https://acnhcdn.com/latest/FtrIcon/CapOrnamentFStarband0.png",
        "https://acnhcdn.com/latest/FtrIcon/CapHatNewyearRed.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/sza.png"
    },{
      titulo: "Carnaval",
      inicio: "02-15",
      fin: "02-15",
      npc: "Pavé",
      color: {
        primary: '#d41c1c',
        secondary: '#8fd4c6'
      },
      descripcion: "¡Prepárate porque Conga viene con ganas de mover el esqueleto!"
      +" Recoge las plumas de colores que revoloteen por la isla y entrégaselas para"
      +" para recibir recompensas o fabrica tus propios muebles festivos con ellas.",
      imagenes:[
        "https://acnhcdn.com/latest/FtrIcon/FtrCarnivalFloat.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrCarnivalLantern_Remake_0_0.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrCarnivalParasol_Remake_0_0.png",
        "https://acnhcdn.com/latest/DIYRecipeIcon/FeatherRainbow.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrCarnivalSurdo_Remake_0_0.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/pck.png"
    },{
      titulo: "Halloween",
      inicio: "10-31",
      fin: "10-31",
      npc: "Jack",
      color: {
        primary: '#d41c1c',
        secondary: '#ffb889'
      },
      descripcion: "¡BÚ! Disfrázate junto a tus vecinos y haz truco o trato,"
      +" y presta atención porque puede que haya a alguien que tenga mucho interés"
      +" por las chuches y esté dispuesto a darte algo a cambio, ¡como recetas"
      +" o muebles de escalofrío!",
      imagenes:[
        "https://acnhcdn.com/latest/DIYRecipeIcon/FtrHwnStand.png",
        "https://acnhcdn.com/latest/FtrIcon/CapFullfaceHalloween0.png",
        "https://acnhcdn.com/latest/DIYRecipeIcon/FtrHwnSweets.png",
        "https://acnhcdn.com/latest/FtrIcon/CapHatWitch0.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/pkn.png"
    },{
      titulo: "Día de los Juguetes",
      inicio: "12-24",
      fin: "12-24",
      npc: "Jingle",
      color: {
        primary: '#d41c1c',
        secondary: '#ffadad'
      },
      descripcion: "Espero que te hayas portado bien, porque si no en vez de"
      +" recetas y muebles navideños, ¡tendrás un calcetín lleno de carbón!"
      +" Aunque siempre puedes repartir los regalos de Navidad a tus vecinos"
      +" y hacer una buena acción, quizás Renato se lo piense y te deje algo en el calcetín.",
      imagenes:[
        "https://acnhcdn.com/latest/FtrIcon/FtrCrsSled.png",
        "https://acnhcdn.com/latest/DIYRecipeIcon/FtrCrsPresents.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrCrsSocksWall.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/rei.png"
    },{
      titulo: "Día del Pavo",
      inicio: "11-26",
      fin: "11-26",
      npc: "Franklin",
      color: {
        primary: '#d41c1c',
        secondary: '#fac6ff'
      },
      descripcion: "¡Prepara platos riquísimos con Guindo y ofrecele a tus vecinos"
      +" un día del Pavo de rechupete! Guindo necesita ayuda para cocinar sus famosos"
      +" platos y te ha contratado como pinche de cocina, así que ¡recolecta los mejores"
      +" ingredientes y cocinad juntos un almuerzo exquisito! Si lo haces bien puede"
      +" que te ganes alguna que otra receta para fabricar muebles festivos.",
      imagenes:[
        "https://acnhcdn.com/latest/FtrIcon/FtrHarvestDecoration_Remake_0_0.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrHarvestFireplace_Remake_0_0.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrCornucopia.png",
        "https://acnhcdn.com/latest/FtrIcon/FtrHarvestEnamelpod_Remake_0_0.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/tuk.png"
    },{
      titulo: "Temporada de Bodas",
      inicio: "06-01",
      fin: "06-01",
      npc: "Reese",
      color: {
        primary: '#d41c1c',
        secondary: '#ffcef5'
      },
      descripcion: "Algo se cuece en la Fotopía, ¡y es que Al y Paca están de boda!"
      +" Da rienda a tu lado más creativo y decora el set con unos muebles de ensueño"
      +" siguiendo las indicaciones de los dos tortolitos. Si haces un buen trabajo, obtendrás"
      +" unas joyas amorosas que podrás intercambiar con Al a cambio de los muebles y vestidos"
      +" más elegantes.",
      imagenes:[
        "https://acnhcdn.com/1.2.0/FtrIcon/FtrWeddingArch_Remake_0_0.png",
        "https://acnhcdn.com/1.2.0/FtrIcon/TopsTexOnepieceDressNWedding.png",
        "https://acnhcdn.com/1.2.0/FtrIcon/FtrWeddingCake_Remake_0_0.png",
        "https://acnhcdn.com/latest/DIYRecipeIcon/ToolStickJune.png",
        "https://acnhcdn.com/1.2.0/FtrIcon/FtrWeddingOrgan_Remake_0_0.png"
      ],
      icono: "https://acnhcdn.com/latest/NpcIcon/alw.png"
    }
  ]

  constructor(private modal: NgbModal, private elementRef : ElementRef) {}

  ngOnInit() : void{
    registerLocaleData(localeEs);
    this.getEvents().then(()=>{
      // El primer onInit funciona bien, pero los siguientes
      // no cargan los iconos, por lo que es necesario esperar
      setTimeout(()=>{
        this.getIconos();
      }, 300);
    });
  }

  getIconos(){
    let elements = this.elementRef.nativeElement.querySelectorAll(".cal-event");
    for(let el of elements){
      let name = el.classList[1].split("-")[1];
      let vecino = villagers.filter(v => v.name == name);
      let icon = "";

      // Hay que realizar algunas comprobaciones para que no se cuelen etiquetas no deseadas
      // Primero filtramos los cumpleaños
      if(vecino.length != 0){
        icon = vecino[0].iconImage;
      }else{

        // Si no es un cumpleaños, comprobamos si es un evento
        let npc = npcs.filter(n => n.name == name);
        if(npc.length != 0){
          icon = npc[0].iconImage;
        }
      }
      el.style.backgroundImage = 'url("'+icon+'")';

    }
  }

  getEvents(): Promise<any>{
    let promise = new Promise<any>((resolve, reject) => {
      this.events = [];

      // Primero cargamos los cumpleaños
      villagers.filter(v => parseInt(v.birthday.split("/")[0]) == this.viewDate.getMonth()+1).forEach(vecino => {
        let cumpleanio = this.viewDate.getFullYear()+"-";
        let mes = vecino.birthday.split("/")[0];
        mes.length != 1 ? cumpleanio = cumpleanio+mes+"-" : cumpleanio = cumpleanio+"0"+mes+"-";
        let dia = vecino.birthday.split("/")[1];
        dia.length != 1 ? cumpleanio = cumpleanio+dia : cumpleanio = cumpleanio+"0"+dia;

        this.events.push({
          start: new Date(cumpleanio),
          end: new Date(cumpleanio),
          title: 'Cumpleaños de '+vecino.translations.spanish,
          cssClass: "eventIcon-"+vecino.name,
          allDay: true,
          draggable: false,
          color: this.colors.cumple
        });
      });

      // Por último cargamos los eventos
      for(let ev of this.eventosJuego){
        let fechaInicio = this.viewDate.getFullYear()+"-"+ev.inicio;
        let fechaFin = this.viewDate.getFullYear()+"-"+ev.fin;

        this.events.push({
          start: new Date(fechaInicio),
          end: new Date(fechaFin),
          title: ev.titulo,
          cssClass: "eventIcon-"+ev.npc,
          allDay: true,
          draggable: false,
          color: ev.color
        });
      }

      resolve(this.events);
    })
    return promise;
  }

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });

    if(event.color != this.colors.cumple){
      for(let ev of this.eventosJuego){
        if(ev.titulo == event.title){
          this.shownEvent = ev;
          break;
        }
      }
      this.infoEvento = true;
    }
  }

}

