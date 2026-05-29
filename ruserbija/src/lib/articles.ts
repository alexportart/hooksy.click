import fs from 'fs';
import path from 'path';
import { Article } from './types';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

export function getArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8')) as Article)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Article;
}

export function getArticlesByCategory(category: string): Article[] {
  return getArticles().filter(a => a.category === category);
}
