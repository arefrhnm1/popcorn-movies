import { fench } from "./fench";

// گرفتن واچ‌لیست کاربر
export const getWatchlist = async (accountId) => {
  return fench.get(`account/${accountId}/watchlist/movies`);
};

// افزودن یا حذف از واچ‌لیست
export const toggleWatchlist = async (accountId, mediaId, mediaType, state) => {
  return fench.post(`account/${accountId}/watchlist`, {
    media_type: mediaType,
    media_id: mediaId,
    watchlist: state,
  });
};
