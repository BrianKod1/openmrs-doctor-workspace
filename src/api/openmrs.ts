import type { OpenMRSListResponse, OpenMRSPatient } from "../types/openmrs";

async function openmrsFetch<T>(path: string): Promise<T> {
  const response = await fetch(`/openmrs-api${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `OpenMRS request failed (${response.status}): ${message || response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function searchPatients(query: string): Promise<OpenMRSPatient[]> {
  const params = new URLSearchParams({
    q: query,
    v: "custom:(uuid,display,person:(uuid,display,gender,age,birthdate,preferredName))",
    limit: "20",
  });

  const data = await openmrsFetch<OpenMRSListResponse<OpenMRSPatient>>(
    `/patient?${params.toString()}`,
  );

  return data.results;
}
