export type Image = {
  url: string;
};

type Booking = {
  id: number;
  order: boolean;
  dateOrder: string | null;
  customerId: number | null;
  customerFirstName: string | null;
  customerLastName: string | null;
};

type Delivery = {
  id: number;
  handed: boolean;
  dateHandedFrom: string | null;
  dateHandedTo: string | null;
  recipientId: number | null;
  recipientFirstName: string | null;
  recipientLastName: string | null;
};

type Histories = {
  id: number;
  userId: number;
};

type UserComment = {
  commentUserID: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export type Comments = {
  id: number;
  rating: number | null;
  text: string | null;
  createdAt: string;
  user: UserComment;
};

export interface IBooks {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  image: Image | null;
  categories: string[] | null;
  id: number;
  booking: Booking | null;
  delivery: Delivery | null;
  histories: Histories[];
}

export interface FetchedBook {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  images: Image[] | null;
  categories: string[] | null;
  id: number;
  booking: Booking | null;
  delivery: Delivery | null;
  histories: Histories[];
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  comments: Comments[];
}
