'use client';
import { useEffect } from 'react';

export function ChatVoiceAgent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<elevenlabs-convai agent-id="agent_3701kcpvktbgefxa9rnn086j8ssq"></elevenlabs-convai>`,
      }}
    />
  );
}