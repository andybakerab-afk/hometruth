import { ConversationFlow } from '@/components/conversation/ConversationFlow';

export default function HomePage() {
  return (
    <>
      <div className="landing-intro">
        <p className="landing-tagline">Real advice. Someone genuinely in your corner.</p>
        <p className="landing-subtext">Real Melbourne property advice from someone genuinely in your corner.</p>
      </div>
      <ConversationFlow />
    </>
  );
}
