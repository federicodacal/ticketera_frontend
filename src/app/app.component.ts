import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketera_app';

  readonly url =  'https://ticketera-mongodb-api.vercel.app/api/';

  data:any = [];
  query:string = '';
  result:string = '';
  sub!:Subscription;

  constructor(private http:HttpClient) { }

  ngOnInit() { }

  getData(endpoint:number) {

    if(this.sub != null) {
      this.sub.unsubscribe();
    }

    switch(endpoint) {
      case 1:

        this.sub = this.http.get(this.url+'tickets').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = 'const data = await Ticket.find();'

        break;

      case 2:

        this.sub = this.http.get(this.url+'usuarios').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = 'const data = await Usuario.find();'

        break;

      case 3:

        this.sub = this.http.get(this.url+'ticketsResueltos').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          resuelto: true
        });`

        break;

      case 4:

        this.sub = this.http.get(this.url+'ticketsNoResueltos').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          resuelto: { $ne: true }
        });`

        break;

      case 5:

        this.sub = this.http.get(this.url+'planMayor900').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "plan.precio": { $gt: 900 }
        });`

        break;

      case 6:

        this.sub = this.http.get(this.url+'planMenor550').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "plan.precio": { $lt: 550 }
        });`

        break;

      case 7:

        this.sub = this.http.get(this.url+'planLte550').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "plan.precio": { $lte: 550 }
        });`

        break;

      case 8:

        this.sub = this.http.get(this.url+'ticketsFechaGte').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          fecha: { $gte: "2017-12-12T16:20:00.000+00:00" }
        });`
        
        break;

      case 9:

        this.sub = this.http.get(this.url+'ticketsTipoIn').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          tipo: { $in: ["Alta", "Cambio de plan"] }
        });`

        break;

      case 10:

        this.sub = this.http.get(this.url+'usuarioLocalidadNin').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "localizacion.localidad": { $nin: ["Avellaneda", "Quilmes"] }
        });`

        break;

      case 11:

        this.sub = this.http.get(this.url+'ticketsTipoOr').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          $or: [ {tipo: "Desperfecto"}, {tipo: "Cambio de plan"} ] 
        });`

        break;

      case 12:

        this.sub = this.http.get(this.url+'ticketsTipoAnd').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          $and: [ {tipo: "Desperfecto"}, {"cliente.localizacion.localidad": "Avellaneda"} ] 
        });`

        break;

      case 13:

        this.sub = this.http.get(this.url+'ticketsNor').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          $nor: [ {resuelto: true}, {"cliente.localizacion.localidad": "Avellaneda"} ] 
        });`

        break;

      case 14:

        this.sub = this.http.get(this.url+'ticketsNotBaja').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          operaciones: { $not: { $eq: "Baja" } }
        });`

        break;

      case 15:

        this.sub = this.http.get(this.url+'usuariosJuan').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          $text: { $search: "Juan" }
        });`

        break;

      case 16:

        this.sub = this.http.get(this.url+'near').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "localizacion.geolocalizacion": {
              $near: {
                  $geometry: { 
                      type: "Point",
                      coordinates: [
                          -58.36474503826432,
                          -34.66253120682271
                      ] 
                  },
                  $minDistance: 1,
                  $maxDistance: 5000
              }
          }
        });`

        break;

      case 17:

        this.sub = this.http.get(this.url+'geoWithin').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "localizacion.geolocalizacion": {
              $geoWithin: {
                  $geometry: { 
                      type: "Polygon",
                      coordinates: [
                          [
                            [
                              -58.36675657102998,
                              -34.65315188615764
                            ],
                            [
                              -58.372576737477175,
                              -34.658093904185336
                            ],
                            [
                              -58.381025366191025,
                              -34.66890354122316
                            ],
                            [
                              -58.39247795178092,
                              -34.70209575032251
                            ],
                            [
                              -58.351736786649525,
                              -34.71058464279308
                            ],
                            [
                              -58.312122105347015,
                              -34.690981701889214
                            ],
                            [
                              -58.35474074352561,
                              -34.64666504031982
                            ],
                            [
                              -58.36675657102998,
                              -34.65315188615764
                            ]
                          ]
                      ] 
                  }
              }
          }
        });`

        break;

      case 18:

        this.sub = this.http.get(this.url+'geoIntersects').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "localizacion.geolocalizacion": {
              $geoIntersects: {
                  $geometry: { 
                      type: "Polygon",
                      coordinates: [
                          [
                              [
                                -58.36524304134903,
                                -34.66208885232607
                              ],
                              [
                                -58.36524304134903,
                                -34.662906760155096
                              ],
                              [
                                -58.36434065271186,
                                -34.662906760155096
                              ],
                              [
                                -58.36434065271186,
                                -34.66208885232607
                              ],
                              [
                                -58.36524304134903,
                                -34.66208885232607
                              ]
                            ]
                        ],
                  }
              }
          }
        });`

        break;

      case 19:

        this.sub = this.http.get(this.url+'ticketDesperfecto').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          "desperfectos.descripcion": { $exists: true, $ne: "" }
        });`

        break;

      case 20:

        this.sub = this.http.get(this.url+'type').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "localizacion.codigo_postal": { $type: "string" }
        });`

        break;

      case 21:

        this.sub = this.http.get(this.url+'canalesAll').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "plan.canales": { $all: [ "ESPN", "ESPN 2"] }
        });`

        break;

      case 22:

        this.sub = this.http.get(this.url+'ticketsService').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.find({
          responsable: {
            $elemMatch: {
              "departamento": "Service"
            }
          }
        });`

        break;

      case 23:

        this.sub = this.http.get(this.url+'canalesSize').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          "plan.canales": { $size: 6 } 
        });`

        break;

      case 24:

        this.sub = this.http.get(this.url+'canalesDeportes').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.aggregate([
          {
              $match: {
                  "plan.descripcion": "Deportes"
              }
          },
          {
              $unwind: {
                  path: "$plan.canales"
              }
          },
          {
              $sortByCount: "$plan.canales"
          }
        ])`

        break;

      case 25:

        this.sub = this.http.get(this.url+'desperfectos').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.aggregate([
          {
              $unwind: "$desperfectos" 
          },
          {
              $group: {
                  _id: "$desperfectos.descripcion",
                  lugares: { $addToSet: "$cliente.localizacion.localidad" },
                  ocurrencias: { $sum: 1 } 
              }
          },
          {
              $project: {
                  desperfecto: "$_id",
                  lugares: 1,
                  ocurrencias: 1,
                  _id: 0
              }
          }
        ])`

        break;

      case 26:

        this.sub = this.http.get(this.url+'clientesEmpleados').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.aggregate([
          {
              $lookup: {
                  from: "usuarios",
                  localField: "cliente.apellido",
                  foreignField: "apellido",
                  as: "clienteData"
              }
          },
          {
              $unwind: {
                  path: "$clienteData"
              }
          }, 
          {
              $match: {
                  "clienteData.empleado": true
              }
          }, 
          {
              $project: {
                  "nombre_cl": "$clienteData.nombre",
                  "apellido_cl": "$clienteData.apellido",
                  "id_cl": "$clienteData.id",
                  "_id": 0
              }
          }
        ])`

        break;

      case 27:

        this.sub = this.http.get(this.url+'userExpr').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Usuario.find({
          $expr: {
              $gt: [ { $size: "$tickets" }, 2 ]
          }
        })`

        break;

      case 28:

        this.sub = this.http.get(this.url+'empleados').subscribe((res:any) => {
          this.data = res.data;
          this.result = JSON.stringify(this.data, null, '\t');
        });

        this.query = `
        const data = await Ticket.aggregate([
          {
              $unwind: "$responsable" 
          },
          {
              $group: {
                  _id: "$responsable.id_empleado",
                  ocurrencias: { $sum: 1 } 
              }
          },
          {
              $project: {
                  id: "$_id",
                  ocurrencias: 1,
                  _id: 0
              }
          }
        ])`

        break;
    }
  }

}
