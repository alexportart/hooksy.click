'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  text: string;
  date: string;
  likes: number;
  commentsCount: number;
}

interface Comment {
  text: string;
  author: string;
  date: string;
}

interface TopicData {
  topic: string;
  posts: Post[];
  comments: Comment[];
  analysis: string;
}

interface AnalysisResult {
  groupUrl: string;
  totalPostsProcessed: number;
  topicsFound: number;
  timestamp: string;
  topics: TopicData[];
}

const TOPICS_CONFIG = [
  { id: 'emigration', name: '🏠 Эмиграция в Сербию', icon: '🏠' },
  { id: 'banking', name: '🏦 Банки и карты по РФ паспорту', icon: '🏦' },
  { id: 'taxes', name: '💰 Налоги и финансы', icon: '💰' },
  { id: 'work', name: '💼 Работа и бизнес', icon: '💼' },
  { id: 'housing', name: '🏢 Жилье и недвижимость', icon: '🏢' },
  { id: 'legal', name: '⚖️ Правовые вопросы', icon: '⚖️' }
];

export default function AnalysisPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const groupUrl = 'https://www.facebook.com/groups/248944475799584'; // Понаехали! Сербия

  const analyzeGroup = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/facebook-scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groups: [groupUrl],
          keywords: [],
          includeComments: true,
          limit: 100
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze group');
      }

      // Transform data to match our needs
      setData({
        groupUrl,
        totalPostsProcessed: result.data.postsCount || 0,
        topicsFound: 0,
        timestamp: result.data.timestamp,
        topics: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeGroup();
  }, []);

  const currentTopicData = selectedTopic && data?.topics
    ? data.topics.find(t => t.topic.toLowerCase().includes(selectedTopic))
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Ruserbija
            </Link>
            <span className="text-slate-500">/ Анализ группы</span>
          </div>
          <Link
            href="/"
            className="px-4 py-2 text-slate-300 hover:text-white transition"
          >
            ← Назад
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Info Section */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">📊 Анализ Facebook группы</h1>
          <p className="text-slate-300 mb-4">
            Автоматический анализ постов и комментариев из группы сообщества
          </p>
          <div className="flex gap-4">
            <button
              onClick={analyzeGroup}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 transition"
            >
              {loading ? '⏳ Анализирую...' : '🔄 Обновить анализ'}
            </button>
            {data && (
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-slate-400">Постов обработано</p>
                  <p className="text-2xl font-bold text-blue-400">{data.totalPostsProcessed}</p>
                </div>
                <div>
                  <p className="text-slate-400">Тем найдено</p>
                  <p className="text-2xl font-bold text-indigo-400">{data.topicsFound}</p>
                </div>
              </div>
            )}
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded text-red-300">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Topic Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {TOPICS_CONFIG.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`p-6 rounded-lg border transition ${
                selectedTopic === topic.id
                  ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border-blue-400 ring-2 ring-blue-400'
                  : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
              }`}
            >
              <p className="text-3xl mb-2">{topic.icon}</p>
              <p className="font-semibold text-left">{topic.name}</p>
            </button>
          ))}
        </div>

        {/* Details Section */}
        {selectedTopic && (
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                {TOPICS_CONFIG.find(t => t.id === selectedTopic)?.name}
              </h2>

              {currentTopicData ? (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-700/50 p-4 rounded">
                      <p className="text-sm text-slate-400">Релевантных постов</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {currentTopicData.posts.length}
                      </p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded">
                      <p className="text-sm text-slate-400">Комментариев</p>
                      <p className="text-2xl font-bold text-green-400">
                        {currentTopicData.comments.length}
                      </p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded">
                      <p className="text-sm text-slate-400">Средние лайки</p>
                      <p className="text-2xl font-bold text-purple-400">
                        {currentTopicData.posts.length > 0
                          ? Math.round(
                              currentTopicData.posts.reduce((sum, p) => sum + p.likes, 0) /
                              currentTopicData.posts.length
                            )
                          : 0}
                      </p>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-slate-900/50 p-6 rounded mb-8 border border-slate-700">
                    <h3 className="text-xl font-semibold mb-4">📈 Аналитика</h3>
                    <div className="prose prose-invert max-w-none text-sm">
                      <pre className="whitespace-pre-wrap font-mono text-slate-300">
                        {currentTopicData.analysis}
                      </pre>
                    </div>
                  </div>

                  {/* Top Posts */}
                  {currentTopicData.posts.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">🔝 Популярные посты</h3>
                      <div className="space-y-4">
                        {currentTopicData.posts
                          .sort((a, b) => b.likes - a.likes)
                          .slice(0, 5)
                          .map((post, i) => (
                            <div key={i} className="bg-slate-700/50 p-4 rounded border border-slate-600">
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-blue-300">Пост #{i + 1}</p>
                                <span className="text-sm text-slate-400">
                                  {new Date(post.date).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <p className="text-slate-300 mb-3 line-clamp-3">
                                {post.text}
                              </p>
                              <div className="flex gap-4 text-sm text-slate-400">
                                <span>👍 {post.likes} лайков</span>
                                <span>💬 {post.commentsCount} комментариев</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Top Comments */}
                  {currentTopicData.comments.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">💬 Обсуждение</h3>
                      <div className="space-y-4">
                        {currentTopicData.comments.slice(0, 10).map((comment, i) => (
                          <div key={i} className="bg-slate-700/50 p-4 rounded border border-slate-600">
                            <p className="font-semibold text-indigo-300 mb-2">
                              {comment.author || 'Анонимный пользователь'}
                            </p>
                            <p className="text-slate-300 mb-2">{comment.text}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(comment.date).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-slate-700/30 p-8 rounded text-center text-slate-400">
                  <p>📭 По этой теме пока нет постов</p>
                  <p className="text-sm mt-2">Попробуйте обновить анализ</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No topic selected */}
        {!selectedTopic && (
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-xl text-slate-400">
              👆 Выберите тему для просмотра постов и комментариев
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
