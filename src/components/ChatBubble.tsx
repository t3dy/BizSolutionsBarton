import React from 'react';

interface Props {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export const ChatBubble: React.FC<Props> = ({ message, isUser, timestamp }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-brand-600 text-white rounded-br-md'
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
      }`}
    >
      <p className="text-sm leading-relaxed">{message}</p>
      {timestamp && (
        <p className={`mt-1 text-xs ${isUser ? 'text-brand-200' : 'text-gray-400'}`}>
          {timestamp}
        </p>
      )}
    </div>
  </div>
);
