import React, { useState, useEffect } from 'react'
import NavBar from '../navBar/navBar'
import ReactPlayer from "react-player";
import "./overview.css"
import arrow from "../../asstes/images/Vector.png"
import thumbnail from "../../asstes/images/Rectangle 28.png"
import icn_includes_duration from "../../asstes/images/icn_includes_duration.png"
import icn_includes_supportfiles from "../../asstes/images/icn_includes_supportfiles.png"
import test from "../../asstes/images/icn_includes_test.png"
import access from "../../asstes/images/icn_includes_lifetime.png"
import web from "../../asstes/images/icn_includes_global.png"
import cert from "../../asstes/images/icn_includes_certificate.png"
import youllLearn from "../../asstes/images/icn_youlllearn.png"
import dots from "../../asstes/images/Ellipse 9.png"
import instructorImage from "../../asstes/images/img_instructor1 copy@3x 1.png"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import redPlay from "../../asstes/images/Red Play.png";
import greyPlay from "../../asstes/images/grey play.png";
import moduleTest from "../../asstes/images/moduletest.png";
import { addVideo, addLessonId } from "../../slive/courseSlice";
import perc from "../../asstes/images/perc.png";

const Overview = () => {
    const [tabChange, setTabChange] = useState(1)
    const [overviewDetails, setOverviewDetails] = useState(true)
    const [completedDetails, setCompletedDetails] = useState(false)
    const [videoData, setVideoData] = useState("")
    const [overviewData, setOverviewData] = useState("")
    const [chapterData, setChapterData] = useState("")
    const [show, setShow] = useState(null);
    const dispatch = useDispatch();
    const [played, setPlayed] = useState(0);
    const [savedLesson, setSavedLesson] = useState()

    var supportStatus = "";

    const id = JSON.parse(localStorage.getItem("courseId" || "[]"));
    // const videoLink = JSON.parse(localStorage.getItem("video" || "[]"));
    const videoLink = useSelector((state) => state.course.video);
    const lessonId = useSelector((state) => state.course.lessonId);

    const data = overviewData;

    const toggle = (i) => {
        if (show === i) {
            return setShow(null)
        }
        setShow(i)
    }

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-221207091853.azurewebsites.net/user/view/courseOverview`,
                { params: { courseId: id }, }

            )
            .then((res) => {
                // console.log(res);
                setOverviewData(res?.data)


            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    
    useEffect(() => {
        duration();
    })

    const duration = async () => {
        await axios
            .request(
                `https://app-virtuallearning-221207091853.azurewebsites.net/user/lesson`,
                {
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                    params: { lessonId: lessonId, duration: played },

                }
            )
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            });  
    };

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-221207091853.azurewebsites.net/user/view/chapter`,
                {
                    params: { courseId: id },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }

            )
            .then((res) => {
                console.log(res);
                setChapterData(res?.data)

            })
            .catch((err) => {
                console.error(err);
            });
    });

    supportStatus = data?.courseIncludes?.supportFiles;

    return (
        <div>
            <NavBar />
            <div className='myCourseMargin'>
                <div className='path'>

                    <div className='myCoursePath'>My Course&nbsp;&nbsp;</div>
                    <img src={arrow} alt="image" className='arrow' />

                    <div className='ongoingPath'> &nbsp;&nbsp;Ongoing</div>

                </div>

                <div className='courseDetails'>
                    {overviewDetails &&
                        <div className='courseDetailsLeft'>
                            <div className='videoOngoing'>
                                <ReactPlayer
                                    url={overviewData?.overview?.videoLink}
                                    controls
                                    className="react-player"
                                    width="100%"
                                    height="100%"
                                //   ref={playerRef}
                                //   onPause={onPause}
                                //   onPlay={onPlay}
                                //   playing={playing}
                                //   onEnded={onEnd}
                                //   onSeek={() => {
                                //     setPause(false);
                                //   }}
                                //   onProgress={(progress) => {
                                //     setPlayed(progress.playedSeconds);
                                //     dispatch(pauseTimeState(progress.playedSeconds));
                                //     localStorage.setItem("pauseTimeLocal", progress.playedSeconds);
                                //   }}
                                />

                                <div className='previewText'>Preview the course</div>
                            </div>

                            <div className='courseLabel'>
                                <div>
                                    <div>{data?.courseHeader?.course_name}</div>
                                    <div>{data?.courseHeader?.chapter_count} Chapter | {data?.courseHeader?.lesson_count} lessons</div>
                                </div>
                                <div className='designLabel'>

                                    {data?.courseHeader?.category_name}
                                </div>
                            </div>
                            <hr className='lineBorders'></hr>
                            <div className='courseDescription'>{data?.overview?.courseDescription}</div>
                            <div className='aboutFigma'>{data?.overview?.previewCourseContent}</div>
                        </div>
                    }

                    {completedDetails &&
                        <div className='courseDetailsLeft'>
                            <div className='videoOngoing'>
                                <ReactPlayer
                                    url={videoLink}
                                    controls
                                    className="react-player"
                                    width="100%"
                                    height="100%"
                                    //   ref={playerRef}
                                    //   onPause={onPause}
                                    //   onPlay={onPlay}
                                    //   playing={playing}
                                    //   onEnded={onEnd}
                                    //   onSeek={() => {
                                    //     setPause(false);
                                    //   }}
                                    onProgress={(progress) => {
                                        setPlayed(progress.playedSeconds);
                                        console.log(played)

                                    }}
                                />

                                <div className='previewText'>Preview the course</div>
                            </div>

                            <div className='courseLabel'>
                                <div>
                                    <div>{data?.courseHeader?.course_name}</div>
                                    <div>{data?.courseHeader?.chapter_count} Chapter | {data?.courseHeader?.lesson_count} lessons</div>
                                </div>
                                <div className='designLabel'>

                                    {data?.courseHeader?.category_name}
                                </div>
                            </div>

                        </div>
                    }
                    <div className='contents'>
                        <div className='contentTabs'>
                            <div className={tabChange === 1 ? 'contentOverviewActive' : 'contentOverview'} onClick={() => { setTabChange(1); setOverviewDetails(true); setCompletedDetails(false) }}>
                                Overview
                            </div>
                            <div className={tabChange === 2 ? 'contentOverviewActive' : 'contentOverview'} onClick={() => { setTabChange(2); setOverviewDetails(false); setCompletedDetails(true) }}>
                                Chapters
                            </div>
                        </div>

                        {overviewDetails &&
                            (
                                <>
                                    <div className='courseIncludeComponents'>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>Course Includes</div>
                                            <div className='rowElements'>
                                                <img src={icn_includes_duration} alt="image" className='courseIncludesImage' />
                                                <div className='courseDetailText'>{data?.courseIncludes?.totalHourVideo} total hours video</div>
                                            </div>
                                            {supportStatus === true &&

                                                (<div className='rowElements'>
                                                    <img src={icn_includes_supportfiles} alt="image" className='courseIncludesImage' />
                                                    <div className='courseDetailText'>Support Files</div>
                                                </div>
                                                )
                                            }

                                            <div className='rowElements'>
                                                <img src={test} alt="image" className='courseIncludesImage' />
                                                <div className='courseDetailText'>{data?.courseIncludes?.moduleTest} Module Test</div>
                                            </div>

                                            {data?.courseIncludes?.fullLifetimeAccess === true &&
                                                (<div className='rowElements'>
                                                    <img src={access} alt="image" className='courseIncludesImage' />
                                                    <div className='courseDetailText'>Full lifetime access</div>
                                                </div>
                                                )}

                                            <div className='rowElements'>
                                                <img src={web} alt="image" className='courseIncludesImage' />
                                                <div className='courseDetailText'>{data?.courseIncludes?.accessOn} </div>
                                            </div>

                                            {data?.courseIncludes?.certificateOfCompletion === true &&
                                                (
                                                    <>
                                                        <div className='rowElements'>
                                                            <img src={cert} alt="image" className='courseIncludesImage' />
                                                            <div className='courseDetailText'>Certificate of Completion</div>
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>What you'll learn</div>
                                            {overviewData?.overview?.courseOutcome?.map((data) => {
                                                return (
                                                    <div className='rowElements'>
                                                        <img src={youllLearn} alt="image" className='whatYouLearnImage' />
                                                        <div className='whatYouLearnText'>{data}</div>
                                                    </div>
                                                )
                                            })}

                                        </div>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>Requirements</div>
                                            {overviewData?.overview?.courseOutcome?.map((data) => {
                                                return (
                                                    <div className='rowElementsRequire'>
                                                        <img src={dots} alt="image" className='requirementImage' />
                                                        <div className='whatYouLearnText'>{data}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>Instructor</div>
                                            <div className='rowElementsInstructor'>
                                                <img src={overviewData?.instructor?.profile_pic} alt="image" className='instructorImage' />
                                                <div>
                                                    <div className='instructorName'>{overviewData?.instructor?.instructorName}</div>
                                                    <div className='instructorOccu'>{overviewData?.instructor?.occupation}</div>
                                                </div>
                                            </div>
                                            <div className='rowElements'>
                                                <div className='whatYouLearnText'>{overviewData?.instructor?.about}</div>

                                            </div>

                                        </div>
                                        <button className='joinCourseBtn'>Join Course</button>

                                    </div>
                                </>
                            )
                        }

                        {completedDetails &&
                            (
                                <>
                                    <div className='courseIncludeComponents'>
                                        <div className='courseIncludes'>Course Content</div>
                                        <div className='chapListText'>{chapterData?.courseContentResponse?.chapterCount} Chapter | {
                                            chapterData?.courseContentResponse?.lessonCount} lessons | {chapterData?.courseContentResponse?.moduleTest} Assignment Test | {chapterData?.courseContentResponse?.totalVideoLength
                                            }h total length</div>
                                    </div>

                                    {chapterData?.lessonResponseList?.map((data, i) => {

                                        return (
                                            <>
                                                {/* <div> */}


                                                <div className='accordianDiv'>
                                                    <div className='chapNameAccor' onClick={() => toggle(i)}>
                                                        <div className={data?.chapterCompleted === true ? 'lessonNameCompleted' : 'chapName'}>{data?.chapterName}</div>
                                                        <div className='accor'> {show === i ? '-' : "+"}</div>
                                                    </div>
                                                    {show === i && <div className='accorHidden'>
                                                        {chapterData?.lessonResponseList[i]?.lessonList?.map((data) => {

                                                            return (
                                                                <>
                                                                    <div className='accorChap' onClick={() => { dispatch(addVideo(data?.videoLink)); dispatch(addLessonId(data?.lessonId)); }}>
                                                                        {/* <div className='accorChap' onClick={()=>{ console.log(data?.videoLink)}}> */}
                                                                        <div className='accorLeft'>
                                                                            <div className='lessonCount'>{data?.lessonId}</div>

                                                                            <div className='accorChapDetails'>
                                                                                <div className={data?.lessonCompleted === true ? 'lessonName' : 'lessonTextNotCompleted'}>{data?.lessonName}</div>
                                                                                <div className='lessonDuration'>{data?.duration}</div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div> */}
                                                                        {data?.lessonCompleted === true ? <img src={redPlay} alt="image" className='playImage' /> : <img src={greyPlay} alt="image" className='playImage' />}
                                                                        {/* </div> */}
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                        {data?.assignmentResponse !== null && (
                                                            <div className='accorLeft accorLeftTwo'>
                                                                <img src={moduleTest} alt="image" className='testImage' />
                                                                <div className='accorChapDetails'>
                                                                    <div className={data?.assignmentResponse?.assignmentCompleted === true ? 'lessonName' : 'lessonTextNotCompleted'}>{data?.assignmentResponse?.assignmentName}</div>
                                                                    <div className='lessonDuration'>{data?.assignmentResponse?.testDuration} mins | {data?.assignmentResponse?.questionCount} Questions</div>
                                                                </div>
                                                                <div>
                                                                    <div className='perc'>80</div>
                                                                    <div className='approvalText'>Approval Rate</div>
                                                                </div>
                                                            </div>
                                                        )
                                                        }

                                                    </div>
                                                    }
                                                </div>
                                                {/* </div> */}
                                            </>
                                        )
                                    })}

                                </>
                            )}

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Overview
