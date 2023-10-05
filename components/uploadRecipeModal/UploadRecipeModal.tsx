'use client'

import classes from './uploadRecipeModal.module.css'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useUser } from '@auth0/nextjs-auth0/client';
import banner from '@/public/resources/interior-theatre-theater-empty-theater.jpg'
import { useRouter } from 'next/navigation';

export const UploadRecipeModal = () => {
    const URL = process.env.NEXT_PUBLIC_URL_RECIPES || '';
    const [open, setOpen] = useState<boolean>(true);
    const { register, handleSubmit } = useForm()
    const { user } = useUser();

    const router = useRouter();

    const toggleModal = () => {
        if (user) {
            setOpen(!open);
        }
    };

    const onSubmit = async (data: any) => {

        toast.success('Recipe added sucessfully');
        const response = await fetch(URL + `/${user?.email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(response)
        router.refresh();
    }

    return (
        <div className={classes.urModal} >

            {open ? <div className={classes.bannerContainer} onClick={toggleModal}>
                <Image
                    className={classes.bannerImage}
                    src={banner}
                    alt='Banner Logo' />
                <div className={classes.imgBefore}>{user ? 'Upload a Recipe' : 'You must Log in'}</div>
            </div>
                :
                <div className={classes.bannerContainer}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name">Recipe Name: </label>
                            <input
                                type="text"
                                id="name"
                                autoComplete="off"
                                {...register('name', {
                                    maxLength: 50,
                                    required: true
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="type">Type: </label>
                            <select {...register('type', { required: true })}>
                                <option value="SALTY">SALTY</option>
                                <option value="SWEET">SWEET</option>
                                <option value="SOUR">SOUR</option>
                                <option value="BITTER">BITTER</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="link">Recipe Link: </label>
                            <input
                                id="link"
                                autoComplete="off"
                                {...register('link', {
                                    required: true
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="imageLink">Image Link: </label>
                            <input
                                id="imageLink"
                                autoComplete="off"
                                {...register('imageLink', {
                                    required: true
                                })}
                            />
                        </div>
                        <div>
                            <input className={classes.editBtnSend} type="submit" value='CONFIRM' />
                            <button className={classes.editBtnSend} onClick={toggleModal}>CANCEL</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};
