import { Component, OnInit } from '@angular/core';
import { ReportCategory } from 'src/app/models/report-category/report-category';
import { EReportStatus } from 'src/app/models/reports/e-report-status';
import { Report } from 'src/app/models/reports/report';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { ReportCategoryService } from 'src/app/services/reportCategory/report-category.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent implements OnInit {

  constructor(
    private servicoAlerta : AlertaService,
    private servicoReportCategory: ReportCategoryService,
    private serviceReport: ReportsService,
  ) { }

  registroReport:Report = <Report>{};
  reportId: ReportCategory[] = Array<ReportCategory>();
  registrosReport:Report[] = Array<Report>() ;
  compareById = Utils.compareById;



    action(stats:string) :void{
    
      if (stats === 'Accepted'){
        this.registroReport.reportStatus = EReportStatus.Accepted
        this.serviceReport.update(this.registroReport).subscribe({
          complete: () => {

            this.servicoAlerta.enviarAlertaSucesso('Denuncia Aceita!');
         
          },
        });
      }else{
        this.registroReport.reportStatus = EReportStatus.Rejected
        this.serviceReport.update(this.registroReport).subscribe({
          complete: () => {
            
            this.getReport()
            this.servicoAlerta.enviarAlertaSucesso('Denuncia recusada!');
         
          },
        });
      }
    }



  getReport():void{
    this.serviceReport.get().subscribe({
      next: (reposta: Report[]) => {
        this.registrosReport = reposta;
        // console.log(this.reportId)
      }
    })
  }

  getReportCategory():void{
    this.servicoReportCategory.get().subscribe({
      next: (resposta : ReportCategory[]) => {
        this.reportId = resposta
        // console.log(this.reportId)
      }
    })
  }

  ngOnInit(): void {
     
    this.getReport()
  }

}
