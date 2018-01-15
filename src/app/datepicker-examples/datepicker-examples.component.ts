import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker-examples',
  templateUrl: './datepicker-examples.component.html',
  styleUrls: ['./datepicker-examples.component.css']
})
export class DatepickerExamplesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public moment: Date = new Date();

  public min = new Date(2018, 1, 1);
  public max = new Date(2018, 2, 1);
  public disabledDates = [new Date(2018, 1, 1),
      new Date(2018, 1, 12), new Date(2018, 1, 15), new Date(2018, 1, 20)];

  public pickerColor: string = '#0070ba';

  public es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
  };

  public input1Moment: any;
  public input2Moment: any;
  public input3Moment: any;
  public input4Moment: any;
  public input5Moment: any;
  public input6Moment: any;
  public input7Moment: any;
  public input8Moment: any;
  public input9Moment: any;
  public input10Moment: any;
  public input11Moment: any;
  public input12Moment: any;
  public input13Moment: any;
  public input14Moment: any = new Date(2017, 8, 10, 13, 30, 30);
  
}
