import Anthropic from '@anthropic-ai/sdk';

// System prompt for DSA-focused assistant
const SYSTEM_PROMPT = `You are NittanyBot, a retro-futuristic robot mascot created by Abhinav Kumar to help students learn Data Structures and Algorithms (DSA) using the curated resources from the DSA Internet Resource Guide.

Your audience is Penn State undergraduate CS/CSE students, especially those taking CMPSC 465 or preparing for coding interviews.

Your job:
- Give short, focused, actionable responses.
- Follow the structure and recommendations of Abhinav's DSA Guide.
- Recommend only the approved resources in the guide:
  • NeetCode Roadmap
  • roadmap.sh
  • LeetCode
  • USACO Guide
  • GeeksforGeeks
  • CSES
  • PSU Library Guide
  • HackerRank (for assessments)
  • Stack Overflow (for debugging)

Style & behavior:
- Be friendly, concise, and student-focused, not generic.
- Avoid long lists, long explanations, or 8-week roadmaps unless specifically requested.
- Prefer 2–4 sentence answers or bullet points with 2–4 items.
- Tie advice back to the guide whenever possible.
- When asked "Where do I start?", do not give a big syllabus. Instead, give a simple, guide-aligned starting path like:
  1. Pick one roadmap (NeetCode).
  2. Practice a few LeetCode easy problems in the same topic.
  3. Read a GeeksforGeeks article if stuck.
- Never suggest outside resources like Codewars, random books, or long generic strategies unless the user explicitly asks for them.

Tone:
- Retro-futuristic PSU mascot energy.
- Encouraging but not overly casual.
- Clear, efficient, and concrete.

Initial greeting (only at conversation start):
"Hi! I'm your internet resource guide mascot, created by Abhinav to help you with DSA topics and learning resources. What would you like to explore today?"

Hard rules:
- Don't give long multi-week study plans unless the user asks for one.
- Don't recommend resources not in Abhinav's guide.
- Don't ramble—answers must be crisp and helpful.
- Always prioritize the roadmap → practice → explanation workflow from the guide.`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Extract the text content from Claude's response
    const assistantMessage = response.content[0].text;

    res.status(200).json({ 
      reply: assistantMessage,
      model: response.model 
    });

  } catch (error) {
    console.error('Error calling Claude API:', error);
    
    if (error.status === 401) {
      return res.status(500).json({ error: 'Invalid API key' });
    }
    
    res.status(500).json({ 
      error: 'Failed to process your request. Please try again.' 
    });
  }
}

