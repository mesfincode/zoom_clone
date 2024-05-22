import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface modalProps {
    isOpen: boolean;
    title: string;
    handleClose: () => void;
    className?: string;
    buttonText?: string;
    buttonIcon?: string;
    handleClick: () => void;
    loading: boolean;
    image?: string;
    children?: ReactNode;

}
const MeetingModal = ({ isOpen, handleClose, title, className, handleClick, buttonText, loading, image, children ,buttonIcon}: modalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-dark-1 text-white flex flex-col w-full max-w-[520px]
            gap-6 border-none px-6 py-9 
            '>
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} alt="checked" width={72} height={72} />
                        </div>
                    )}
                    <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
                        {title}
                    </h1>
                    {children}
                    <Button

                        className={
                            "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                        }
                        onClick={handleClick}
                    >
                        {buttonIcon && (
                            <Image
                                src={buttonIcon}
                                alt="button icon"
                                width={13}
                                height={13}
                            />
                        )}{" "}
                        &nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal
