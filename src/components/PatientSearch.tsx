import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, UserRound } from "lucide-react";
import { searchPatients } from "../api/openmrs";

export function PatientSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const patientsQuery = useQuery({
    queryKey: ["patients", query],
    queryFn: () => searchPatients(query),
    enabled: query.trim().length >= 2,
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          OpenMRS REST API
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Patient search
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Search anonymized patients from the configured OpenMRS instance.
        </p>
      </div>

      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(input.trim());
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Try a patient name"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />
        <button
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          type="submit"
        >
          <Search size={17} />
          Search
        </button>
      </form>

      <div className="mt-5">
        {!query && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            Enter at least two characters to query the OpenMRS patient endpoint.
          </p>
        )}

        {patientsQuery.isPending && query && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            Loading patients…
          </p>
        )}

        {patientsQuery.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold">The API request failed.</p>
            <p className="mt-1 break-words">{patientsQuery.error.message}</p>
          </div>
        )}

        {patientsQuery.data?.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            No matching patients found.
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {patientsQuery.data?.map((patient) => (
            <article
              key={patient.uuid}
              className="flex gap-3 rounded-xl border border-slate-200 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <UserRound size={19} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                  {patient.person?.display || patient.display}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {patient.person?.gender || "Gender unavailable"}
                  {typeof patient.person?.age === "number"
                    ? ` · ${patient.person.age} years`
                    : ""}
                </p>
                <p className="mt-2 truncate font-mono text-[11px] text-slate-400">
                  {patient.uuid}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
