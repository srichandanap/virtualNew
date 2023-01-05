import React, { useState, useEffect } from 'react'
import "./completed.css"
import axios from "axios";


const Completed = () => {
    const [comCourse, setComCourse] = useState()

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-221207091853.azurewebsites.net/user/completed-courses`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }
            )
            .then((res) => {
                // console.log(res);
                setComCourse(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    // console.log(ongoingCourse)
    return (
        <div className='ongoingMargin-com'>
            {comCourse && comCourse!== "" ?
                (
                    <>
                        <div className='ongoingItems-com'>
                            {comCourse?.data?.map((data) => {
                                return (
                                    <div className='ongoingItem-com'>
                                        <img src={data?.course_image} alt="" className='thumbnail-com' />
                                        <div className='ongoing thumbnailText-com'>Ongoing</div>
                                        <div className='videoName thumbnailText-com'>{data?.course_name}</div>
                                        <div className='chapCount thumbnailText-com'>{data?.completed_chapter_count}/{data?.chapter_count} Chapters</div>
                                        <button className='continue-com'>Continue</button>
                                    </div>

                                );
                            })}
                        </div>
                    </>
                )
            :
            <div> no completed courses
                </div>
                }
        </div>
    )
}

export default Completed