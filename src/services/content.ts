import content from '../../scripts/training-center-contents.json';
import { excerpt, stripHtml } from '@/utils/content';
import type {
  CourseDomain,
  Course,
  JsonArray,
  HeroSlide,
  Program,
  PublicDescription,
  SectionContentItem,
  SectionContentKey,
  SectionContentSettings,
  SectionContentsMap,
  TrainingCenterContent
} from '@/types/general-type';

function normalizePublicDescription(description: PublicDescription): PublicDescription {
  return description;
}

function normalizeCourse(course: Course, defaultCurrency: string): Course {
  return {
    ...course,
    course_domains: (course.course_domains ?? []) as CourseDomain[],
    public_description: normalizePublicDescription(course.public_description),
    currency: defaultCurrency
  };
}

function normalizeProgram(program: Program, defaultCurrency: string): Program {
  return {
    ...program,
    course_domains: (program.course_domains ?? []) as CourseDomain[],
    public_description: normalizePublicDescription(program.public_description),
    currency: defaultCurrency
  };
}

function normalizeSectionItem(
  key: SectionContentKey,
  item: SectionContentItem
): SectionContentItem {
  const normalizedSettings =
    Array.isArray(item.settings) || item.settings == null
      ? (item.settings ?? []) as JsonArray
      : (item.settings as SectionContentSettings);

  return {
    ...item,
    key,
    settings: normalizedSettings
  };
}

function normalizeContent(raw: typeof content): TrainingCenterContent {
  const sectionContents = Object.entries(raw.section_contents ?? {}).reduce(
    (acc, [key, items]) => {
      const sectionKey = key as SectionContentKey;

      acc[sectionKey] = (items ?? []).map((item) =>
        normalizeSectionItem(sectionKey, item as SectionContentItem)
      );

      return acc;
    },
    {} as SectionContentsMap
  );

  return {
    organization: raw.organization,
    courses: (raw.courses ?? []).map((c) => normalizeCourse(c, raw.organization.settings.default_currency)),
    programs: (raw.programs ?? []).map( (p) => normalizeProgram(p, raw.organization.settings.default_currency)),
    section_contents: sectionContents
  };
}

export const trainingCenterContent = normalizeContent(content);

export function getOrganization(): TrainingCenterContent['organization'] {
  return trainingCenterContent.organization;
}

export function getCourses(): Course[] {
  return trainingCenterContent.courses ?? [];
}

export function getPrograms(): Program[] {
  return trainingCenterContent.programs ?? [];
}

export function getCourseById(id: string): Course | undefined {
  return getCourses().find((course) => String(course.id) === id);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourses().find((course) => course.slug === slug);
}

export function getProgramById(id: string): Program | undefined {
  return getPrograms().find((program) => String(program.id) === id);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return getPrograms().find((program) => program.slug === slug);
}

export function getSectionContents(): SectionContentsMap {
  return trainingCenterContent.section_contents ?? ({} as SectionContentsMap);
}

export function getSectionContent(key: SectionContentKey): SectionContentItem[] {
  return getSectionContents()[key] ?? [];
}

export function getAboutContent(): SectionContentItem | undefined {
  return getSectionContent('ABOUT')[0];
}

export function getPrivacyContent(): SectionContentItem | undefined {
  return getSectionContent('PRIVACY')[0];
}

export function getTermsContent(): SectionContentItem | undefined {
  return getSectionContent('TERMS')[0];
}

export function getContactContent(): SectionContentItem | undefined {
  return getSectionContent('CONTACTS')[0];
}

export function getBriefMissionContent(): SectionContentItem | undefined {
  return getSectionContent('BREAF_MISSION')[0];
}

export function getImageContentItems(): SectionContentItem[] {
  return getSectionContent('IMAGES');
}

export function getContacts(): SectionContentItem[] {
  return getSectionContent('CONTACTS');
}

export function getHeroSlides(): HeroSlide[] {
  const images = getImageContentItems().filter((item) => Boolean(item.image_url));

  if (images.length === 0) {
    return [];
  }

  const mission = getBriefMissionContent()?.content ?? '';
  const organizationName = getOrganization().name;

  return images.map((item) => ({
    title: item.title ?? organizationName,
    description: item.content || mission,
    image: item.image_url as string
  }));
}

export function getRandomConverImage(): string|null {
  const images = getImageContentItems();

  if (images.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * images.length);

  return images[randomIndex]?.image_url ?? null;
}

export function getFeaturedCourses(limit = 3): Course[] {
  return getCourses().slice(0, limit);
}

export function getFeaturedPrograms(limit = 3): Program[] {
  return getPrograms().slice(0, limit);
}

export function getCourseExcerpt(course: Course) {
  return excerpt(course.public_description?.content ?? course.name);
}

export function getProgramExcerpt(program: Program) {
  return excerpt(program.public_description?.content ?? program.title);
}

export function getPlainTextDescription(html?: string | null) {
  return html ? stripHtml(html) : '';
}
