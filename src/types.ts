export interface CapabilityItem {
  title: string;
  items: string[];
  description: string;
  iconName: string;
  gradient: string;
}

export interface MetricItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface MachineCapability {
  name: string;
  specs: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface ShowcaseImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface IndustryItem {
  name: string;
  imageUrl: string;
  description: string;
  features: string[];
}

export interface ProductItem {
  title: string;
  tagline: string;
  imageUrl: string;
  features: string[];
  applications: string[];
  industries: string[];
  datasheetUrl?: string;
}

export interface WhyReason {
  id: string;
  title: string;
  description: string;
}

export interface ClientLogo {
  name: string;
  category: 'OEM' | 'Manufacturing' | 'Railway' | 'Industrial' | 'Automation' | 'Defense';
  logoText: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  specs: string[];
}
