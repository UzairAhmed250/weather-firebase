import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Spin } from 'antd';
import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { sendChatMessage } from '../../services/chatService';
import {
  consumeChatRateLimit,
  createChatSession,
  getChatSessionMessages,
  getLatestChatSession,
  saveChatMessage,
} from '../../services/firestoreService';
import { useAuth } from '../../context/AuthContext';

const MAX_MESSAGES_PER_MINUTE = 5;

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Hi! I can help you with Wethr.ai — weather search, forecasts, accounts, and how to use the site. What would you like to know?',
};

function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [sessionId, setSessionId] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    const loadChatSession = async () => {
      if (!user) {
        setSessionId(null);
        setMessages([WELCOME_MESSAGE]);
        return;
      }

      setSessionLoading(true);
      try {
        let activeSession = await getLatestChatSession();
        if (!activeSession) {
          const newSessionId = await createChatSession();
          activeSession = { id: newSessionId };
        }

        setSessionId(activeSession.id);
        const storedMessages = await getChatSessionMessages(activeSession.id);
        setMessages(
          storedMessages.length
            ? storedMessages.map(({ role, content }) => ({ role, content }))
            : [WELCOME_MESSAGE],
        );
      } catch {
        setMessages([WELCOME_MESSAGE]);
      } finally {
        setSessionLoading(false);
      }
    };

    loadChatSession();
  }, [user]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading || sessionLoading) {
      return;
    }

    if (!user) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Please sign in to use the AI chat assistant.',
        },
      ]);
      return;
    }

    const userMessage = { role: 'user', content: text };
    setInput('');
    setLoading(true);

    try {
      const rateLimit = await consumeChatRateLimit({
        maxMessages: MAX_MESSAGES_PER_MINUTE,
      });

      if (!rateLimit.allowed) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Rate limit reached. You can send up to 5 messages per minute.',
          },
        ]);
        return;
      }

      let activeSessionId = sessionId;
      if (!activeSessionId) {
        activeSessionId = await createChatSession();
        setSessionId(activeSessionId);
      }

      setMessages((prev) => [...prev, userMessage]);
      await saveChatMessage(activeSessionId, userMessage);

      const reply = await sendChatMessage(text);
      const assistantMessage = { role: 'assistant', content: reply };
      setMessages((prev) => [...prev, assistantMessage]);
      await saveChatMessage(activeSessionId, assistantMessage);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, I could not respond right now. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-[60] flex h-[min(520px,calc(100vh-7rem))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#555555] bg-[#3a3a3a] shadow-[0px_8px_24px_rgba(0,0,0,0.45)] sm:right-6">
          <div className="flex items-center justify-between border-b border-[#555555] bg-[#444444] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Wethr.ai Assistant</p>
              <p className="text-xs text-[#bdbdbd]">Ask about this site</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-[#555555]"
            >
              <CloseOutlined />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {!user && (
              <div className="rounded-2xl border border-[#555555] bg-[#444444] px-3 py-3 text-sm text-[#e8e8e8]">
                Sign in to chat with the AI assistant.
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="ml-1 font-semibold text-[#59bb18] hover:opacity-90"
                >
                  Go to login
                </button>
              </div>
            )}

            {user && sessionLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-[#444444] px-3 py-2">
                  <Spin size="small" />
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-[#59bb18] text-white'
                      : 'bg-[#444444] text-[#e8e8e8]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-[#444444] px-3 py-2">
                  <Spin size="small" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[#555555] p-3">
            <div className="flex gap-2">
              <Input.TextArea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about weather features, login, forecasts..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                maxLength={500}
                disabled={loading || sessionLoading}
                className="!resize-none !border-[#555555] !bg-[#444444] !text-white placeholder:!text-[#9a9a9a]"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                loading={loading}
                disabled={!input.trim() || !user || sessionLoading}
                className="!h-auto !min-h-[40px] !border-[#59bb18] !bg-[#59bb18] hover:!opacity-90"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label="Open chat assistant"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#59bb18] text-2xl text-white shadow-[0px_4px_16px_rgba(0,0,0,0.35)] transition hover:scale-105 hover:opacity-90 sm:right-6"
      >
        {open ? <CloseOutlined /> : <MessageOutlined />}
      </button>
    </>
  );
}

export default ChatWidget;
