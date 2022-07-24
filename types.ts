export interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

export interface Data {
  id?: string;
  title: string;
  content: string;
}
