import { pricingConfig } from '@/config/pricing';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const FORECOURT_FAQS: readonly FaqItem[] = [
  {
    question: 'How does EasyFuel Pro achieve KRA eTIMS compliance?',
    category: 'Compliance & eTIMS',
    answer:
      'EasyFuel Pro connects directly to the KRA-certified EasyFuel Pro Fiscal ESD Device (Electronic Signature Device) and PTS-2 controller. Each fuel sale transaction is automatically cryptographically signed and issued with a validated KRA QR code on thermal receipts, satisfying tax authority obligations without cashier friction.',
  },
  {
    question: 'What is the difference between Semi-Automated and Full Automation?',
    category: 'Commercial & Hardware',
    answer: `Option 1 (Semi-Automated, starting at an indicative ${pricingConfig.options.semiAutomated.totalFormatted}*) equips your station with the appropriate EasyFuel Pro Fiscal Device and thermal printer, allowing attendants to generate compliant receipts directly from the POS till. Option 2 (Full Automation, starting at an indicative ${pricingConfig.options.fullAutomation.totalFormatted}*) introduces the PTS-2 Forecourt Controller, physically interlocking up to 50 dispensers and 50 ATG probes for live telemetry, automated nozzle flow cutoff, and 0% variance shift audits.`,
  },
  {
    question: 'Which dispenser and ATG probe brands are supported?',
    category: 'Compatibility',
    answer:
      'We natively support more than 150 dispenser brands (including Gilbarco Veeder-Root, Wayne Dresser, Tokheim, Tatsuno, Bennett, Prowalco, Compac, and Censtar) across Petroleum, LPG, and CNG fuels. The system also bridges over 60 Automatic Tank Gauge (ATG) probes including Veeder-Root, Franklin Fueling, OPW, Fafnir, and Enraf.',
  },
  {
    question: 'Why are civil works pricing based on a site survey?',
    category: 'Deployment',
    answer:
      'Every fuel station is built differently. Station layouts differ in trenching distance, existing cabling conduits, island counts, and explosion-proof containment requirements. Pergamon forecourt engineers conduct a physical on-site survey to map electrical cable lengths and hazardous zone ducting before calculating exact civil works, ensuring you receive an accurate, transparent quote.',
  },
  {
    question: 'What happens if the fuel station loses internet connection?',
    category: 'Reliability',
    answer:
      'Your station will continue pumping without interruption. The PTS-2 Forecourt Controller buffers over 50,000 transactions locally in hardened offline edge storage. Fuel dispensing continues without disruption, and all stored sales and tank dip logs automatically transmit to cloud and KRA servers once connectivity is restored.',
  },
  {
    question: 'What does the Annual Maintenance Contract (AMC) cover?',
    category: 'Support & Warranty',
    answer: `Payable from Year 2 at ${pricingConfig.amcFormatted} per station annually, the AMC covers continuous firmware updates, statutory KRA regulatory protocol updates, priority on-call technical dispatch, remote health telemetry, and routine controller inspections to keep your station running smoothly.`,
  },
];
