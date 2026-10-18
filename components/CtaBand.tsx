import { CONTACT } from "@/lib/site";
import Btn from "./Btn";

export default function CtaBand() {
  return (
    <section className="mb-[104px]">
      <div className="wrap">
        <div className="cta-box reveal">
          <h2 className="mb-3.5 text-[clamp(2rem,4vw,3.2rem)]">Ready to scale your app profitably?</h2>
          <p className="mx-auto mb-8 max-w-[56ch] text-[1.1rem] text-white/85">
            Tell us your targets and we will come back with a channel plan, creative recommendations and a tailored rate card.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Btn href="/contact" variant="white" arrow>
              Book a call
            </Btn>
            <Btn href={`mailto:${CONTACT.email}`} variant="outline-white">
              {CONTACT.email}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
