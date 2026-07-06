import { getTranslations } from "next-intl/server";
import Image from "next/image";

type MyProps = {
    paymentUrl: string,
    label: string
};

export const PurchaseLink = async ({ paymentUrl, label }: MyProps) => {

    const tDetails = await getTranslations('Details');

    return (
        <div className='flex flex-col gap-2 w-full'>
            <a href={paymentUrl} className='btn w-full font-normal border-none bg-primary! px-8  text-white hover:bg-primary/90!'>
                <span className="bg-white p-0.5 px-1 rounded-md"><Image alt="yupidoc" width={10} height={10} src={'/yupi_logo.png'} /></span>
                <span>{tDetails('startEnrollment')}</span>
            </a>
            <span className="text-center text-xs">{tDetails('yupiCompleteEnrollment')}</span>
        </div>
    )
}