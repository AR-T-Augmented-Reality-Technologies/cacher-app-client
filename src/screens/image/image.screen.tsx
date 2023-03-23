import React, { useState, useRef, useEffect } from "react";
import { Button, View, ImageBackground } from "react-native";
import { Splide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ImageSliderChild } from "../../components/ImageSliderChild.component";
import { add_user } from "../../features/users.slice";
import { add_image } from "../../features/image.slice";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { cleanWord, badcheck } from "../../Hooks/filter";
import {
    EmailShareButton,
    FacebookShareButton,
    LineShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    LineIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "moment";

interface ImageScreenProps {
    navigation: any;
}

export const ImageScreen = ({ navigation }: ImageScreenProps) => {
    const [currentPage, setCurrentPage] = useState("Image");
    const [showOptions, setShowOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showLikeCount, setShowLikeCount] = useState(false);
    const [showShareButton, setShowShareButton] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupRefFlag = useRef<HTMLDivElement>(null);
    const popupRefShare = useRef<HTMLDivElement>(null);

    const [commentsarr, setCommentsarr] = useState<string[]>([]);
    const [userarr, setUserarr] = useState<string[]>([]);
    const [newComment, setNewComment] = useState("");
    const [commentTimes, setCommentTimes] = useState<string[]>([]);
    const [shared, setShared] = useState(false);
    const [showFlagMenu, setShowFlagMenu] = useState(false);
    const user = useSelector((state: any) => state.users);
    // const image = useSelector((state: any) => state.image);
    const scrapbook = useSelector((state: any) => state.scrapbook);

    let [gotCommFlag, setGotCommFlag] = useState(0);
    let commentArray = [""];
    let timeArray = [];
    let userTArray = [""];
    const [caption, setCaption] = useState("");

    var Filter = require("bad-words"),
        filter = new Filter();
    // console.log('got comm flag  ' + gotCommFlag);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // eslint-disable-next-line
    const toggleTheme = () => {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
  
    useEffect(() => {
      localStorage.setItem("theme", theme);
      document.body.className = theme;
    }, [theme]);
    
    // Store current page in local storage
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
            setCurrentPage(storedPage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    // getPastComment comments
    const handleGetComments = async () => {
        console.log("Getting comments");
        const payload = {
            imageid: "2", //placeholder because currently it is not saving images
        };
        const response = await fetch(
            `${process.env.REACT_APP_REST_API_HOST}/images/${payload.imageid}/getcomment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify(payload),
            }
        );
        const data = await response.json();

        commentArray = [data.data.comments[0].comment];
        timeArray = [data.data.comments[0].timestamp];
        userTArray = [data.data.comments[0].user_id];
        for (var i = 1; i < data.data.comments.length; i++) {
            commentArray[i] = data.data.comments[i].comment;
            timeArray[i] = data.data.comments[i].timestamp;
            userTArray[i] = data.data.comments[i].user_id;
        }

        for (var j = 0; j < commentArray.length; j++) {
            commentsarr.push(commentArray[j]);
            commentTimes.push(timeArray[j]);
            userarr.push(userTArray[j]);
        }
    };

    // Adding comments
    async function handleAddComment() {
        const currentTime = moment().toISOString();
        console.log(currentTime);
        setCommentTimes([currentTime, ...commentTimes]);
        setCommentsarr([cleanWord(newComment), ...commentsarr]);
        commentArray[commentArray.length] = newComment;
        setNewComment("");

        const payload = {
            imageid: 2,
            userid: 1,
            comment: newComment,
            timestamp: currentTime,
        };

        console.log(payload.timestamp + "Test");
        //Future albaraa remember wait statements
        const response = await fetch(
            `${process.env.REACT_APP_REST_API_HOST}/images/addcomment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        const data = await response.json();
    }

    // Calculate time since comment was posted
    const formatTime = (time: string) => {
        // const secs = time.getUTCSeconds
        var currdate = moment(moment().format());
        var timetwo = moment(time);
        // console.log(currdate + "curr");
        // console.log(time + "timetaken")

        const difference = moment.duration(currdate.diff(timetwo)).asSeconds();
        if (difference < 0) {
            return `now`;
        } else if (difference < 60) {
            return `${Math.floor(difference)} seconds ago`;
        } else if (difference < 3600) {
            return `${Math.floor(difference / 60)} minutes ago`;
        } else if (difference < 86400) {
            return `${Math.floor(difference / 3600)} hours ago`;
        } else {
            return `${Math.floor(difference / 86400)} days ago`;
        }
    };

    // To flag a post
    const flagPostOrComment = () => {
        setShowFlagMenu(!showFlagMenu);
    };

    // Dismiss the window when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        if (
            popupRef.current &&
            popupRefShare.current &&
            popupRefFlag.current &&
            !popupRef.current.contains(event.target as Node) &&
            !popupRefFlag.current.contains(event.target as Node) &&
            !popupRefShare.current.contains(event.target as Node)
        ) {
            setShowComments(false);
        } else if (
            popupRef.current &&
            !popupRefFlag.current &&
            !popupRefShare.current &&
            !popupRef.current.contains(event.target as Node)
        ) {
            setShowComments(false);
        }
        if (
            popupRefFlag.current &&
            !popupRefFlag.current.contains(event.target as Node)
        ) {
            setShowFlagMenu(false);
        }
        if (
            popupRefFlag.current &&
            !popupRefFlag.current.contains(event.target as Node)
        ) {
            setShowFlagMenu(false);
        }
        if (
            popupRefShare.current &&
            !popupRefShare.current.contains(event.target as Node)
        ) {
            setShowShareButton(false);
        }
        if (
            popupRefShare.current &&
            !popupRefShare.current.contains(event.target as Node)
        ) {
            setShowShareButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sharePost = async () => {
        setShowShareButton(true);
    };

    //Attempting to get code for pulling likes from database
    const getlikes = async () => {
        const payload = {
            imageid: 1,
        };
        const response = await fetch(
            `${process.env.REACT_APP_REST_API_HOST}/images/${payload.imageid}/getlikes`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
            }
        );
        const data = await response.json();
        setLikeCount(data.data.image.likes);
        setCaption(data.data.image.caption);
        console.log("Caption " + caption);
        console.log("This has been called");
    };

    // Like post
    const likePost = async () => {
        const image_id = 1; // Replace this with the actual image ID
        const response = await fetch(
            `${process.env.REACT_APP_REST_API_HOST}/images/${image_id}/like`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("Failed to like the post");
            return;
        }

        const updatedImage = await response.json();
        setLikeCount(updatedImage.likes);
        setShowLikeCount(true);
        setIsLiked(true);
    };

    const unlikePost = async () => {
        const image_id = 1; // Replace this with the actual image ID
        const response = await fetch(
            `${process.env.REACT_APP_REST_API_HOST}/images/${image_id}/dislike`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("Failed to unlike the post");
            return;
        }

        const updatedImage = await response.json();
        setLikeCount(updatedImage.likes);
        setShowLikeCount(true);
        setIsLiked(false);
    };

    const handleLike = () => {
        if (!isLiked) {
            likePost();
        } else {
            unlikePost();
        }
    };

    // Show like count for 2 seconds
    setTimeout(() => {
        setShowLikeCount(false);
    }, 2000);

    // Comment post
    const commentPost = () => {};

    // Display comments
    const displayComments = () => {
        setShowComments(!showComments);
    };

    // Display options
    const displayOptions = () => {
        setShowOptions(!showOptions);
    };

    const getCurrTime = () => {
        const currentDate = new Date().getTime();
        return currentDate;
    };

    if (gotCommFlag == 0) {
        handleGetComments();
        getlikes();
        setGotCommFlag(1);
    }

    // const cleanWord = (word : string) => {
    //   return filter.clean(word);
    // }
    const headerHeight = 64;
    const postCommentSectionHeight = 80;

    return (
        <div className="dark:text-white">
            <div>
                {/* Image slider */}
                <div>
                    <Splide
                        aria-label="Image carousel"
                        options={{ arrows: false, pagination: false }}
                    >
                        {scrapbook.images.map((image: { photo_id: number, image: string, likes: number, num_comments: number, caption: string, upload_date: string, scrap_id: number }) => {
                            return <ImageSliderChild srcUrl={image.image} />;
                        })}
                    </Splide>
                </div>

                {/* Home button */}
                <button
                    className="dark:text-white dark:bg-dback text-black bg-white text-sm font-bold py-1 px-2 rounded-full border-solid border-2 border-black fixed top-2 left-2 "
                    type="button"
                    onClick={() => {
                        navigation.navigate("Map");
                    }}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="w-h h-6 inline-block pr-1"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
        1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                    Home
                </button>

                {/* Flag button */}
                <button
                    style={{ bottom: "15rem", color: "orange" }}
                    className="dark:text-white dark:bg-dback w-16 h-16 rounded-full text-xs bg-white font-bold border-solid border-2 border-black text-center fixed right-2"
                    onClick={flagPostOrComment} // Implement flagPost function
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="33.9 22.3 9.1 7"
                        className="w-6 h-6 mx-auto my-auto"
                    >
                        <path
                            d="M 21 24 M 34.007 22.443 L 34 31 L 35 31 L 35.001 22.416 L 34.034 22.443 M 35 23 Q 38 22 39 23 Q 40 24 43 23 L 43 27 Q 40 28 39 27 Q 38 26 35 27"
                            stroke="#fff"
                            stroke-width="0.08"
                            fill="orange"
                        />
                    </svg>{" "}
                    Flag
                </button>

                {showShareButton && (
                    <>
                        <div
                            ref={popupRefShare}
                            className={`${
                                showShareButton ? "opacity-100" : "opacity-0"
                            }
            transition-opacity ease-in-out duration-300`}
                        >
                            {/* Like count popup */}
                            <div className="dark:bg-dback bg-white p-3 rounded-lg shadow-lg fixed bottom-24 right-20 border border-black">
                                <FacebookShareButton
                                    url={window.location.href}
                                    quote={caption}
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={window.location.href}
                                    title={caption}
                                    className="Demo__some-network__share-button"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>

                                <PinterestShareButton
                                    url={window.location.href}
                                    media={"images/cacher-logo.png"} //needs URL to current image
                                    className="Demo__some-network__share-button"
                                >
                                    <PinterestIcon size={32} round />
                                </PinterestShareButton>

                                <RedditShareButton
                                    url={window.location.href}
                                    title={caption}
                                    windowWidth={660}
                                    windowHeight={460}
                                    className="Demo__some-network__share-button"
                                >
                                    <RedditIcon size={32} round />
                                </RedditShareButton>

                                <WhatsappShareButton
                                    url={window.location.href}
                                    title={caption}
                                    separator=":: "
                                    className="Demo__some-network__share-button"
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>

                                <LinkedinShareButton
                                    url={window.location.href}
                                    className="Demo__some-network__share-button"
                                >
                                    <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                            </div>
                        </div>
                    </>
                )}
                {/* share button */}
                <>
                    <button
                        className="dark:text-white  dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-40 right-2"
                        onClick={sharePost}
                    >
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto my-auto"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                        </svg>{" "}
                        Share
                    </button>
                </>
                {/* like button */}
                <button
                    className={`dark:text-white dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 ${
                        isLiked
                            ? "border-custom-blue dark:bg-dorange"
                            : "border-black"
                    } text-center fixed bottom-20 right-2`}
                    onClick={handleLike}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto my-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                    </svg>
                    Like
                </button>

                {/* comment button */}
                <button
                    className="dark:text-white  dark:bg-dback w-16 h-16 rounded-full text-tiny text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-2 right-2"
                    onClick={displayComments}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto my-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                    </svg>
                    Comment
                </button>

                {/* options button */}
                <button
                    className={`dark:text-white dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 ${
                        showOptions
                            ? "border-custom-blue dark:border-dorange"
                            : "border-black"
                    } text-center fixed bottom-2 left-2`}
                    onClick={displayOptions}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto my-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                    </svg>
                    Options
                </button>

                {/* Post description */}
                <button
                    className="dark:text-white  dark:bg-dback h-16 bg-white border-solid border-2 border-black fixed bottom-0 left-20 right-20 rounded-t-3xl border-b-0"
                    onClick={displayComments}
                >
                    <div className="grid grid-rows-2">
                        <div className="row-start-1">
                            <div className="pt-2 px-2 text-s"> {caption}</div>
                        </div>
                        <div className="row-start-2">
                            <div className="pb-2 px-2 text-s text-right">
                                - User123
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            {/* options menu - Display when the Options button is clicked*/}
            {showOptions && (
                <>
                    {/* Profile button */}
                    <button
                        className="dark:text-white  dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-40 left-2 transition duration-500 ease-in-out"
                        onClick={() => {
                            navigation.navigate("Profile");
                        }}
                    >
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto my-auto"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Profile
                    </button>

                    {/* Settings button */}
                    <button
                        className="dark:text-white  dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-20 left-2 transition duration-500 ease-in-out"
                        onClick={() => {
                            navigation.navigate("Settings");
                        }}
                    >
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto my-auto"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Settings
                    </button>
                </>
            )}

            {showLikeCount && (
                <>
                    {/* Like count popup */}
                    <div
                        className={`${
                            showLikeCount ? "opacity-100" : "opacity-0"
                        } transition-opacity ease-in-out duration-300`}
                    >
                        <div className="dark:bg-dback bg-white p-3 rounded-lg shadow-lg fixed bottom-24 right-20 border border-black">
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                className="dark:bg-dback w-6 h-6 mx-auto my-auto stroke-like-button-orange"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                            {likeCount} Likes
                        </div>
                    </div>
                </>
            )}

            {showComments && (
                <>
                    {/* Comments popup */}
                    <div
                        ref={popupRef}
                        className={`${
                            showComments ? "opacity-100" : "opacity-0"
                        } transition-opacity ease-in-out duration-300`}
                    >
                        <div className="dark:bg-dback h-screen bg-white border-solid border-2 border-black fixed top-48 left-2 right-2 rounded-t-3xl border-b-0">
                            {/* Post description*/}
                            <div className="grid grid-rows-2">
                                <div className="row-start-1">
                                    <div className="pt-5 px-5 text-s break-normal">
                                        {caption}
                                    </div>
                                </div>
                                <div className="row-start-2">
                                    <div className="pb-2 px-5 text-s text-right">
                                        - User123
                                    </div>
                                    <hr className="border border-gray-500 ml-5 mr-5" />
                                </div>
                            </div>

                            {/* Comments */}
                            <div style={{ maxHeight: "55%" }} className="grid grid-cols-1 pl-5 pr-5 overflow-auto max-h-80 dark:bg-dback">
                                {commentsarr.map((comment, index) => (
                                    <div
                                        key={index}
                                        style={{ height: "4em", paddingBottom: "0.5em" }}
                                        className="dark:bg-dback bg-white border-solid border border-black break-normal h-auto rounded-lg mb-5 grid grid-cols-5 grid-rows-2"
                                    >
                                        <p
                                            className="break-normal px-2 py-2 col-start-1 col-span-3 row-start-1 text-sm overflow-hidden text-justify"
                                            style={{ wordWrap: "break-word" }}
                                        >
                                            {comment}
                                        </p>
                                        <p
                                            className="break-normal px-2 py-2 col-start-1 col-span-1 row-start-2 overflow-hidden text-justify"
                                            style={{ wordWrap: "break-word", color: "rgb(160,160,160)", fontSize: "0.8rem" }}
                                        >
                                            {formatTime(commentTimes[index])}
                                        </p>
                                        {/* To flag a comment (add flag functionality) */}
                                        <p className="break-normal px-2 py-2 col-start-1 col-span-1 row-start-2 text-sm overflow-hidden text-justify">
                                            <img
                                                onClick={() => {
                                                    flagPostOrComment();
                                                }}
                                                style={{ height: "1.25rem", cursor: "pointer", float: "right" }}
                                                src="images/flag-icon.png"
                                                alt=""
                                            />
                                        </p>
                                        <p
                                        className="col-start-5 cols-span-1 pr-3"
                                        >
                                            <img
                                                src="images/avatar-image.jpg"
                                                style={{ height: "2em", width: "2em", borderRadius: "2em" }}
                                                className="border-solid border-2 border-black w-3/4 float-right col-start-5 cols-span-1 mt-2"
                                            ></img>
                                        </p>
                                        <p
                                        style={{ paddingTop: "0.75rem", paddingBottom: "0.5rem", fontSize: "0.8rem" }}
                                        className="col-start-4 col-span-2 pr-3 text-right py-2 px-2">
                                            User - {userarr[index]}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ position: "fixed", height: "3em", width: "100%" }}
                                className="grid grid-cols-5 grid-rows-1 pl-5 pr-5 pt-3 bg-transparent bottom-2">
                                <input
                                    style={{ left: "0.25rem", height: "2.25em", width: "100%" }}
                                    className="dark:bg-dback bg-white border-solid border border-black right-5 pl-2 rounded-lg col-span-4 col-start-1"
                                    type="text"
                                    value={newComment}
                                    onChange={(event) =>
                                        setNewComment(event.target.value)
                                    }
                                />
                                <button
                                style={{ marginLeft: "1em", marginRight: "0.75rem" }}
                                className="dark:bg-dblue hover:dark:bg-dorange bg-gray-400 hover:bg-gray-500 text-white focus:outline-none focus:shadow-outline text-sm border h-full border-black ml-5 rounded-lg mb-5 col-start-5 col-span-1 pr-3"
                                    onClick={() =>
                                        newComment.trim().length > 0
                                            ? handleAddComment()
                                            : {}
                                    }
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Pop up to explain reason for deletion */}
            {showFlagMenu && (
                <>
                    {/* TODO Position pop-up at center of screen */}
                    <div
                        ref={popupRefFlag}
                        className={`${
                            showFlagMenu ? "opacity-100" : "opacity-0"
                        }
            transition-opacity ease-in-out duration-300`}
                    >
                        <div
                            style={{
                                color: "rgb(219,219,219)",
                                backgroundColor: "rgb(66,66,66)",
                                position: "fixed",
                                right: "5rem",
                                bottom: "15rem",
                                borderRadius: "5px",
                                border: "0.2rem solid rgb(153,0,0)",
                                textAlign: "left",
                                padding: "20px",
                            }}
                        >
                            <span>Why are you flagging this post/comment?</span>

                            <br />
                            <br />

                            <form action="" method="post" id="reasonForFlag">
                                {/* Reason for deleting */}
                                <div>
                                    <select
                                        name="reason"
                                        id="reason"
                                        form="reasonForFlag"
                                        required
                                        style={{
                                            color: "rgb(69,69,69)",
                                            width: "100%",
                                        }}
                                    >
                                        <option value="reason 1">
                                            Self injury
                                        </option>
                                        <option value="reason 2">
                                            Harassment or bullying
                                        </option>
                                        <option value="reason 3">
                                            Sale or promotion of drugs
                                        </option>
                                        <option value="reason 4">
                                            Sale or promotion of firearms
                                        </option>
                                        <option value="reason 5">
                                            Nudity or pornography
                                        </option>
                                        <option value="reason 6">
                                            Violence or harm
                                        </option>
                                        <option value="reason 7">
                                            Hate speech or symbols
                                        </option>
                                        <option value="reason 8">
                                            Intellectual property violation
                                        </option>
                                        <option value="other" selected>
                                            other
                                        </option>
                                    </select>
                                </div>
                                <br />
                                {/* If other, explain by text */}
                                <div>
                                    <input
                                        type="text"
                                        name="otherReason"
                                        id="otherReason"
                                        placeholder="If other, enter your reason here"
                                        style={{
                                            color: "rgb(69,69,69)",
                                            width: "100%",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </div>
                                <br />
                                {/* Unique ID of post being deleted */}
                                <div>
                                    <input
                                        type="hidden"
                                        name="postUniqueID"
                                        id="postUniqueID"
                                        value={"UNIQUE ID OF POST HERE"}
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignContent: "space-between",
                                    }}
                                >
                                    <div style={{ flex: "1" }}>
                                        <input
                                            type="submit"
                                            value="Cancel"
                                            onClick={() => {
                                                flagPostOrComment();
                                            }}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                    <div style={{ flex: "0" }}>
                                        <input
                                            type="submit"
                                            value="Flag"
                                            style={{
                                                cursor: "pointer",
                                                color: "rgb(230,0,0)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
