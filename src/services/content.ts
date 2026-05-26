import content from '../../scripts/training-center-contents.json';
import { excerpt, stripHtml } from '@/utils/content';
import type {
  CourseDomain,
  Course,
  JsonArray,
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

function normalizeCourse(course: Course): Course {
  return {
    ...course,
    course_domains: (course.course_domains ?? []) as CourseDomain[],
    public_description: normalizePublicDescription(course.public_description)
  };
}

function normalizeProgram(program: Program): Program {
  return {
    ...program,
    course_domains: (program.course_domains ?? []) as CourseDomain[],
    public_description: normalizePublicDescription(program.public_description)
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
    courses: (raw.courses ?? []).map(normalizeCourse),
    programs: (raw.programs ?? []).map(normalizeProgram),
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

export function getProgramById(id: string): Program | undefined {
  return getPrograms().find((program) => String(program.id) === id);
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
