interface ISkills {
  name?: string;
  category?: string;
}

export interface IData {
  id: number;
  originalId: string;
  talentId: string;
  talentName: string;
  talentGrade: string;
  bookingGrade: string;
  operatingUnit: string;
  officeCity: string;
  officePostalCode: string;
  jobManagerName: string;
  jobManagerId: string;
  totalHours: number;
  startDate: string;
  endDate: string;
  clientName: string;
  clientId: string;
  industry: string;
  isUnassigned: boolean;
  requiredSkills?: ISkills[];
  optionalSkills?: ISkills[];
}
