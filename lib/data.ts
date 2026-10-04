export interface Destination {
  id: number
  title: string
  country: string
  image: string
}

export const destinations: Destination[] = [
  {
    id: 1,
    title: "Bali",
    country: "Indonesia",
    image: "/bali.jpg",
  },
  {
    id: 2,
    title: "Istanbul",
    country: "Turkey",
    image: "/istanbul.jpg",
  },
  {
    id: 3,
    title: "Ladakh & Kashmir",
    country: "India",
    image: "/ladakh.jpg",
  },
  {
    id: 4,
    title: "Paris",
    country: "France",
    image: "/paris.jpg",
  },
  {
    id: 5,
    title: "Krabi",
    country: "Thailand",
    image: "/krabi.jpg",
  },
  {
    id: 6,
    title: "Rome",
    country: "Italy",
    image: "/rome1.jpg",
  },
]
