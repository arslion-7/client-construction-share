export interface IArea {
  code: number;
  name: string;
  parent_id: number;
  children: IArea[];
}
