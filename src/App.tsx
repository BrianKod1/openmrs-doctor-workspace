import { Activity, Database, Settings2 } from "lucide-react";
import {
  DoctorPreferences,
  useDoctorPreferences,
} from "./components/DoctorPreferences";
import { PatientSearch } from "./components/PatientSearch";
import { PrescriptionPreview } from "./components/PrescriptionPreview";

function App() {
  const [preferences, setPreferences] = useDoctorPreferences();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
              <Activity size={21} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900">
                OpenMRS Doctor Workspace
              </h1>
              <p className="text-xs text-slate-500">
                React + TypeScript technical demonstration
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Demo project
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <section className="mb-7 rounded-2xl bg-slate-900 p-6 text-white">
          <p className="text-sm font-medium text-teal-300">Frontend case study</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
            A configurable clinical workspace connected to OpenMRS.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            This prototype demonstrates patient retrieval through the OpenMRS REST
            API, server-state management with React Query, strongly typed data,
            and per-clinician UI preferences.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2">
              <Database size={14} /> OpenMRS REST
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2">
              <Settings2 size={14} /> Dynamic preferences
            </span>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <DoctorPreferences value={preferences} onChange={setPreferences} />
          <PrescriptionPreview preferences={preferences} />
          <PatientSearch />
        </div>
      </div>
    </main>
  );
}

export default App;
