'use client'
import classes from './uploadForm.module.css'
import Image, { StaticImageData } from 'next/image'
import { useState, useEffect, useRef } from 'react'
import preview from '@/public/resources/popcorn-ico.jpg'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

interface MovieReview {
    userId?: string;
    name: string;
    score: number;
    review: string;
    genres: string;
    posterImage: File | null;
}
interface GenreType {
    id: number;
    name: string;
    moviesId?: string[]
}

interface PropType {
    genres: GenreType[]
    userId: string;
}



const UploadForm = (props: PropType) => {
    const router = useRouter()
    const { genres, userId } = props;
    const [formData, setFormData] = useState<MovieReview>({
        userId: userId,
        name: '',
        score: 1,
        review: ' ',
        genres: '',
        posterImage: null,
    });
    const [imgPreview, setImgPreview] = useState<StaticImageData>(preview)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) {
            setFormData((prevData) => ({
                ...prevData,
                posterImage: selectedFile,
            }));
            const reader = new FileReader();
            reader.onload = () => {
                setImgPreview(reader.result as any);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { userId, name, score, posterImage, review, genres } = formData;
        const upload = new FormData();
        upload.append('name', name)
        upload.append('score', score.toString())
        upload.append('posterImage', posterImage as File)
        upload.append('review', review)
        upload.append('genres', genres)

        await fetch(`/api/movie/${userId}`, {
            method: 'POST',
            body: upload,
        });
        toast.success('Movie was successfully uploaded')
        router.refresh();
        router.back();
    };
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [validReview, setValidReview] = useState(false);
    const [reviewFocus, setReviewFocus] = useState(false);

    const [scoreFocus, setScoreFocus] = useState(false);

    const nameRef = useRef<any>();

    useEffect(() => {
        nameRef.current.focus();
    }, [])
    useEffect(() => {
        if (formData.name == '' || formData.name == ' ') {
            setValidName(false);
        } else setValidName(true);
        if (formData.review == '') {
            setValidReview(false);
        } else setValidReview(true);
        if (formData.score < 1) {
            setFormData((prevData) => ({
                ...prevData,
                score: 1,
            }));
        } else if (formData.score > 10) {
            setFormData((prevData) => ({
                ...prevData,
                score: 10,
            }));
        }
    }, [formData.name, formData.review, formData.score]);

    return (
        <>
            <div className={classes.modalContLeft}>
                <h2>What we watching today?</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className={nameFocus || validName ? `${classes.offscreen}` : `${classes.errorMsg}`}>This field is required and max length is 100 characters</p>
                        <label htmlFor="name">Tittle</label>
                        <input
                            style={{ width: '80%' }}
                            type="text"
                            id="name"
                            name="name"
                            maxLength={100}
                            autoComplete="off"
                            ref={nameRef}
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                            value={formData.name}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="score">Score</label>
                        <input
                            type="number"
                            id="score"
                            name="score"
                            min="1"
                            max="10"
                            onFocus={() => setScoreFocus(true)}
                            onBlur={() => setScoreFocus(false)}
                            value={formData.score}
                            onChange={handleInputChange}
                            required />
                        <p className={!scoreFocus ? `${classes.offscreen}` : `${classes.scoreErrorMsg}`}>The score should be between 1 and 10</p>
                        <span> Out of 10!</span>
                    </div>
                    <div>
                        <label htmlFor="posterImage">Cover:</label>
                        <input
                            type="file"
                            id="posterImage"
                            name="posterImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="review">Review</label>
                        <textarea
                            id="review"
                            name="review"
                            autoComplete="off"
                            onFocus={() => setReviewFocus(true)}
                            onBlur={() => setReviewFocus(false)}
                            maxLength={2500}
                            rows={2}
                            cols={50}
                            value={formData.review}
                            onChange={handleInputChange}
                            required />
                        <p className={reviewFocus || validReview ? `${classes.offscreen}` : `${classes.errorMsgReview}`}>This field is required and max length is 2500 characters</p>
                    </div>
                    <div>
                        <label htmlFor="genres">Genre</label>
                        <select id="genres" name="genres" value={formData.genres} onChange={handleInputChange} required>
                            <option value="" disabled>Select a genre</option>
                            {genres.map((genre: GenreType) => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))}
                        </select>

                    </div>

                    <input style={{ zIndex: '1000' }} disabled={formData.genres === '' || formData.posterImage === null || validName == false ? true : false} className={classes.submitBtn} type="submit" value="Submit" />
                </form>
            </div>
            <div className={classes.modalContRigth}>
                <Image
                    src={imgPreview}
                    width={400}
                    height={400}
                    alt='Image Preview'
                    className={classes.imagePreview} />
            </div>
        </>
    )
}

export default UploadForm
