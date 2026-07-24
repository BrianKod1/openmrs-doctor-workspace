import type { DoctorPreferencesValue } from "./DoctorPreferences";

interface Props {
  preferences: DoctorPreferencesValue;
}

export function PrescriptionPreview({ preferences }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Dynamic rendering
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Prescription preview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Fields update immediately from the clinician's saved settings.
        </p>
      </div>

      <div
        className={`rounded-xl border border-dashed border-slate-300 bg-slate-50 ${
          preferences.printLayout === "compact" ? "p-4" : "p-6"
        }`}
      >
        <div className="border-b border-slate-200 pb-3">
          <p className="text-sm font-semibold text-slate-900">Amoxicillin</p>
          <p className="text-xs text-slate-500">Example medication only</p>
        </div>

        <dl className="mt-4 grid gap-3 text-sm">
          {preferences.showDosage && (
            <div className="flex justify-between">
              <dt className="text-slate-500">Dosage</dt>
              <dd className="font-medium text-slate-800">500 mg</dd>
            </div>
          )}
          {preferences.showFrequency && (
            <div className="flex justify-between">
              <dt className="text-slate-500">Frequency</dt>
              <dd className="font-medium text-slate-800">Every 8 hours</dd>
            </div>
          )}
          {preferences.showDuration && (
            <div className="flex justify-between">
              <dt className="text-slate-500">Duration</dt>
              <dd className="font-medium text-slate-800">5 days</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500">{preferences.signatureLabel}</p>
          <p className="mt-1 font-medium text-slate-800">Dr. A. Example</p>
        </div>
      </div>
    </section>
  );
}
