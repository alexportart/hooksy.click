import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'facebook-scraper3.p.rapidapi.com';

// Темы для анализа постов
const TOPICS = {
  emigration: {
    name: 'Эмиграция в Сербию',
    keywords: ['эмигра', 'переезд', 'виза', 'ВНЖ', 'статус', 'резидент', 'сербия']
  },
  banking: {
    name: 'Банки и карты по РФ паспорту',
    keywords: ['банк', 'карта', 'паспорт', 'открыть счёт', 'счет', 'банковский', 'счета']
  },
  taxes: {
    name: 'Налоги и финансы',
    keywords: ['налог', 'налоговый', 'финанс', 'сбор', 'налогов']
  },
  work: {
    name: 'Работа и бизнес',
    keywords: ['работа', 'бизнес', 'работать', 'компания', 'должность', 'работы']
  },
  housing: {
    name: 'Жилье и недвижимость',
    keywords: ['жилье', 'квартира', 'дом', 'аренда', 'недвижимость', 'жилья', 'квартир']
  },
  legal: {
    name: 'Правовые вопросы',
    keywords: ['адвокат', 'юрист', 'закон', 'право', 'суд', 'документ', 'юридически']
  }
};

interface Post {
  group: string;
  post_id: string;
  text: string;
  date: string;
  likes: number;
  comments_count: number;
}

interface Comment {
  post_id: string;
  author: string;
  text: string;
  date: string;
}

interface TopicContent {
  topic: string;
  topicId: string;
  posts: Post[];
  comments: Comment[];
}

async function fetchGroupPosts(groupUrl: string, limit: number = 100) {
  const url = new URL(`https://${RAPIDAPI_HOST}/group/posts`);
  url.searchParams.append('url', groupUrl);
  url.searchParams.append('limit', limit.toString());

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY || '',
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts from ${groupUrl}:`, error);
    return { posts: [] };
  }
}

async function fetchPostComments(postId: string) {
  const url = new URL(`https://${RAPIDAPI_HOST}/post/comments`);
  url.searchParams.append('post_id', postId);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY || '',
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return { comments: [] };
  }
}

function filterPostsByThreeMonths(posts: any[]) {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  return posts.filter(post => {
    if (!post.date) return false;
    const postDate = new Date(post.date);
    return postDate >= threeMonthsAgo;
  });
}

function filterByKeywords(posts: any[], keywords: string[]) {
  return posts.filter(post => {
    const text = (post.text || '').toLowerCase();
    return keywords.some(keyword => text.includes(keyword.toLowerCase()));
  });
}

function categorizePostByTopic(text: string): string | null {
  const lowerText = text.toLowerCase();

  for (const [topicId, topicData] of Object.entries(TOPICS)) {
    for (const keyword of topicData.keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return topicId;
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      groups = [],
      includeComments = false,
      keywords = [],
      limit = 100
    } = body;

    if (!groups || groups.length === 0) {
      return NextResponse.json(
        { error: 'At least one group URL is required' },
        { status: 400 }
      );
    }

    const allPosts: Post[] = [];
    const allComments: Comment[] = [];
    const topicMap: Record<string, TopicContent> = {};

    // Initialize topic buckets
    for (const topicId of Object.keys(TOPICS)) {
      topicMap[topicId] = {
        topic: TOPICS[topicId as keyof typeof TOPICS].name,
        topicId,
        posts: [],
        comments: []
      };
    }

    for (const group of groups) {
      const data = await fetchGroupPosts(group, limit);
      const posts = data.posts || [];

      const recentPosts = filterPostsByThreeMonths(posts);

      const filteredPosts = keywords.length > 0
        ? filterByKeywords(recentPosts, keywords)
        : recentPosts;

      for (const post of filteredPosts) {
        const postObj: Post = {
          group,
          post_id: post.id,
          text: post.text,
          date: post.date,
          likes: post.likes || 0,
          comments_count: post.commentsCount || 0
        };
        
        allPosts.push(postObj);

        // Categorize by topic
        const topicId = categorizePostByTopic(post.text);
        if (topicId) {
          topicMap[topicId].posts.push(postObj);
        }

        if (includeComments && post.id) {
          const commentsData = await fetchPostComments(post.id);
          const comments = commentsData.comments || [];

          for (const comment of comments) {
            const commentObj: Comment = {
              post_id: post.id,
              author: comment.author,
              text: comment.text,
              date: comment.date
            };
            
            allComments.push(commentObj);

            // Add to topic if post belongs to topic
            if (topicId) {
              topicMap[topicId].comments.push(commentObj);
            }
          }
        }
      }
    }

    // Filter topics to only those with posts
    const topics = Object.values(topicMap).filter(t => t.posts.length > 0);

    return NextResponse.json({
      success: true,
      data: {
        posts: allPosts,
        comments: allComments,
        postsCount: allPosts.length,
        commentsCount: allComments.length,
        topicsCount: topics.length,
        topics: topics,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Facebook scraper error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape Facebook data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const groupUrl = searchParams.get('group');
  const limit = parseInt(searchParams.get('limit') || '100');

  if (!groupUrl) {
    return NextResponse.json(
      { error: 'Group URL is required' },
      { status: 400 }
    );
  }

  try {
    const data = await fetchGroupPosts(groupUrl, limit);
    const posts = data.posts || [];

    const recentPosts = filterPostsByThreeMonths(posts);

    return NextResponse.json({
      success: true,
      data: {
        group: groupUrl,
        posts: recentPosts,
        count: recentPosts.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Facebook scraper error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape Facebook data' },
      { status: 500 }
    );
  }
}
