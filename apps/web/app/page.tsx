import { DiscoveryForm } from "@/components/discovery-form";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
            GenAI-Powered Cultural Travel
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Discover Destinations Through the Lens of Culture
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            CultureCompass AI helps travelers uncover hidden gems, immerse in local heritage,
            find authentic experiences, and connect with the soul of every destination.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-xl font-semibold text-stone-900">
            Plan Your Cultural Journey
          </h2>
          <DiscoveryForm />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          {
            icon: "🏛️",
            title: "Heritage & Stories",
            desc: "Immersive storytelling that brings local history and traditions to life.",
          },
          {
            icon: "💎",
            title: "Hidden Gems",
            desc: "Discover off-the-beaten-path spots locals love, beyond tourist traps.",
          },
          {
            icon: "🎭",
            title: "Authentic Experiences",
            desc: "Connect with workshops, festivals, and rituals that define a place.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-stone-200 bg-white p-6 text-center"
          >
            <span className="text-3xl">{feature.icon}</span>
            <h3 className="mt-3 font-semibold text-stone-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
