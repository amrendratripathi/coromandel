export interface ReviewItem {
  name: string;
  rating: number;
  meta: string;
  summary: string;
  highlight: string;
  screenshot: string;
}

export const reviewItems: ReviewItem[] = [
  {
    name: "Amrendra Tripathi",
    rating: 5,
    meta: "3 reviews • 4 photos",
    summary:
      "The ambience was very well maintained and beautiful, the staff and hospitality was very nice and appreciable. Food was also delicious, overall it is a must visit.",
    highlight: "Beautiful ambience, gracious hospitality, delicious food.",
    screenshot: "/uploads/review1.png",
  },
  {
    name: "Pratyush Prasad",
    rating: 5,
    meta: "Local Guide • 16 reviews • 32 photos",
    summary:
      "We tried the Rava Dosa and Paniyaram. Both were extremely delicious and definitely a must taste. The service was quick and atmosphere quite vibrant.",
    highlight: "Rava Dosa and Paniyaram stood out with quick service.",
    screenshot: "/uploads/review2.png",
  },
  {
    name: "Shubham Agarwal",
    rating: 5,
    meta: "Local Guide • 52 reviews • 99 photos",
    summary:
      "Truly a hidden gem if you are a south indian food lover. The food was really tasty and quality was top notch. The ambience, cutlery, food quality, quantity and pricing - ALL top notch!",
    highlight: "A hidden gem for South Indian food lovers.",
    screenshot: "/uploads/review3.png",
  },
  {
    name: "Neha Singh",
    rating: 5,
    meta: "Local Guide • 55 reviews • 493 photos",
    summary:
      "Amazing Place, Amazing Food, Amazing People. And it did not disappoint at all. They have a rich variety of food and the preparation was very tasty. Nothing was overly oily or overly spicy to cover up any shortcomings.",
    highlight: "Amazing place, food, and people — nothing disappointed.",
    screenshot: "/uploads/review4.png",
  },
];
