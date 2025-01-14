import { Params } from "@angular/router";

export class GetZone {
  static readonly type = "[Zone] Get";
    constructor(public payload: Params) {}
  
}

export class SaveLocation {
  static readonly type = "[Zone] Set Address";
  constructor(public location: string) {}
}

export class ClearZone {
  static readonly type = "[Zone] Clear Zone";
}

export class IsSelectedZone {
  static readonly type = "[Zone] Zone Selected";
}
