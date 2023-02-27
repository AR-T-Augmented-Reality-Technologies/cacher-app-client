import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add_user } from "../../features/users.slice";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [currentPage, setCurrentPage] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

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

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const validateForm = (e: any) => {
        e.preventDefault();

        // TODO: Form validation here
        return true;
    };

    const submitForm = async () => {
        // TODO: Form submit to server using REST API.
        const payload = {
            email: email,
            password_unhashed: password,
        };


        const response = await fetch('http://176.58.114.213:4000/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        console.log("Our Data:: ", await data.data);

        dispatch(add_user(await data.data));

        console.log("Finished Login");

        navigation.navigate('Map');
    };

    return <>
        <div className="grid grid-cols-8 min-h-screen dark:bg-dback">
            {/* Middle column with the logo and login form */}
            <div className="col-start-2 col-span-6">
                <img src="images/cacher-logo.png" alt="Logo" className="w-1/2 md:w-1/6 mx-auto mt-4"></img>
                <form className="w-full max-w-sm sm:w-full mt-6 mx-auto">
                    <div className="mb-6">
                        <label className="dark:text-white block text-gray-500 font-bold mb-2" htmlFor="emailLabel">Email</label>
                        <input className="bg-gray-200 dark:bg-dtext appearance-none border-2 border-gray-200 dark:border-dbord dark:text-white rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="email-input" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="dark:text-white block text-gray-500 font-bold mb-2" htmlFor="passwordLabel">Password</label>
                        <input className="bg-gray-200 dark:bg-dtext dark:border-dbord dark:text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="password-input" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-custom-blue hover:bg-custom-blue-hover dark:bg-dblue hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded
                        focus:outline-none focus:shadow-outline" type="button" onClick={(e) => { navigation.navigate('Image') }}>Sign In</button>
                        <button className="bg-custom-blue hover:bg-custom-blue-hover dark:bg-dblue hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded
                        focus:outline-none focus:shadow-outline" type="button" onClick={() => { navigation.navigate('Register') }}>Register</button>

                        {/* for admin. When possible to log in using an admin account, delete this button */}
                        <button className="bg-custom-blue hover:bg-custom-blue-hover dark:bg-dblue hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" type="button" onClick={() => { navigation.navigate('AdminDashboard') }}>Admin</button>
                    </div>
                </form>
            </div>
            {/* A column on the right of the screen to display vertial lines.
            All 3 lines will be displayed on desktop. On mobile devices only 2 lines will be displayed to save space*/}
            <div className="col-start-8 col-span-1 flex h-full">
                <div className="border-r-2 border-custom-orange dark:border-dorange h-full ml-4"></div>
                <div className="border-r-4 border-custom-orange dark:border-dorange h-full ml-5"></div>
                <div className="hidden md:block border-r-8 border-custom-orange dark:border-dorange h-full ml-6"></div>
            </div>
        </div>
    </>
};
