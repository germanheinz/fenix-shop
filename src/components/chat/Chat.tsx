'use client';
// App.tsx
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const Chat = () => {
	useEffect(() => {
		createChat({
            defaultLanguage: 'en',
            initialMessages: [
                'Hi there! 👋',
                'My name is Nathan. How can I assist you today?'
            ],
			webhookUrl: 'https://heinzgerman.app.n8n.cloud/webhook//chat'
		});
	}, []);

	return (<div></div>);
};