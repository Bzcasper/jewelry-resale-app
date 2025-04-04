/**
 * AI Helper Utilities
 * 
 * Provides common AI-related utility functions.
 */

/**
 * Calculate perceptual hash distance between two hashes
 * @param {Array|String} hashA First hash
 * @param {Array|String} hashB Second hash
 * @returns {Number} Normalized distance (0-1)
 */
export function hashDistance(hashA, hashB) {
  // Convert strings to arrays if needed
  const a = typeof hashA === 'string' ? hashA.split('').map(Number) : hashA;
  const b = typeof hashB === 'string' ? hashB.split('').map(Number) : hashB;

  // Ensure both arrays are the same length
  if (a.length !== b.length) {
    throw new Error('Hashes must be the same length');
  }

  // Count differences (Hamming distance)
  let differences = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differences++;
    }
  }

  // Normalize to 0-1 range
  return differences / a.length;
}

/**
 * Generate embedding vector (mock implementation)
 * @param {String} text Input text
 * @returns {Array} Embedding vector
 */
export function generateEmbedding(text) {
  // This would be implemented with actual AI embedding service
  // Mock implementation for illustration
  return Array(128).fill(0).map(() => Math.random());
}

/**
 * Calculate cosine similarity between two vectors
 * @param {Array} vectorA First vector
 * @param {Array} vectorB Second vector
 * @returns {Number} Similarity score (-1 to 1)
 */
export function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must be the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Find most similar items by embedding
 * @param {Array} query Query embedding
 * @param {Array} items Items with embeddings
 * @param {Number} limit Maximum items to return
 * @returns {Array} Most similar items with scores
 */
export function findSimilarItems(query, items, limit = 5) {
  // Calculate similarity for each item
  const similarities = items.map(item => ({
    item,
    score: cosineSimilarity(query, item.embedding)
  }));

  // Sort by similarity score (descending)
  similarities.sort((a, b) => b.score - a.score);

  // Return top matches
  return similarities.slice(0, limit);
}

/**
 * Truncate and clean text for API requests
 * @param {String} text Input text
 * @param {Number} maxLength Maximum length
 * @returns {String} Truncated and cleaned text
 */
export function prepareText(text, maxLength = 1000) {
  // Truncate
  let cleaned = text.slice(0, maxLength);

  // Trim whitespace
  cleaned = cleaned.trim();

  // Remove excessive newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned;
}