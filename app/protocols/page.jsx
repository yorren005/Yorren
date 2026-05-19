
import { IconTarget, IconBrain, IconShield, IconBolt } from "@tabler/icons-react";

export const metadata = {
  title: 'Protocols | Yorren',
  description: 'The core protocols of extreme human adaptation.',
};

export default function ProtocolsPage() {
  return (
    <>
      <main className="pt-48 pb-24 min-h-screen">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Core Protocols</h1>
            <p className="text-center text-gray-400 mb-16 text-lg max-w-2xl mx-auto">
              The systematic framework for upgrading the human operating system. 
              These protocols must be executed sequentially.
            </p>

            <div className="space-y-12">
              {/* Protocol 01 */}
              <div className="bento-card relative overflow-hidden" style={{ gridColumn: 'span 1', display: 'block' }}>
                <div className="absolute top-8 right-8 text-[rgba(255,255,255,0.05)]">
                  <IconTarget size={120} />
                </div>
                <span className="text-xs tracking-widest text-gray-500 mb-2 block">PHASE 01</span>
                <h2 className="text-3xl font-bold mb-4 relative z-10">Assessment & Baseline</h2>
                <p className="text-gray-300 mb-6 max-w-xl relative z-10">
                  Before optimization can begin, physiological and cognitive baselines must be established. This phase isolates bottlenecks in sleep architecture, attentional control, and stress response mechanisms.
                </p>
                <div className="flex gap-4 relative z-10">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">Metrics Tracking</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">Cortisol Mapping</span>
                </div>
              </div>

              {/* Protocol 02 */}
              <div className="bento-card relative overflow-hidden" style={{ gridColumn: 'span 1', display: 'block' }}>
                <div className="absolute top-8 right-8 text-[rgba(255,255,255,0.05)]">
                  <IconShield size={120} />
                </div>
                <span className="text-xs tracking-widest text-gray-500 mb-2 block">PHASE 02</span>
                <h2 className="text-3xl font-bold mb-4 relative z-10">Integration & Resilience</h2>
                <p className="text-gray-300 mb-6 max-w-xl relative z-10">
                  Deploying foundational protocols to stabilize the nervous system. This involves establishing non-sleep deep rest (NSDR) routines and implementing the initial cognitive load blocks to stimulate neuroplasticity without inducing burnout.
                </p>
                <div className="flex gap-4 relative z-10">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">NSDR Implementation</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">Stress Inoculation</span>
                </div>
              </div>

              {/* Protocol 03 */}
              <div className="bento-card relative overflow-hidden" style={{ gridColumn: 'span 1', display: 'block' }}>
                <div className="absolute top-8 right-8 text-[rgba(255,255,255,0.05)]">
                  <IconBrain size={120} />
                </div>
                <span className="text-xs tracking-widest text-[#ff9500] mb-2 block">PHASE 03</span>
                <h2 className="text-3xl font-bold mb-4 relative z-10">Optimization Engine</h2>
                <p className="text-gray-300 mb-6 max-w-xl relative z-10">
                  Fine-tuning variables for sustained peak performance. Here we lengthen focus duration intervals, adjust sleep architecture to maximize REM and slow-wave sleep density, and begin advanced neuro-associative conditioning.
                </p>
                <div className="flex gap-4 relative z-10">
                  <span className="px-3 py-1 bg-[#ff9500]/20 text-[#ff9500] rounded-full text-xs font-semibold">Flow State Mechanics</span>
                  <span className="px-3 py-1 bg-[#ff9500]/20 text-[#ff9500] rounded-full text-xs font-semibold">Deep Work Extensions</span>
                </div>
              </div>

              {/* Protocol 04 */}
              <div className="bento-card relative overflow-hidden" style={{ gridColumn: 'span 1', display: 'block' }}>
                <div className="absolute top-8 right-8 text-[rgba(255,255,255,0.05)]">
                  <IconBolt size={120} />
                </div>
                <span className="text-xs tracking-widest text-[#ff3b30] mb-2 block">PHASE 04</span>
                <h2 className="text-3xl font-bold mb-4 relative z-10">Extreme Expansion</h2>
                <p className="text-gray-300 mb-6 max-w-xl relative z-10">
                  Pushing past perceived limits into new capability tiers. The system is now robust enough to handle severe stressors and rapidly adapt to novel, high-complexity environments without degrading performance.
                </p>
                <div className="flex gap-4 relative z-10">
                  <span className="px-3 py-1 bg-[#ff3b30]/20 text-[#ff3b30] rounded-full text-xs font-semibold">Adaptation Scaling</span>
                  <span className="px-3 py-1 bg-[#ff3b30]/20 text-[#ff3b30] rounded-full text-xs font-semibold">Cognitive Overdrive</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
