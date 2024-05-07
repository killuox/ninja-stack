import { generateIdFromEntropySize } from 'lucia';

export const generateDatabaseId = () => generateIdFromEntropySize(10);