import Image from "next/image";

type MyProps = {
    paymentUrl: string,
    label: string
};

export const PurchaseLink = ({ paymentUrl, label }: MyProps) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <a href={paymentUrl} className='btn w-full font-normal border-none bg-primary! px-8  text-white hover:bg-primary/90!'>
                <span className="bg-white p-0.5 px-1 rounded-md"><Image alt="yupidoc" width={10} height={10} src={'/yupi_logo.png'} /></span>
                <span>{label} ON YUPIDOC</span>
            </a>
            <span className="text-center text-xs">Yupidoc will let you pay in a secured way.</span>
        </div>
    )
}