"use client";
import { IconBrain, IconMoon, IconTarget, IconShield, IconActivity, IconBolt, IconDatabase, IconLock, IconRipple } from "@tabler/icons-react";

export default function KnowledgeBasePage() {
  return (
    <main className="pb-24 min-h-screen relative overflow-hidden" style={{ paddingTop: '160px' }}>
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        


        {/* Section 2: Operational Explanations (Scrolling Definitions) */}
        <section className="mb-24">
          <div className="section-header text-left ml-0 mb-8">
            <h2 className="text-3xl font-bold">Operational Explanations</h2>
            <p className="text-gray-400">Complete terms, definitions, and frameworks used within Yorren.</p>
          </div>

          <div className="flex flex-col gap-6">
            
            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-white/50 group-hover:text-white transition-colors duration-300">
                  <IconBrain size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Neuroplasticity Engine</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    The overarching physiological mechanism that allows the brain to reorganize itself by forming new neural connections. Our entire framework is designed to exploit adult neuroplasticity through precise timing of focus, stress, and rest.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-white/50 group-hover:text-white transition-colors duration-300">
                  <IconMoon size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">NSDR Protocol</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    Non-Sleep Deep Rest. A state of deep relaxation while maintaining consciousness. It is used immediately post-cognitive load to accelerate memory consolidation and systemic recovery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff3b30]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-[#ff3b30]/50 group-hover:text-[#ff3b30] transition-colors duration-300">
                  <IconShield size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Stress Inoculation</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    Controlled, acute exposure to physiological and mental stressors. The goal is to raise the baseline threshold for cortisol release and panic response, making the system highly resilient to chaos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4361ee]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-[#4361ee]/50 group-hover:text-[#4361ee] transition-colors duration-300">
                  <IconTarget size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Focus Intervals</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    Ultra-dense periods of uninterrupted attention. Training begins at 45-minute blocks and systematically scales up to 4-hour sustained flow states, eliminating context-switching fatigue.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-white/50 group-hover:text-white transition-colors duration-300">
                  <IconActivity size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">REM Latency</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    The duration it takes to enter Rapid Eye Movement sleep after falling asleep. Shorter latency indicates higher sleep pressure and faster cognitive recovery, a key metric we track.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff9500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-[#ff9500]/50 group-hover:text-[#ff9500] transition-colors duration-300">
                  <IconBolt size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Flow State Mechanics</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    The physiological and psychological conditions required to enter and maintain a state of optimal experience. We break this down into actionable triggers rather than relying on chance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a020f0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-[#a020f0]/50 group-hover:text-[#a020f0] transition-colors duration-300">
                  <IconRipple size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Adaptation Scaling</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    The process of continually increasing the complexity and intensity of variables once the system has reached homeostasis, preventing stagnation and forcing continuous evolution.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-card wide relative overflow-hidden group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-4 rounded-2xl bg-white/5 text-white/50 group-hover:text-white transition-colors duration-300">
                  <IconLock size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Cognitive Baseline</h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    The unoptimized starting point of an individual's attentional control, working memory, and emotional regulation. Establishing this is the mandatory first step before applying any load.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
