interface IEvent {
  id: number;
  author_id: string;
  title: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  created_at: string;
  nickname: string;
  websiteUrl: string;
}

interface IFormData {
  title: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  websiteUrl: string;
  key: string;
}

export type { IEvent, IFormData };
