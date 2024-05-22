import React from 'react'
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

interface modalProps {
    isOpen: boolean;
    title: string;
    handleClose: () => void;
    className: string;
    buttonText: string;
    handleClick: () => void;
    loading: boolean;
}
const MeetingModal = ({ isOpen, handleClose, title, className, handleClick, buttonText,loading }: modalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-dark-1 text-white flex flex-col w-full max-w-[520px]
            gap-6 border-none px-6 py-9 
            '>
        <div className="flex flex-col gap-6">
        <h1 className={cn('text-3xl font-bold leading-[42px]',className)}> { title}</h1>
                <Button variant="outline" onClick={handleClick} className='bg-blue-1 border-none text-white  focus-visible:ring-0
                focus-visiible:ring-offset-0 
                '
                disabled={loading}
                >{
                    loading? <Loader2/>:buttonText
                }</Button>
        </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal
