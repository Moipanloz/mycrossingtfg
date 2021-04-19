import { debounceTime } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewEncapsulation, OnInit, ElementRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { seasonsAndEvents, villagers } from 'animal-crossing';
import { EventoCustom } from 'app/general/interfaces';

@Component({
  selector: 'app-cal-eventos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cal-eventos.component.html',
  styleUrls: ['./cal-eventos.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CalEventosComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  locale : string = "es";
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: EventoCustom[] = [];

  modalData: {
    action: string;
    event: EventoCustom;
  };

  colors: any = {
    evento: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    },
    cumple: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  constructor(private modal: NgbModal, private elementRef : ElementRef) {}

  ngOnInit() : void{
    registerLocaleData(localeEs);
    this.getEvents();
  }

  ngAfterViewInit(){
    let elements = this.elementRef.nativeElement.querySelectorAll(".cal-event");
    for(let el of elements){
      if(el.classList.includes("eventIcon")){
        let name = el.classList[1].split("-")[1];
        let icon = villagers.filter(v => v.name == name)[0].iconImage;
        //console.log(villagers.filter(v => v.name == name)[0]);
        //console.log(el.style.backgroundImage);
        el.style.backgroundImage = 'url("'+icon+'")';
        //el.setAttribute("background-image",'url("'+icon+'")');
      }
    }
    console.log();
  }


  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  getEvents(){
    this.events = [];
    let fecha = new Date();
    // seasonsAndEvents.forEach(f => console.log(f))
    villagers.filter(v => parseInt(v.birthday.split("/")[0]) == fecha.getMonth()+1).forEach(vecino => {
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
        image: vecino.iconImage
      });
    });
  }

  refresh: Subject<any> = new Subject();

  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

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

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  handleEvent(action: string, event: EventoCustom): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}

