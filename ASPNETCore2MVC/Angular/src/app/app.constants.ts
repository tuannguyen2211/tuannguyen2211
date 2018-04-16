import { Injectable } from '@angular/core'

@Injectable()
export class AppSettings {
  public ApiHost = window["appSettings"].ApiHost;
}
