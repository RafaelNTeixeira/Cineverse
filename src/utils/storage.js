const STORAGE_KEY = 'cineverse_reviews';

export const getReviews = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const getReview = (tmdbId, mediaType) => {
  const reviews = getReviews();
  return reviews.find((r) => r.tmdbId === tmdbId && r.mediaType === mediaType) || null;
};

export const saveReview = (reviewData) => {
  const reviews = getReviews();
  const id = `${reviewData.tmdbId}-${reviewData.mediaType}`;
  const existing = reviews.findIndex((r) => r.id === id);
  const now = new Date().toISOString();

  const review = {
    ...reviewData,
    id,
    updatedAt: now,
    createdAt: existing >= 0 ? reviews[existing].createdAt : now,
  };

  if (existing >= 0) {
    reviews[existing] = review;
  } else {
    reviews.unshift(review);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return review;
};

export const deleteReview = (tmdbId, mediaType) => {
  const reviews = getReviews();
  const filtered = reviews.filter(
    (r) => !(r.tmdbId === tmdbId && r.mediaType === mediaType)
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getStats = () => {
  const reviews = getReviews();
  const movies = reviews.filter((r) => r.mediaType === 'movie');
  const tv = reviews.filter((r) => r.mediaType === 'tv');
  const ratings = reviews.map((r) => r.rating).filter(Boolean);
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;
  return {
    total: reviews.length,
    movies: movies.length,
    tv: tv.length,
    recommended: reviews.filter((r) => r.recommended).length,
    avgRating,
  };
};
