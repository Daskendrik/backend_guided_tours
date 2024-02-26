export type Fields = {
  Value: any;
  id: string;
};

type selectFields = { id: number; code: string; name: string }[];

export type TitleFieldsTable = { id: any; title?: any }[];

export type TitleFieldsForm = {
  lable: string;
  value: any;
  type: string;
  id: string;
  readonly: boolean;
  arrSelect?: selectFields;
}[];
