'use client';

export const TestBanner = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4">🔍 Test Version - This is a testing environment</span>
        <span className="mx-4">⚡ All features are in test mode</span>
        <span className="mx-4">🛠 Website under development</span>
        <span className="mx-4">👨‍💻 Created by Germán Heinz</span>
        <span className="mx-4">🔍 Test Version - This is a testing environment</span>
        <span className="mx-4">⚡ All features are in test mode</span>
        <span className="mx-4">🛠 Website under development</span>
        <span className="mx-4">👨‍💻 Created by Germán Heinz</span>
      </div>
    </div>
  );
}