export interface OpenMRSName {
  display?: string;
  givenName?: string;
  middleName?: string;
  familyName?: string;
}

export interface OpenMRSPerson {
  uuid: string;
  display: string;
  gender?: string;
  age?: number;
  birthdate?: string;
  preferredName?: OpenMRSName;
}

export interface OpenMRSPatient {
  uuid: string;
  display: string;
  person: OpenMRSPerson;
}

export interface OpenMRSListResponse<T> {
  results: T[];
}
