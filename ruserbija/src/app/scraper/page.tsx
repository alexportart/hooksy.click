'use client';

import { useState } from 'react';

interface ScraperResult {
  posts: Array<{
    group: string;
    post_id: string;
    text: string;
    date: string;
    likes: number;
    comments_count: number;
  }>;
  comments: Array<{
    post_id: string;
    author: string;
    text: string;
    date: string;
  }>;
  postsCount: number;
  commentsCount: number;
  timestamp: string;
}

export default function FacebookScraperPage() {
  const [groups, setGroups] = useState<string[]>(['']);
  const [keywords, setKeywords] = useState<string[]>(['']);
  const [includeComments, setIncludeComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScraperResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addGroupField = () => {
    setGroups([...groups, '']);
  };

  const removeGroupField = (index: number) => {
    setGroups(groups.filter((_, i) => i !== index));
  };

  const updateGroup = (index: number, value: string) => {
    const newGroups = [...groups];
    newGroups[index] = value;
    setGroups(newGroups);
  };

  const addKeywordField = () => {
    setKeywords([...keywords, '']);
  };

  const removeKeywordField = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const validGroups = groups.filter(g => g.trim());
    const validKeywords = keywords.filter(k => k.trim());

    if (validGroups.length === 0) {
      setError('Please enter at least one group URL');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/facebook-scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          groups: validGroups,
          keywords: validKeywords,
          includeComments,
          limit: 100
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scrape data');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!result) return;

    const csv = [
      ['Group', 'Post ID', 'Text', 'Date', 'Likes', 'Comments'],
      ...result.posts.map(p => [
        p.group,
        p.post_id,
        `"${p.text.replace(/"/g, '""')}"`,
        p.date,
        p.likes,
        p.comments_count
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facebook-posts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🔍 Facebook Group Scraper
        </h1>
        <p className="text-gray-600 mb-8">
          Extract posts and comments from Facebook groups (last 3 months)
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Groups Input */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Facebook Groups
            </h2>
            {groups.map((group, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={group}
                  onChange={(e) => updateGroup(index, e.target.value)}
                  placeholder="https://www.facebook.com/groups/cryptoworld"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {groups.length > 1 && (
                  <button
                    onClick={() => removeGroupField(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addGroupField}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              + Add Group
            </button>
          </div>

          {/* Keywords Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Keywords (Optional)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Leave empty to get all posts. Add keywords to filter results.
            </p>
            {keywords.map((keyword, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                  placeholder="e.g., AI, crypto, marketing"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {keywords.length > 1 && (
                  <button
                    onClick={() => removeKeywordField(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addKeywordField}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              + Add Keyword
            </button>
          </div>

          {/* Options */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeComments}
                onChange={(e) => setIncludeComments(e.target.checked)}
                className="w-5 h-5 text-blue-500 rounded"
              />
              <span className="text-gray-700">Include comments (slower)</span>
            </label>
          </div>

          {/* Scrape Button */}
          <button
            onClick={handleScrape}
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? 'Scraping...' : 'Start Scraping'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Posts Found</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.postsCount}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Comments Found</p>
                <p className="text-3xl font-bold text-green-600">
                  {result.commentsCount}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Scraped At</p>
                <p className="text-sm font-mono text-purple-600">
                  {new Date(result.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={downloadCSV}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-8"
            >
              📥 Download CSV
            </button>

            {/* Posts Table */}
            {result.posts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Posts ({result.postsCount})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-left">Group</th>
                        <th className="px-4 py-2 text-left">Text</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-right">Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.posts.slice(0, 10).map((post, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-blue-600 truncate">
                            {post.group}
                          </td>
                          <td className="px-4 py-2 truncate max-w-xs">
                            {post.text.slice(0, 100)}...
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">
                            {new Date(post.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-right font-semibold">
                            {post.likes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.posts.length > 10 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Showing 10 of {result.postsCount} posts. Download CSV to see all.
                  </p>
                )}
              </div>
            )}

            {/* Comments Table */}
            {result.comments.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Comments ({result.commentsCount})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-left">Author</th>
                        <th className="px-4 py-2 text-left">Text</th>
                        <th className="px-4 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.comments.slice(0, 10).map((comment, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-semibold">
                            {comment.author}
                          </td>
                          <td className="px-4 py-2 truncate max-w-xs">
                            {comment.text.slice(0, 100)}...
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">
                            {new Date(comment.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
