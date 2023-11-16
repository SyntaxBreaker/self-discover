interface IEvent {
  id: number;
  author_id: string;
  title: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
}

interface IFormData {
  title: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  key: string;
}

export type { IEvent, IFormData };
