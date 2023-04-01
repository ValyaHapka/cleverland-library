interface Booking {
  status: boolean;
  date: string | null;
}

export interface FullBook {
  id: number;
  img: string[] | null;
  name: string;
  author: string[];
  year: number;
  rank: number | null;
  booking: Booking;
}
