/**
 * File Manager Utilities
 * 
 * Handles file system operations for the Cline agent.
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Read file content
 * @param {String} filePath Path to file
 * @returns {String} File content
 */
export async function readFile(filePath) {
  try {
    // Ensure directory structure exists
    const directory = path.dirname(filePath);
    await ensureDirectoryExists(directory);

    // Read file
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Write content to file
 * @param {String} filePath Path to file
 * @param {String} content Content to write
 */
export async function writeFile(filePath, content) {
  try {
    // Ensure directory structure exists
    const directory = path.dirname(filePath);
    await ensureDirectoryExists(directory);

    // Write file
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    throw new Error(`Failed to write file ${filePath}: ${error.message}`);
  }
}

/**
 * Check if file exists
 * @param {String} filePath Path to file
 * @returns {Boolean} Whether file exists
 */
export async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure directory exists, creating it if necessary
 * @param {String} directory Directory path
 */
export async function ensureDirectoryExists(directory) {
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * List files in directory
 * @param {String} directory Directory path
 * @param {Object} options Options for listing
 * @returns {Array} List of file paths
 */
export async function listFiles(directory, options = {}) {
  const { recursive = false, pattern = null } = options;

  try {
    // Check if directory exists
    if (!(await exists(directory))) {
      return [];
    }

    if (recursive) {
      return listFilesRecursive(directory, pattern);
    } else {
      const files = await fs.readdir(directory);

      // Filter by pattern if provided
      if (pattern) {
        const regex = new RegExp(pattern);
        return files
          .filter(file => regex.test(file))
          .map(file => path.join(directory, file));
      }

      return files.map(file => path.join(directory, file));
    }
  } catch (error) {
    throw new Error(`Failed to list files in ${directory}: ${error.message}`);
  }
}

/**
 * List files recursively
 * @param {String} directory Directory path
 * @param {RegExp} pattern Pattern to match
 * @returns {Array} List of file paths
 */
async function listFilesRecursive(directory, pattern = null) {
  let results = [];

  // Read directory contents
  const entries = await fs.readdir(directory, { withFileTypes: true });

  // Process each entry
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectory
      const subResults = await listFilesRecursive(fullPath, pattern);
      results = [...results, ...subResults];
    } else if (!pattern || new RegExp(pattern).test(entry.name)) {
      // Add file if it matches pattern (or no pattern provided)
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Copy file
 * @param {String} source Source path
 * @param {String} destination Destination path
 */
export async function copyFile(source, destination) {
  try {
    // Ensure destination directory exists
    const directory = path.dirname(destination);
    await ensureDirectoryExists(directory);

    // Copy file
    await fs.copyFile(source, destination);
  } catch (error) {
    throw new Error(`Failed to copy file from ${source} to ${destination}: ${error.message}`);
  }
}

/**
 * Move file
 * @param {String} source Source path
 * @param {String} destination Destination path
 */
export async function moveFile(source, destination) {
  try {
    // Ensure destination directory exists
    const directory = path.dirname(destination);
    await ensureDirectoryExists(directory);

    // Move file
    await fs.rename(source, destination);
  } catch (error) {
    throw new Error(`Failed to move file from ${source} to ${destination}: ${error.message}`);
  }
}

/**
 * Delete file
 * @param {String} filePath Path to file
 */
export async function deleteFile(filePath) {
  try {
    if (await exists(filePath)) {
      await fs.unlink(filePath);
    }
  } catch (error) {
    throw new Error(`Failed to delete file ${filePath}: ${error.message}`);
  }
}