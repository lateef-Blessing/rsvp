import { Category, Event, Member, Order, User } from "@prisma/client";

export type GetAllEventsParams = {
  userId: string;
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type EventWithUser = Event & {
  user: User;
};

export type MemberWithUser = Member & {
  user: User;
};

export type EventWithUserWithCategory = Event & {
  user: User;
  category: Category;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    imageUrl: string;
    eventDate: Date;
    categoryId: string;
    location: string;
    price: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    eventDate: Date;
    categoryId: string;
    location: string;
    price: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type DeleteEventAttendanceParams = {
  eventId: string;
  userId: string;
  path: string;
};

export type SendMessageParams = {
  eventId: string;
  userId: string;
  message: string;
};

export type DeleteUserParams = {
  userId: string;
  path: string;
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  userId: string;
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type GetMembersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetUsersBySearchParams = {
  searchString: string;
};
