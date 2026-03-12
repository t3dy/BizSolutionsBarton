import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, MapPin, Home, Calendar, Package } from 'lucide-react';
import { ChatBubble } from '../components/ChatBubble';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ExtractedInfo {
  origin?: string;
  destination?: string;
  bedrooms?: string;
  moveDate?: string;
  packing?: boolean;
  specialItems?: string[];
}

const conversationFlow: { triggers: string[]; response: string; extract?: Partial<ExtractedInfo> }[] = [
  {
    triggers: ['hello', 'hi', 'hey', 'help', 'moving'],
    response: "Hi there! I'm the Barton Springs Moving assistant. I'd love to help you plan your move. Where are you moving from?",
  },
  {
    triggers: ['round rock', 'cedar park', 'pflugerville', 'georgetown', 'leander', 'barton', 'austin', 'downtown', 'south', 'north', 'east', 'west', 'from'],
    response: "Got it! And where are you moving to?",
    extract: { origin: 'auto' },
  },
  {
    triggers: ['to', 'heading', 'going', 'destination', 'mueller', 'domain', 'downtown', 'south austin', 'zilker'],
    response: "How many bedrooms in your current home?",
    extract: { destination: 'auto' },
  },
  {
    triggers: ['1 bed', '2 bed', '3 bed', '4 bed', 'studio', 'bedroom', 'one', 'two', 'three', 'four'],
    response: "Do you have any heavy or specialty items like a piano, pool table, or safe?",
    extract: { bedrooms: 'auto' },
  },
  {
    triggers: ['piano', 'pool table', 'safe', 'gym', 'no', 'none', 'nope', 'don\'t', 'just', 'yes'],
    response: "When are you looking to move? Even a rough date helps us check availability.",
    extract: { specialItems: [] },
  },
  {
    triggers: ['march', 'april', 'may', 'next', 'week', 'month', 'asap', 'soon', 'end of'],
    response: "Would you like full packing services, or will you handle the packing?",
    extract: { moveDate: 'auto' },
  },
  {
    triggers: ['pack', 'full', 'help', 'yes', 'no', 'self', 'myself', 'own'],
    response: "Perfect! Based on what you've told me, here's a quick estimate:\n\n🏠 2 Bedroom move within Austin\n👷 3-person crew\n🕐 4–5 hours estimated\n💰 $1,400 – $1,800\n🚚 20ft box truck\n\nWould you like to schedule a free in-home estimate, or would you prefer to book online?",
    extract: { packing: true },
  },
  {
    triggers: ['book', 'schedule', 'estimate', 'yes', 'online'],
    response: "Awesome! I've sent you a booking link via text. You can also call us at (512) 555-MOVE. We'll send you a confirmation email with all the details. Is there anything else I can help with?",
  },
];

const now = () => {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm the Barton Springs Moving AI assistant. Tell me about your upcoming move and I'll help you get an instant estimate. For example, try saying \"I'm moving from a 2 bedroom in Round Rock to Austin.\"",
      isUser: false,
      timestamp: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [flowIndex, setFlowIndex] = useState(0);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input, isUser: true, timestamp: now() };
    setMessages((m) => [...m, userMsg]);

    const lower = input.toLowerCase();
    let matched = false;
    for (let i = flowIndex; i < conversationFlow.length; i++) {
      const step = conversationFlow[i];
      if (step.triggers.some((t) => lower.includes(t))) {
        setTimeout(() => {
          setMessages((m) => [...m, { id: Date.now() + 1, text: step.response, isUser: false, timestamp: now() }]);
        }, 600);
        if (step.extract) {
          setExtractedInfo((prev) => ({ ...prev, ...step.extract }));
        }
        setFlowIndex(i + 1);
        matched = true;
        break;
      }
    }

    if (!matched) {
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            text: "I'd love to help! Could you tell me more about your move? For example, where you're moving from and to, and how many bedrooms?",
            isUser: false,
            timestamp: now(),
          },
        ]);
      }, 600);
    }

    setInput('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeader
        title="AI Moving Assistant"
        subtitle="This chat widget lives on your website. It qualifies leads, answers questions, and generates quotes — even at 2 AM."
        badge="AI-Powered"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chat */}
        <Card padding={false} className="flex flex-col lg:col-span-2" style={{ height: 600 } as React.CSSProperties}>
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Barton Springs Moving</p>
              <p className="flex items-center gap-1 text-xs text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
              </p>
            </div>
            <div className="ml-auto rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
              <Sparkles className="mr-1 inline h-3 w-3" /> AI-Powered
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your move..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                onClick={handleSend}
                className="rounded-lg bg-brand-600 px-4 py-2.5 text-white transition-colors hover:bg-brand-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Extracted info sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
              <Sparkles className="h-4 w-4 text-violet-500" /> Extracted Info
            </h3>
            <p className="mb-3 text-xs text-gray-400">
              The AI extracts structured data from the conversation in real-time.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">From:</span>
                <span className="font-medium text-gray-900">
                  {extractedInfo.origin ? 'Captured ✓' : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">To:</span>
                <span className="font-medium text-gray-900">
                  {extractedInfo.destination ? 'Captured ✓' : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Size:</span>
                <span className="font-medium text-gray-900">
                  {extractedInfo.bedrooms ? 'Captured ✓' : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-900">
                  {extractedInfo.moveDate ? 'Captured ✓' : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Packing:</span>
                <span className="font-medium text-gray-900">
                  {extractedInfo.packing !== undefined ? 'Captured ✓' : '—'}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-brand-50">
            <h3 className="font-semibold text-gray-900">Why this matters</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-violet-500">•</span>
                Captures leads 24/7, even when you're asleep
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-violet-500">•</span>
                Qualifies customers before they even call
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-violet-500">•</span>
                Generates quotes in real-time
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-violet-500">•</span>
                Feeds data straight into your lead dashboard
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
