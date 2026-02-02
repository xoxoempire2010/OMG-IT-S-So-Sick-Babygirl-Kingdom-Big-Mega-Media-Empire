
import React from 'react';
import { Shield, Gavel, Heart, Sparkles, Star, ScrollText, CheckCircle } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block relative">
          <Shield className="absolute -top-10 -left-10 text-pink-200 animate-pulse" size={64} />
          <h2 className="text-5xl md:text-7xl font-display text-pink-500 uppercase tracking-tighter">Imperial Laws</h2>
          <Gavel className="absolute -bottom-6 -right-10 text-blue-200" size={48} />
        </div>
        <p className="text-pink-400 font-rounded text-lg mt-8">The sacred protocols of the OMG It's So Sick Babygirl Kingdom. ✨</p>
      </div>

      <div className="glass-card rounded-[4rem] p-8 md:p-16 border-4 border-dashed border-pink-200 shadow-2xl space-y-12">
        <section>
          <h3 className="flex items-center gap-3 text-3xl font-display text-pink-600 mb-4 uppercase">
            <ScrollText className="text-pink-400" /> 1. The Right to Sparkle
          </h3>
          <p className="text-gray-600 leading-relaxed font-rounded">
            All sovereign citizens of the Kingdom are entitled to express themselves through maximum glitter, pastel aesthetics, and 2011-era nostalgic vibes. Any attempt to enforce "minimalism" or "boring neutrals" is a violation of Imperial Decree.
          </p>
        </section>

        <section>
          <h3 className="flex items-center gap-3 text-3xl font-display text-pink-600 mb-4 uppercase">
            <Star className="text-blue-400" /> 2. Content Monarchy
          </h3>
          <p className="text-gray-600 leading-relaxed font-rounded">
            When you upload to the Imperial Production House, you grant the Kingdom a non-exclusive, sparkly license to broadcast your slayage across the Big Media Mega Empire. You still own your content, but we get to celebrate it!
          </p>
        </section>

        <section>
          <h3 className="flex items-center gap-3 text-3xl font-display text-pink-600 mb-4 uppercase">
            <Heart className="text-red-400" /> 3. The Kindness Code
          </h3>
          <p className="text-gray-600 leading-relaxed font-rounded">
            The Kingdom is a sanctuary. Bullying, negativity, or "vibes-killing" behavior will result in an immediate banishment to the Beige Dimension. We practice radical support and immaculate compliments here.
          </p>
        </section>

        <section>
          <h3 className="flex items-center gap-3 text-3xl font-display text-pink-600 mb-4 uppercase">
            <CheckCircle className="text-green-400" /> 4. Slay Authentication
          </h3>
          <p className="text-gray-600 leading-relaxed font-rounded">
            Citizens must ensure all uploads are authentic to their soul. Impersonating another babygirl or stealing someone else's aesthetic without credit is strictly prohibited by the Imperial High Council.
          </p>
        </section>

        <div className="bg-pink-50 p-10 rounded-[3rem] border-2 border-pink-100 text-center">
          <Sparkles size={40} className="text-pink-400 mx-auto mb-4" />
          <p className="text-pink-600 font-bold italic text-lg">
            "By browsing the Kingdom or Slaying the Throne, you agree to these laws xoxo."
          </p>
        </div>
      </div>

      <div className="mt-12 text-center text-pink-300 text-xs font-bold uppercase tracking-widest">
        Last Updated: Oct 24, 2011 (Imperial Era Time)
      </div>
    </div>
  );
};

export default TermsAndConditions;
