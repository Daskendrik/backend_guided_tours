export type Contact = {
  id: FieldApplet;
  last_name: FieldApplet;
  first_name: FieldApplet;
  middle_name?: FieldApplet;
  tel?: FieldApplet;
  email?: FieldApplet;
  type_code?: string[];
  comment?: FieldApplet;
  created: FieldApplet;
  update: FieldApplet;
};

type FieldApplet = {
  Lable: string;
  Value: any;
  Type: string;
  id: string;
  required?: boolean;
  readonly?: boolean;
  change?: any;
  arrSelect?: string[];
};
