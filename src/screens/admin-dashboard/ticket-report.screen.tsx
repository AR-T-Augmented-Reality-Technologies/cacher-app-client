import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Button, View, ImageBackground } from "react-native";
// eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { add_user } from "../../features/users.slice";
import { current } from "@reduxjs/toolkit";
import { forIn } from "cypress/types/lodash";



interface TicketScreenProps {
    navigation: any;
}

export const TicketScreen = ({ navigation }: TicketScreenProps) => {
    const user = useSelector((state: any) => state.users);
    const [currentPage, setCurrentPage] = useState("TicketScreen");
    const [idarr, setIdArr] = useState<number[]>([]);
    const [reporterarr, setReporterarr] = useState<number[]>([]);
    const [pagearr, setPagearr] = useState<number[]>([]);
    const [reasonarr, setReasonarr] = useState<string[]>([]);
    const [resolvedarr, setresolvedarr] = useState<boolean[]>([]);
    let [gotCommFlag, setGotCommFlag] = useState(0);

    let reportidArr = [0];
    let reporterArr = [0];
    let pageidArr = [0];
    let reasonArr = ["balls"];
    let resolved = [false];

    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
            setCurrentPage(storedPage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);


    const getReports = async () => {
        const response = await fetch(`${process.env.REACT_APP_REST_API_HOST}/admin/getReports`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);

        reportidArr[0] = (data.data.reported_posts[0].reportid);
        reporterArr[0] = data.data.reported_posts[0].reporter_id;
        pageidArr[0] = (data.data.reported_posts[0].page_id);
        reasonArr[0] = data.data.reported_posts[0].reason;
        resolved[0] = data.data.reported_posts[0].issue_resolved;
        console.log('LENGHT LOP  ' + data.data.reported_posts.length);
        for (var i = 1; i < data.data.reported_posts.length; i++) {
            console.log('here')
            reportidArr[i] = (data.data.reported_posts[i].reportid);
            reporterArr[i] = (data.data.reported_posts[i].reporter_id);
            pageidArr[i] = (data.data.reported_posts[i].page_id);
            reasonArr[i] = (data.data.reported_posts[i].reason);
            resolved[i] = (data.data.reported_posts[i].resolved);
        }
        console.log('Length of reports is ' + reportidArr.length);

        for (var j = 0; j < reportidArr.length; j++) {
            idarr.push(reportidArr[j]);
            reporterarr.push(reporterArr[j]);
            pagearr.push(pageidArr[j]);
            reasonarr.push(reasonArr[j]);
            resolvedarr.push(resolved[j]);
        }


    }
    if (gotCommFlag == 0) {
        getReports();
        setGotCommFlag(1);
    }
    return (
        <>
            <div className="grid grid-cols-8 min-h-screen dark:bg-dback">
                {/* Left column to display the back button*/}
                {/* The arrow icon on back button will only appear when viewed on larger screens due to limited column size on mobile*/}
                <div className="col-start-1 col-span-1 mt-2 ml-2">
                    <button
                        className="bg-custom-blue dark:bg-dblue hover:bg-custom-blue-hover hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                            navigation.navigate("AdminDashboard");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hidden md:inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                        Back
                    </button>
                </div>
                <div className="col-start-2 col-span-6">
                    <img
                        src="images/cacher-logo.png"
                        alt="Logo"
                        className="w-1/2 md:w-1/6 mx-auto mt-4"
                    ></img>
                    <div className="grid grid-cols-1 pl-5 pr-5 overflow-auto dark:bg-dback">
                        {idarr.map((report, index) => (
                            <div
                                key={index}
                                className="dark:bg-dback bg-white border-solid border border-black break-normal h-auto rounded-lg mb-5 grid grid-cols-5 grid-rows-2"
                            >
                                <p
                                    className="break-normal px-2 py-2 col-start-1 col-span-3 row-start-1 text-sm overflow-hidden text-justify"
                                    style={{ wordWrap: "break-word" }}
                                >
                                    {"Report ID - " + report}{" "}
                                </p>
                                <p
                                    className="break-normal px-2 py-2 col-start-1 col-span-3 row-start-2 text-sm overflow-hidden text-justify"
                                    style={{ wordWrap: "break-word" }}
                                >
                                    {"Page ID - " + (pagearr[index])}

                                </p>
                                <p className="break-normal px-2 py-2 col-start-1 col-span-3 row-start-3 text-sm overflow-hidden text-justify">
                                    Reporter User ID - {reporterArr[index]}
                                </p>
                                <p
                                    className="break-normal px-2 py-2 col-start-1 col-span-3 row-start-4 text-sm overflow-hidden text-justify"
                                    style={{ wordWrap: "break-word" }}
                                >
                                    {"Report Reason - " + (reasonarr[index])}

                                </p>
                                <p
                                    className="break-normal px-2 py-2 col-start-1 col-span-3 row-start-5 text-sm overflow-hidden text-justify"
                                    style={{ wordWrap: "break-word" }}
                                >
                                    {"Resolved? - " + (resolvedarr[index])}

                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* A column on the right of the screen to display vertial lines. All 3 lines will be displayed on desktop. On mobile devices only 2 lines will be displayed to save space*/}
                <div className="col-start-8 col-span-1 flex h-full">
                    <div className="border-r-2 border-custom-orange dark:border-dorange h-full ml-4"></div>
                    <div className="border-r-4 border-custom-orange dark:border-dorange h-full ml-5"></div>
                    <div className="hidden md:block border-r-8 border-custom-orange dark:border-dorange h-full ml-6"></div>
                </div>
            </div>
        </>
    );
};
