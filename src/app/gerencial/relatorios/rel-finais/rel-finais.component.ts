import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rel-finais',
  templateUrl: './rel-finais.component.html',
  styleUrls: ['./rel-finais.component.css']
})
export class RelFinaisComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Atendimento do representante', 'Qualidade técnica do produto',
  'Aceitação do produto no mercado', 'Prazo de entrega', 'Preço', 'Atendimento da fábrica' ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartFinais: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Respostas' }
  ];

  countRespostasFinais: any;
  countRespostasObs: any;
  respoObs: any;

  constructor( private db: AngularFirestore ) { }

  ngOnInit() {
  }

  loadAll() {
    this.respostasFinais();
    this.respostasObs();
  }

  respostasObs() {

    // this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    // ref => ref.where( 'resposta', '==', 'Atendimento do representante' ))
    // .valueChanges().subscribe(doc => atendRep = doc.length );

    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    }))
    .subscribe( from => {
      this.respoObs = from;
      this.countRespostasObs = from.length;
      return this.respoObs;
    });

  }

  respostasFinais() {
    let atendRep = 0;
    let qualTec = 0;
    let aceitMerc = 0;
    let prazoEntr = 0;
    let preco = 0;
    let atendFab = 0;

    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.where( 'resposta', '==', 'Atendimento do representante' ))
    .valueChanges().subscribe(doc => atendRep = doc.length );
    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.where( 'resposta', '==', 'Qualidade técnica do produto' ))
    .valueChanges().subscribe(doc => qualTec = doc.length );
    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.where( 'resposta', '==', 'Aceitação do produto no mercado' ))
    .valueChanges().subscribe(doc => aceitMerc = doc.length );
    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.where( 'resposta', '==', 'Prazo de entrega' ))
    .valueChanges().subscribe(doc => prazoEntr = doc.length );
    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.where( 'resposta', '==', 'Preço' ))
    .valueChanges().subscribe(doc => preco = doc.length );
    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.where( 'resposta', '==', 'Atendimento da fábrica' ))
    .valueChanges().subscribe(doc => atendFab = doc.length );

    setTimeout(() => {
      this.barChartFinais = [
        { data: [atendRep, qualTec, aceitMerc, prazoEntr, preco, atendFab], label: 'Respostas' },
      ];
    }, 6000);
    this.db.collection('Qual o principal motivo (o mais importante) que o leva a comprar de outro fabricante?',
    ref => ref.orderBy( 'resposta', 'asc' ))
    .valueChanges().subscribe(doc => {
      this.countRespostasFinais = doc.length;
      console.log('contador:' + this.countRespostasFinais);
    } );
  }

}
