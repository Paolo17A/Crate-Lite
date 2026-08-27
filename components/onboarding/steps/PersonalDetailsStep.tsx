import BandMemberRepeater from "@/components/onboarding/BandMemberRepeater";
import {
  BIO_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/lib/performer-onboarding";
import { allGenres } from "@/lib/performers";
import { chipClass, fieldClass, labelClass, selectClass } from "@/components/onboarding/fieldStyles";
import type { PerformerOnboardingState } from "@/hooks/usePerformerOnboardingForm";
import { ONBOARDING_CATEGORIES } from "@/types/performer-onboarding";
import type { PerformerCategory } from "@/types/performer";

export default function PersonalDetailsStep({
  form,
}: {
  form: PerformerOnboardingState;
}) {
  return (
    <div className="grid animate-fade-up gap-5 sm:grid-cols-2">
      <div>
        <label className={labelClass} htmlFor="onboarding-first-name">
          First name
        </label>
        <input
          id="onboarding-first-name"
          className={fieldClass}
          placeholder="Juan"
          value={form.firstName}
          onChange={(e) => form.setFirstName(e.target.value)}
          autoComplete="given-name"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="onboarding-last-name">
          Last name
        </label>
        <input
          id="onboarding-last-name"
          className={fieldClass}
          placeholder="Dela Cruz"
          value={form.lastName}
          onChange={(e) => form.setLastName(e.target.value)}
          autoComplete="family-name"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="onboarding-email">
          Email
        </label>
        <input
          id="onboarding-email"
          type="email"
          className={fieldClass}
          placeholder="you@email.com"
          value={form.email}
          onChange={(e) => form.setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="onboarding-password">
          Password
        </label>
        <input
          id="onboarding-password"
          type="password"
          className={fieldClass}
          placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          value={form.password}
          onChange={(e) => form.setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="onboarding-stage-name">
          Stage name
        </label>
        <input
          id="onboarding-stage-name"
          className={fieldClass}
          placeholder="DJ Nova"
          value={form.stageName}
          onChange={(e) => form.setStageName(e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="onboarding-category">
          Category
        </label>
        <div className="relative">
          <select
            id="onboarding-category"
            className={selectClass}
            value={form.category}
            onChange={(e) =>
              form.setCategory(e.target.value as PerformerCategory)
            }
          >
            {ONBOARDING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-espresso/55"
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden
          >
            <path
              d="M1.2 1.5 6 6.3 10.8 1.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="sm:col-span-2">
        <span className={labelClass}>Genres (pick at least one)</span>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => form.toggle(form.genres, form.setGenres, genre)}
              className={chipClass(form.genres.includes(genre))}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="onboarding-bio">
          Bio (min {BIO_MIN_LENGTH} characters)
        </label>
        <textarea
          id="onboarding-bio"
          rows={4}
          className={`${fieldClass} h-28 resize-none overflow-y-auto`}
          placeholder="Tell clients what you play, where you've performed, and what makes your sets land..."
          value={form.bio}
          onChange={(e) => form.setBio(e.target.value)}
        />
        <p className="mt-1 text-right text-[11px] text-espresso/55">
          {form.bio.trim().length}/{BIO_MIN_LENGTH}
        </p>
      </div>
      {form.category === "Band" ? (
        <div className="sm:col-span-2 space-y-3">
          <p className="text-sm text-espresso/70">
            Add at least one band member to continue. Each member needs a name;
            instrument and role are optional.
          </p>
          <BandMemberRepeater members={form.members} onChange={form.setMembers} />
        </div>
      ) : null}
    </div>
  );
}
