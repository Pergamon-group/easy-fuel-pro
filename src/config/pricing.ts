export interface PricingComponent {
  id: string;
  name: string;
  desc: string;
  price?: number;
  priceFormatted: string;
  tag: string;
  isSurvey?: boolean;
}

export interface OptionComponentItem {
  name: string;
  desc?: string;
  priceFormatted: string;
  highlight?: boolean;
  isSurvey?: boolean;
  isExcluded?: boolean;
  excludedNote?: string;
}

export interface PricingOption {
  id: string;
  title: string;
  badge: string;
  recommendedBadge?: string;
  description: string;
  totalYear1: number;
  totalFormatted: string;
  totalAmountOnly: string;
  period: string;
  ctaText: string;
  ctaHref: string;
  amcNote: string;
  components: readonly OptionComponentItem[];
}

export const pricingConfig: {
  currency: string;
  amcPerYear: number;
  amcFormatted: string;
  amcFormattedWithPeriod: string;
  amcFullNote: string;
  components: Record<string, PricingComponent>;
  options: {
    semiAutomated: PricingOption;
    fullAutomation: PricingOption;
  };
  disclaimers: {
    title: string;
    quotationNote: string;
    civilsScope: string;
  };
} = {
  currency: 'KES',
  amcPerYear: 10000,
  amcFormatted: 'KES 10,000',
  amcFormattedWithPeriod: 'AMC KES 10,000/yr (From Year 2)',
  amcFullNote: 'Annual Maintenance Contract (AMC) payable from Year 2: KES 10,000.00',

  components: {
    incotexEsd: {
      id: 'incotex-esd',
      name: 'EasyFuel Pro Fiscal Device',
      desc: 'EasyFuel eTIMS Electronic Signature Device',
      price: 70000,
      priceFormatted: 'KES 70,000.00',
      tag: 'KRA Mandated',
    },
    systemIntegration: {
      id: 'system-integration',
      name: 'System Integration (One-off)',
      desc: 'Forecourt network configuration & attendant training',
      price: 30000,
      priceFormatted: 'KES 30,000.00',
      tag: 'One-off',
    },
    thermalPrinter: {
      id: 'thermal-printer',
      name: 'Thermal Receipt Printer',
      desc: 'High-speed till receipt printer with QR output',
      price: 9500,
      priceFormatted: 'KES 9,500.00',
      tag: 'Pump-Side',
    },
    ptsController: {
      id: 'pts-controller',
      name: 'Forecourt Controller',
      desc: 'Multi-pump & ATG automated protocol bridge',
      price: 160000,
      priceFormatted: 'KES 160,000.00',
      tag: 'Full Automation Only',
    },
    civilsWorks: {
      id: 'civils-works',
      name: 'Civils Works & Cabling',
      desc: 'Trenching, explosion-proof conduit & site ducting',
      priceFormatted: 'Based on Site Survey*',
      isSurvey: true,
      tag: 'Site Specific',
    },
  },

  options: {
    semiAutomated: {
      id: 'option-1',
      title: 'Option 1: Semi-Automated',
      badge: 'Entry-Level Compliance',
      description:
        'Compliant fiscal invoicing via POS and our EasyFuel Pro Fiscal Device without automatic dispenser flow locking.',
      totalYear1: 109500,
      totalFormatted: 'KES 109,500',
      totalAmountOnly: '109,500',
      period: 'Year 1 (Excl. Civils)*',
      ctaText: 'Request Semi-Automated Quote',
      ctaHref: '#demo-section',
      amcNote: 'Annual Maintenance Contract (AMC) payable from Year 2: KES 10,000.00',
      components: [
        {
          name: 'EasyFuel Pro Fiscal Device',
          desc: 'KRA fiscal signature device',
          priceFormatted: 'KES 70,000.00',
        },
        {
          name: 'System Integration (One-off)',
          desc: 'Network configuration & attendant training',
          priceFormatted: 'KES 30,000.00',
        },
        {
          name: 'Thermal Receipt Printer',
          desc: 'High-speed till printer with QR output',
          priceFormatted: 'KES 9,500.00',
        },
        {
          name: 'Forecourt Controller',
          desc: 'Manual entry via POS',
          priceFormatted: 'Not Required',
          isExcluded: true,
          excludedNote: 'Manual entry via POS',
        },
        {
          name: 'Civils Works & Cabling',
          desc: 'Trenching, conduits & containment',
          priceFormatted: 'Based on Site Survey*',
          isSurvey: true,
          highlight: true,
        },
      ],
    },

    fullAutomation: {
      id: 'option-2',
      title: 'Option 2: Full Automation',
      badge: 'Complete Forecourt Automation',
      recommendedBadge: '★ Recommended Forecourt Setup',
      description:
        'Direct pump protocol interlocking via our Forecourt controller, live nozzle flow capture, and ATG tank telemetry.',
      totalYear1: 269500,
      totalFormatted: 'KES 269,500',
      totalAmountOnly: '269,500',
      period: 'Year 1 (Excl. Civils)*',
      ctaText: 'Book Full Automation Site Survey',
      ctaHref: '#demo-section',
      amcNote: 'Annual Maintenance Contract (AMC) payable from Year 2: KES 10,000.00',
      components: [
        {
          name: 'EasyFuel Pro Fiscal Device',
          desc: 'KRA fiscal signature device',
          priceFormatted: 'KES 70,000.00',
        },
        {
          name: 'Forecourt Controller (50 Pumps/50 Tanks)',
          desc: 'Industrial protocol gateway',
          priceFormatted: 'KES 160,000.00',
          highlight: true,
        },
        {
          name: 'System Integration (One-off)',
          desc: 'Network configuration & attendant training',
          priceFormatted: 'KES 30,000.00',
        },
        {
          name: 'Thermal Receipt Printer',
          desc: 'High-speed till printer with QR output',
          priceFormatted: 'KES 9,500.00',
        },
        {
          name: 'Civils Works & Cabling',
          desc: 'Trenching, conduits & containment',
          priceFormatted: 'Based on Site Survey*',
          isSurvey: true,
          highlight: true,
        },
      ],
    },
  },

  disclaimers: {
    title: 'Commercial Terms & Tentative Pricing Disclaimers',
    quotationNote:
      'All prices are tentative and indicative. Formal binding quotations are issued following physical site survey and may vary with prevailing foreign exchange rates and specific dispenser electronic interface heads.',
    civilsScope:
      'Civil works (trenching, cabling, conduit, explosion-proof junction boxes) are based on site survey and station layout distance from the controller to the forecourt pump islands.',
  },
};

export function formatPrice(amount: number): string {
  return `${pricingConfig.currency} ${amount.toLocaleString('en-KE')}`;
}
