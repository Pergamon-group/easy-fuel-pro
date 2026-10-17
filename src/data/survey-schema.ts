// ── Site Survey Data Schema ─────────────────────────────────────────────────
// Single source of truth for form data types, defaults, and validation.

// ── Step 1: Business & Contact ──────────────────────────────────────────────

export interface BusinessInfo {
  customerName: string;
  siteName: string;
  physicalLocation: string;
  county: string;
  kraPin: string;
  contactPersonName: string;
  contactPhone: string;
  contactEmail: string;
}

// ── Step 2: Survey Scheduling ───────────────────────────────────────────────

export interface SurveyScheduling {
  /** ISO date strings for preferred survey dates (up to 3) */
  preferredDates: string[];
  /** Optional note about scheduling preferences */
  schedulingNotes: string;
  /** Operating hours to find us on site */
  operatingHours: 'full_24h' | '6am_10pm' | '6am_6pm' | 'custom' | '';
  customOperatingHours: string;
}

// ── Step 3: Station Setup & Infrastructure ──────────────────────────────────

export type AutomationStatus = 'yes' | 'no' | '';
export type OperationMode = 'fully_automated' | 'semi_automated' | 'manual' | '';
export type MeterType = 'mechanical' | 'electronic' | '';
export type YesNo = 'yes' | 'no' | '';

export interface PumpEntry {
  id: string;
  makeModel: string;
  dispenserSerial: string;
  nozzleCount: number;
  meterType: MeterType;
  pulseOutputAvailable: YesNo;
  /** Fuel types per nozzle, e.g. ['pms', 'ago'] */
  fuelTypes: string[];
  /** Detailed specification when 'other' is selected in fuelTypes */
  otherFuelType?: string;
}

export interface InfrastructureInfo {
  isSiteAutomated: AutomationStatus;
  operationMode: OperationMode;
  automationVendor: string;
  totalPumpCount: number;
  pumps: PumpEntry[];
  infrastructureNotes?: string;
}

// ── Step 4: Compliance & Connectivity ───────────────────────────────────────

export type EtimsSolutionType = 'vscu' | 'oscu' | 'both' | 'undecided' | '';
export type EtimsIntegrationMethod = 'api' | 'middleware_pos' | '' ;
export type ConnectionType = 'fiber' | '4g_5g' | 'dsl' | '';

export interface ComplianceConnectivity {
  etimsSolutionType: EtimsSolutionType;
  etimsIntegrationMethod: EtimsIntegrationMethod;
  posSystem: string;
  generatesCompliantReceipts: YesNo;
  receiptHasMandatoryFields: YesNo;
  /** Explicit Question 1: Current live forecourt status */
  realTimeSalesCurrentlyTransmitting: YesNo;
  /** Explicit Question 2: Project target requirement */
  requireRealtimeTransmissionGoal: YesNo;
  complianceNotes?: string;

  internetAvailable: YesNo;
  connectionType: ConnectionType;
  networkRedundancy: YesNo;
  lanInPlace: YesNo;
  networkNotes?: string;

  posTerminalsInstalled: YesNo;
  automationControllerInstalled: YesNo;
  controlUnitSecured: YesNo;
  upsPowerBackup: YesNo;
}

// ── Step 5: Site Readiness, Notes & Review ──────────────────────────────────

export interface SiteReadiness {
  trenchingCompleted: YesNo;
  conduitsInstalled: YesNo;
  pumpIslandsGrounded: YesNo;
  siteNotes: string;
  /** ImageKit file IDs for uploaded site images */
  uploadedImageIds: string[];
  consentGiven: boolean;
}

// ── Full Survey Form Data ───────────────────────────────────────────────────

export interface SiteSurveyData {
  businessInfo: BusinessInfo;
  scheduling: SurveyScheduling;
  infrastructure: InfrastructureInfo;
  compliance: ComplianceConnectivity;
  readiness: SiteReadiness;
}

// ── Offline PDF Submission Model ───────────────────────────────────────────

export interface OfflinePdfSubmission {
  customerName: string;
  siteName: string;
  contactPersonName: string;
  contactPhone: string;
  contactEmail: string;
  county: string;
  preferredDates: string[];
  notes: string;
}

// ── Reference Code Generator ────────────────────────────────────────────────

export function generateSurveyReference(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `EFP-SRV-${year}-${randomPart}`;
}

// ── Defaults ────────────────────────────────────────────────────────────────

export function createDefaultSurveyData(): SiteSurveyData {
  return {
    businessInfo: {
      customerName: '',
      siteName: '',
      physicalLocation: '',
      county: '',
      kraPin: '',
      contactPersonName: '',
      contactPhone: '',
      contactEmail: '',
    },
    scheduling: {
      preferredDates: [],
      schedulingNotes: '',
      operatingHours: '',
      customOperatingHours: '',
    },
    infrastructure: {
      isSiteAutomated: '',
      operationMode: '',
      automationVendor: '',
      totalPumpCount: 0,
      pumps: [],
      infrastructureNotes: '',
    },
    compliance: {
      etimsSolutionType: '',
      etimsIntegrationMethod: '',
      posSystem: '',
      generatesCompliantReceipts: '',
      receiptHasMandatoryFields: '',
      realTimeSalesCurrentlyTransmitting: '',
      requireRealtimeTransmissionGoal: '',
      complianceNotes: '',
      internetAvailable: '',
      connectionType: '',
      networkRedundancy: '',
      lanInPlace: '',
      networkNotes: '',
      posTerminalsInstalled: '',
      automationControllerInstalled: '',
      controlUnitSecured: '',
      upsPowerBackup: '',
    },
    readiness: {
      trenchingCompleted: '',
      conduitsInstalled: '',
      pumpIslandsGrounded: '',
      siteNotes: '',
      uploadedImageIds: [],
      consentGiven: false,
    },
  };
}

// ── Validation ──────────────────────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * KRA PIN format: A followed by digits and a letter, e.g. A001234567B
 * or P followed by digits, e.g. P051234567A
 */
const KRA_PIN_REGEX = /^[AP]\d{9}[A-Z]$/;

export function validateBusinessInfo(data: BusinessInfo): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.customerName.trim()) errors.push({ field: 'customerName', message: 'Customer name is required' });
  if (!data.siteName.trim()) errors.push({ field: 'siteName', message: 'Site / station name is required' });
  if (!data.physicalLocation.trim()) errors.push({ field: 'physicalLocation', message: 'Physical location is required' });
  if (!data.county.trim()) errors.push({ field: 'county', message: 'County is required' });
  if (!data.kraPin.trim()) {
    errors.push({ field: 'kraPin', message: 'KRA PIN is required' });
  } else if (!KRA_PIN_REGEX.test(data.kraPin.trim().toUpperCase())) {
    errors.push({ field: 'kraPin', message: 'KRA PIN format is invalid. Expected format: A001234567B or P051234567A' });
  }
  if (!data.contactPersonName.trim()) errors.push({ field: 'contactPersonName', message: 'Contact person name is required' });
  if (!data.contactPhone.trim()) errors.push({ field: 'contactPhone', message: 'Phone number is required' });
  if (!data.contactEmail.trim()) {
    errors.push({ field: 'contactEmail', message: 'Email address is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail.trim())) {
    errors.push({ field: 'contactEmail', message: 'Please enter a valid email address' });
  }
  return errors;
}

export function validateScheduling(data: SurveyScheduling): ValidationError[] {
  const errors: ValidationError[] = [];
  if (data.preferredDates.length === 0) {
    errors.push({ field: 'preferredDates', message: 'Please select at least one preferred survey date' });
  }
  if (!data.operatingHours) {
    errors.push({ field: 'operatingHours', message: 'Please specify your operating hours' });
  }
  if (data.operatingHours === 'custom' && !data.customOperatingHours.trim()) {
    errors.push({ field: 'customOperatingHours', message: 'Please specify your custom operating hours' });
  }
  return errors;
}

export function validateInfrastructure(data: InfrastructureInfo): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.isSiteAutomated) errors.push({ field: 'isSiteAutomated', message: 'Please indicate whether the site is automated' });
  if (!data.operationMode) errors.push({ field: 'operationMode', message: 'Please select a mode of operation' });
  if (data.totalPumpCount < 1) errors.push({ field: 'totalPumpCount', message: 'Please enter at least 1 pump' });

  const filledPumps = data.pumps.filter(p => p.makeModel.trim() || p.nozzleCount > 0);
  if (data.totalPumpCount > 0 && filledPumps.length < data.totalPumpCount) {
    errors.push({ field: 'pumps', message: `Please fill in details for all ${data.totalPumpCount} pumps (${filledPumps.length}/${data.totalPumpCount} completed)` });
  }

  for (let i = 0; i < data.pumps.length; i++) {
    const pump = data.pumps[i];
    if (!pump.makeModel.trim()) errors.push({ field: `pump_${i}_makeModel`, message: `Pump ${i + 1}: Make/Model is required` });
    if (pump.nozzleCount < 1) errors.push({ field: `pump_${i}_nozzleCount`, message: `Pump ${i + 1}: Nozzle count must be at least 1` });
    if (!pump.meterType) errors.push({ field: `pump_${i}_meterType`, message: `Pump ${i + 1}: Meter type is required` });
  }

  return errors;
}

export function validateCompliance(data: ComplianceConnectivity): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.etimsSolutionType) errors.push({ field: 'etimsSolutionType', message: 'Please select your eTIMS solution type' });
  if (!data.internetAvailable) errors.push({ field: 'internetAvailable', message: 'Please indicate internet availability' });
  if (data.internetAvailable === 'yes' && !data.connectionType) {
    errors.push({ field: 'connectionType', message: 'Please select your connection type' });
  }
  return errors;
}

export function validateReadiness(data: SiteReadiness): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.consentGiven) {
    errors.push({ field: 'consentGiven', message: 'Please confirm that the information provided is accurate' });
  }
  return errors;
}

export function validateOfflinePdfSubmission(data: OfflinePdfSubmission): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.customerName.trim()) errors.push({ field: 'customerName', message: 'Customer name is required' });
  if (!data.siteName.trim()) errors.push({ field: 'siteName', message: 'Site / station name is required' });
  if (!data.contactPersonName.trim()) errors.push({ field: 'contactPersonName', message: 'Contact person name is required' });
  if (!data.contactPhone.trim()) errors.push({ field: 'contactPhone', message: 'Phone number is required' });
  if (!data.contactEmail.trim()) {
    errors.push({ field: 'contactEmail', message: 'Email address is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail.trim())) {
    errors.push({ field: 'contactEmail', message: 'Please enter a valid email address' });
  }
  if (!data.county.trim()) errors.push({ field: 'county', message: 'County is required' });
  return errors;
}

// ── Step metadata ───────────────────────────────────────────────────────────

export const SURVEY_STEPS = [
  { id: 'business', title: 'Business & Contact', icon: 'business', description: 'Your business details and contact information' },
  { id: 'scheduling', title: 'Survey Scheduling', icon: 'calendar_month', description: 'When would you like us to visit?' },
  { id: 'infrastructure', title: 'Station Setup', icon: 'local_gas_station', description: 'Pumps, dispensers, and automation' },
  { id: 'compliance', title: 'Compliance & Network', icon: 'verified_user', description: 'eTIMS, connectivity, and hardware' },
  { id: 'readiness', title: 'Review & Submit', icon: 'task_alt', description: 'Final review and submission' },
] as const;

export type StepId = (typeof SURVEY_STEPS)[number]['id'];

// ── Common fuel types ───────────────────────────────────────────────────────

export const FUEL_TYPES = [
  { value: 'pms', label: 'PMS (Super Petrol)' },
  { value: 'ago', label: 'AGO (Diesel)' },
  { value: 'ik', label: 'IK (Illuminating Kerosene)' },
  { value: 'lpg', label: 'LPG' },
  { value: 'other', label: 'Other' },
] as const;

// ── Kenya counties ──────────────────────────────────────────────────────────

export const KENYA_COUNTIES = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet',
  'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado',
  'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga',
  'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia',
  'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit',
  'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi',
  'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
  'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
  'Tharaka-Nithi', 'Trans-Nzoia', 'Turkana', 'Uasin Gishu',
  'Vihiga', 'Wajir', 'West Pokot',
] as const;
