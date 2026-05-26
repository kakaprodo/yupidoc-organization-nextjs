export type Locale = 'en' | 'fr';

export type ContentStatus = string;

export type ContentEditorType = 'rich_text' | 'markdown' | string;

export type EDITOR_TYPE = ContentEditorType;

export type EntityAboutContactType =
    | 'PHONE'
    | 'EMAIL'
    | 'INSTAGRAM'
    | 'LINKEDIN'
    | 'FACEBOOK'
    | 'X'
    | 'WHATSAPP';

export type SectionContentKey =
  | 'ABOUT'
  | 'BREAF_MISSION'
  | 'PRIVACY'
  | 'TERMS'
  | 'CONTACTS'
  | 'IMAGES';

export interface OrganizationSettings {
  domain?: string | null;
  storage?: number | null;
  default_currency?: string | null;
  default_currency_id?: number | null;
}

export interface Organization {
  id: number;
  name: string;
  owner_id: number | null;
  slug: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  color?: string | null;
  logo_url?: string | null;
  is_default?: string | number | null;
  email?: string | null;
  settings?: OrganizationSettings | null;
  purpose?: string | null;
  refund_payment_period?: number | null;
}

export interface CourseDomain {
  id: number;
  name: string;
}

export type JsonPrimitive = string | number | boolean | null;

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type RichTextMetadata = JsonObject | JsonArray;

export interface PublicDescription {
  id: number;
  uuid: string;
  content: string;
  learning_outcomes: string | null;
  requirement: string | null;
  descriptionable_id: number;
  descriptionable_type: string;
  metadata: RichTextMetadata;
  video_url: string | null;
  editor_type: ContentEditorType;
}

export interface Course {
  id: number;
  name: string;
  slug: string;
  code: string;
  level: string;
  duration: string;
  status: ContentStatus;
  price: string;
  is_course: boolean;
  course_domain_names: string[];
  image: string;
  created_at: string;
  students_count: number;
  programs_count: number;
  public_description: PublicDescription;
  payment_url: string;
  course_domains: CourseDomain[];
  currency?: string;
}

export interface Program {
  id: number;
  slug: string;
  code: string;
  organization_id: number;
  title: string;
  status: ContentStatus;
  description: string | null;
  duration: number;
  created_at: string;
  updated_at: string;
  price: number;
  course_domain_names: string[];
  image: string;
  students_count: number;
  courses_count: number;
  payment_url: string;
  public_description: PublicDescription;
  course_domains: CourseDomain[];
  currency?: string;
}

export interface SectionContentSettings {
  media_id?: number | null;
  media_url?: string | null;
}

export enum EditorContentType {
    CARD_CONTENT = 'card-content',
    STEP_CONTENT = 'card-content',
    TRAINIGNG_DASHBOARD = 'training-dashboard', // for public_presentation for example
}

export interface SectionContentItem {
  id: number;
  aboutable_id: number;
  aboutable_type: string;
  organization_id: number;
  key: SectionContentKey;
  content: string;
  type: EntityAboutContactType | null;
  editor_type: ContentEditorType;
  settings: SectionContentSettings | JsonArray;
  image_url: string | null;
}

export type SectionContentsMap = Record<SectionContentKey, SectionContentItem[]>;

export interface TrainingCenterContent {
  organization: Organization;
  courses: Course[];
  programs: Program[];
  section_contents: SectionContentsMap;
}

export interface HeroSlide {
  title: string;
  description: string;
  image: string;
}

export type User = {
    id: number;
    name: string;
    email?: string;
    theme: string;
    avatar: string;
}
