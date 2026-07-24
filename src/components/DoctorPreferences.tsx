import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export interface DoctorPreferencesValue {
  showDosage: boolean;
  showFrequency: boolean;
  showDuration: boolean;
  printLayout: "compact" | "detailed";
  signatureLabel: string;
}

const DEFAULTS: DoctorPreferencesValue = {
  showDosage: true,
  showFrequency: true,
  showDuration: true,
  printLayout: "detailed",
  signatureLabel: "Prescribing clinician",
};

interface Props {
  value: DoctorPreferencesValue;
  onChange: (value: DoctorPreferencesValue) => void;
}

export function useDoctorPreferences() {
  const [preferences, setPreferences] = useState<DoctorPreferencesValue>(() => {
    const stored = localStorage.getItem("openmrs-doctor-preferences");
    if (!stored) return DEFAULTS;

    try {
      return { ...DEFAULTS, ...JSON.parse(stored) };
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "openmrs-doctor-preferences",
      JSON.stringify(preferences),
    );
  }, [preferences]);

  return [preferences, setPreferences] as const;
}

export function DoctorPreferences({ value, onChange }: Props) {
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof DoctorPreferencesValue>(
    key: K,
    nextValue: DoctorPreferencesValue[K],
  ) => {
    setSaved(false);
    onChange({ ...value, [key]: nextValue });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Personalization
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Doctor preferences
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Configure which prescription fields and print layout this clinician uses.
        </p>
      </div>

      <div className="space-y-4">
        {[
          ["showDosage", "Dosage field"],
          ["showFrequency", "Frequency field"],
          ["showDuration", "Duration field"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
          >
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
              type="checkbox"
              className="h-4 w-4 accent-teal-700"
              checked={value[key as keyof DoctorPreferencesValue] as boolean}
              onChange={(event) =>
                update(
                  key as "showDosage" | "showFrequency" | "showDuration",
                  event.target.checked,
                )
              }
            />
          </label>
        ))}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Print layout
          </span>
          <select
            value={value.printLayout}
            onChange={(event) =>
              update("printLayout", event.target.value as "compact" | "detailed")
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            <option value="compact">Compact</option>
            <option value="detailed">Detailed</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Signature label
          </span>
          <input
            value={value.signatureLabel}
            onChange={(event) => update("signatureLabel", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </label>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <Save size={16} />
          {saved ? "Preferences saved" : "Save preferences"}
        </button>
      </div>
    </section>
  );
}
