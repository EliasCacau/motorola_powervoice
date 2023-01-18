import { Data } from "@angular/router";
import { Feature } from "../features/feature.model";
import { ReportCategory } from "../report-category/report-category";
import { User } from "../users/user";


export interface Report {
    id : number;
    description : string;
    reportDate : Date;
    reportStatus : string; 
    feature : Feature;
    reportCategory: ReportCategory; 
    user : User; 

}
