// src/services/account.js
import { fench } from "./fench";

/**
 * getAccountStates -> GET /{type}/{id}/account_states?session_id=...
 * toggleFavorite -> POST /account/{account_id}/favorite?session_id=...
 * toggleWatchlist -> POST /account/{account_id}/watchlist?session_id=...
 * submitRating -> POST /{type}/{id}/rating?session_id=...
 */

export const getAccountStates = (type, id, session) =>
  fench.get(`${type}/${id}/account_states`, { params: { session_id: session } });

export const toggleFavorite = (accountId, mediaType, mediaId, favorite, session) =>
  fench.post(
    `account/${accountId}/favorite`,
    { media_type: mediaType, media_id: mediaId, favorite },
    { params: { session_id: session } }
  );

export const toggleWatchlist = (accountId, mediaType, mediaId, watchlist, session) =>
  fench.post(
    `account/${accountId}/watchlist`,
    { media_type: mediaType, media_id: mediaId, watchlist },
    { params: { session_id: session } }
  );
  // add this in src/services/account.js
export const getWatchlist = (accountId) =>
  fench.get(`account/${accountId}/watchlist/movies`);


export const submitRating = (type, id, value, session) =>
  fench.post(`${type}/${id}/rating`, { value }, { params: { session_id: session } });
