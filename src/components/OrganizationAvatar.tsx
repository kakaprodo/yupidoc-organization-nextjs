
import Image from "next/image";
import { Organization } from "@/types/general-type";
import { avatarLetter } from "@/utils/shared-helpers";


type MyProps = {
    organization: Organization;
    size?: number;
    className?: string;
};

export const OrganizationAvatar: React.FC<MyProps> = ({ organization, size = 10, className }) => {
    const dimension = size * 4;
    const style = {
        width: `${dimension}px`,
        height: `${dimension}px`
    };

    if (organization.logo_url) {
        return (
            <Image
                src={organization.logo_url}
                alt={organization.name}
                width={dimension}
                height={dimension}
                className={`rounded-lg object-contain bg-primary/5 ${className ?? ""}`}
            />
        );
    }

    return (
        <div
            className={`flex items-center justify-center rounded-lg border border-base-300 bg-base-200 font-bold text-base-content/70 ${className ?? ""}`}
            style={style}
            aria-hidden="true"
        >
            <span>{avatarLetter(organization.name)}</span>
        </div>
    );
}
