export type IContact = {
  id: string; //айдишник
  last_name?: string; //фамилия
  first_name?: string; //имя
  middle_name?: string; //отчество
  full_name?: string;
  tel?: string; //телефон
  email?: string; //почта
  type_code?: string[]; //коды для типа
  comment?: string; //коммент
  created?: string; //срздан
  update?: string; //обновлен
  lov_type?: string; //тип
};

export type IallContacts = IContact[];
