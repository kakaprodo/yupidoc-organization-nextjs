
import { Organization } from "@/types/general-type";
import AvatarPlaceholder from "./AvatarPlaceholder";


type MyProps = {
    organization: Organization;
    size?: number;
    className?: string;
};

const defaultOrg = {
    name: 'Training',
    logo_url: null,
    color: 'bg-base-300'
};

export const OrganizationAvatar: React.FC<MyProps> = ({ organization, size = 10, className }) => {
    const myOrg = organization ?? defaultOrg;
    return myOrg.logo_url ? (
        <img
            src={myOrg.logo_url}
            alt={myOrg.name}
            className={`w-${size} h-${size} p-1 rounded-lg border border-base-300 object-contain bg-primary/5 ${className}`}
        />
    ) : <AvatarPlaceholder
        name={myOrg.name}
        size={`w-${size} h-${size}`}
        rounded="rounded-lg"
        width=""
        color={`bg-base-300 ${myOrg.color} ${className}`}
    />;
}
