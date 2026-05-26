import { PublicDescription } from "@/types/general-type";
import { isEmpty } from "@/utils/shared-helpers";
import React, { useMemo } from "react";
import { AppEditor } from "./editor/AppEditor";

type PublicDescriptionViewerProps = {
    publicDescription: PublicDescription;
    className?: string;
    displayInGrid?: boolean
};

const titleCase = (value: string) => {
    return value
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ");
};

const SectionCard = ({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) => (
    <section className="   ">
        <div className="mb-4">
            <p className="text-xl font-semibold ">{title}</p>
            {subtitle && <p className="mt-2 text-sm text-base-content/60">{subtitle}</p>}
        </div>
        {children}
    </section>
);

const PublicDescriptionViewer = ({
    publicDescription,
    className = "",
    displayInGrid = false
}: PublicDescriptionViewerProps) => {

    const metadataEntries = useMemo(() => {
        return Object.entries(publicDescription.metadata ?? {}).filter(([, value]) => value !== null && value !== "");
    }, [publicDescription.metadata]);

    return (
        <section className={`mt-8 ${className} `}>

            <div className={`mt-3 grid gap-6 ${displayInGrid && 'lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)]'} `}>
                <div className="space-y-6">
                    {!isEmpty(publicDescription.content) && (
                        <SectionCard
                            title="Warm-up"
                        >
                            <AppEditor
                                content={publicDescription.content || ''}
                                editorType={publicDescription.editor_type}
                            />
                        </SectionCard>

                    )}

                    {!isEmpty(publicDescription.learning_outcomes) && (
                        <SectionCard
                            title="What you will learn"
                        >
                            <AppEditor
                                content={publicDescription.learning_outcomes || ''}
                                editorType={publicDescription.editor_type}
                            />
                        </SectionCard>
                    )}

                    {!isEmpty(publicDescription.requirement) && (
                        <SectionCard
                            title="Prerequisites"
                        >
                            <AppEditor
                                content={publicDescription.requirement || ''}
                                editorType={publicDescription.editor_type}
                            />
                        </SectionCard>
                    )}

                </div>

                <aside className="flex flex-col gap-5">
                    {metadataEntries.length > 0 && (
                        <SectionCard title="Quick facts">
                            <div className="flex flex-wrap gap-2 rounded-md border border-base-300 p-3">
                                {metadataEntries.map(([key, value]) => (
                                    <span
                                        key={key}
                                        className="inline-flex items-center rounded-md  border border-base-300 bg-base-200/60 px-3 py-1.5 text-xs font-medium text-base-content/75"
                                    >
                                        {titleCase(key)}: {String(value)}
                                    </span>
                                ))}
                            </div>
                        </SectionCard>
                    )}
                </aside>
            </div>
        </section>
    );
};

export default PublicDescriptionViewer;
