import { ETier } from "../enums/Industries";

export const tierContext = [
  {
    type: ETier.FREE,
    text: "The Free tier allows users to have a single account with limited access to the platform&apos;s features. Users can upload up to 10 files per month without any associated cost.",
  },
  {
    type: ETier.BASIC,
    text: `The Basic tier allows up to 5 users, with the ability to upload up to
              10 files per month. If additional users are added beyond the 10-user
              limit, an extra $5 will be charged per user`,
  },
  {
    type: ETier.PREMIUM,
    text: `The Premium tier offers up to 20 file uploads per month with a fixed
              cost of $300. It includes unlimited users. However, if more than 20
              files are uploaded in a month, an additional $0.50 will be charged per
              extra file.`,
  },
];
