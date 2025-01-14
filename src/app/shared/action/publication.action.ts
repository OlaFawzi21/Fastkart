export class GetPublicationBySlug {
  static readonly type = "[Publication] Get";
  constructor(public slug: string) {}
}
