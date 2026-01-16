import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            <h1 className="font-display text-hero-mobile md:text-hero text-forest text-balance">
              Gather Your Herd, Get Paid with Referd
            </h1>
            
            <p className="font-body text-subhero-mobile md:text-subhero text-forest/90 max-w-[600px] mx-auto lg:mx-0">
              The marketplace disrupting recruitment. Turn your network into opportunity and get rewarded for every successful referral.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Button variant="mustard" size="cta">
                Check My Market Value
              </Button>
              <Button variant="rose" size="cta">
                Start Referring
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main person placeholder */}
              <div className="relative bg-milk rounded-3xl p-8 shadow-card">
                <div className="aspect-[3/4] bg-gradient-to-br from-sage/50 to-milk rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-forest/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-forest/60"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-forest/40 font-body text-sm">Hero Image Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 md:-left-8 bg-mustard rounded-xl p-4 shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                    <span className="text-forest font-semibold">$</span>
                  </div>
                  <div>
                    <p className="text-forest font-semibold text-sm">Referral Bonus</p>
                    <p className="text-forest/70 text-xs">+$2,500</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 md:-right-8 bg-rose rounded-xl p-4 shadow-card animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-forest"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-forest font-semibold text-sm">Network Growth</p>
                    <p className="text-forest/70 text-xs">+12 connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
