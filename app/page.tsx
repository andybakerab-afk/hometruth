import { ConversationFlow } from '@/components/conversation/ConversationFlow';

export default function HomePage() {
  return (
    <>
      <div className="landing-intro">
        <h1 className="landing-wordmark">HomeTruth</h1>
        <p className="landing-tagline">Real advice. Someone genuinely in your corner.</p>
      </div>
      <ConversationFlow />
    </>
  );
}
