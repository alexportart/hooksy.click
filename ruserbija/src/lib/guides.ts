import fs from 'fs';
import path from 'path';
import { Guide } from './types';

const GUIDES_DIR = path.join(process.cwd(), 'data', 'guides');

export function getGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs.readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(GUIDES_DIR, f), 'utf-8')) as Guide);
}

export function getGuide(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Guide;
}

export function getGuidesByCategory(category: string): Guide[] {
  return getGuides().filter(g => g.category === category);
}
